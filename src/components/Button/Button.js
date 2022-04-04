import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import * as styles from './Button.module.scss';

const Button = ({ children, className, disabled, link, submitting, ...rest }) =>
  link ? (
    <Link
      className={cn(styles.button, { [styles.disabled]: disabled }, className)}
      disabled={disabled}
      tabIndex={0}
      to={link}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cn(
        styles.button,
        { [styles.disabled]: disabled || submitting },
        className
      )}
      disabled={disabled || submitting}
      tabIndex={0}
      type="button"
      {...rest}
    >
      {!submitting ? children : <Spinner />}
    </button>
  );

Button.propTypes = {
  children: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.string,
  submitting: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  link: '',
  submitting: false,
};

export default Button;
