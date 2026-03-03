require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
    try {
        const pool = require('./db.js');
        console.log("Testing exported pool from db.js...");
        const [rows] = await pool.execute('SELECT 1');
        console.log("db.js connection successful!", rows);
        await pool.end();
    } catch (e) {
        console.error("db.js pool failed:", e.message);
    }
}
main();
