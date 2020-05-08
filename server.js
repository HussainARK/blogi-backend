/// START

// Importing necessary Packages

const express = require("express");
const cors = require('cors');
const pool = require('./db');

// Doinng some Important Stuff

const app = express();

app.use(express.json());
app.use(cors());

const apiKey = process.env.API_KEY;

// Difining Some Functions

// // Checking the Inputs

const checkData = (title, author, content) => {
	if ((title === "") && (author === "") && (content === "")) {
		title = "N/A"
		author = "N/A"
		content = "N/A"

		return { title, author, content };
	} else {
		return;
	}
};

// Defining Routes

// // GET Routes

app.get("/", async (req, res) => {
	res.send("This is the Blogi RESTful API, You can't Access it until you have the API Key :)");
});

app.get("/posts", async (req, res) => {
	if (req.query.key == apiKey) {
		try {
			const allPosts = await pool.query("SELECT * FROM blog;");

			res.json(allPosts.rows);
		} catch (err) {
			console.error(err.message);
		} 
	} else {
		res.send("Error: API Key is missing");
	}
});

app.get("/posts/:id", async (req, res) => {
	if (req.query.key == apiKey) {
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
	} else {
		res.send("Error: API Key is missing");
	}
});

// // POST Route

app.post("/posts", async (req, res) => {
	if (req.query.key == apiKey) {
		try {
			const { title, author, content } = req.body;
			
			let { theTitle, theAuthor, theContent } = checkData(title, author, content);
			
			const createPost = await pool.query(
				"INSERT INTO blog (title, author, content) VALUES ($1, $2, $3) RETURNING *;", 
				[theTitle, theAuthor, theContent]
			);

			res.send("Post created!");
		} catch (err) {
			console.log(err.message);
		}
	} else {
		res.send("Error: API Key is missing");
	}
});

// // PUT Route

app.put("/posts/:id", async (req, res) => {
	if (req.query.key == apiKey) {
		try {
			const bid = req.params.id;
			const { title: newTitle, author: newAuthor, content: newContent } = req.body;

			let { title, author, content } = checkData(newTitle, newAuthor, newContent);

			updatePost = await pool.query(
				"UPDATE blog SET title=$1, author=$2, content=$3 WHERE bid=$4",
				[ title, author, content, bid ]
			);

			res.send("Post Updated!");
		} catch (err) {
			console.error(err.message);
		}
	} else {
		res.send("Error: API Key is missing");
	}
});

// // DELETE Route

app.delete("/posts/:id", async (req, res) => {
	if (req.query.key == apiKey) {
	try {
		const { id: bid } = req.params;

		deletePost = pool.query(
			"DELETE FROM blog WHERE bid=$1",
			[ bid ]
		);

		res.send("Post is Deleted!");
	} catch (err) {
		console.error(err.message);
	}
} else {
	res.send("Error: API Key is missing");
}
});

// Start the Server

const port = process.env.PORT || 2000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

/// END
