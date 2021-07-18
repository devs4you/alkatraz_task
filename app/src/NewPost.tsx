import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
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
	const history = useHistory();

	return (
		<>
			<Box className={classes.input} >
				<Box flex={1} marginRight="10px">
					<TextField id="standard-basic" label="Enter your username" fullWidth autoFocus onChange={(e) => {
						setUser(e.target.value);
						setLoginEnabled(new RegExp('^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$').test(e.target.value));
					}} />
				</Box>
				<Button
					variant="contained"
					color="primary"
					disableElevation
					size="small"
					disabled={!isLoginEnabled}
					onClick={() => {
						localStorage.setItem("user", user);
						history.push("posts");
					}}
				>Login</Button>
			</Box>
		</>
	);
}

export default Posts;
