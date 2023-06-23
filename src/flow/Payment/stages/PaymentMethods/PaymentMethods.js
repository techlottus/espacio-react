
import React, { useContext, useEffect, useState } from 'react'
import { paymentCardMethods,backBtn,stagesSteps, stepsCardResume} from '../../../../constants/Payment.constant';
import { CardPayment } from '../../../../components/Card/CardPayment';
import './PaymentMethods.scss'
import { Button } from '../../../../components/Button/Button';
import { PaymentContext } from '../../PaymentContext';
import { useDispatch, useSelector } from 'react-redux';
import { setMethod } from '../../../../actions/paymentAction';
import { typesRequestErrors } from '../../../../constants/error.constant';
import { notiObs } from '../../../../observables/notificationObs';
import { typesNoti } from '../../../../types/typeNoti';
import { sendInfoTM } from '../../../../tagging/services/sendInfoTagManager';
import { radioBtnMethodPaymentTag, stageThreeBtnBackPaymentTag } from '../../../../tagging/flows/paymentTag';
import { postSearchAmount } from '../../../../middlewares/paymentMiddleware';
import { testPaymenTitle } from '../../../../constants/test/testPayment';
import { getValuesOfAuth } from '../../../../helpers/auth';
import { typesPaymentMethods } from '../../../../constants/Payment.constant';


const PaymentMethods = ({history}) => {

  const paymentStore = useSelector(state => state.payment);

  const { handleSteps,handleStateCardResume } = useContext(PaymentContext)

  const [listCards, setListCards] = useState([ 
    ...paymentCardMethods
  ])

  const dispatch = useDispatch();

  useEffect(() => {
    if(paymentStore.selectConcept != null) {
      handleSteps(stagesSteps.methods,!paymentStore.isInvoice);
      window.scrollTo(0,0)
    }
    else {
      history.replace('/payment/concept')
    }

    if(paymentStore?.selectMethod) {
      setListCards((list) => {
        return list.map((card) => {
          return {
            ...card,
            checked: paymentStore.selectMethod === card.id
          }
        })
      })
    }

    dispatch(postSearchAmount(paymentStore?.selectConcept?.id))

    return () => {
      //dispatch(setMethod(null));
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheck = (id) => {
    const list = listCards.map((card) => {
      return {
        ...card,
        checked: id === card.id,
      }
    })
    setListCards(list);
    const card = list.filter((card) => card.checked)[0];
    dispatch(setMethod(card.id))
  }

  const back = () => {
    sendInfoTM(window,stageThreeBtnBackPaymentTag)
    dispatch(setMethod(null))
    if(paymentStore.isInvoice) {
      handleStateCardResume(stepsCardResume.fourth)
      history.push('/payment/tax-data');
    }
    else {
      handleStateCardResume(stepsCardResume.second)
      history.push('/payment/concept');
    }
  }

  useEffect(() => {
    if ( paymentStore.errors && paymentStore.errors[typesRequestErrors.bankDepositError]?.isError) {
      notiObs.next({
        type: typesNoti.error,
        text: paymentStore.errors[typesRequestErrors.bankDepositError].msg,
      })
    }
    
  }, [paymentStore.errors]);

  return (
    <>
      <div className="methods">
        <div className="methodscards">
          {
            listCards.map((card,index) => {
              console.log(card, "cards")
              return !getValuesOfAuth().isShowPaymentOnline && card?.id == typesPaymentMethods.online ? null : (
                <div className="methodscard" key={index+'devmethods'}>
                  <CardPayment
                    key={index+'methods'}
                    data={{
                      ...card,
                      test: testPaymenTitle.cardPayment+index
                    }}
                    onCheck={() => {
                      sendInfoTM(window,radioBtnMethodPaymentTag,card.id)
                      handleCheck(card.id)
                    }}
                  />
                </div>
              )
            })
          }
        </div>
        <div className="methodsaction">
          <Button
            data={
              {
                ...backBtn,
                isExpand: window.innerWidth < 991,
                test: testPaymenTitle.btnBackPayment
              }
            }
            onClick={back}
          />
        </div>
      </div>
    </>
  )
}

export default PaymentMethods
