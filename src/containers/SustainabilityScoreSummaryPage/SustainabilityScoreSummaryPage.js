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
import styles from './SustainabilityScoreSummaryPage.module.scss';
import { getCustomerSScoreRequest } from '../../actions/RRScore';
import NumberFormat from 'react-number-format';




class SustainabilityScoreSummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ssScoreAnswers:[]
        };
    }

    componentDidMount() {
        const { getCustomerSScoreRequest,isAuthenticated,history,userInfo } = this.props;

        if (!isAuthenticated) {
            history.push(`/`);
          }else{
            this.setState({
                isLoading: true
            });
    
            const res = new Promise((resolve, reject) =>
            getCustomerSScoreRequest(
                    {
                        "moduleType": 3,
                        "userId": userInfo.id
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
        const { ssScore, ssScoreAnswers} = this.props;
        this.setState({
            isLoading: false,
            ssScoreAnswers:ssScoreAnswers
        });

    };

    handleExit = () => {

        const { history } = this.props;
        history.push("/PostRetireeDashboardPage");
    }

    handleSubscription = () => {
        const { history,userInfo } = this.props;
        if(userInfo && userInfo.email){
        history.push("/userPasswordPage");
        }else{
            history.push("/userEmailUpdatePage");
        }
    
      }

    

    render() {
        const { ssScore } = this.props;
        const { isLoading,ssScoreAnswers } = this.state;
      
        const chartStyle = { height: 0 }
        return (
            <div className={cn(styles.container)} >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>SustainabilityScore Page</title>
                </Helmet>
                {isLoading === true ? (<Spinner />) : (
                    <div className={styles.heading} name="maindiv">
                        <h1 className={styles.heroText}>
                            Sustainability Score 
                        </h1>
                        <h2 className={styles.heroSubText}>
                            Based on calcuations on  your current financial Inputs. Fliber calculated your <b>Sustainability Ratio</b> as below
                        </h2>

                        <div className={styles.cardContainer}>
                            <div className={styles.cartItemContainer}>
                            <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Total Corpus`}
                                    </div>
                                    <div className={styles.listItem}>
                                    <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={ssScoreAnswers.length>0?ssScoreAnswers[0].userText:''} />
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`House Hold Expense`}
                                    </div>
                                    <div className={styles.listItem}>
                                    <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={ssScoreAnswers.length>0?ssScoreAnswers[1].userText:''} />
                                        
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`HealthCare Expense`}
                                    </div>
                                    <div className={styles.listItem}>
                                    <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={ssScoreAnswers.length>0?ssScoreAnswers[2].userText:''} />
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Yearly Income`}
                                    </div>
                                    <div className={styles.listItem}>
                                    <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={ssScoreAnswers.length>0?ssScoreAnswers[3].userText:''} />
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Sustainability Ratio`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {ssScore.sustainabilityRatio}{`%`}
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


SustainabilityScoreSummaryPage.protoTypes = {

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
    getCustomerSScoreRequest: PropTypes.func.isRequired,
    ssScoreAnswers: PropTypes.arrayOf(PropTypes.shape({
        userText: PropTypes.string
    }))
   
};


SustainabilityScoreSummaryPage.defaultProps = {};
const mapStateToProps = state => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    ssScore: state.rrScore.sustainabilityScore,
    ssScoreAnswers: state.rrScore.sustainabilityScoreAnswers
});

const mapDispatchToProps = {
    change,
    reset,
    setAuthStatus,
    setUserName,
    getCustomerSScoreRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SustainabilityScoreSummaryPage);
