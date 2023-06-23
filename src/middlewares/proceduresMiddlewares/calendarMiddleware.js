import { getCalendarHttp } from "../../services/procedures/calendarService";
import { setDataCalendar } from "../../actions/proceduresActions/calendarAction";
import { setLoading } from "../../actions/loadingAction";
  
  export const getCalendarService = () => {
    return (dispatch) => {
      dispatch(setLoading(true));
      getCalendarHttp()
        .then((res) => {
          dispatch(setLoading(false));
          dispatch(setDataCalendar(res.optionDesk, res.optionMobile))
        })
        .catch(() => {
          dispatch(setLoading(false));
        });
    };
  };