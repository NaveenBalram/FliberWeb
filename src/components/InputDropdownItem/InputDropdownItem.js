import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import * as styles from './InputDropdownItem.module.scss';

const InputDropdownItem = props => {
  const { data } = props;
  const { icon } = data;
  return (
    <div className={styles.wrapper}>
      {icon && <img alt="dropdownItem" className={styles.icon} src={icon} />}
      <components.Option {...props} />
    </div>
  );
};

InputDropdownItem.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.string,
  }).isRequired,
  props: PropTypes.shape({}),
};

InputDropdownItem.defaultProps = {
  props: {},
};

export default InputDropdownItem;
