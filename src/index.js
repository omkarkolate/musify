import React from "react";
import ReactDOM from "react-dom";
import { DataProvider } from "./dataProvider/DataProvider";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<Router>
				<App />
			</Router>
		</DataProvider>
	</React.StrictMode>,
	rootElement
);
