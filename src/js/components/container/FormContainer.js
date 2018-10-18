import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            textTile: "Some Text Goes Here",
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div>
                <p>{this.state.textTile}</p>
                <div>Hi</div>
            </div>
        );
    }
}

const wrapper = document.getElementById("create-article-form");

ReactDOM.render(<FormContainer />, wrapper);