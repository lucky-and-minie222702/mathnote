import Script from "react-inline-script";

function DrawingScript() {
	const script = () => {
		const canvas = document.querySelector("#canvas"),
			ctx = canvas.getContext("2d"),
			clearCanvas = document.querySelector(".clear-canvas"),
			toolBtns = document.querySelectorAll(".tool");

		let prevMouseX,
			prevMouseY,
			snapshot,
			isDrawing = false,
			selectedTool = "brush",
			brushWidth = 3,
			selectedColor = "#000";

		const setCanvasBackground = () => {
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = selectedColor;
		};

		window.addEventListener("load", () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			setCanvasBackground();
		});

		const startDraw = (e) => {
			isDrawing = true;
			prevMouseX = e.offsetX;
			prevMouseY = e.offsetY;
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
					.querySelector(".options .active")
					.classList.remove("active");
				btn.classList.add("active");
				selectedTool = btn.id;
				console.log(selectedTool);
			});
		});

		canvas.addEventListener("mousedown", startDraw);
		canvas.addEventListener("mousemove", drawing);
		canvas.addEventListener("mouseup", () => (isDrawing = false));
	};
	return script();
}

export default DrawingScript;
