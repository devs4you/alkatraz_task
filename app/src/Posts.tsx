import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
	"@global": {
		"body, html": {
			margin: 0,
		},
		"*": {
			boxSizing: "border-box",
		}
	},
	wrPostser: {
		textAlign: "center",
		width: "400px",
		maxWidth: "calc(100% - 40px)",
		margin: "50px auto 50px auto",
	},
	input: {
		margin: "50px 0 20px 0",
		display: "flex"
	},
}));

interface Post {
	id: string;
}
type Posts = Post[] | undefined;
function Posts() {
	const classes = useStyles();
	const [isLoginEnabled, setLoginEnabled] = useState(false);
	const [user, setUser] = useState("");
	const [posts, setPosts] = useState(undefined as Posts);
	useEffect(() => {
		fetch("http://localhost:3000/posts")
			.then(res => res.json())
			.then(
				(result) => {
					setPosts(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log("error")
				}
			)
	}, [])
	return (
		<Box className={classes.wrPostser}>
			<Button
				onClick={() => {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'Postslication/json' },
						body: JSON.stringify({ id: 'newpost' })
					};
					fetch('http://localhost:3000/add', requestOptions)
						.then(response => console.log(response))
						.then((result) => {
							console.log("server success");
							console.log(result);
						},
							// Note: it's important to handle errors here
							// instead of a catch() block so that we don't swallow
							// exceptions from actual bugs in components.
							(error) => {
								console.log("server error")
							});
				}}
			>Add new post</Button>
			{
				posts?.map((post) => <Box key={post.id}>{post}</Box>)
			}
		</Box>
	);
}

export default Posts;
