import React from "react";
import "../style.css";
import Button from "react-bootstrap/Button";
import { Editor } from "iink-ts";
// import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

class Singlenote extends React.Component {
	constructor(props) {
		super(props);
	}

	loadLib() {
		// const ce = new ComputeEngine();
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
		const wrapperElement = document.getElementById(
			"wrapper" + this.props.noteID.toString()
		);

		let editor;

		async function loadEditor() {
			var isShowRes = false;
			const options = {
				theme: {
					ink: {
						color: "#484848",
						"-myscript-pen-width": 2,
					},
				},
				configuration: {
					rendering: {
						smartGuide: {
							enable: false,
						},
					},
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
				isShowRes = false;
				const exports = evt.detail;
				if (exports && exports["application/x-latex"]) {
					let cmd;
					cmd = exports["application/x-latex"];
					console.log(cmd);
					if (
						exports["application/x-latex"][
							exports["application/x-latex"].length - 1
						] == "="
					) {
						console.log("Show result");
						editor.convert();
						isShowRes = true;
					}
				}
			});

			wrapperElement.addEventListener("onmousedown", () => {
				if (isShowRes) {
					editor.clear();
				}
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
					id={"wrapper" + this.props.noteID.toString()}
					className={
						this.props.disabled ? "disabled wrapper" : "wrapper"
					}
				>
					<div
						id={"editor" + this.props.noteID.toString()}
						className="editor"
						touch-action="none"
					></div>
				</div>
				<div style={{ display: "flex", "justify-content": "center" }}>
					{this.props.disabled ? (
						<div></div>
					) : (
						<div className="tool-bar" style={{ width: "75vw" }}>
							<Button
								style={{ width: "100%" }}
								id={"clear" + this.props.noteID.toString()}
								disabled
							>
								clear
							</Button>
							<Button
								style={{ width: "100%" }}
								id={"undo" + this.props.noteID.toString()}
								disabled
							>
								undo
							</Button>
							<Button
								style={{ width: "100%" }}
								id={"redo" + this.props.noteID.toString()}
								disabled
							>
								redo
							</Button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Singlenote;
