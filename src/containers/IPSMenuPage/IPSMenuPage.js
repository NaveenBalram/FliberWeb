import React, { Component } from "react";
import styles from "./IPSMenuPage.module.scss";
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
        "text" : "1. Basic Information and Spouse Details(if you opted as investors)"
    },
    {    "id": 2,
        "text": "2. Occupation and Income details."
    },
    {   "id": 3,
        "text" : "3. Address Information."
    },
    {    "id": 4,
        "text" : "4. IPS Genration process."
    },
    {    "id": 5,
        "text" : "5. KYC Complaints."
    },
    {   "id": 6,
        "text" : "6. Portfolio Generation."
    }
];



class IPSMenuPage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { history, isAuthenticated } = this.props;
       
    }
 
    handleSubscription = () =>{
        const {history,setBSEAccount} = this.props;
        setBSEAccount({payload: {isBSEAccountCreated:false}})
        history.push('/AccountCreationPage');
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
                             Congratulation payment process is complete sucessfully.
                            </h1>
                            <h2 className={styles.heroSubTextMedium}>
                             Please provide us few information to complete the process of IPS and contract agreement, KYC Validations and portfolio generation.
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
                               Please Complete above mentioned steps to start investment in Fliber Platform.
                            </h1>
                            <div className={styles.linkFlex}>
                                <p
                                    className={styles.downloadLink}
                                    onClick={() => this.handleSubscription()}
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
IPSMenuPage.propTypes = {
    setBSEAccount:PropTypes.func.isRequired
}

IPSMenuPage.defaultProps = {};
const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    setBSEAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(IPSMenuPage);
