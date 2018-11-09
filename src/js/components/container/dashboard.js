import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnnotationBrowser from "../presentational/annotation-browser";
import QuerySetter from "../user-input/query-setter";
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
            url: '',
            student: '',
            keywords: '',
        };
        this.updateQueries = this.updateQueries.bind(this);
        this.setDataForCall = this.setDataForCall.bind(this);
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

    parseRequestParams () {
        let paramObject = {limit: 200};
        this.state.url !== '' ? paramObject['url'] = this.state.url : undefined;
        this.state.student !== '' ? paramObject['user'] = this.state.student : undefined;
        this.state.keywords !== '' ? paramObject['quote'] = this.state.keywords : undefined;

        return paramObject;
    }


    setDataForCall () {

        axios.request({
            url: `https://hypothes.is/api/search`,
            method: 'get',
            // params: {
            //     url: 'http://teaching.lfhanley.net/english528sp18/texts/edna-st-vincent-millay/',
            //     // user: 'lydiajen@hypothes.is',
            //     limit: 200,
            //     password: 'Basic 6879-UpkRG4InzmDMO5jsOyMDvMTFltIlCHNLG-j6gpex2Ok',
            //     quote: "making friends",
            // },
            params: this.parseRequestParams(),
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

    updateQueries (value, name) {
        this.setState({[name]: value});
        console.log(this.state);
    }

    componentDidMount () {
        // axios.request({
        //     url: `https://hypothes.is/api/search`,
        //     method: 'get',
        //     params: {
        //         url: 'http://teaching.lfhanley.net/english528sp18/texts/edna-st-vincent-millay/',
        //         // user: 'lydiajen@hypothes.is',
        //         limit: 200,
        //         password: 'Basic 6879-UpkRG4InzmDMO5jsOyMDvMTFltIlCHNLG-j6gpex2Ok',
        //         quote: "making friends",
        //     },
        // }).then((response) => {
        //     console.log(response);
        //     this.setState({
        //         data: response.data.rows,
        //         users: this.createUserList(response.data.rows),
        //     });
        //     console.log(this.state);
        // }).catch((error) => {
        //     console.log('error', error);
        // });
    }

    render() {
        return (
            <div className={'main-dashboard-wrapper'}>
                <p>{this.state.textTile}</p>
                <section className={'user-input-area'}>
                    <QuerySetter
                        retrieveParams={this.retrieveUserQueryParams}
                        updateQueries={this.updateQueries}
                        url={this.state.url}
                        student={this.state.student}
                        keywords={this.state.keywords}
                    />
                    <button type={"submit"} onClick={this.setDataForCall}>Submit</button>
                </section>
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