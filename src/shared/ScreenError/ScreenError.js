import React from 'react'
import { useSelector } from 'react-redux';
import { getImageOfAssetsMark } from '../../helpers/getImages';
import './ScreenError.scss';

const ScreenError = ({msg}) => {
  const { texts } = useSelector(state => state.texts);

  return (
  <>
      <div className="error-container">
        <div className="errorimage">
        <img src={getImageOfAssetsMark(texts?.dashboard?.images?.empty)} className="imgerror" alt="logo-error"/>
        </div>
      <p className="errormsg">{msg}</p>
      </div>
  </>
  )
}

export default ScreenError