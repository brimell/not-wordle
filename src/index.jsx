import React from "react";
import ReactDOM from "react-dom";
//  uncomment to use custom right click
// import './components/rc/rc'
import { HashRouter as Router} from "react-router-dom";
// import { BrowserRouter as Router} from "react-router-dom";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
