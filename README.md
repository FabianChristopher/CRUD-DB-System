# 🚀 Installation Instructions

## Quick Start (If you already have Node.js and MySQL)

```bash
npm install
npm start
```

**⚠️ Configuration Required:**
1. Create a `.env` file in the project root (see Configuration section below)
2. Add your MySQL credentials and email settings
3. Run `npm start` to start the server

**📧 Email Configuration:**
The system sends verification emails on signup. Configure your SMTP settings in `.env`.

---

## Configuration

### Environment Variables Setup

Create a `.env` file in the project root directory with the following variables:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=          # Leave empty for Mac, add password for Windows
MYSQL_DATABASE=employee_admin_system
MYSQL_PORT=3306

# Email Configuration (for verification emails)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password    # Use Gmail App Password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Server Configuration
PORT=3000
```

**🔐 Security Note:** The `.env` file stores sensitive credentials securely and is automatically excluded from version control via `.gitignore`.

**📧 Gmail App Password Setup:**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use that 16-character password in `EMAIL_PASSWORD`

---

## Step-by-Step Setup Guide for Windows and Mac

---

## Prerequisites Installation

### For Mac Users

#### Step 1: Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, add Homebrew to your PATH:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### Step 2: Install Node.js
```bash
brew install node
```

Verify installation:
```bash
node --version
npm --version
```

#### Step 3: Install MySQL
```bash
brew install mysql
```

#### Step 4: Start MySQL
```bash
brew services start mysql
```

Verify MySQL is running:
```bash
mysql --version
```

---

### For Windows Users

#### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer (.msi file)
4. Follow the installation wizard (accept all defaults)
5. Restart your computer

Verify installation (open Command Prompt):
```cmd
node --version
npm --version
```

#### Step 2: Install MySQL

**Option A: Using MySQL Installer (Recommended)**

1. Go to https://dev.mysql.com/downloads/installer/
2. Download **MySQL Installer for Windows**
3. Run the installer
4. Choose "Developer Default" setup type
5. Click "Execute" to install all components
6. Set root password (or leave empty for development)
7. Complete the installation

**Option B: Using XAMPP (Easier)**

1. Go to https://www.apachefriends.org/
2. Download XAMPP for Windows
3. Install XAMPP
4. Open XAMPP Control Panel
5. Click "Start" next to MySQL

Verify installation (open Command Prompt):
```cmd
mysql --version
```

#### Step 3: Start MySQL Service

**If using MySQL Installer:**
- MySQL should start automatically
- Or open Services (Win + R, type `services.msc`)
- Find "MySQL80" and click "Start"

**If using XAMPP:**
- Open XAMPP Control Panel
- Click "Start" button next to MySQL

---

## Project Installation

### Step 1: Navigate to Project Folder

**Mac:**
```bash
cd /path/to/CrudDB
```

**Windows (Command Prompt):**
```cmd
cd C:\path\to\CrudDB
```

**Windows (PowerShell):**
```powershell
cd C:\path\to\CrudDB
```

### Step 2: Install Project Dependencies

This command installs all required Node.js packages (express, mysql2, bcryptjs, cors, body-parser):

```bash
npm install
```

Wait for installation to complete (may take 1-2 minutes).

### Step 3: Configure MySQL Password (Windows Users)

**⚠️ IMPORTANT FOR WINDOWS USERS:**

If you get an "Access denied" error when starting the server, you need to set your MySQL password.

**Option A: Edit server.js (Easiest)**
1. Open `server.js` in any text editor
2. Find line 4 (at the very top):
   ```javascript
   const MYSQL_ROOT_PASSWORD = process.env.MYSQL_PASSWORD || 'root';
   ```
3. Change `'root'` to your MySQL password:
   ```javascript
   const MYSQL_ROOT_PASSWORD = process.env.MYSQL_PASSWORD || 'yourpassword';
   ```
   Common passwords: `'root'`, `'password'`, `''` (empty), or what you set during installation

**Option B: Use Environment Variable (Advanced)**
```cmd
set MYSQL_PASSWORD=yourpassword
npm start
```

**Mac Users:** If using Homebrew, MySQL usually has no password. The default `'root'` will be tried, but if that fails, try changing it to `''` (empty string).

### Step 4: Start the Application

```bash
npm start
```

You should see:
```
📦 Starting Employee-Admin CRUD System...
✅ Middleware configured
✅ Connected to MySQL
✅ Database ready
✅ Users table ready
✅ Leave applications table ready
✅ Biodata table ready
✅ Default admin user created

