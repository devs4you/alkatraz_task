import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Posts from './Posts';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Switch>
					<Route exact path="/" component={App} />
					{/* <Route exact path="/" component={Posts} /> */}
				</Switch>
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);