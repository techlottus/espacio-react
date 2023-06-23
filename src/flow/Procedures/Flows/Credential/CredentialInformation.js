import React, { useState } from "react";
import { CardProfile } from "../../../../components/Card/CardProfile";
import { Select } from "../../../../components/Select/Select";
import { Input } from "../../../../components/Input/Input";
import "./CredentialInformation.scss";
import { Button } from "../../../../components/Button/Button";
import { useSelector } from "react-redux";
import { cardProfile } from "../../../../constants/AccountStatus.constant";
import { getImageOfAssets } from "../../../../helpers/getImages";

//SE NECESITA CAMBIAR LOS SELECT
const CredentialInformation = () => {

  
  const { texts } = useSelector((state) => state.texts);
  const [profile] = useState({ 
    ...cardProfile, 
    image: getImageOfAssets(texts?.accountStatus?.images?.user)
  });

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  return (
    <>
      {profileProcedure ? (
        <div className="credentialprofile">
          <CardProfile data={profile} />
        </div>
      ) : (
        ""
      )}
      <div className="credentialnumber">
        <p className="credentialtitle">{texts.procedures.phoneText}</p>
        <div className="credentialinput">
          <Input
          />
        </div>
      </div>
      <div className="credentialform">
        <div className="credentialitemselect">
          <Select
          />
        </div>
        <div className="credentialitem">
          <Select
          />
        </div>
      </div>
      <div className="credentialinfbtns">
        <div className="credentialinfbtn">
          <Button
          />
        </div>
        <div className="credentialinfbtn">
          <Button
          />
        </div>
      </div>
    </>
  );
};

export default CredentialInformation;