==================================================
🚀 Server is running on http://localhost:3000
📂 Open http://localhost:3000 in your browser
==================================================
```

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

---

## Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Employee Account:**
- Click "Employee Login" → "Sign up" to create a new account

---

## 🎯 Features

### Admin Features (9 Modules)

#### 1. **Leave Applications Management**
- View all employee leave requests in a centralized table
- See leave details: employee name, leave type, dates, duration, reason
- Review and monitor leave status (pending, approved, rejected)
- Approve or reject leave requests with admin remarks
- **Date validation**: End date must be after or equal to start date
- Click 👁️ icon to expand full leave details

#### 2. **Employee Biodata Management**
- Access complete employee profiles and personal information
- View all biodata: full name, email, phone, address, DOB, gender, position, department, joining date
- Monitor employee information across the organization
- Edit employee biodata
- Click 👁️ icon to view detailed biodata

#### 3. **Payroll/Salary Management**
- Add salary records for any employee with detailed breakdown
- Input: Basic salary, HRA, allowances, deductions
- **Validation**: Rejects negative values for salary components
- Auto-calculates: Net salary (basic + HRA + allowances - deductions)
- Auto-assigns payment date (current date)
- View all salary records in a table format
- Update existing salary records
- Delete salary records with confirmation
- Employee dropdown shows all registered users

#### 4. **Company Holiday Calendar**
- Add company-wide holidays for the year
- Input: Holiday name, date, description, year
- Auto-extracts year from selected date
- View all holidays organized by date
- Edit existing holidays
- Delete holidays with confirmation
- Helps plan workforce scheduling

#### 5. **Grievance Management System**
- View all employee grievances in centralized dashboard
- See grievance details: employee name, category, subject, description, priority, status, submission date
- Categories: Workplace Environment, Harassment, Salary/Benefits, Management, Other
- Priority levels: Low, Medium, High
- Statuses: Pending, In Progress, Resolved
- Click "View Details" to see full grievance and respond
- Provide admin response/resolution notes
- Update grievance status (Pending → In Progress → Resolved)
- Real-time updates reflect in employee portal

#### 6. **Resignation Management System**
- View all resignation requests from employees
- See details: Employee name, reason, last working day, submission date, status
- Statuses: Pending, Approved, Rejected
- Click "View Details" to review resignation
- Add admin remarks (feedback, exit process details, etc.)
- Approve or Reject resignations
- Updates reflect immediately in employee portal

#### 7. **Activity Log (Audit Trail)**
- Comprehensive logging of all system activities
- View logs with: User, Action Type, Description, IP Address, Timestamp
- Action types tracked:
  - LOGIN, LOGIN_FAILED, SIGNUP, EMAIL_VERIFIED
  - USER_CREATED, USER_UPDATED, USER_DELETED
  - BIODATA_ADD, BIODATA_UPDATE, BIODATA_DELETE
  - LEAVE_ADD, LEAVE_UPDATE, LEAVE_DELETE
  - SALARY_ADDED, SALARY_UPDATED, SALARY_DELETED
  - GRIEVANCE_ADD, GRIEVANCE_UPDATE
  - RESIGNATION_ADD, RESIGNATION_UPDATE
  - ROLE_CREATED, ROLE_UPDATED, ROLE_DELETED
  - ROLE_ASSIGNED, ROLE_REMOVED
- Search functionality to find specific activities
- Filter by action type
- Pagination for large datasets
- Full audit trail for compliance and security

#### 8. **Roles & Permissions (IAM System)**
- **4 Default Roles** automatically created:
  - **Super Admin**: Full system access (14/14 permissions)
  - **HR Manager**: HR operations (11/14 permissions)
  - **Department Manager**: Team management (5/14 permissions)
  - **Employee**: Basic access (2/14 permissions)
- **Create Custom Roles** with granular permissions:
  - view_employees, manage_employees
  - view_leave, approve_leave
  - view_salaries, manage_salaries
  - view_grievances, manage_grievances
  - view_holidays, manage_holidays
  - view_resignations, manage_resignations
  - view_activity_logs, manage_roles
- Edit role permissions and descriptions
- Delete custom roles (default roles protected)
- View role details: permissions, assigned users count
- Permission-based access control (PBAC)

#### 9. **Manage Employees (User Management + Role Assignment)**
- View all registered employees in a comprehensive table
- Columns: Username, Full Name, Email, Position, Department, Roles, Joined Date, Actions
- **Role badges** showing all assigned roles per user
- Add new employee accounts with:
  - Username, email, phone (with format validation)
  - Password (securely hashed)
  - Email/phone uniqueness validation
- Edit existing employees (change username/password)
- **Manage Roles** button for each employee:
  - View current assigned roles
  - Assign multiple roles to users
  - Remove roles with one click
  - Role dropdown shows all available roles
- Delete employees (removes user and all related data via CASCADE)
- Confirmation dialogs to prevent accidental data loss
- Real-time role updates with visual feedback

### Employee Features (6 Modules)

#### 1. **Leave Management**
- Submit leave applications with type, dates, and reason
- Leave types: Sick Leave, Casual Leave, Annual Leave, Emergency Leave, Maternity/Paternity Leave
- View personal leave history in a table
- Edit pending leave applications
- Delete leave applications
- See status: Pending, Approved, Rejected
- View admin remarks on approved/rejected leaves
- **Validation**: End date cannot be before start date
- Auto-calculates leave duration

#### 2. **My Biodata**
- Add personal biodata information
- Fields: Full name, email, phone, address, date of birth, gender, position, department, joining date
- **Phone validation**: Minimum 10 digits, proper format
- Edit biodata details
- Delete biodata records
- View complete profile information

#### 3. **Salary Details**
- View personal salary records
- See breakdown: Basic salary, allowances, deductions, net salary
- View payment dates
- Monitor salary history
- Read-only view (employees cannot edit/delete)

#### 4. **Yearly Holiday List**
- View current year's company holidays
- See holiday names and dates with day of week
- Organized chronologically
- Helps plan personal time off
- Read-only view

#### 5. **Grievances Portal**
- Submit grievances with subject and detailed description
- View submitted grievances history
- Track grievance status (Pending, Under Review, Resolved)
- See admin responses once provided
- View submission and update dates
- Click "View Details" to see full grievance with admin response

#### 6. **Resignation Portal**
- Submit resignation requests
- Input: Reason for resignation and last working day date
- View resignation status (Pending, Accepted, Rejected)
- See admin notes/feedback
- View submission date
- Track resignation processing
- Click "View Details" to see admin response

---

## Stopping the Server

Press `Ctrl + C` in the terminal/command prompt

---

## Troubleshooting

### Issue: "npm: command not found" or "node: command not found"

**Solution:** Node.js is not installed or not in PATH
- Reinstall Node.js
- Restart your terminal/command prompt
- On Windows, restart your computer

### Issue: "mysql: command not found"

**Solution:** MySQL is not installed or not in PATH
- Verify MySQL is installed
- On Windows with XAMPP: use XAMPP control panel instead

### Issue: "Cannot connect to MySQL"

**Solution:** MySQL is not running
- **Mac:** `brew services start mysql`
- **Windows (MySQL):** Start MySQL service from Services
- **Windows (XAMPP):** Start MySQL from XAMPP Control Panel

### Issue: Port 3000 already in use

**Solution:** Another application is using port 3000

**Mac:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows (Command Prompt):**
```cmd
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Issue: "Access denied for user 'root'" ⚠️ MOST COMMON

