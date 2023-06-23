import React from 'react'
import { Route, Switch } from 'react-router'
import PaymentConfirmation from '../flow/Payment/components/PaymentConfirmation'
import ScreenPayment from '../flow/Screens/ScreenPayment/ScreenPayment'
import ScreenEmptyProcedures from '../flow/Screens/ScreenProcedures/ScreenEmptyProcedures'

const ScreenRoutes = () => {
    return (
        <>
      <Switch>
        <Route exact path="/screen/payment-screen" component={ScreenPayment}/>
        <Route exact path="/screen/procedures-screen" component={ScreenEmptyProcedures}/>
        <Route exact path="/screen/payment-confirm" component={PaymentConfirmation}/>
      </Switch>
    </>
    )
}

export default ScreenRoutes
