/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SaveBankCard.module.scss';
import edit from '../../assets/img/edit-white.png';
import deleteImg from '../../assets/img/delete-white.svg';
import cn from 'classnames';

export const SaveBankCard = ({
  handleEditSuccess,
  handleDeleteSuccess,
  information,
}) => {

  let color = '';
  switch (information.color) {
    case 'citiBank':
      color = styles.citiBank
      break;
    case 'axisBank':
      color = styles.axisBank
      break;

  };


  return (
    <div className={cn(styles.container, color)}>
      {information.goalId === 0 ? null : (
        <div className={styles.assignDependents}>
          <div className={styles.imgIcons}>
            <input
              alt="edit"
              className={styles.actionLogo}
              onClick={value => handleEditSuccess(value, information)}
              onKeyPress={() => handleEditSuccess()}
              src={edit}
              type="image"
            />
            <input
              alt="delete"
              className={styles.actionLogo}
              onClick={() => handleDeleteSuccess(information)}
              onKeyPress={() => handleDeleteSuccess(information)}
              src={deleteImg}
              type="image"
            />

          </div>
        </div>
      )}
      <div className={styles.productName}>{information.accountNumber}
        <div className={styles.productTagLine}>
          {information.bankName}
        </div>
      </div>

      <div className={styles.productTagLine}>
        {information.ifsc}
      </div>
      <div className={styles.productTagLine}>
        {information.city}
      </div>

    </div>
  );
};

SaveBankCard.propTypes = {
  handleDeleteSuccess: PropTypes.func.isRequired,
  handleEditSuccess: PropTypes.func.isRequired,
  information: PropTypes.shape({
    bankId: PropTypes.number.isRequired,
    bankName: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    bankAddress: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    ifsc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isDefaultAccount:PropTypes.bool.isRequired,
  }).isRequired,
};
