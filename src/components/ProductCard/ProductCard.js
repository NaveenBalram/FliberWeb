/* eslint-disable global-require */
import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./ProductCard.module.scss";
import { convertHTMLStringToString } from "../../utilities/helpers";
import email_icon from "../../assets/img/goal.png";
import score from "../../assets/img/score.png";
import commission from "../../assets/img/commision.png";
import track from "../../assets/img/track.png";

export const ProductCard = ({
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
    <div className={isExpanded ? styles.expandedContainer : styles.container}>
      <div className={styles.productInformationContainer}>
        <img
          alt={product.name}
          className={styles.productLogo}
          title={product.name}
          src={product.id===1?score:(product.id===2?email_icon:(product.id===3?commission:(product.id===4?track:null)))}
        />

        <div className={styles.productName}>{product.name}</div>
        
        {!isExpanded?(<div className={styles.productDetails1}>{product.longDescription}
        
        
        </div>):(<div></div>)}

     
        <div
          className={cn(
            styles.knowMore,
            isExpanded ? styles.gone : styles.visible
          )}
          onClick={toggleDisplay}
          onKeyPress={toggleDisplay}
          role="button"
          tabIndex={0}
        >
         
          Expand Description
        </div>
        <div
          className={cn(
            styles.productDetails,
            isExpanded ? styles.visible : styles.gone
          )}
        >
          {product.longDescription}
        </div>
        <div
          className={cn(
            styles.knowMore,
            isExpanded ? styles.visible : styles.gone
          )}
          onClick={toggleDisplay}
          onKeyPress={toggleDisplay}
          role="button"
          tabIndex={0}
        >
          Hide Description
        </div>
      </div>
      <div
        className={styles.button}
         onClick={() => handleSelect(product.moduleType)}
        // onKeyPress={() => handleSelect(product.id)}
        role="button"
        
      >
       
          Learn More and get Pricing
        </div>
    </div>
  );
};

ProductCard.propTypes = {
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
  }).isRequired,
};
