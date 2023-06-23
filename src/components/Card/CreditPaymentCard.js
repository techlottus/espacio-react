import React, { useEffect } from 'react'

const CreditPaymentCard = React.memo(({data,onCheck,onActions}) => {
  const creditCardPayment = React.createRef();

  useEffect(() => {
    creditCardPayment.current.data = {
      id: data?.id || null,
      ownerName: data?.ownerName || '',
      actions: data?.actions || [],
      ownerCardNumber: data?.ownerCardNumber || null,
      checked: data?.checked,
      imgCard: data?.imgCard,
      test: data?.test,
    };
  },[data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    creditCardPayment.current.addEventListener('onCheck', onCheck)
    creditCardPayment.current.addEventListener('onActions', onActions)
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-credit-card ref={creditCardPayment}></lottus-credit-card>
    </>
  )
})

export default CreditPaymentCard