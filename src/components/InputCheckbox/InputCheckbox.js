import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InputCheckbox.module.scss';
import checkmark from '../../assets/img/check-mark-fliber.svg';

class InputCheckbox extends Component {
  constructor(props) {
    super(props);
    const { isSelected } = this.props;

    this.state = {
      value: isSelected,
    };
  }

  componentDidUpdate(prevProps) {
    const { isSelected } = this.props;
    if (prevProps.isSelected !== isSelected) {
      this.updateState({
        value: isSelected,
      });
    }
  }

  updateState = state => this.setState(state);

  toggleSelectionStateStyle = () => {
    const { onValueChange, label, input, canUncheck } = this.props;
    const { value } = this.state;
    if (value && canUncheck) {
      this.setState(
        {
          value: !value,
        },
        () => {
          const { value } = this.state;
          onValueChange(value, label);
          if (input.onChange) {
            input.onChange(value);
          }
        }
      );
    } else if (!value) {
      this.setState(
        {
          value: !value,
        },
        () => {
          const { value } = this.state;
          onValueChange(value, label);
          if (input.onChange) {
            input.onChange(value);
          }
        }
      );
    }
  };

  render() {
    const {
      label,
      required,
      customContainerStyle,
      customLabelStyle,
      preImage,
      hasSubLabel,
      subLabel,
      meta: { touched, error },
    } = this.props;
    const { value } = this.state;

    const checkboxStyle = () => {
      if (touched && error) {
        return styles.errorCheckboxItem;
      }
      if (value) {
        return styles.selectedCheckboxItem;
      }
      return styles.checkboxItem;
    };

    return (
      <div
        aria-checked={value}
        className={styles.container}
        id={`checkbox${label}`}
        onClick={() => this.toggleSelectionStateStyle()}
        onKeyPress={this.toggleSelectionStateStyle}
        role="checkbox"
        tabIndex={0}
      >
        <div
          className={cn(
            checkboxStyle(),
            hasSubLabel ? styles.subLabelContainer : '',
            customContainerStyle
          )}
        >
          <div
            className={
              value
                ? styles.selectedCheckboxContainer
                : styles.unSelectedCheckboxContainer
            }
          >
            {preImage && (
              <img
                alt={label}
                className={
                  value ? styles.selectedCheckbox : styles.unSelectedCheckbox
                }
                src={preImage}
              />
            )}
            <img
              alt={label}
              className={
                value ? styles.selectedCheckbox : styles.unSelectedCheckbox
              }
              src={checkmark}
            />
          </div>
          {!hasSubLabel ? (
            <div className={cn(styles.checkboxLabel, customLabelStyle)}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </div>
          ) : (
            <div className={cn(styles.checkboxLabel2, customLabelStyle)}>
              {label}
              <div className={cn(styles.checkboxSubLabel, customLabelStyle)}>
                {subLabel}
              </div>
              {required && <span className={styles.required}>*</span>}
            </div>
          )}
        </div>
        <div className={styles.error}>{error && touched ? error : ' '}</div>
      </div>
    );
  }
}

InputCheckbox.propTypes = {
  canUncheck: PropTypes.bool,
  customContainerStyle: PropTypes.string,
  customLabelStyle: PropTypes.string,
  hasSubLabel: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  onValueChange: PropTypes.func,
  preImage: PropTypes.string,
  required: PropTypes.bool,
  subLabel: PropTypes.string,
};

InputCheckbox.defaultProps = {
  canUncheck: true,
  customContainerStyle: null,
  customLabelStyle: null,
  hasSubLabel: false,
  input: {},
  isSelected: false,
  meta: { error: null, touched: false },
  onValueChange: () => {},
  preImage: null,
  required: false,
  subLabel: null,
};

export default InputCheckbox;
