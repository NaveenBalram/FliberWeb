import React, { Component } from "react";
import styles from "./SignzyIntegrationPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
// import { Auth } from "aws-amplify";
import { ModuleType, Status } from "../../enums/enumHelper";
import { Link } from 'react-router-dom';
import {IPSMenuCard} from "../../components/IPSMenuCard/IPSMenuCard";
import {setBSEAccount} from "../../actions/UserManagement";



 const Information =[
    {
        "id": 1,
        "text" : "1. Scanned copy of PAN Number"
    },
    {    "id": 2,
        "text": "2. Scanned copy of Aaadhar Number."
    },
    {   "id": 3,
        "text" : "3. Scanned copy of Driving Liecense"
    },
    {    "id": 4,
        "text" : "4. Scanned copy of Cancelled bank Cheque."
    },
    {    "id": 5,
        "text" : "5. Scanned copy of Signature."
    },
   
];



class SignzyIntegrationPage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { history, isAuthenticated } = this.props;
       
    }
 
    handleSubmitSuccess = () => {
        const url = "https://m-investor-onboarding-preproduction.signzy.tech/icici_prudential2/5d7a9997c5bfb642f41dbdb9/1b6fae6d0c91306b0ce27aa66a5ff83c7bf2810ecb1cbab9d79738c9bb664fd81749e3dd7267d3/eMain?ns=icici_test2_fliber%22";
        window.open(url, "_blank")
    }

    scrollTop = () => {
        scroller.scrollTo("maindiv", {
            delay: 100,
            duration: 500,
            smooth: "easeInOutQuart",
        });
    };

    render() {
        const isInitialLoading = true;
        const { highContrast, } = this.props;
        const containerStyle = highContrast ? styles.darkContainer : null;

        return (
            <div className={cn(styles.productListContainer, containerStyle)}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>User Choice Page</title>
                </Helmet>
                {!isInitialLoading ? (
                    <div className={cn(styles.Spinner, styles.LabelInfo)}>
                        <p className={styles.heroSubTextMedium}>
                            Just a moment, We're getting things ready for you
                        </p>
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={cn(styles.productListContainer, containerStyle)}
                        id="Skip-content"
                    >
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Pre-Retiree</title>
                        </Helmet>
                        <div className={styles.heading} name="maindiv">
                            <h1>
                             Pan number is not KYC Complaint.
                            </h1>
                            <h2 className={styles.heroSubTextMedium}>
                             Please provide us few information to complete the process for KYC Validations 
                            </h2>
                        </div>

                        <div className={styles.productArray}>
                            <div name="productList" className={cn(styles.productIndividual)}>
                                {Information.map((info,index)=>(
                                    <IPSMenuCard
                                    information={info}
                                    />
                                ))}
                                
                            </div>
                        </div>
                        <div className={styles.heading} name="upgradeFliber">
                            <h1 className={styles.heroSubTextMedium}>
                               Please keep all mentioned documents in handy it is much required to process for KYC Complaint.
                            </h1>
                            <div className={styles.linkFlex}>
                                <p
                                    className={styles.downloadLink}
                                    onClick={() => this.handleSubmitSuccess()}
                                >
                                    <Link>Continue</Link>
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}
SignzyIntegrationPage.propTypes = {
    setBSEAccount:PropTypes.func.isRequired
}

SignzyIntegrationPage.defaultProps = {};
const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    setBSEAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(SignzyIntegrationPage);
