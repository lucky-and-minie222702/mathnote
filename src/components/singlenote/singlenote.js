import React from "react";
import "../style.css";
import Button from "react-bootstrap/Button";
import { Editor } from "iink-ts";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

class Singlenote extends React.Component {
	constructor(props) {
		super(props);
	}

	loadLib() {
		const editorElement = document.getElementById(
			"editor" + this.props.noteID.toString()
		);
		const clearElement = document.getElementById(
			"clear" + this.props.noteID.toString()
		);
		const undoElement = document.getElementById(
			"undo" + this.props.noteID.toString()
		);
		const redoElement = document.getElementById(
			"redo" + this.props.noteID.toString()
		);

		function cleanLatex(latexExport) {
			console.log("latexExport: ", latexExport);
			if (typeof latexExport === "number") {
				latexExport = latexExport.toString();
			}
			if (latexExport.includes("\\\\")) {
				const steps = "\\begin{align*}" + latexExport + "\\end{align*}";
				return steps
					.replace("\\begin{aligned}", "")
					.replace("\\end{aligned}", "")
					.replace(new RegExp("(align.{1})", "g"), "aligned");
			}
			return latexExport.replace(
				new RegExp("(align.{1})", "g"),
				"aligned"
			);
		}

		let editor;

		async function loadEditor() {
			const options = {
				configuration: {
					server: {
						protocol: "WEBSOCKET",
						applicationKey: "3650153f-8a51-4f13-9c57-8bec175d8464",
						hmacKey: "47cef1f3-3535-4d33-b0d3-f0714effd852",
					},
					recognition: {
						type: "MATH",
						math: {
							mimeTypes: ["application/x-latex"],
						},
					},
				},
			};

			editor = new Editor(editorElement, options);

			await editor.initialize();

			editor.events.addEventListener("changed", (event) => {
				undoElement.disabled = !event.detail.canUndo;
				redoElement.disabled = !event.detail.canRedo;
				clearElement.disabled = !event.detail.canClear;
			});

			editor.events.addEventListener("exported", (evt) => {
				const exports = evt.detail;
				if (exports && exports["application/x-latex"]) {
					// exports["application/x-latex"];
				}
				// else if (exports && exports["application/mathml+xml"]) {
				// 	resultElement.innerText = exports["application/mathml+xml"];
				// } else if (exports && exports["application/mathofficeXML"]) {
				// 	resultElement.innerText =
				// 		exports["application/mathofficeXML"];
				// } else {
				// 	resultElement.innerHTML = "";
				// }
			});

			clearElement.addEventListener("click", async () => {
				editor.clear();
			});

			undoElement.addEventListener("click", () => {
				editor.undo();
			});

			redoElement.addEventListener("click", () => {
				editor.redo();
			});

			window.addEventListener("resize", () => {
				editor.resize();
			});
		}

		loadEditor().catch((error) => console.error(error));
	}

	componentDidMount() {
		this.loadLib();
	}

	render() {
		return (
			<div>
				<div
					id={"editor" + this.props.noteID.toString()}
					className="editor"
					touch-action="none"
				></div>
				<div className="tool-bar">
					<Button
						style={{ width: "100%" }}
						id={"clear" + this.props.noteID.toString()}
						class="nav-btn btn-fab-mini btn-lightBlue"
						disabled
					>
						clear
					</Button>
					<Button
						style={{ width: "100%" }}
						id={"undo" + this.props.noteID.toString()}
						class="nav-btn btn-fab-mini btn-lightBlue"
						disabled
					>
						undo
					</Button>
					<Button
						style={{ width: "100%" }}
						id={"redo" + this.props.noteID.toString()}
						class="nav-btn btn-fab-mini btn-lightBlue"
						disabled
					>
						redo
					</Button>
				</div>
			</div>
		);
	}
}

export default Singlenote;
