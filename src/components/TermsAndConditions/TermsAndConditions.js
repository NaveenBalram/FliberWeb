import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import styles from './TermsAndConditions.module.scss';
import InputCheckbox from '../InputCheckbox/InputCheckbox';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleDisplay = () => {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
    });
  };

  handleAcceptanceChange = value => {
    const { index, handleChange } = this.props;
    handleChange(index, value);
  };

  render() {
    const { array, type } = this.props;
    const { isExpanded } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.title}>{`${type} Acknowledgement on IPS Contract`}</div>
        <div className={isExpanded ? styles.expanded : styles.contracted}>
          <div className={styles.paragraph}>
            <p>Finzoom Investment Advisors Private Limited (hereinafter referred to as “Fliber” or “We” or “Us” or “Our”) is a company registered with the Securities and Exchange Board of India as an Investment Advisor under SEBI (Investment Advisers) Regulations, 2013 vide registration no. INA100012190 dated December 17, 2018 having its registered office at 616, Level 6, Suncity Success Tower, Sector-65, Golf Course Extension Road, Gurugram, Haryana, – 122005, India.</p>

            <p>Finzoom Investment Advisors Private Limited operate mobile applications and website https://www.Fliber.com under brand names Fliber, INDwealth. Fliber enables you (hereinafter referred to as, “You”, “you”, “your” or “User”) to track, save and earn extra by automatically bringing your entire financial life across investments, loans, credit cards & taxes, all in one app. Fliber shall through its Application provide investment and wealth management services to the Users (“Services”). Fliber is committed to operating its website and mobile applications with the highest ethical standards and appropriate internal controls.</p>

           <p> Finzoomers Services Private Limited (hereinafter referred to as “Finzoomers”) having its registered office at 624-625, 6th Floor Suncity Success Towers, Golf Course Extension Road, Sector 65, Gurugram, Haryana, have the authorised corporate agency license of IRDAI vide registration no. CA0744 dated March 03, 2021, for selling/facilitating Insurance policies to its users. The Insurance products that you will purchase using Application would be facilitated by Finzoomers Services Private limited i.e. wholly owned subsidiary of Finzoom Investment Advisors Private Limited which primarily would be facilitating insurance products through the Application. For the purposes of providing the insurance products, Fliber shall only be a platform and as a parent company has granted to 
            Finzoomers a world-wide, revocable, non-exclusive, non-transferable license to utilize the Application solely as per the terms of this Agreement.</p><br/>
            <p>THESE WEBSITE TERMS IS AN ELECTRONIC RECORD IN THE FORM OF AN ELECTRONIC CONTRACT FORMED UNDER INFORMATION TECHNOLOGY ACT, 2000 AND RULES MADE THEREUNDER AND THE AMENDED PROVISIONS PERTAINING TO ELECTRONIC DOCUMENTS / RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000. 
              THESE TERMS DOES NOT REQUIRE ANY PHYSICAL, ELECTRONIC OR DIGITAL SIGNATURE.</p>
          </div>
        </div>
        <div
          className={cn(
            styles.clickText,
            styles.marginBottomMedium,
            styles.marginTopMedium
          )}
          onClick={this.toggleDisplay}
          onKeyPress={this.toggleDisplay}
          role="button"
          tabIndex={0}
        >
          {isExpanded ? 'Click to Minimize' : 'Click to View All'}
        </div>
        <div className={styles.checkboxContainer}>
          <InputCheckbox
            label={`I accept these ${type} terms and conditions`}
            onValueChange={this.handleAcceptanceChange}
            required
          />
        </div>
      </div>
    );
  }
}

TermsAndConditions.propTypes = {
  array: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['Payment', 'Product', 'Privacy']).isRequired,
};
