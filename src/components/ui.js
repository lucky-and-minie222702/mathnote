import React from "react";
import Singlenote from "./singlenote/singlenote.js";
import Toolbar from "./controller/toolbar.js";

export default class UI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canvases: [1],
		};
	}

	addCanvas() {
		console.log("before", this.state.canvases);
		this.setState(
			{
				canvases: this.state.canvases.concat([
					this.state.canvases[this.state.canvases.length - 1] + 1,
				]),
			},
			() => {
				console.log(this.state);
			}
		);
		console.log("after", this.state.canvases);
	}

	render() {
		return (
			<div>
				<button
					style={{ position: "sticky", top: "110px" }}
					onClick={(e) => this.addCanvas()}
				>
					Add note
				</button>
				<Toolbar />
				<div>
					{this.state.canvases.map((id) => (
						<div style={{ display: "flex" }}>
							<button style={{ margin: "auto" }}>
								Delete note
							</button>
							<Singlenote canvasId={id} />{" "}
						</div>
					))}
				</div>
			</div>
		);
	}
}
