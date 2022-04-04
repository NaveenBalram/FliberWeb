/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SaveNomineeCard.module.scss';
import edit from '../../assets/img/edit-white.png';
import deleteImg from '../../assets/img/delete-white.svg';
import moment from 'moment';

export const SaveNomineeCard = ({
  handleEditSuccess,
  handleDeleteSuccess,
  information,
  nomineeReleation
}) => {


var relationName =nomineeReleation.filter(x=>x.Id==information.NomineeRelationship).map(function(a) {return a.Description});
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
      <div className={styles.productName}>{information.NomineeName}
        <div className={styles.productTagLine}>
          {relationName}
        </div>
      </div>

      <div className={styles.productTagLine}>
        {moment(information.NomineeDOB).format('DD-MM-yyyy')}
      </div>
      <div className={styles.productTagLine}>
         {information.NomineeApplicablePercent} {`% Share`}
      </div>

    </div>
  );
};

SaveNomineeCard.propTypes = {
  handleDeleteSuccess: PropTypes.func.isRequired,
  handleEditSuccess: PropTypes.func.isRequired,
  information: PropTypes.shape({
    NomineeNumber: PropTypes.number.isRequired,
    NomineeName: PropTypes.string.isRequired,
    NomineeDOB: PropTypes.string.isRequired,
    NomineeRelationship: PropTypes.string.isRequired,
    NomineeApplicablePercent: PropTypes.string.isRequired,
    nomineeReleationValue:PropTypes.number.isRequired,
    Id:PropTypes.string.isRequired
  }).isRequired,
  nomineeReleation:PropTypes.arrayOf(PropTypes.shape({
    Description:PropTypes.string.isRequired
  })).isRequired
};
