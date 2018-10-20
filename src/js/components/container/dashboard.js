import React, { Component } from "react";
import ReactDOM from "react-dom";
import Annotation from "../presentational/annotation";
import axios from 'axios';
// import urls from './src/api/urls.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            textTile: "Some Text Goes Here",
            data: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        axios.request({
            url: `https://hypothes.is/api/search`,
            method: 'get',
            params: {
                url: 'http://teaching.lfhanley.net/english528sp18/texts/edna-st-vincent-millay/',
                // user: 'lydiajen@hypothes.is',
                limit: 200,
                password: 'Basic 6879-UpkRG4InzmDMO5jsOyMDvMTFltIlCHNLG-j6gpex2Ok',
            },
        }).then((response) => {
            console.log(response);
            this.setState({data: response.data.rows});
            console.log(this.state);
        }).catch((error) => {
            console.log('error', error);
        });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div>
                <p>{this.state.textTile}</p>
                <div className={'student-post-container'}>
                {
                    this.state.data.map((elem) => {
                        return <div key={elem.id} className={'student-post'}>
                            <h2>User: {elem.user}</h2>
                            <h3>Created: {elem.created}</h3>
                            <p>Annotation: {elem.text}</p>
                        </div>;
                    })
                }
               </div>
            </div>
        );
    }
}

const wrapper = document.getElementById("create-article-form");

ReactDOM.render(<Dashboard />, wrapper);