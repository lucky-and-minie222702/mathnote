import UI from "./components/ui.js";
import { Helmet } from "react-helmet";
import "./components/style.css";

function App() {
	return (
		<div className="App">
			<Helmet>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
					integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
					crossorigin="anonymous"
				/>
				<title>Simple math note</title>
				<style>{"body{ background-color:#f5f6fa; }"}</style>
			</Helmet>
			<div className="parents">
				<div
					style={{
						"font-size": "small",
						top: "0",
						position: "sticky",
						width: "75vw",
						margin: "auto",
						"margin-top": "15px",
						"margin-bottom": "15px",
					}}
				>
					Made by Bui Minh Triet <b>email: </b>{" "}
					<i>minhtrietamoled@gmail.com</i>
				</div>
				<UI />
			</div>
		</div>
	);
}

export default App;
