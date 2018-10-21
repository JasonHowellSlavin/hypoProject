import React from "react";
import PropTypes from "prop-types";
import "../../../scss/annotation.scss";

const Annotation = (props) => (
    <div className={props.classFromProps}>
        <h3>User: {props.userName ? props.userName : "user name"}</h3>
        <h4>Created: {props.createdAt ? props.createdAt : "created at"}</h4>
        <p>Annotation: {props.userAnnotation ? props.userAnnotation : "user annotation"}</p>
        <p>Target text: {props.targetText ? props.targetText : "target text"}</p>
    </div>
);

export default Annotation;