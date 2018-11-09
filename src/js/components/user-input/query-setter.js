import React, { Component } from "react";
import "./query-setter.scss";

class QuerySetter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        this.props.updateQueries(event.target.value, event.target.name);
    }

    render() {
        const url = this.props.url;
        const student = this.props.student;
        const keywords = this.props.keywords;

        return (
            <div className={'query-setter'}>
                <form ref={"form"} onSubmit={this.handleSubmit}>
                    <label htmlFor="url">URL</label>
                    <input name={"url"} type="text" value={url} onChange={this.handleChange}/>
                    <label htmlFor="student">Student</label>
                    <input id="student" name={"student"} type="text" value={student} onChange={this.handleChange}/>
                    <label htmlFor="keywords">Keywords / Phrase</label>
                    <input id="keywords" name={"keywords"} type="text" value={keywords} onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

export default QuerySetter;