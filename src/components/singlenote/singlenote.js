import React from "react";
import "./style.css";
import { HandwritingInput } from "react-handwriting-recognition";

class Singlenote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: [],
		};
	}

	componentDidMount() {
		const canvas = document.querySelector(
				"#canvas" + this.props.canvasId.toString()
			),
			ctx = canvas.getContext("2d"),
			clearCanvas = document.querySelector(
				"#clear-canvas" + this.props.canvasId.toString()
			),
			toolBtns = document.querySelectorAll(".tool");

		let snapshot,
			isDrawing = false,
			selectedTool = "brush",
			brushWidth = 3,
			selectedColor = "#000";

		const setCanvasBackground = () => {
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = selectedColor;
		};

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		setCanvasBackground();

		const startDraw = (e) => {
			isDrawing = true;
			ctx.beginPath();
			ctx.lineWidth = brushWidth;
			ctx.strokeStyle = selectedColor;
			ctx.fillStyle = selectedColor;
			snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
		};

		const drawPencil = (e) => {
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
		};

		const drawing = (e) => {
			if (!isDrawing) return;
			ctx.putImageData(snapshot, 0, 0);

			if (
				(selectedTool === "brush" && selectedTool === "pencil") ||
				selectedTool === "eraser"
			) {
				ctx.strokeStyle =
					selectedTool === "eraser" ? "#fff" : selectedColor;
				if (selectedTool === "eraser") {
					brushWidth = 50;
				} else {
					brushWidth = 3;
				}
				ctx.lineWidth = brushWidth;
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.stroke();
			} else {
				if (selectedTool === "eraser") {
					brushWidth = 50;
				} else {
					brushWidth = 3;
				}
				ctx.lineWidth = brushWidth;
				drawPencil(e);
			}
		};
		clearCanvas.addEventListener("click", () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			setCanvasBackground();
		});

		toolBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				document
					.querySelector(".option .active")
					.classList.remove("active");
				btn.classList.add("active");
				selectedTool = btn.id;
				console.log(selectedTool);
			});
		});

		canvas.addEventListener("mousedown", startDraw);
		canvas.addEventListener("mousemove", drawing);
		canvas.addEventListener("mouseup", () => (isDrawing = false));

		// setInterval(async () => {
		// 	const result = await TextRecognition.recognize(canvas.toDataURL());
		// }, 3000);
	}
	render() {
		return (
			<div style={{ gap: "0px" }}>
				<div className="container">
					<section className="drawing-board">
						<canvas
							id={"canvas" + this.props.canvasId.toString()}
						></canvas>
					</section>
					<button
						id={"clear-canvas" + this.props.canvasId.toString()}
						// className="clear-canvas"
					>
						Clear note
					</button>
				</div>
			</div>
		);
	}
}

export default Singlenote;
