import React from "react";
import "./style.css";
import DrawingScript from "./script";

class Singlenote extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		DrawingScript();
	}

	render() {
		return (
			<div>
				<div className="container">
					<section className="tools-board">
						<div className="row">
							<label className="title">
								<strong>Tools</strong>
							</label>
							<ul className="options">
								<li className="option active tool" id="pencil">
									<i className="fas fa-pencil" id="icon"></i>
									<span>Pencil</span>
								</li>
								<li className="option tool" id="eraser">
									<i className="fas fa-eraser" id="icon"></i>
									<span>Eraser</span>
								</li>
							</ul>
						</div>
						<div className="row buttons">
							<button className="clear-canvas">
								Clear Canvas
							</button>
						</div>
					</section>
					<section className="drawing-board">
						<canvas id="canvas"></canvas>
					</section>
				</div>
			</div>
		);
	}
}

export default Singlenote;
