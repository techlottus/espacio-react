import React from 'react'

import './Notification.scss'
const Notification = ({icon, text, isBold}) => {
  return (
    <>
      <div className='notification-container'>
        <div className="side -normal">
          <span className="material-icons icons">{icon}</span>
        </div>
        <div className="content">
          <p className={`content-text ${isBold ? 'isbold' : null }`}>{text}</p>
        </div>
        <div className="side"></div>
      </div>
    </>
  )
}

export default Notification;