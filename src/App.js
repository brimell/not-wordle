import React, { useEffect, Suspense, lazy} from "react";
import "./styles/__main.scss";

import { ContextProvider } from "./context/context";

import "./components/firebaseInit";

import Loading from "./components/Loading";
import Nav from "./components/Nav";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const Multiplayer = lazy(() => import("./components/Multiplayer/Multiplayer"));
const GameParent = lazy(() => import("./components/Game/GameParent"));
const Mathler = lazy(() => import("./components/Mathler"));
const CreateGameModal = lazy(() =>
	import("./components/Modals/CreateGameModal")
);
const Homepage = lazy(() => import("./components/Homepage"));
const MessagesModal = lazy(() => import("./components/Modals/MessagesModal"));
const StatsModal = lazy(() => import("./components/Modals/StatsModal"));

if (!localStorage.getItem("wordMode")) {
	localStorage.setItem("wordMode", "todaysWord");
}

function App() {
	useEffect(() => {
		if (localStorage.getItem("wordMode") === "todaysWord") {
			sessionStorage.setItem(
				"seed",
				new Date().toISOString().replace(/-/g, "").slice(0, 8)
			);
		}
	}, []);

	return (
		<ContextProvider>
			<Router>
				<Suspense fallback={<Loading />}>
					<div className="App-container target-light">
						<CreateGameModal />
						<StatsModal />
						<MessagesModal />
						<Nav />
						<Routes>
							<Route path="/" element={<Homepage />}></Route>
							<Route
								path="/multiplayer"
								element={<Multiplayer />}
							></Route>
							<Route
								path="/game"
								element={<GameParent />}
							></Route>
							<Route
								path="/mathler"
								element={<Mathler />}
							></Route>
						</Routes>
					</div>
				</Suspense>
			</Router>
		</ContextProvider>
	);
}

export default App;