**Solution:** MySQL password is incorrect

**✅ AUTOMATIC PASSWORD DETECTION (Built-in Feature):**
The application now auto-detects your operating system:
- **Windows:** Automatically tries password `Root@12345`
- **Mac/Linux:** Automatically tries empty password `''`

If auto-detection fails, manually set your password:

**Quick Fix:**
1. Open `server.js`
2. Edit line 4 at the top:
   ```javascript
   const MYSQL_ROOT_PASSWORD = process.env.MYSQL_PASSWORD || 'YOUR_PASSWORD_HERE';
   ```
3. Replace `'YOUR_PASSWORD_HERE'` with your actual MySQL password
4. Common passwords to try:
   - Windows: `'Root@12345'`, `'root'`, `'password'`
   - Mac: `''` (empty string), `'root'`
5. Save and run `npm start` again

**Alternative Method - Environment Variable:**
```cmd
# Windows
set MYSQL_PASSWORD=yourpassword
npm start

# Mac
export MYSQL_PASSWORD=yourpassword
npm start
```

### Issue: "Cannot find module 'express'"

**Solution:** Dependencies not installed
```bash
npm install
```

### Issue: npm install fails

**Solution:** Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

---

## What Happens Automatically?

When you run `npm start`, the application automatically:

1. ✅ Detects your OS and sets MySQL password
2. ✅ Connects to MySQL
3. ✅ Creates database `employee_admin_system` (if not exists)
4. ✅ Creates `users` table (if not exists)
5. ✅ Creates `leave_applications` table (if not exists)
6. ✅ Creates `biodata` table (if not exists)
7. ✅ Creates `salaries` table (if not exists)
8. ✅ Creates `company_holidays` table (if not exists)
9. ✅ Creates `grievances` table (if not exists)
10. ✅ Creates `resignations` table (if not exists)
11. ✅ Sets up foreign key relationships with CASCADE delete
12. ✅ Inserts default admin user (if not exists)
13. ✅ Starts web server on port 3000
14. ✅ Serves all HTML/CSS/JS files

