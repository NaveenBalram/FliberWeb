import cn from 'classnames';
import { change, reset } from 'redux-form';
import PropTypes from 'prop-types';
//import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import Spinner from '../../components/Spinner/Spinner';
import styles from './AssetAllocationPage.module.scss';
import { getAssetAllocationRequest } from '../../actions/AssetAllocation';




class AssetAllocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            assetAllocationScore: {}
        };
    }

    componentDidMount() {
        const { getAssetAllocationRequest,isAuthenticated,history,userInfo ,riskProfileScoreResult} = this.props;

        if (!isAuthenticated) {
            history.push(`/`);
          }else{
            this.setState({
                isLoading: true
            });
    
            const res = new Promise((resolve, reject) =>
                getAssetAllocationRequest(
                    {
                        "retirement": 60,
                        "user_id": userInfo.id,
                        "type": riskProfileScoreResult.result
                        
                    },
                    { reject, resolve })
            );
            res.then(() => {
                this.handleSubmitSuccess();
            });
            res.catch((error) => {
                if (error.response.status === 400) {
                    notify.show(
                        `An error occurred. Please try again. ${error.response.data.errorMessage}`,
                        "error",
                        5000
                    );
                } else {
                    notify.show(
                        `An error occurred. Please try again. Technical Information: ${error}`,
                        "error",
                        5000
                    );
                }
            });
          }



    }

    handleSubmitSuccess = () => {
        const { assetAllocationScore } = this.props;
        this.setState({
            isLoading: false,
            assetAllocationScore: assetAllocationScore
        });

    };

    handleExit = () => {

        const { history } = this.props;
        history.push("/productHomePage");
    }

    getType = (name) => {

        switch (name) {
            case 'c': {
                return "Conservative";
            }
            case 'mc': {
                return "Mod Conservative";
            }
            case 'b': {
                return "Balanced";
            }
            case 'a': {
                return "Aggresive";
            }
            case 'ma': {
                return "Mod Aggresive"
            }
        }
    }

    handleSubscription = () => {
        const { history,userInfo } = this.props;
        // if(userInfo && userInfo.email){
        // history.push("/userPasswordPage");
        // }else{
        //     history.push("/userEmailUpdatePage");
        // }

        if(userInfo.MPIN===null){
            history.push("/userPasswordPage");
        } else if(userInfo.email===null){
            history.push("/userEmailUpdatePage");
        }else{
            history.push("/productHomePage");
        }
    
      }

    render() {
        const { assetAllocationScore } = this.props;
        const { isLoading } = this.state;

        const chartStyle = { height: 0 }
        return (
            <div className={cn(styles.container)} >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Asset Allocation Page</title>
                </Helmet>
                {isLoading === true ? (<Spinner />) : (
                    <div className={styles.heading} name="maindiv">
                        <h1 className={styles.heroText}>
                            Target Asset Allocation
                        </h1>
                        <h2 className={styles.heroSubText}>
                            Based on calcuations on  your <b>Risk Profile</b>. Fliber categorized your Asset Allocation as below
                        </h2>

                        <div className={styles.cardContainer}>
                            <div className={styles.cartItemContainer}>

                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Risk Profile`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {this.getType(assetAllocationScore.Name)}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Equity`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {assetAllocationScore.Equity}{`%`}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Debt`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {assetAllocationScore.Debt}{`%`}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Gold`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {assetAllocationScore.Gold}{`%`}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.heading} >
                            <h2 className={styles.heroSubText}>
                                Upgrade to  <b>Fliber Gold</b>. It will helps you to do complete end to end retirement planning from today till end of life.

                            </h2>
                        </div>
                        <div className={styles.buttonsdisplay}>
                            <div className={styles.linkFlex}>
                                <p
                                    className={styles.downloadLink}
                                    onClick={() => this.handleExit()}
                                >
                                    <Link>Not now. Exit</Link>
                                </p>
                            </div>
                            <div className={styles.linkFlex}>
                                <p
                                    className={styles.downloadLink}
                                    onClick={() => this.handleSubscription()}
                                >
                                    <Link>Upgrade to Fliber Gold.</Link>
                                </p>
                            </div>
                        </div>
                    </div>)}
            </div>
        );
    }
}


AssetAllocationPage.protoTypes = {

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
    setAuthStatus: PropTypes.func.isRequired,
    getAssetAllocationRequest: PropTypes.func.isRequired,
    assetAllocationScore: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Equity: PropTypes.string.isRequired,
        Debt: PropTypes.string.isRequired,
        Gold: PropTypes.string.isRequired
    })
};


AssetAllocationPage.defaultProps = {};
const mapStateToProps = state => ({
    assetAllocationScore: state.assetAllocation.assetAllocationScore,
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    riskProfileScoreResult: state.riskProfileScore.riskProfileScoreResult,
});

const mapDispatchToProps = {
    change,
    reset,
    setAuthStatus,
    setUserName,
    getAssetAllocationRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetAllocationPage);
