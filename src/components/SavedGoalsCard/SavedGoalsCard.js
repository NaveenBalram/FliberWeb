/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavedGoalsCard.module.scss';
import edit from '../../assets/img/edit.svg';
import deleteImg from '../../assets/img/delete.png';

export const SavedGoalsCard = ({
  handleEditSuccess,
  handleDeleteSuccess,
  information,
  saveDependentForm,
  type,
  goalCategories,
}) => {
  
 let goalCategoryName = goalCategories.filter(x=>x.Id==information.GoalCategoryId);
 console.log(goalCategoryName);
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
              <div className={styles.productTagLine}>
                 Priority : {information.GoalPriority}
             </div>
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
      <div className={styles.productName}>{goalCategoryName[0].Description}</div>
      { goalCategoryName[0].Description==='Others'?(
        <div className={styles.productTagLine}>
         Goal Name : {information.GoalName}
      </div>
      ):null}
      <div className={styles.productTagLine}>
        Goal Amount : {information.GoalAmount}
      </div>
      
    </div>
  );
};

SavedGoalsCard.propTypes = {
  handleDeleteSuccess: PropTypes.func.isRequired,
  handleEditSuccess: PropTypes.func.isRequired,
  information: PropTypes.shape({
    Id:PropTypes.number.isRequired,
    GoalCategoryId:PropTypes.string.isRequired,
    GoalName:PropTypes.string.isRequired,
    GoalBucketId:PropTypes.string.isRequired,
    GoalAmount:PropTypes.number.isRequired,
    GoalPriority:PropTypes.number.isRequired,
    GoalBucketId:PropTypes.number.isRequired,
    GoalCategory:PropTypes.number.isRequired,
    GoalFrequencyId:PropTypes.number.isRequired,
    EndOfLife:PropTypes.bool,
    type:PropTypes.string.isRequired,
    GoalInflationRate:PropTypes.number.isRequired,
    GoalEndAge:PropTypes.number.isRequired,
    GoalTypeId:PropTypes.string.isRequired
  }).isRequired,
  saveDependentForm: PropTypes.array,
  type: PropTypes.oneOf(['Dependents', 'Beneficiary']).isRequired,
  goalCategories:PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
