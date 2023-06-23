import React, { useEffect, useState } from "react";

import CardHeader from "../../components/Card/CardHeader";
import ContentSection from './ContentSection/ContentSection'
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import FooterApp from "../../shared/FooterApp/FooterApp";
import { useDispatch, useSelector } from "react-redux";
import { DashboardContext } from "./DashboardContext";
import { getDataService } from "../../middlewares/dashboardMiddleware";
import { typesRequestErrors } from "../../constants/error.constant"; 
import './Dashboard.scss'
import ScreenError from "../../shared/ScreenError/ScreenError";
import { useHistory } from "react-router-dom";
import { setErrorDashboard } from "../../actions/dashboardAction";


const Dashboard = () => {
  
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect( () => {
    window.scrollTo(0,0)
    dispatch(getDataService(history)) 
    
    return () => {
    dispatch(setErrorDashboard(typesRequestErrors.getDashboard, false, null))
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const dashboardStore = useSelector(state => state.dashboard) 

  // const [isError,setIsError] = useState(false);

  // useEffect(() => {
  //   setIsError(dashboardStore.errors[typesRequestErrors.getDashboard].isError)
  // },[dashboardStore.errors])

  const renderSuccess = () => {
    return (
      <div className="dashboardsuccess">
        <CardHeader info={dashboardStore} />
        <ContentSection/>
      </div>
    )
  }

  // const renderError = (msg) => {
  //   return (
  //     <div style={{paddingTop:"40px"}}>
  //       <ScreenError 
  //       msg={msg}
  //       />
  //     </div>
  //   )
  // }

  return (
    <>
      <DashboardContext.Provider value={dashboardStore}>
        <HeaderApp />
        <div className="dashboard-container">
          { 
            // isError ?
            // renderError(dashboardStore.errors[typesRequestErrors.getDashboard].msg): 
            renderSuccess()
          }
        </div>
        <FooterApp />
      </DashboardContext.Provider> 
      
    </>
  );
 };

export default Dashboard;
