import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { cardProfileForm } from "../../../../constants/FormPagesHelpCenter.constant";
import { getImageOfAssets } from "../../../../helpers/getImages";
import "./FormHelpCenter.scss";

const FormHelpCenter = ({ formData, html }) => {
  const { arrowBack, title } = formData;
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);
  const [desktop, setDesktop] = useState(window.innerWidth > 991);

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };
  const [profile, setProfile] = useState({
    ...cardProfileForm,
  });

  useEffect(() => {
    if(profileProcedure) {
      setProfile((state) => {
        return {
          ...state,
          image: getImageOfAssets(texts?.accountStatus?.images?.user),
          name: profileProcedure?.name,
          items: profileProcedure?.items,
        };
      });
    }
  },[profileProcedure])

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  },[]);

  const background = {
    backgroundImage: `url(${getImageOfAssets(
      texts?.helpCenter.images.helpCenterFlowBanner
    )})`,
    backgroundSize: "100%",
  };

  return (
    <>
      <div style={desktop ? background : null}>
        <div className="formhelpcentercontainer">
          <div className="arrowwrap">
            <div className="formarrow" onClick={() => {
              history.goBack();
            }}>
              <span className="material-icons">{arrowBack.icon}</span>
              <p>{arrowBack.text}</p>
            </div>
          </div>
          <div className="formhelpcentertitle">
            <h2>{title}</h2>
          </div>
          <div className="formhelpcentercontent">
            <div className="spikewrapper">
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
            </div>
            <div className="formhelpcenterprofile">
              <CardProfile data={profile} />
            </div>
            <div className="formhelpcenterwrapper">{html()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormHelpCenter;
