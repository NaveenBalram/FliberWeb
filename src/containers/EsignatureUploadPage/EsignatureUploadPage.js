import React, { Component } from "react";
import styles from "./EsignatureUploadPage.module.scss";
import PropTypes from "prop-types";
import { change } from "redux-form";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import Professional from "../../assets/img/esign.png";
import moment from 'moment';
import ESignatureForm from "../../components/ESignatureForm/ESignatureForm";
import Stepper from 'react-stepper-horizontal';




class EsignatureUploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialLoading: false,
            isLoading: false,
            file: [],
            imgSrc: [],
            fileName: ''
        };

    }

    componentDidMount() {
    }

    handleSubmit = async (value) => {

    }

    handleSubmitSuccess = () => {
    }

    handleExit = async () => {

    }

    handleSelection = (value) => {

        const { history } = this.props;

        switch (value) {
            case 'pan':
                history.push('/KYCInformationPage');
                break;
            case 'personal':
                history.push('/AccountCreationPage');
                break;
            case 'professional':
                history.push('/ProfessionalDetailPage');
                break;
            case 'nominee':
                history.push('/NomineesDetailPage');
                break;
            case 'bank':
                history.push('/BankDetailPage');
                break;
            case 'esign':
                history.push('/EsignatureUploadPage');
                break;
            case 'address':
                history.push('/AddressDetailsPage');
                break;
        }
    }

    handleOnChange = (value) => {
        //console.log(value);
        var file = value.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imgSrc: reader.result,
                fileName: file.name
            });
        }


        console.log(this.state.fileName);

        var url = reader.readAsDataURL(file);

    }


    render() {
        const isInitialLoading = true;
        const { isLoading, imgSrc } = this.state;

        return (
            <div className={styles.productListContainer}>
                {isInitialLoading === false ? (
                    <div className={cn(styles.Spinner, styles.LabelInfo)}>
                        <p className={styles.heroSubTextMedium}>
                            Just a moment, We're getting things ready for you
                        </p>
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={styles.productListContainer}
                        id="Skip-content"
                    >
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>ESignature Upload</title>
                        </Helmet>

                        <div className={styles.heading} name="maindiv">
                            <Stepper
                                steps={[
                                    {
                                        title: 'Pan Verification',
                                        onClick: () => { this.handleSelection('pan') }
                                    },
                                    {
                                        title: 'Personal Information',
                                        onClick: () => { this.handleSelection('personal') }
                                    },
                                    {
                                        title: 'Professional Information',
                                        onClick: () => { this.handleSelection('professional') }
                                    },
                                    {
                                        title: 'Address Information',
                                        onClick: () => { this.handleSelection('address') }
                                    },
                                    {
                                        title: 'Nominees Information',
                                        onClick: () => { this.handleSelection('nominee') }
                                    },
                                    {
                                        title: 'Bank Information',
                                        onClick: () => { this.handleSelection('bank') }
                                    },
                                    {
                                        title: 'Upload E-Signature',
                                        onClick: () => { this.handleSelection('esign') }
                                    },
                                ]}
                                activeStep={6}
                                activeColor={'#527318'}
                                completeColor={'#87bd28'} />
                            <h1>
                                Upload Signature details
                            </h1>
                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={Professional}
                                />
                            </div>
                            <p className={styles.heading}>These details are required for getting your investment started with the mutual funds companies. Please upload Signature</p>
                            <div className={styles.heading}>
                                <div className={styles.linkFlex}>
                                    <label
                                        className={styles.downloadLink}
                                        htmlFor="upload-photo"
                                    >
                                        Browse File
                                    </label>
                                </div>
                                <input className={styles.upload} type='file' onChange={(value) => this.handleOnChange(value)} id="upload-photo" />
                                {imgSrc.length > 0 ? <img className={styles.productLogoImage} src={imgSrc} /> : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
EsignatureUploadPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    change: PropTypes.func.isRequired,
};

EsignatureUploadPage.defaultProps = {
    change: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
});

const mapDispatchToProps = {
    change
};

export default connect(mapStateToProps, mapDispatchToProps)(EsignatureUploadPage);
