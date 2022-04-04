import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';
import styles from '../InputText/InputText.module.scss';

export const InputMasked = ({ className, ...rest }) => (
  <MaskedInput
    className={cn(styles.text, className)}
    guide={false}
    keepCharPositions
    {...rest}
  />
);

InputMasked.propTypes = {
  className: PropTypes.string,
};

InputMasked.defaultProps = {
  className: '',
};
