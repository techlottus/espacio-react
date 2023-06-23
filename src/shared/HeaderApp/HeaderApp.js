import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Menu } from "../../components/Menu/Menu";
import { useHistory } from "react-router-dom";
import {
  dataNavBar,
  dataMenu,
  dataNavBarNoAuth,
} from "../../constants/Dashboard.constant";
import "./HeaderApp.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../../actions/loginAction";
import { setAuth } from "../../actions/headersAction";
import env from "../../enviroment/environment";
import { getValuesOfAuth, useProvideAuth } from "../../helpers/auth";
import { moodleRedirect } from "../../helpers/moodle";
import { setLoading } from "../../actions/loadingAction";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import {
  headerLogoHeaderTag,
  headerMenuAccountHeaderTag,
  headerMenuBiblioHeaderTag,
  headerMenuClassRoomHeaderTag,
  headerMenuOpenHeaderTag,
  headerPaymentHeaderTag,
} from "../../tagging/flows/headerTag";
import { getImageOfAssetsMark } from "../../helpers/getImages";
import { typesModalityBanner } from "../../types/typesProcedures";

const HeaderApp = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();
  let { user: auth } = useProvideAuth();
  const [navbar] = useState({
    ...dataNavBar,
    urlLogo: getImageOfAssetsMark(texts?.dashboard?.logos),
  });

  const [navNoAuth] = useState({
    ...dataNavBarNoAuth,
    urlLogo: getImageOfAssetsMark(texts?.dashboard?.logos),
  });

  const [menu, setMenu] = useState({
    ...dataMenu,
    items: [],
    disabledBtnClose: window.innerWidth < 991,
  });

  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setMenu((state) => {
      return {
        ...state,
        items: [
          {
            emoji: texts?.dashboard?.menu?.aula?.emoji,
            text: texts?.dashboard?.menu?.aula?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions.aula.access,
          },
          {
            emoji: texts?.dashboard?.menu?.book?.emoji,
            text: texts?.dashboard?.menu?.book?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.biblioteca?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.helpCenter?.emoji,
            text: texts?.dashboard?.menu?.helpCenter?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.ayuda?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.procedures?.emoji,
            text: texts?.dashboard?.menu?.procedures?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.serviciosEscolares?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.accountStatus?.emoji,
            text: texts?.dashboard?.menu?.accountStatus?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.estadoCuenta?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.payment?.emoji,
            text: texts?.dashboard?.menu?.payment?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.pagos?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.invoice?.emoji,
            text: texts?.dashboard?.menu?.invoice?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.facturas?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.benefits?.emoji,
            text: texts?.dashboard?.menu?.benefits?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.beneficios?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.sede?.emoji,
            text: texts?.dashboard?.menu?.sede?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.sede?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.psychopedagogical?.emoji,
            text: texts?.dashboard?.menu?.psychopedagogical?.text,
            isShow:
              getValuesOfAuth()?.permissions &&
              getValuesOfAuth()?.permissions?.cap?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.evaluateServices?.emoji,
            text: texts?.dashboard?.menu?.evaluateServices?.text,
            isShow: true,
          },
          {
            emoji: texts?.dashboard?.menu?.registrationSubjects?.emoji,
            text: texts?.dashboard?.menu?.registrationSubjects?.text,
            isShow:
              getValuesOfAuth().permissions &&
              getValuesOfAuth().permissions?.manhattan?.access,
          },
          {
            emoji: texts?.dashboard?.menu?.logout?.emoji,
            text: texts?.dashboard?.menu?.logout?.text,
            isShow: true,
          },
        ].filter((e) => e?.isShow),
      };
    });
  }, [texts?.dashboard]);

  const onRight = (e) => {
    switch (e.detail) {
      case "apps":
        setIsModal((prevIsModal) => !prevIsModal);
        break;
      case "notifications":
        break;
      default:
        break;
    }
  };

  const onLogo = () => {
    if (auth) {
      history.push("/");
    } else {
      window.location.href = env.redirectLoginHome + "/login";
    }
  };

  const onCard = (e) => {
    switch (e.detail) {
      case "credit-card":
        history.push("/payment");
        sendInfoTM(window, headerPaymentHeaderTag, "pagos");
        break;
      case "chart-with-upwards-trend":
        history.push("/account-status");
        sendInfoTM(window, headerMenuAccountHeaderTag, "cuenta");
        break;
      case "file-folder":
        history.push("/procedures-main");
        break;
      case "thought-balloon":
        history.push("/help-center/dashboard");
        break;
      case "star":
        history.push("/benefits/general");
        break;
      case "page-facing-up":
        window.location.href = env.invoiceLink;
        break;
      case "notebook":
        const modality = getValuesOfAuth().typeModality;
        if (typesModalityBanner.toDistance === modality) {
          window.open(env.sedeOnline, "_blank");
        } else {
          window.open(env.sedeEscolarizado, "_blank");
        }
        break;
      case "blue-heart":
        window.open(env.psyschologicalHelp, "_blank");
        break;
      case "ec ec-white-check-mark":
        history.push("/evaluate-services");
        break;
      case "ec ec-closed-book":
        history.push("/registration-subjects");
        break;
      case "back":
        dispatch(setTokens(null, null));
        dispatch(setAuth(null));
        sessionStorage.removeItem(env.campusvirtual_token);
        window.location.href = env.logout;
        break;
      case "mortar-board":
        dispatch(setLoading(true));
        moodleRedirect()
          .then((res) => {
            dispatch(setLoading(false));
            window.open(res); // cambiar windows.location.href
            sendInfoTM(window, headerMenuClassRoomHeaderTag, "aula");
          })
          .catch((error) => {
            dispatch(setLoading(false));
            window.open(env.redirectClassroom, "_blank");
            sendInfoTM(window, headerMenuClassRoomHeaderTag, "aula");
          });
        break;
      case "books":
        let values = getValuesOfAuth();
        window.open(
          env.redirectLibrary +
            "?userId=" +
            values?.mask +
            "&email=" +
            values?.email,
          "_blank"
        );
        sendInfoTM(window, headerMenuBiblioHeaderTag, "biblio");
        break;
      default:
        break;
    }
    setIsModal((state) => !state);
  };

  return (
    <>
      <div className="navbar">
        <Navbar
          data={auth ? navbar : navNoAuth}
          onRight={(e) => {
            onRight(e);
            sendInfoTM(window, headerMenuOpenHeaderTag, "open");
          }}
          onLogo={() => {
            onLogo();
            sendInfoTM(window, headerLogoHeaderTag);
          }}
        />
        {isModal ? (
          <div className="menu">
            <Menu
              data={menu}
              onClose={() => {
                setIsModal(!isModal);
                sendInfoTM(window, headerMenuOpenHeaderTag, "close");
              }}
              outside={() => {
                setIsModal(false);
                sendInfoTM(window, headerMenuOpenHeaderTag, "close");
              }}
              onCard={onCard}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default HeaderApp;
