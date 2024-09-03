import UI from "./components/ui.js";
import { Helmet } from "react-helmet";

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
				<script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
				<title>Simple math note</title>
				<style>{"body{ background-color:#f5f6fa }"}</style>
			</Helmet>
			<div>
				<UI />
			</div>
		</div>
	);
}

export default App;
