import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
	"@global": {
		"body, html": {
			margin: 0,
		},
		"*": {
			boxSizing: "border-box",
		}
	},
	wrapper: {
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
function App() {
	const classes = useStyles();
	const [isLoginEnabled, setLoginEnabled] = useState(false);
	const [user, setUser] = useState("");
	const history = useHistory();

	useEffect(() => {
		// Other functions
		
		window.addEventListener("storage", () => {
		  // When storage changes refetch
		 alert("jo");
		});
		return () => {
		  // when the component unmounts remove the event listener
		  
		};
	})
	return (
		<Box className={classes.wrapper}><Typography>Welcome to our platform! <br />Enter a username to get started.</Typography>
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
			<Typography variant="body2" color="textSecondary">Note! Your username can contain letters, numbers, underscore and a dot only.</Typography>
		</Box>
	);
}

export default App;
