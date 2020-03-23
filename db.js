/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.DBANDUSERNAME,
	password: process.env.USERPASSWORD,
	host: process.env.DBHOST,
	database: process.env.DBANDUSERNAME
});

module.exports = pool;
