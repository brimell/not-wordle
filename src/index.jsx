import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

import { HashRouter as Router} from "react-router-dom";
// import { BrowserRouter as Router} from "react-router-dom";

//  uncomment to use custom right click
// import './components/rc/rc'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
