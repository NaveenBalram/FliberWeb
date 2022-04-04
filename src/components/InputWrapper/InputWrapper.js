import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InputWrapper.module.scss';

export default class InputWrapper extends PureComponent {
  render() {
    const {
      children,
      row,
      input,
      label,
      customChildrenWrapper,
      meta: { touched, error },
      customContainer,
      isDisabled,
      ...rest
    } = this.props;

    const labelAndInputContainerStyle =
      touched && error
        ? styles.labelAndInputContainerError
        : styles.labelAndInputContainer;
    return (
      <div className={cn(styles.container, customContainer)}>
        <div
          className={cn(labelAndInputContainerStyle, { [styles.row]: row })}
          disabled={isDisabled}
        >
          <div className={cn(styles.label, isDisabled && styles.disabledLabel)}>
            {label}
          </div>
          <div
            className={cn(styles.childrenWrapper, customChildrenWrapper)}
            disabled={isDisabled}
          >
            {children({ ...input, ...rest })}
          </div>
        </div>
        <div className={styles.errorContainer}>
          <div className={styles.error}>{error && touched ? error : ' '}</div>
        </div>
      </div>
    );
  }
}

InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  customChildrenWrapper: PropTypes.string,
  customContainer: PropTypes.string,
  input: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  row: PropTypes.bool,
};

InputWrapper.defaultProps = {
  customChildrenWrapper: '',
  customContainer: '',
  input: {},
  isDisabled: false,
  label: null,
  meta: { error: null, touched: false },
  row: false,
};
