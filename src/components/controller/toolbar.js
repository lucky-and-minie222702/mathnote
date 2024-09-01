import React from "react";
import "../singlenote/style.css";

class Toolbar extends React.Component {
	render() {
		return (
			<nav className="tools-board">
				<div className="row">
					<div className="title">
						<strong>Tools</strong>
					</div>
					<div
						style={{
							display: "flex",
							gap: "100px",
						}}
						className="option"
					>
						<div
							className="option active tool"
							id="pencil"
							style={{ margin: "auto" }}
						>
							<i className="fas fa-pencil" id="icon"></i>
							<span>Pencil</span>
						</div>
						<div
							className="option tool"
							id="eraser"
							style={{ margin: "auto" }}
						>
							<i className="fas fa-eraser" id="icon"></i>
							<span>Eraser</span>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Toolbar;
