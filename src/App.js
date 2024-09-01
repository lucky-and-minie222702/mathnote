import UI from "./components/ui.js";
import { Helmet } from "react-helmet";

function App() {
	return (
		<div className="App">
			<Helmet>
				<title>Simple math note</title>
			</Helmet>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
				integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>
			<div>
				<UI />
			</div>
		</div>
	);
}

export default App;
