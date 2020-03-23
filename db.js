/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
	user: "postgres",
	password: process.env.PASSWORD,
	host: "localhost",
	port: 5432,
	database: "blogidb"
});

module.exports = pool;
