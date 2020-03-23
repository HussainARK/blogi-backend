/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DB_AND_USERNAME,
	password: process.env.USER_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_AND_USERNAME
});

module.exports = pool;
