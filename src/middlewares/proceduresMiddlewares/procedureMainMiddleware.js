import { setProfileProcedures } from "../../actions/proceduresActions/proceduresAction";
import { formatProfile } from "../../helpers/formatProfile";
import { getAccountHttp } from "../../services/accountStatus/accountStatusService"

export const getProfileProceduresService = () => {
  return (dispatch) => {
    getAccountHttp()
    .then((res) => {
      dispatch(setProfileProcedures(formatProfile(res)));
    })
    .catch((e) => console.log(e));
  }
}