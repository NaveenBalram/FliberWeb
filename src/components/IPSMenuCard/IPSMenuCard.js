/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './IPSMenuCard.module.scss';
import edit from '../../assets/img/edit-white.png';
import deleteImg from '../../assets/img/delete-white.svg';
import cn from 'classnames';
import { intersection } from 'lodash';

export const IPSMenuCard = ({
information
}) => {

  // let color = '';
  // switch (information.color) {
  //   case 'citiBank':
  //     color = styles.citiBank
  //     break;
  //   case 'axisBank':
  //     color = styles.axisBank
  //     break;

  // };


  return (
    <div className={styles.container}>
      <div className={styles.productName}>
            {information.text}
        {/* <div className={styles.productTagLine}>
          {information}
        </div> */}
      </div>
    </div>
  );
};

IPSMenuCard.propTypes = {
  information: PropTypes.shape({
    text:PropTypes.string.isRequired
  }).isRequired
};
