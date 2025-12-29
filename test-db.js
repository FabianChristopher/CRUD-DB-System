// Quick MySQL Connection Test
require('dotenv').config();
const mysql = require('mysql2');

console.log('Testing MySQL connection...\n');
console.log('Using configuration:');
console.log('Host:', process.env.MYSQL_HOST || 'localhost');
console.log('User:', process.env.MYSQL_USER || 'root');
console.log('Password:', process.env.MYSQL_PASSWORD ? '***' + process.env.MYSQL_PASSWORD.slice(-2) : '(empty)');
console.log('Port:', process.env.MYSQL_PORT || 3306);
console.log('\nConnecting...\n');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    port: process.env.MYSQL_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error('❌ CONNECTION FAILED!');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        console.log('\n🔧 SOLUTIONS:');
        
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('   → Wrong password! Update MYSQL_PASSWORD in .env file');
            console.log('   → Try: MYSQL_PASSWORD=root  or  MYSQL_PASSWORD=  (empty)');
        } else if (err.code === 'ECONNREFUSED') {
            console.log('   → MySQL is not running!');
            console.log('   → Windows: Start MySQL service or XAMPP');
        } else if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('   → MySQL server has gone away');
            console.log('   → Restart MySQL service');
        }
        
        connection.end();
        process.exit(1);
    }

    console.log('✅ SUCCESS! MySQL connection works!');
    console.log('✅ Your .env configuration is correct');
    
    // Test creating database
    connection.query('CREATE DATABASE IF NOT EXISTS employee_admin_system', (err) => {
        if (err) {
            console.error('❌ Failed to create database:', err.message);
        } else {
            console.log('✅ Database "employee_admin_system" created/verified');
        }
        
        connection.end();
        console.log('\n🎉 All good! You can now run: npm start');
    });
});
