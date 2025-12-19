/**
 * Comprehensive System Testing Script
 * Tests all features, identifies bugs, and reports issues
 * 
 * Make sure the server is running before executing this script:
 * node server.js
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const testResults = {
    passed: [],
    failed: [],
    warnings: []
};

// Helper function to log test results
function logTest(name, passed, details = '') {
    if (passed) {
        testResults.passed.push({ name, details });
        console.log(`✅ PASS: ${name}`);
    } else {
        testResults.failed.push({ name, details });
        console.log(`❌ FAIL: ${name}`);
        if (details) console.log(`     Details: ${details}`);
    }
}

function logWarning(name, details) {
    testResults.warnings.push({ name, details });
    console.log(`⚠️  WARN: ${name} - ${details}`);
}

// Test data
let testAdminId = null;
let testEmployeeId = null;
let testLeaveId = null;
let testBiodataId = null;
let testSalaryId = null;
let testHolidayId = null;
let testGrievanceId = null;
let testResignationId = null;
let testRoleId = null;

// ==================== Authentication & User Management Tests ====================

async function testAuthentication() {
    console.log('\n🔐 Testing Authentication & User Management...\n');
    
    try {
        // Test 1: Admin login with correct credentials
        const adminLogin = await axios.post(`${API_BASE_URL}/login`, {
            username: 'admin',
            password: 'admin123',
            user_type: 'admin'
        });
        logTest('Admin login with correct credentials', adminLogin.data.success);
        testAdminId = adminLogin.data.user?.id;
        
    } catch (error) {
        logTest('Admin login with correct credentials', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Admin login with wrong password
        const wrongPassword = await axios.post(`${API_BASE_URL}/login`, {
            username: 'admin',
            password: 'wrongpass',
            user_type: 'admin'
        });
        logTest('Admin login rejects wrong password', !wrongPassword.data.success);
    } catch (error) {
        logTest('Admin login rejects wrong password', true);
    }
    
    try {
        // Test 3: Create test employee user
        const newEmployee = await axios.post(`${API_BASE_URL}/employees`, {
            username: 'testuser',
            password: 'test123',
            full_name: 'Test User',
            email: 'test@example.com',
            position: 'Software Engineer',
            department: 'IT'
        });
        logTest('Create new employee user', newEmployee.data.success);
        testEmployeeId = newEmployee.data.employee?.id;
    } catch (error) {
        logTest('Create new employee user', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 4: Duplicate username validation
        const duplicate = await axios.post(`${API_BASE_URL}/employees`, {
            username: 'testuser',
            password: 'test123',
            full_name: 'Another User',
            email: 'another@example.com',
            position: 'Manager',
            department: 'HR'
        });
        logTest('Prevent duplicate username', !duplicate.data.success);
    } catch (error) {
        logTest('Prevent duplicate username', true);
    }
    
    try {
        // Test 5: Employee login
        const empLogin = await axios.post(`${API_BASE_URL}/login`, {
            username: 'testuser',
            password: 'test123',
            user_type: 'employee'
        });
        logTest('Employee login with correct credentials', empLogin.data.success);
    } catch (error) {
        logTest('Employee login with correct credentials', false, error.response?.data?.message || error.message);
    }
}

// ==================== Leave Management Tests ====================

async function testLeaveManagement() {
    console.log('\n📅 Testing Leave Management System...\n');
    
    if (!testEmployeeId) {
        logWarning('Leave tests skipped', 'No test employee created');
        return;
    }
    
    try {
        // Test 1: Submit leave application
        const leave = await axios.post(`${API_BASE_URL}/leave`, {
            employee_id: testEmployeeId,
            leave_type: 'Sick Leave',
            start_date: '2025-12-20',
            end_date: '2025-12-22',
            reason: 'Medical appointment'
        });
        logTest('Submit leave application', leave.data.success);
        testLeaveId = leave.data.leave?.id;
    } catch (error) {
        logTest('Submit leave application', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Invalid date range (end before start)
        const invalidDates = await axios.post(`${API_BASE_URL}/leave`, {
            employee_id: testEmployeeId,
            leave_type: 'Casual Leave',
            start_date: '2025-12-25',
            end_date: '2025-12-20',
            reason: 'Testing'
        });
        logTest('Reject invalid date range', !invalidDates.data.success);
    } catch (error) {
        logTest('Reject invalid date range', true);
    }
    
    try {
        // Test 3: Get all leave applications
        const allLeaves = await axios.get(`${API_BASE_URL}/leave`);
        logTest('Fetch all leave applications', allLeaves.data.success && Array.isArray(allLeaves.data.leaves));
    } catch (error) {
        logTest('Fetch all leave applications', false, error.message);
    }
    
    try {
        // Test 4: Approve leave
        if (testLeaveId) {
            const approve = await axios.put(`${API_BASE_URL}/leave/${testLeaveId}`, {
                status: 'Approved',
                admin_remarks: 'Approved for medical reasons'
            });
            logTest('Approve leave application', approve.data.success);
        }
    } catch (error) {
        logTest('Approve leave application', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 5: Delete leave
        if (testLeaveId) {
            const deleteLeave = await axios.delete(`${API_BASE_URL}/leave/${testLeaveId}`);
            logTest('Delete leave application', deleteLeave.data.success);
        }
    } catch (error) {
        logTest('Delete leave application', false, error.response?.data?.message || error.message);
    }
}

// ==================== Biodata Management Tests ====================

async function testBiodataManagement() {
    console.log('\n👤 Testing Biodata Management...\n');
    
    if (!testEmployeeId) {
        logWarning('Biodata tests skipped', 'No test employee created');
        return;
    }
    
    try {
        // Test 1: Add biodata with phone numbers
        const biodata = await axios.post(`${API_BASE_URL}/biodata`, {
            employee_id: testEmployeeId,
            date_of_birth: '1995-05-15',
            gender: 'Male',
            address: '123 Test Street, Test City',
            phone: '+1-555-0123',
            emergency_contact_name: 'Jane Doe',
            emergency_contact_phone: '+1-555-0456',
            blood_group: 'O+',
            marital_status: 'Single'
        });
        logTest('Add employee biodata', biodata.data.success);
        testBiodataId = biodata.data.biodata?.id;
    } catch (error) {
        logTest('Add employee biodata', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Phone format validation
        const invalidPhone = await axios.post(`${API_BASE_URL}/biodata`, {
            employee_id: testEmployeeId + 999,
            date_of_birth: '1990-01-01',
            gender: 'Female',
            phone: 'invalid-phone',
            emergency_contact_phone: '123'
        });
        // This test checks if the system validates phone format
        logWarning('Phone validation', 'Check if phone format is validated');
    } catch (error) {
        // Error is expected for validation
    }
    
    try {
        // Test 3: Get biodata
        const getBiodata = await axios.get(`${API_BASE_URL}/biodata/${testEmployeeId}`);
        logTest('Fetch employee biodata', getBiodata.data.success);
    } catch (error) {
        logTest('Fetch employee biodata', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 4: Update biodata
        if (testBiodataId) {
            const update = await axios.put(`${API_BASE_URL}/biodata/${testBiodataId}`, {
                address: '456 Updated Avenue',
                blood_group: 'A+',
                marital_status: 'Married'
            });
            logTest('Update employee biodata', update.data.success);
        }
    } catch (error) {
        logTest('Update employee biodata', false, error.response?.data?.message || error.message);
    }
}

// ==================== Payroll Tests ====================

async function testPayrollManagement() {
    console.log('\n💰 Testing Payroll/Salary Management...\n');
    
    if (!testEmployeeId) {
        logWarning('Payroll tests skipped', 'No test employee created');
        return;
    }
    
    try {
        // Test 1: Add salary record
        const salary = await axios.post(`${API_BASE_URL}/salaries`, {
            employee_id: testEmployeeId,
            month: '2025-12',
            basic_salary: 5000,
            hra: 1000,
            allowances: 500,
            deductions: 300
        });
        logTest('Add salary record', salary.data.success);
        testSalaryId = salary.data.salary?.id;
        
        // Check if net salary is calculated
        if (salary.data.salary?.net_salary) {
            const expectedNet = 5000 + 1000 + 500 - 300;
            logTest('Net salary calculation', salary.data.salary.net_salary === expectedNet, 
                `Expected: ${expectedNet}, Got: ${salary.data.salary.net_salary}`);
        }
    } catch (error) {
        logTest('Add salary record', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Negative salary validation
        const negativeSalary = await axios.post(`${API_BASE_URL}/salaries`, {
            employee_id: testEmployeeId,
            month: '2025-11',
            basic_salary: -1000,
            hra: 500
        });
        logTest('Reject negative salary', !negativeSalary.data.success);
    } catch (error) {
        // Expected to fail
        logWarning('Negative salary validation', 'Check if negative values are properly validated');
    }
    
    try {
        // Test 3: Get salary records
        const salaries = await axios.get(`${API_BASE_URL}/salaries/${testEmployeeId}`);
        logTest('Fetch salary records', salaries.data.success);
    } catch (error) {
        logTest('Fetch salary records', false, error.message);
    }
    
    try {
        // Test 4: Update salary record
        if (testSalaryId) {
            const update = await axios.put(`${API_BASE_URL}/salaries/${testSalaryId}`, {
                basic_salary: 6000,
                hra: 1200,
                allowances: 600,
                deductions: 400
            });
            logTest('Update salary record', update.data.success);
        }
    } catch (error) {
        logTest('Update salary record', false, error.response?.data?.message || error.message);
    }
}

// ==================== Holidays Tests ====================

async function testHolidaysManagement() {
    console.log('\n🎉 Testing Holidays Management...\n');
    
    try {
        // Test 1: Add holiday
        const holiday = await axios.post(`${API_BASE_URL}/holidays`, {
            holiday_date: '2025-12-25',
            holiday_name: 'Christmas Day',
            description: 'Christmas celebration',
            year: 2025
        });
        logTest('Add holiday', holiday.data.success);
        testHolidayId = holiday.data.holiday?.id;
    } catch (error) {
        logTest('Add holiday', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Get all holidays
        const holidays = await axios.get(`${API_BASE_URL}/holidays`);
        logTest('Fetch all holidays', holidays.data.success && Array.isArray(holidays.data.holidays));
    } catch (error) {
        logTest('Fetch all holidays', false, error.message);
    }
    
    try {
        // Test 3: Update holiday
        if (testHolidayId) {
            const update = await axios.put(`${API_BASE_URL}/holidays/${testHolidayId}`, {
                description: 'Updated: Christmas celebration'
            });
            logTest('Update holiday', update.data.success);
        }
    } catch (error) {
        logTest('Update holiday', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 4: Delete holiday
        if (testHolidayId) {
            const deleteHoliday = await axios.delete(`${API_BASE_URL}/holidays/${testHolidayId}`);
            logTest('Delete holiday', deleteHoliday.data.success);
        }
    } catch (error) {
        logTest('Delete holiday', false, error.response?.data?.message || error.message);
    }
}

// ==================== Grievances Tests ====================

async function testGrievancesManagement() {
    console.log('\n📝 Testing Grievances Management...\n');
    
    if (!testEmployeeId) {
        logWarning('Grievances tests skipped', 'No test employee created');
        return;
    }
    
    try {
        // Test 1: Submit grievance
        const grievance = await axios.post(`${API_BASE_URL}/grievances`, {
            employee_id: testEmployeeId,
            category: 'Workplace Environment',
            subject: 'Test Grievance',
            description: 'This is a test grievance submission',
            priority: 'Medium'
        });
        logTest('Submit grievance', grievance.data.success);
        testGrievanceId = grievance.data.grievance?.id;
    } catch (error) {
        logTest('Submit grievance', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Get all grievances
        const grievances = await axios.get(`${API_BASE_URL}/grievances`);
        logTest('Fetch all grievances', grievances.data.success);
    } catch (error) {
        logTest('Fetch all grievances', false, error.message);
    }
    
    try {
        // Test 3: Update grievance status
        if (testGrievanceId) {
            const update = await axios.put(`${API_BASE_URL}/grievances/${testGrievanceId}`, {
                status: 'In Progress',
                admin_remarks: 'Looking into this issue'
            });
            logTest('Update grievance status', update.data.success);
        }
    } catch (error) {
        logTest('Update grievance status', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 4: Resolve grievance
        if (testGrievanceId) {
            const resolve = await axios.put(`${API_BASE_URL}/grievances/${testGrievanceId}`, {
                status: 'Resolved',
                admin_remarks: 'Issue has been resolved',
                resolution: 'Implemented necessary changes'
            });
            logTest('Resolve grievance', resolve.data.success);
        }
    } catch (error) {
        logTest('Resolve grievance', false, error.response?.data?.message || error.message);
    }
}

// ==================== Resignations Tests ====================

async function testResignationsManagement() {
    console.log('\n👋 Testing Resignations Management...\n');
    
    if (!testEmployeeId) {
        logWarning('Resignations tests skipped', 'No test employee created');
        return;
    }
    
    try {
        // Test 1: Submit resignation
        const resignation = await axios.post(`${API_BASE_URL}/resignations`, {
            employee_id: testEmployeeId,
            resignation_date: '2025-12-19',
            last_working_day: '2026-01-19',
            reason: 'Better opportunity',
            remarks: 'Thank you for the opportunity'
        });
        logTest('Submit resignation', resignation.data.success);
        testResignationId = resignation.data.resignation?.id;
    } catch (error) {
        logTest('Submit resignation', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 2: Get all resignations
        const resignations = await axios.get(`${API_BASE_URL}/resignations`);
        logTest('Fetch all resignations', resignations.data.success);
    } catch (error) {
        logTest('Fetch all resignations', false, error.message);
    }
    
    try {
        // Test 3: Update resignation status
        if (testResignationId) {
            const update = await axios.put(`${API_BASE_URL}/resignations/${testResignationId}`, {
                status: 'Approved',
                admin_remarks: 'Resignation accepted'
            });
            logTest('Update resignation status', update.data.success);
        }
    } catch (error) {
        logTest('Update resignation status', false, error.response?.data?.message || error.message);
    }
}

// ==================== Roles & Permissions Tests ====================

async function testRolesAndPermissions() {
    console.log('\n🔐 Testing Roles & Permissions System...\n');
    
    try {
        // Test 1: Get default roles
        const roles = await axios.get(`${API_BASE_URL}/roles`);
        logTest('Fetch all roles', roles.data.success && roles.data.roles.length >= 4);
        
        // Check for default roles
        if (roles.data.success) {
            const roleNames = roles.data.roles.map(r => r.role_name);
            logTest('Super Admin role exists', roleNames.includes('Super Admin'));
            logTest('HR Manager role exists', roleNames.includes('HR Manager'));
            logTest('Department Manager role exists', roleNames.includes('Department Manager'));
            logTest('Employee role exists', roleNames.includes('Employee'));
        }
    } catch (error) {
        logTest('Fetch all roles', false, error.message);
    }
    
    try {
        // Test 2: Create custom role
        const newRole = await axios.post(`${API_BASE_URL}/roles`, {
            role_name: 'Test Manager',
            description: 'Test role for automated testing',
            permissions: {
                view_employees: true,
                manage_employees: false,
                view_leave: true,
                approve_leave: true
            }
        });
        logTest('Create custom role', newRole.data.success);
        testRoleId = newRole.data.role?.id;
    } catch (error) {
        logTest('Create custom role', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 3: Assign role to user
        if (testRoleId && testEmployeeId) {
            const assign = await axios.post(`${API_BASE_URL}/users/${testEmployeeId}/roles`, {
                role_id: testRoleId
            });
            logTest('Assign role to user', assign.data.success);
        }
    } catch (error) {
        logTest('Assign role to user', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 4: Get user roles
        if (testEmployeeId) {
            const userRoles = await axios.get(`${API_BASE_URL}/users/${testEmployeeId}/roles`);
            logTest('Fetch user roles', userRoles.data.success);
        }
    } catch (error) {
        logTest('Fetch user roles', false, error.message);
    }
    
    try {
        // Test 5: Check permission
        if (testEmployeeId) {
            const permCheck = await axios.post(`${API_BASE_URL}/users/${testEmployeeId}/check-permission`, {
                permission: 'view_leave'
            });
            logTest('Check user permission', permCheck.data !== undefined);
        }
    } catch (error) {
        logTest('Check user permission', false, error.message);
    }
    
    try {
        // Test 6: Remove role from user
        if (testRoleId && testEmployeeId) {
            const remove = await axios.delete(`${API_BASE_URL}/users/${testEmployeeId}/roles/${testRoleId}`);
            logTest('Remove role from user', remove.data.success);
        }
    } catch (error) {
        logTest('Remove role from user', false, error.response?.data?.message || error.message);
    }
    
    try {
        // Test 7: Delete custom role
        if (testRoleId) {
            const deleteRole = await axios.delete(`${API_BASE_URL}/roles/${testRoleId}`);
            logTest('Delete custom role', deleteRole.data.success);
        }
    } catch (error) {
        logTest('Delete custom role', false, error.response?.data?.message || error.message);
    }
}

// ==================== Activity Logging Tests ====================

async function testActivityLogging() {
    console.log('\n📊 Testing Activity Logging...\n');
    
    try {
        // Test 1: Get activity logs
        const logs = await axios.get(`${API_BASE_URL}/activity-logs?page=0&limit=50`);
        logTest('Fetch activity logs', logs.data.success);
        
        if (logs.data.success && logs.data.logs) {
            logTest('Activity logs contain data', logs.data.logs.length > 0);
        }
    } catch (error) {
        logTest('Fetch activity logs', false, error.message);
    }
    
    try {
        // Test 2: Search activity logs
        const search = await axios.get(`${API_BASE_URL}/activity-logs/search?query=login`);
        logTest('Search activity logs', search.data.success);
    } catch (error) {
        logTest('Search activity logs', false, error.message);
    }
}

// ==================== Edge Cases & Validation Tests ====================

async function testEdgeCases() {
    console.log('\n⚠️  Testing Edge Cases & Validation...\n');
    
    try {
        // Test: Empty required fields
        const emptyFields = await axios.post(`${API_BASE_URL}/employees`, {
            username: '',
            password: '',
            full_name: ''
        });
        logTest('Reject empty required fields', !emptyFields.data.success);
    } catch (error) {
        logTest('Reject empty required fields', true);
    }
    
    try {
        // Test: SQL injection attempt
        const sqlInjection = await axios.post(`${API_BASE_URL}/login`, {
            username: "admin' OR '1'='1",
            password: "anything",
            user_type: 'admin'
        });
        logTest('Prevent SQL injection', !sqlInjection.data.success);
    } catch (error) {
        logTest('Prevent SQL injection', true);
    }
    
    try {
        // Test: XSS attempt
        const xss = await axios.post(`${API_BASE_URL}/grievances`, {
            employee_id: testEmployeeId || 1,
            category: 'Test',
            subject: '<script>alert("XSS")</script>',
            description: 'XSS test'
        });
        // Should not crash server
        logWarning('XSS handling', 'Check if HTML/script tags are sanitized in responses');
    } catch (error) {
        // Server handled it
    }
}

// ==================== Cleanup ====================

async function cleanup() {
    console.log('\n🧹 Cleaning up test data...\n');
    
    try {
        // Delete test employee
        if (testEmployeeId) {
            await axios.delete(`${API_BASE_URL}/employees/${testEmployeeId}`);
            console.log('✅ Test employee deleted');
        }
    } catch (error) {
        console.log('⚠️  Could not delete test employee:', error.message);
    }
}

// ==================== Main Test Runner ====================

async function runAllTests() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║     COMPREHENSIVE SYSTEM TEST - CrudDB Project         ║');
    console.log('║     Testing all 5 features + IAM system                ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    try {
        await testAuthentication();
        await testLeaveManagement();
        await testBiodataManagement();
        await testPayrollManagement();
        await testHolidaysManagement();
        await testGrievancesManagement();
        await testResignationsManagement();
        await testRolesAndPermissions();
        await testActivityLogging();
        await testEdgeCases();
        
        // Print summary
        console.log('\n╔════════════════════════════════════════════════════════╗');
        console.log('║                    TEST SUMMARY                         ║');
        console.log('╚════════════════════════════════════════════════════════╝\n');
        
        console.log(`✅ Passed: ${testResults.passed.length} tests`);
        console.log(`❌ Failed: ${testResults.failed.length} tests`);
        console.log(`⚠️  Warnings: ${testResults.warnings.length} issues\n`);
        
        if (testResults.failed.length > 0) {
            console.log('❌ FAILED TESTS:');
            testResults.failed.forEach(test => {
                console.log(`   • ${test.name}`);
                if (test.details) console.log(`     → ${test.details}`);
            });
            console.log('');
        }
        
        if (testResults.warnings.length > 0) {
            console.log('⚠️  WARNINGS:');
            testResults.warnings.forEach(warn => {
                console.log(`   • ${warn.name}`);
                if (warn.details) console.log(`     → ${warn.details}`);
            });
            console.log('');
        }
        
        const passRate = ((testResults.passed.length / (testResults.passed.length + testResults.failed.length)) * 100).toFixed(1);
        console.log(`📊 Pass Rate: ${passRate}%\n`);
        
        // Cleanup
        await cleanup();
        
        if (testResults.failed.length === 0) {
            console.log('🎉 All tests passed! System is ready for production.\n');
        } else {
            console.log('⚠️  Some tests failed. Please review and fix issues.\n');
        }
        
    } catch (error) {
        console.error('❌ Test runner error:', error.message);
    }
}

// Run tests
runAllTests();
