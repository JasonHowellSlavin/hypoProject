import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnnotationBrowser from "../presentational/annotation-browser";
import axios from 'axios';
import "../../../scss/dashboard.scss";
// import urls from './src/api/urls.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            textTile: "Some Text Goes Here",
            data: [],
            users: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    createUserList (data) {
        let userArr = data.reduce((accum, elem) => {
            accum.push(elem.user);
            return accum;
        }, []);

        console.log(userArr);


        let seen = {};
        return userArr.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
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
            this.setState({
                data: response.data.rows,
                users: this.createUserList(response.data.rows),
            });
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
            <div className={'main-dashboard-wrapper'}>
                <p>{this.state.textTile}</p>
                <section className={'user-input-area'}></section>
                <div className={'dashboard-widget-wrapper'}>
                    <AnnotationBrowser data={this.state.data}/>
                    <div className={'graphics-wrapper'}>
                        <section className={'bar-graph-box'}></section>
                        <section className={'hot-spots'}></section>
                    </div>
               </div>
            </div>
        );
    }
}

const wrapper = document.getElementById("hypothesis-dashboard");

ReactDOM.render(<Dashboard />, wrapper);