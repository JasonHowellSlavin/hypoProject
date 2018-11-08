import React from "react";
import Annotation from "../presentational/annotation";
import "../../../scss/annotation-browser.scss";

const AnnotationBrowser = (props) => (
    <div className="annotation-browser">
        {
            props.data.map((elem, i) => {
                return <Annotation
                    userName={elem.user}
                    createdAt={elem.created}
                    userAnnotation={elem.text}
                    targetText={elem.target[0].selector !== undefined ? elem.target[0].selector[3].exact : "student replied to annotation" }
                    classFromProps={elem.target[0].selector !== undefined ? 'annotation' : 'annotation reply-to-text'}
                    key={elem.id}
                />
            })
        }
    </div>
);

export default AnnotationBrowser;