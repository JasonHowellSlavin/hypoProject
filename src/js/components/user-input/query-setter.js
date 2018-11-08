import React, { Component } from "react";
import "./query-setter.scss";

class QuerySetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            student: '',
            keywords: '',
        };
        this.handleSubmit = this.props.retrieveParams.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        this.setState({[inputName]: inputValue});
    }

    componentDidMount () {
        return true;
    }

    render() {
        return (
            <div className={'query-setter'}>
                <form ref={"form"} onSubmit={this.props.handleSubmit}>
                    <label htmlFor="url">URL</label>
                    <input name={"url"} type="text" value={this.state.url} onChange={this.handleChange}/>
                    <label htmlFor="student">Student</label>
                    <input id="student" name={"student"} type="text" value={this.state.student} onChange={this.handleChange}/>
                    <label htmlFor="keywords">Keywords / Phrase</label>
                    <input id="keywords" name={"keywords"} type="text" value={this.state.keywords} onChange={this.handleChange}/>
                    <button type={'submit'}>Submit Query</button>
                </form>
            </div>
        );
    }
}

export default QuerySetter;