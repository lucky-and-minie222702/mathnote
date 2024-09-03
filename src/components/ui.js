import React from "react";
import Singlenote from "./singlenote/singlenote.js";
import Button from "react-bootstrap/Button";

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
				<div>
					{this.state.canvases.map((id) => (
						<div>
							<Singlenote noteID={id} />{" "}
						</div>
					))}
				</div>
			</div>
		);
	}
}
