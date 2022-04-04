import cn from 'classnames';

import PropTypes from 'prop-types';
import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    registerUserRequest, getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest,
    updatePhoneVerificationRequest
} from '../../actions/UserManagement'
import { setAuthStatus, setUserName } from '../../actions/Header';
import DobValidationForm from '../../components/DobValidationForm/DobValidationForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './DOBValidationPage.module.scss';
import { Auth } from "aws-amplify";
import { email } from '../../utilities/validations';

class DOBValidationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            clickButtonText: "Date of Birth",
            startDate: ""
        };
    }

    componentDidMount() {

    }

    handleChange = (event) => {

        this.setState({
            dataOfBirth: event.target.value
        })

    }

    handleSubmit = async (value) => {

        const { userInfo, history } = this.props;
        const userDate = moment(userInfo.DateOfBirth).format('L');
        const startDate = value.dateOfBirth;

        let dobValid = userDate === startDate ? true : false;
        let isEmailValid = userInfo.Email === value.email ? true : false;

        if (dobValid === true && isEmailValid === true) {
            try {
                await Auth.forgotPassword(value.email);
                history.push(`/resetPasswordPage`);
            } catch (error) {
                notify.show(`error confirming Reset Password: ${error.message}`, 'error',3000);
            }
        }
        else {
            notify.show(
                dobValid === false ? (`Entered Date Of Birth is not correct. Please verify.`) :
                    (`Entered Email is not found in our Records. Please verify.`),
                'error',
                5000
            );
        }
    }

    render() {
        const {
            isLoading, clickButtonText, startDate
        } = this.state;

        return (
            <div className={styles.container}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>DOBVerifyPAge</title>
                </Helmet>
                {isLoading
                    ? <Spinner />
                    : (<div>
                        <div className={styles.heroImageOverlay}>
                            <div className={styles.heading}>
                                <div className={styles.heroText}>
                                    <p>To Verify you, Please enter your Data of Birth and Email </p>
                                </div>
                                <DobValidationForm
                                    onSubmit={this.handleSubmit}
                                />
                            </div>
                        </div>
                    </div>)}
            </div>
        );
    }
}

DOBValidationPage.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
    }).isRequired,
    userInfo: PropTypes.shape({}),
};

DOBValidationPage.defaultProps = {};

const mapStateToProps = state => ({
    userInfo: state.userManagement.userInfo,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DOBValidationPage);

