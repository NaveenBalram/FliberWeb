/* eslint-disable global-require */
import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./CardMenu.module.scss";
import { Link } from "react-router-dom";

export const CardMenu = ({
  product,
  handleSelect,
  customerNumber,
  AuthorizeNumber,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDisplay = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className={styles.container}>
      <div className={styles.productInformationContainer}>
        <div className={styles.productName}>{product.name}
        <hr/>
        <p className={styles.producttaglines}>
        {product.longDescription}
        </p>
        </div>
         
        <div className={styles.buttonContainer}>
     
               <p
                className={styles.downloadLink}
                //onClick={() => this.setState({ viewLegal: !viewLegal })}
                onClick={() => handleSelect(product.moduleType)}
                >
                  {product.buttonText}
              </p>
              </div>
      </div>
      
    </div>
  );
};

CardMenu.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  product: PropTypes.shape({
    //icon: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    longDescription: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prodCategoryId: PropTypes.number.isRequired,
    productUrl: PropTypes.string.isRequired,
    productLogoLarge: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    tagline: PropTypes.string.isRequired,
    buttonText:PropTypes.string.isRequired,
  }).isRequired,
};