**No manual database setup required!**

---

## System Requirements

### Minimum Requirements
- **OS:** Windows 10/11 or macOS 10.14+
- **RAM:** 4GB
- **Disk Space:** 500MB
- **Node.js:** v14 or higher
- **MySQL:** v5.7 or higher

### Recommended Requirements
- **OS:** Windows 11 or macOS 12+
- **RAM:** 8GB
- **Disk Space:** 1GB
- **Node.js:** v18 or higher
- **MySQL:** v8.0 or higher

---

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Install dependencies | `npm install` |
| Start application | `npm start` |
| Stop application | `Ctrl + C` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |
| Check MySQL version | `mysql --version` |
| Start MySQL (Mac) | `brew services start mysql` |
| Stop MySQL (Mac) | `brew services stop mysql` |

---

## Additional Notes

- The application runs on **localhost:3000** by default
- Database name is **employee_admin_system**
- All data persists in MySQL database
- Theme preference saves in browser localStorage
- Server must be running to use the application
- **Cross-platform support:** Auto-detects Windows/Mac/Linux for MySQL password
- **Security:** Passwords hashed with bcryptjs, prepared SQL statements prevent injection
- **Cascading deletes:** When employee is deleted, all related data (leave, biodata, salary, grievances, resignations) is automatically removed
- **Form validation:** All input fields are trimmed and validated before submission
- **XSS protection:** DOM manipulation used instead of innerHTML for user-generated content
- **Auto-calculations:** Salary net amount calculated automatically from inputs
- **Timestamps:** All records have created_at and updated_at fields

---

## Database Schema

### 10 Tables Created Automatically:

#### 1. `users` - User accounts
- id, username, email (unique, nullable), phone (unique, nullable), password (hashed), user_type (admin/employee), email_verified, verification_token, token_expiry, created_at

#### 2. `leave_applications` - Leave requests
- id, employee_id (FK), leave_type, start_date, end_date, reason, status (pending/approved/rejected), admin_remarks, created_at, updated_at

#### 3. `biodata` - Employee profiles
- id, employee_id (FK, UNIQUE), full_name, email, phone, address, date_of_birth, gender, position, department, joining_date, created_at, updated_at

#### 4. `salaries` - Payroll records
- id, employee_id (FK), basic_salary, hra, allowances, deductions, net_salary, month, year, payment_date, created_at, updated_at

#### 5. `company_holidays` - Holiday calendar
- id, holiday_name, holiday_date, description, year, created_at, updated_at

#### 6. `grievances` - Employee grievances
- id, employee_id (FK), category, subject, description, priority, status (pending/in_progress/resolved), admin_remarks, resolution, created_at, updated_at

#### 7. `resignations` - Resignation requests
- id, employee_id (FK), reason, last_working_day, remarks, status (pending/approved/rejected), admin_remarks, created_at, updated_at

#### 8. `activity_logs` - System audit trail
- id, user_id (nullable), action, description, ip_address, created_at

#### 9. `roles` - IAM roles
- id, role_name (unique), description, permissions (JSON with 14 permission flags), created_at, updated_at

#### 10. `user_roles` - Role assignments (many-to-many)
- id, user_id (FK), role_id (FK), assigned_at, assigned_by, UNIQUE(user_id, role_id)

**Foreign Keys:** All tables with employee_id/user_id have CASCADE delete - when user is deleted, all related records are automatically removed.

**Default Data:**
- Admin user (username: admin, password: admin123)
- 4 default roles: Super Admin, HR Manager, Department Manager, Employee

---

## API Endpoints (48 Total)

### Authentication (2)
- `POST /api/signup` - Register new user
- `POST /api/login` - Authenticate user

### Leave Management (6)
- `GET /api/leave?employee_id={id}` - Get employee's leaves
- `GET /api/leave?id={id}` - Get single leave
- `GET /api/leave?all=true` - Get all leaves (admin)
- `POST /api/leave` - Create leave (validates date range)
- `PUT /api/leave/:id` - Update leave
- `DELETE /api/leave/:id` - Delete leave

