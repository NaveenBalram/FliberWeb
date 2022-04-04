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
import{getPreCalculationRequest} from '../../actions/AssetAllocation'
import Spinner from '../../components/Spinner/Spinner';
import styles from './PreRetirementGoalPage.module.scss';


const PreGoalScore ={
"asis": 100, 
"luxury": 200,
"modest": 300};


class PreRetirementGoalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            retirementCorpus: {}
        };
    }

    componentDidMount() {
        const { isAuthenticated,history,userInfo,getPreCalculationRequest } = this.props;

        if (!isAuthenticated) {
            history.push(`/`);
          }else{
            this.setState({
                isLoading: true
            });
             this.handleSubmitSuccess()
            // const res = new Promise((resolve, reject) =>
            // getPreCalculationRequest(
            //         {
            //             "UserId": userInfo.id
            //         },
            //         { reject, resolve })
            // );
            // res.then(() => {
            //     this.handleSubmitSuccess();
            // });
            // res.catch((error) => {
            //     if (error.response.status === 400) {
            //         notify.show(
            //             `An error occurred. Please try again. ${error.response.data.errorMessage}`,
            //             "error",
            //             5000
            //         );
            //     } else {
            //         notify.show(
            //             `An error occurred. Please try again. Technical Information: ${error}`,
            //             "error",
            //             5000
            //         );
            //     }
            // });
          }

        }

    

    handleSubmitSuccess = () => {
       // const { retirementCorpus } = this.props;
        this.setState({
            isLoading: false,
            retirementCorpus: PreGoalScore
        });

    };

    handleExit = () => {

        const { history } = this.props;
        history.push("/productHomePage");
    }

    handleNext = () =>{

        const{history} = this.props;
        history.push("/RiskProfilePage");
    }

    

    render() {
        //const { retirementCorpus } = this.props;
        const { isLoading, retirementCorpus } = this.state;

        const chartStyle = { height: 0 }
        return (
            <div className={cn(styles.container)} >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Pre Retirement Corpus Page</title>
                </Helmet>
                {isLoading === true ? (<Spinner />) : (
                    <div className={styles.heading} name="maindiv">
                        <h1 className={styles.heroText}>
                            Corpus value for Pre Retirement 
                        </h1>
                        <h2 className={styles.heroSubText}>
                            Based on calcuations on  your <b>Goals</b>. Fliber categorized your Corpus value as below
                        </h2>

                        <div className={styles.cardContainer}>
                            <div className={styles.cartItemContainer}>

                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Asis`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {retirementCorpus.asis}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Luxury`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {retirementCorpus.luxury}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Modest`}
                                    </div>
                                    <div className={styles.listItem}>
                                       {retirementCorpus.modest}
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
                                    onClick={() => this.handleNext()}
                                >
                                    <Link>Check your Risk Profile</Link>
                                </p>
                            </div>
                        </div>
                    </div>)}
            </div>
        );
    }
}


PreRetirementGoalPage.protoTypes = {

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
    getPreCalculationRequest:PropTypes.func.isRequired
    
};


PreRetirementGoalPage.defaultProps = {};
const mapStateToProps = state => ({
  
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    retirementCorpus: state.assetAllocation.retirementCorpus.retirement_corpus
});

const mapDispatchToProps = {
    change,
    reset,
    setAuthStatus,
    setUserName,
    getPreCalculationRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreRetirementGoalPage);
