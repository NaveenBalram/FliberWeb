import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InputText.module.scss';

export const InputText = ({ className, secondary, ...rest }) => (
  <input
    className={cn(styles.text, { [styles.secondary]: secondary }, className)}
    {...rest}
  />
);

InputText.propTypes = {
  className: PropTypes.string,
  secondary: PropTypes.bool,
};

InputText.defaultProps = {
  className: '',
  secondary: false,
};

export default InputText;