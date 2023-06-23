import React, { useEffect } from 'react';
import "./Feedback.scss";

export const Feedback = ({data, onRight, text, html=() => {return}, isNoti=false}) => {

    const feedbackRef = React.createRef();
  
    useEffect(() => {
      feedbackRef.current.data = {
        left: data.left || {},
        right: data.right || {},
        type: data.type || '',
        isTextEvent: data.isTextEvent,
        textEvent: data.textEvent || '',
      };
      
    },[data,text]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      feedbackRef.current.addEventListener('onRight', onRight)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
      <>
        <lottus-feedback ref={feedbackRef}> 
          <div content="" className={`feedback-content ${isNoti ? "feedbackcontentmessagetext" : ""}`}>{text || html()}</div>
        </lottus-feedback>
      </>
    )
  }
