import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Button from '../Button/Button';
import { InputText } from '../InputText/InputText';
import visible from '../../assets/img/visible.svg';
import hidden from '../../assets/img/hidden.svg';
import styles from './InputPassword.module.scss';

class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
    };
  }

  togglePasswordVisibility = () => {
    const { isPasswordVisible } = this.state;
    this.setState({ isPasswordVisible: !isPasswordVisible });
  };

  render() {
    const { isPasswordVisible } = this.state;
    return (
      <div className={styles.passwordContainer}>
        <ReactTooltip effect="solid" place="bottom" type="dark" />
        <InputText
          type={isPasswordVisible ? 'text' : 'password'}
          {...this.props}
        />
        <Button
          className={styles.passwordVisibilityIconContainer}
          onClick={this.togglePasswordVisibility}
          type="button"
        >
          {isPasswordVisible ? (
            <img
              alt="passwordVisibilityIcon"
              className={styles.passwordVisibilityIcon}
              data-tip="Hide Password"
              src={hidden}
            />
          ) : (
            <img
              alt="passwordVisibilityIcon"
              className={styles.passwordVisibilityIcon}
              data-tip="Show Password"
              src={visible}
            />
          )}
        </Button>
      </div>
    );
  }
}

InputPassword.propTypes = {
  containerclassname: PropTypes.string,
};

InputPassword.defaultProps = {
  containerclassname: '',
};

 export default props => <InputPassword {...props} />;
