export const originFromLogin = (history) => {
  try {
    return (history && 
    history.location && 
    history.location.state && 
    history.location.state.from && history.location.state.from === 'login' &&
    history.action && history.action === 'REPLACE') ? true:false;
  } catch(e) {
    return false;

  }
  
  
}