### Biodata Management (6)
- `GET /api/biodata?employee_id={id}` - Get employee's biodata
- `GET /api/biodata?id={id}` - Get single biodata
- `GET /api/biodata?all=true` - Get all biodata (admin)
- `POST /api/biodata` - Create biodata (validates phone format)
- `PUT /api/biodata/:id` - Update biodata
- `DELETE /api/biodata/:id` - Delete biodata

### Salary Management (5)
- `GET /api/salaries?employee_id={id}` - Get employee's salaries
- `GET /api/salaries?all=true` - Get all salaries (admin)
- `POST /api/salaries` - Add salary record (validates negative values, auto-calculates net)
- `PUT /api/salaries/:id` - Update salary record
- `DELETE /api/salaries/:id` - Delete salary record (admin)

### Holiday Management (4)
- `GET /api/holidays` - Get all holidays
- `GET /api/holidays?year={year}` - Get holidays by year
- `POST /api/holidays` - Add holiday (admin)
- `PUT /api/holidays/:id` - Update holiday
- `DELETE /api/holidays/:id` - Delete holiday (admin)

### Grievance Management (5)
- `GET /api/grievances?employee_id={id}` - Get employee's grievances
- `GET /api/grievances?id={id}` - Get single grievance
- `GET /api/grievances?all=true` - Get all grievances (admin)
- `POST /api/grievances` - Submit grievance (employee)
- `PUT /api/grievances/:id` - Update grievance status/response (admin)

### Resignation Management (5)
- `GET /api/resignations?employee_id={id}` - Get employee's resignations
- `GET /api/resignations?id={id}` - Get single resignation
- `GET /api/resignations?all=true` - Get all resignations (admin)
- `POST /api/resignations` - Submit resignation (employee)
- `PUT /api/resignations/:id` - Accept/Reject resignation (admin)

### User Management (5)
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get single user (admin)
- `POST /api/add-employee` - Create new employee account (validates email/phone format, checks duplicates)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user and all related data (admin)

### Roles & Permissions (8)
- `GET /api/roles` - Get all roles
- `GET /api/roles/:id` - Get single role
- `POST /api/roles` - Create custom role with permissions
- `PUT /api/roles/:id` - Update role permissions
- `DELETE /api/roles/:id` - Delete custom role
- `POST /api/users/:id/roles` - Assign role to user
- `DELETE /api/users/:id/roles/:roleId` - Remove role from user
- `GET /api/users/:id/roles` - Get user's assigned roles
- `POST /api/users/:id/check-permission` - Check if user has specific permission

### Activity Logging (2)
- `GET /api/activity-logs?page={n}&limit={m}` - Get activity logs with pagination
- `GET /api/activity-logs/search?query={text}` - Search activity logs

### Email Verification (2)
- `POST /api/send-verification` - Send verification email
- `GET /api/verify-email?token={token}` - Verify email with token

---

## Security Features

✅ **Password Security**
- Bcrypt hashing (10 salt rounds)
- Passwords never stored in plain text

✅ **SQL Injection Protection**
- All queries use parameterized statements
- Input sanitization and validation

✅ **Input Validation**
- Email format validation (regex)
- Phone format validation (min 10 digits)
- Date range validation (end >= start)
- Negative number validation for salaries
- Duplicate username/email/phone detection

✅ **Data Integrity**
- Foreign key constraints
- CASCADE delete for related records
- UNIQUE constraints on critical fields
- NOT NULL validation for required fields

✅ **Audit Trail**
- All user actions logged with timestamps
- IP address tracking
- Action type categorization
- Search and filter capabilities

✅ **Access Control**
- Session-based authentication
- Role-based access control (RBAC)
- 14 granular permissions
- Multi-role assignment support

---

## Testing & Documentation

📄 **TESTING_GUIDE.md** - Step-by-step testing instructions for all features
📄 **FINAL_TESTING_REPORT.md** - Comprehensive test results and system status
📄 **test-comprehensive.js** - Automated test suite for backend APIs
📄 **test-all-features.sh** - Shell script to run all tests

### Testing Quick Start
```bash
# Ensure server is running first
node server.js

# In another terminal, run tests
node test-comprehensive.js
```

---

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure MySQL is running
4. Check terminal/command prompt for error messages
5. Restart terminal and try again

---

**Installation Complete! You're ready to use the Employee-Admin CRUD System.** 🎉
