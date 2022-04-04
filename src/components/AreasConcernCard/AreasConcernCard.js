import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { reduxForm } from "redux-form";
import styles from "./AddressConfirm.module.scss";
import Button from "../Button/Button";

const AddressConfirm = ({
  customerInfo,
  verifiedAddress,
  handleSubmit,
  submitting,
  loading,
  highContrast,
}) => {
  const textStyle = highContrast ? styles.darkContainer : null;
  const [userAddress, setUserAddress] = useState(false);
  const [apiAddress, setApiAddress] = useState(false);

  const toggleUserAddress = () => {
    setUserAddress(true);
    setApiAddress(false);
  };

  const toggleApiAddress = () => {
    setApiAddress(true);
    setUserAddress(false);
  };

   
 
  

  return (
    <div>
      <div className={cn(styles.container, textStyle)}>
        <div
          className={styles.featureCard}
          role="checkbox"
          tabIndex={0}
          key="AF_P"
          aria-checked={false}
          onClick={toggleUserAddress}
        >
          <div className={cn(styles.roundBlock, styles.cardActive)}>
              <img
                src={require("../../assets/img/featureCheckMark.svg")}
                alt="checkmark-icon"
              />
          </div>
          <h4>Your Entered Address</h4>
        </div>
        
      </div>
      <div className={cn(styles.nextButton,textStyle)}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          onClick={
            apiAddress == true
              ? () => handleSubmit(verifiedAddress)
              : () => handleSubmit(null)
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

AddressConfirm.propTypes = {
  customerInfo: PropTypes.shape({
    EmailOptIn: PropTypes.bool,
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    CityName: PropTypes.string,
    Code: PropTypes.string,
    StateAbbr: PropTypes.string,
  }).isRequired,
  verifiedAddress: PropTypes.shape({
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    City: PropTypes.string,
    State: PropTypes.string,
    Zip: PropTypes.number,
  }).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default AddressConfirm;
