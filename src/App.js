import Singlenote from "./components/singlenote/singlenote.js";

function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
				integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>
			<Singlenote />
		</div>
	);
}

export default App;
