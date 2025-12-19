# 🚀 Quick Testing Guide

## How to Test All Features

### Prerequisites
1. Server running: `node server.js`
2. Browser open at: `http://localhost:3000`

---

## 🔐 TEST 1: Admin Login & User Management

### Steps:
1. Go to `http://localhost:3000/admin-login.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Navigate to **Manage Employees** tab
4. Add a new employee:
   - Username: `johndoe`
   - Email: `john@example.com`
   - Phone: `+1-555-1234`
   - Password: `test123`
5. ✅ Verify employee appears in table

---

## 👤 TEST 2: Employee Login & Biodata

### Steps:
1. Logout from admin
2. Go to `http://localhost:3000/employee-login.html`
3. Login with:
   - Username: `johndoe`
   - Password: `test123`
4. Navigate to **My Biodata** tab
5. Click "Add Biodata" and fill form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1-555-1234`
   - Address: `123 Main St`
   - Date of Birth: `1990-01-15`
   - Gender: `Male`
   - Position: `Software Engineer`
   - Department: `IT`
   - Joining Date: `2024-01-01`
6. ✅ Verify biodata is saved

---

## 📅 TEST 3: Leave Management

### Steps (as Employee):
1. Navigate to **Leave Management** tab
2. Click "Apply for Leave"
3. Fill form:
   - Leave Type: `Sick Leave`
   - Start Date: `2025-12-23`
   - End Date: `2025-12-25`
   - Reason: `Medical appointment`
4. Submit
5. ✅ Verify leave appears with "pending" status

### Steps (as Admin):
6. Logout and login as admin
7. Navigate to **Leave Applications** tab
8. View john's leave
9. Change status to "Approved"
10. Add admin remarks: `Approved for medical reasons`
11. ✅ Verify status changed

---

## 💰 TEST 4: Payroll Management

### Steps (as Admin):
1. Navigate to **Payroll Management** tab
2. Click "Add Salary Record"
3. Fill form:
   - Employee: Select `johndoe`
   - Basic Salary: `5000`
   - HRA: `1000`
   - Allowances: `500`
   - Deductions: `300`
   - Month: `December`
   - Year: `2025`
4. Submit
5. ✅ Verify net salary calculated: $6,200

### Test Validation:
6. Try to add salary with negative basic salary: `-1000`
7. ✅ Should see error: "Basic salary cannot be negative"

---

## 🎉 TEST 5: Holidays Management

### Steps (as Admin):
1. Navigate to **Holiday Calendar** tab
2. Add holiday:
   - Date: `2025-12-25`
   - Name: `Christmas Day`
   - Description: `Christmas celebration`
3. ✅ Verify holiday appears in table

### Steps (as Employee):
4. Logout and login as johndoe
5. Navigate to **Holiday Calendar** tab
6. ✅ Verify Christmas holiday is visible

---

## 📝 TEST 6: Grievances Management

### Steps (as Employee):
1. Navigate to **My Grievances** tab
2. Click "Submit New Grievance"
3. Fill form:
   - Category: `Workplace Environment`
   - Subject: `AC not working`
   - Description: `Office AC has been broken for 3 days`
   - Priority: `Medium`
4. Submit
5. ✅ Verify grievance appears with "Pending" status

### Steps (as Admin):
6. Logout and login as admin
7. Navigate to **Grievances** tab
8. Click "View" on john's grievance
9. Update status to "In Progress"
10. Add admin response: `Maintenance team has been notified`
11. ✅ Verify status and response saved

---

## 👋 TEST 7: Resignations Management

### Steps (as Employee):
1. Logout and login as johndoe
2. Navigate to **Resignation** tab
3. Submit resignation:
   - Reason: `Better opportunity`
   - Last Working Day: `2026-01-31`
   - Remarks: `Thank you for everything`
4. ✅ Verify resignation submitted with "Pending" status

### Steps (as Admin):
5. Logout and login as admin
6. Navigate to **Resignations** tab
7. View john's resignation
8. Change status to "Approved"
9. Add admin remarks: `Best wishes for future`
10. ✅ Verify status changed

---

## 🔐 TEST 8: Roles & Permissions

### Steps (as Admin):
1. Navigate to **Roles & Permissions** tab
2. Create new role:
   - Role Name: `Junior Admin`
   - Description: `Limited admin access`
   - Permissions: Check these boxes:
     - ✅ view_employees
     - ✅ view_leave
     - ✅ approve_leave
     - ✅ view_salaries
3. Click "Create Role"
4. ✅ Verify role appears in roles table

### Assign Role:
5. Navigate to **Manage Employees** tab
6. Click "Manage Roles" for johndoe
7. Select "Junior Admin" from dropdown
8. Click "Assign Role"
9. ✅ Verify "Junior Admin" badge appears in john's row

### Remove Role:
10. Click "×" next to "Junior Admin" badge
11. Confirm removal
12. ✅ Verify badge disappears

### Delete Role:
13. Navigate back to **Roles & Permissions** tab
14. Click "Delete" for "Junior Admin" role
15. ✅ Verify role is removed

---

## 📊 TEST 9: Activity Logging

### Steps:
1. Navigate to **Activity Log** tab
2. ✅ Verify all above actions are logged:
   - USER_CREATED (johndoe creation)
   - LOGIN (multiple login entries)
   - BIODATA_ADD
   - LEAVE_ADD
   - LEAVE_UPDATE
   - SALARY_ADDED
   - GRIEVANCE_ADD
   - GRIEVANCE_UPDATE
   - RESIGNATION_ADD
   - RESIGNATION_UPDATE
   - ROLE_CREATED
   - ROLE_ASSIGNED
   - ROLE_REMOVED
   - ROLE_DELETED

### Search Test:
3. Enter "john" in search box
4. ✅ Verify only john's activities shown

### Filter Test:
5. Select "LOGIN" from action filter
6. ✅ Verify only login activities shown

---

## 🧪 TEST 10: Validation Tests

### Date Validation (Leave):
1. Navigate to **Leave Management** (as employee)
2. Try to create leave with:
   - Start Date: `2025-12-31`
   - End Date: `2025-12-25` (before start!)
3. ✅ Should see error: "End date cannot be before start date"

### Negative Number Validation (Salary):
1. Navigate to **Payroll Management** (as admin)
2. Try to add salary with negative basic salary
3. ✅ Should see error: "Basic salary cannot be negative"

### Duplicate User Validation:
1. Navigate to **Manage Employees** (as admin)
2. Try to create user with username `johndoe` again
3. ✅ Should see error: "Username already exists"

### Email Format Validation:
1. Try to create employee with invalid email: `notanemail`
2. ✅ Should see error: "Please enter a valid email address"

### Phone Format Validation:
1. Try to create employee with invalid phone: `123`
2. ✅ Should see error: "Please enter a valid phone number (at least 10 digits)"

---

## ✅ EXPECTED RESULTS SUMMARY

After completing all tests, you should have:

### Users:
- 1 admin user
- 1 employee user (johndoe)

### Data Created:
- 1 biodata record
- 1 leave application (approved)
- 1 salary record
- 1 holiday
- 1 grievance (in progress)
- 1 resignation (approved)
- Activity log with 15+ entries

### Roles:
- 4 default roles (Super Admin, HR Manager, Department Manager, Employee)
- No custom roles (Junior Admin was deleted)

---

## 🐛 TROUBLESHOOTING

### Issue: Cannot login
**Solution:** Check if server is running on port 3000

### Issue: "Database error"
**Solution:** Verify MySQL is running and credentials are correct

### Issue: Email verification error
**Solution:** Expected - email service not configured (not blocking functionality)

### Issue: Data not appearing
**Solution:** Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

---

## 📝 TESTING CHECKLIST

Use this checklist to track your testing progress:

- [ ] Admin login
- [ ] Create employee
- [ ] Employee login
- [ ] Add biodata
- [ ] Submit leave
- [ ] Approve leave (admin)
- [ ] Add salary
- [ ] Add holiday
- [ ] Submit grievance
- [ ] Respond to grievance (admin)
- [ ] Submit resignation
- [ ] Approve resignation (admin)
- [ ] Create custom role
- [ ] Assign role to user
- [ ] Remove role from user
- [ ] Delete custom role
- [ ] View activity logs
- [ ] Search activity logs
- [ ] Test date validation
- [ ] Test negative number validation
- [ ] Test duplicate user validation
- [ ] Test email format validation
- [ ] Test phone format validation

---

## 🎉 SUCCESS CRITERIA

✅ All checkboxes ticked
✅ No console errors
✅ All data persists after refresh
✅ Validation errors display correctly
✅ Activity log captures all actions

---

*Happy Testing! 🚀*
