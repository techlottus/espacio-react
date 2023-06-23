import React, {useState} from 'react'
import { Footer } from '../../components/Footer/Footer';
import {
  dataFooter,
  dataFooterTerms
} from "../../constants/Dashboard.constant";
import { useHistory, useLocation } from 'react-router';
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import { linkTermsPrivacyFooterTag } from '../../tagging/flows/footerTag';

const FooterApp = () => {
  const history = useHistory()
  const location = useLocation()

  const [footer] = useState({
    ...dataFooter,
  });

  const [footerTerms] = useState({
    ...dataFooterTerms,
  })

  const onLink = (e) => {
    if(e.detail === 'privacy' || e.detail === 'terms'){
      history.push('/public-terms')
      sendInfoTM(window, linkTermsPrivacyFooterTag, "aviso-terminos");
    }
  }

  return (
    <>
      <div className='footer' style={{
        position: 'relative',
        bottom: '0',
        width: '100%'
      }}>
        <Footer data={location?.pathname === '/public-terms' ? footerTerms : footer} onLink={onLink} />
      </div>
    </>
  )
}

export default FooterApp
