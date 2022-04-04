/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SaveIncomeCard.module.scss';
import edit from '../../assets/img/edit.svg';
import deleteImg from '../../assets/img/delete.png';

export const SaveIncomeCard = ({
  handleEditSuccess,
  handleDeleteSuccess,
  information,
}) => {
  

  return (
    <div className={styles.container}>
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
      <div className={styles.productName}>{information.IncomeCategory__Name}</div>
      {information.GoalCategory__Name==='Others'?(
        <div className={styles.productTagLine}>
         Income  Name : {information.IncomeCategory__Name}
      </div>
      ):null}
      <div className={styles.productTagLine}>
        Income Amount : {information.IncomeAmount}
      </div>
      
    </div>
  );
};

SaveIncomeCard.propTypes = {
  handleDeleteSuccess: PropTypes.func.isRequired,
  handleEditSuccess: PropTypes.func.isRequired,
  information: PropTypes.shape({
    id:PropTypes.number.isRequired,
    IncomeCategory__Name:PropTypes.string.isRequired,
    IncomeType__Name:PropTypes.string.isRequired,
    IncomeFrequency__Name: PropTypes.string.isRequired,
    IncomeInflationRate:PropTypes.number.isRequired ,
    IncomeStartAge: PropTypes.number.isRequired ,
    IncomeEndAge: PropTypes.number.isRequired,
    IncomeAmount: PropTypes.number.isRequired,
    IncomeAmountType:PropTypes.bool.isRequired
  }).isRequired,
};
