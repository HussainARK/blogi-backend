/*
	* Copyright (c) 2020 
	* All rights reserved.
	*/

// Importing necessary Packages

const express = require("express");
const cors = require('cors');
const pool = require('./db');

// Doinng some Important Stuff

app = express();

app.use(express.json());
app.use(cors());

// Defining Routes

app.get("/posts", async (req, res) => {
	try {
		const allPosts = await pool.query("SELECT * FROM blog;");

		res.json(allPosts.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/posts/:id", async (req, res) => {
	try {
		const bid = req.params.id;

		const selectedPost = await pool.query(
			"SELECT * FROM blog WHERE bid=$1",
			[ bid ]
		)

		res.json(selectedPost.rows[0])
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/posts", async (req, res) => {
	try {
		const { title, author, content } = req.body;

		const createPost = await pool.query(
			"INSERT INTO blog (title, author, content) VALUES ($1, $2, $3) RETURNING *;", 
			[title, author, content]
		);

		res.json("Post created!");
	} catch (err) {
		console.log(err.message);
		}
});

app.put("/posts/:id", async (req, res) => {
			try {
				const bid = req.params.id;
				const { title: newTitle, author: newAuthor, content: newContent } = req.body;

				updatePost = await pool.query(
					"UPDATE blog SET title=$1, author=$2, content=$3 WHERE bid=$4",
					[ newTitle, newAuthor, newContent, bid ]
				);

			res.json("Post Updated!");
			} catch (err) {
				console.error(err.message);
			}
		});

app.delete("/posts/:id", async (req, res) => {
	try {
		const { id: bid } = req.params;

		deletePost = pool.query(
			"DELETE FROM blog WHERE bid=$1",
			[ bid ]
		);

		res.json("Post is Deleted!");
	} catch (err) {
		console.error(err.message);
	}
});

// Start the Server

const port = process.env.PORT || 2000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
