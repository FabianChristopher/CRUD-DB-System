// Fix Database Schema - Adds missing columns
require('dotenv').config();
const mysql = require('mysql2');

console.log('🔧 Fixing database schema...\n');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'employee_admin_system',
    port: process.env.MYSQL_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ Connection failed:', err.message);
        process.exit(1);
    }

    console.log('✅ Connected to database\n');

    // Drop and recreate users table to ensure correct schema
    const recreateUsersTable = `
        DROP TABLE IF EXISTS users;
        
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE,
            phone VARCHAR(20) UNIQUE,
            password VARCHAR(255) NOT NULL,
            user_type ENUM('admin', 'employee') NOT NULL,
            email_verified BOOLEAN DEFAULT FALSE,
            verification_token VARCHAR(255),
            token_expiry DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    console.log('🔄 Recreating users table with correct schema...');
    
    db.query(recreateUsersTable, (err) => {
        if (err) {
            console.error('❌ Failed to recreate table:', err.message);
            db.end();
            process.exit(1);
        }

        console.log('✅ Users table recreated successfully\n');

        // Insert default admin
        const bcrypt = require('bcryptjs');
        const hashedPassword = bcrypt.hashSync('admin123', 10);

        db.query(
            'INSERT INTO users (username, email, phone, password, user_type, email_verified) VALUES (?, ?, ?, ?, ?, ?)',
            ['admin', 'admin@system.local', '+1-555-0000', hashedPassword, 'admin', true],
            (err) => {
                if (err) {
                    console.error('❌ Failed to create admin user:', err.message);
                } else {
                    console.log('✅ Default admin user created');
                    console.log('   Username: admin');
                    console.log('   Password: admin123\n');
                }

                db.end();
                console.log('🎉 Database fix complete!');
                console.log('💡 You can now run: npm start');
            }
        );
    });
});
