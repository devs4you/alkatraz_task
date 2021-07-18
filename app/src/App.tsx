import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import Posts from "./Posts";
import { useHistory } from 'react-router-dom';
import Accept from './Accept';
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
	// const [isLoginEnabled, setLoginEnabled] = useState(false);
	// const [user, setUser] = useState("");
	const [openDialog, setDialog] = useState(true);
	const [isLoginEnabled, setLoginEnabled] = useState(false);
	const [user, setUser] = useState("");
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const history = useHistory();
	useEffect(() => {
		return () => {
		};
	})
	return (
		<Box className={classes.wrapper}>
			<Button
				onClick={() => {

					setDialog(true);
				}}
			>
				Add a new thread
			</Button>
			<Dialog
				open={openDialog}
				onClose={() => setDialog(false)}
				disableBackdropClick
			>
				<DialogTitle id="alert-dialog-title">Add a new thread</DialogTitle>
				<DialogContent>
					<Box mb={1}>
						<TextField
							label="Enter your username"
							fullWidth
							autoFocus
							helperText="Note! Your username can contain letters, numbers, underscore and a dot only."
							onChange={(e) => {
								setUser(e.target.value);
								setLoginEnabled(new RegExp('^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$').test(e.target.value));
							}}
						/>
					</Box>
					<Box mb={2}>
						<TextField
							label="Enter a thread title"
							fullWidth
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</Box>
					<Box mb={1}>
						<Accept onImageSet={(img) => { setImage(img) }} />
					</Box>
				</DialogContent>
				<Box mb={1}>
					<DialogActions>
						<Button onClick={() => setDialog(false)} color="primary">
							Cancel
						</Button>
						<Button onClick={() => {
							const requestOptions = {
								method: 'POST',
								headers: { 'Content-Type': 'Postslication/json' },
								body: JSON.stringify({
									username: user,
									title: title,
									image: image,
								})
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
							setDialog(false);
						}} color="primary" autoFocus variant="contained"
							disabled={!isLoginEnabled || !(title.length > 0)}
						>
							Post
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
			<Posts />
			<Typography variant="body2" color="textSecondary">Note! Your username can contain letters, numbers, underscore and a dot only.</Typography>
		</Box>
	);
}
export default App;
