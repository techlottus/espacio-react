import React from 'react'
import { useSelector } from 'react-redux';
import { getImageOfAssets } from '../../../helpers/getImages';
import './SecurePayment.scss';

const SecurePayment = () => {
  const { texts } = useSelector((state) => state.texts);
  return (
    <>
      <div className="securepayment">
        <div className="secureimgpayment">
          <img src={getImageOfAssets(texts?.payment?.images?.securePayment)} alt="secure" /> 
        </div>
        <div className="securetitlepayment">{texts?.payment?.secure?.title}</div>
        <div className="securedescriptionpayment">{texts?.payment?.secure?.description}</div>
        <div className="securefooterpayment">
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.visa)} alt="visa" />
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.mastercard)} alt="mastercard" />
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.american)} alt="american" />
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.jcb)} alt="jcb" />
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.diners)} alt="diners" />
          <img className="secureitempayment" src={getImageOfAssets(texts?.payment?.images?.discover)} alt="discover" />
        </div>
      </div>
    </>
  )
}

export default SecurePayment