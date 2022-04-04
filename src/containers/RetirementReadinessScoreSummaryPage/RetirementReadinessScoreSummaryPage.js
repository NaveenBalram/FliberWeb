import { change, reset } from 'redux-form';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import Spinner from '../../components/Spinner/Spinner';
import styles from './RetirementReadinessScoreSummaryPage.module.scss';
import ReactSpeedometer from "react-d3-speedometer";
import {
    getCustomerRRScoreRequest
} from "../../actions/RRScore";
import NumberFormat from 'react-number-format';
import Button from '../../components/Button/Button';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';


class RetirementReadinessScoreSummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            value: 0,
            retirementAge: 60,
            horizontalLabels :{}
        };
    }

    componentDidMount() {
        const { getCustomerRRScoreRequest, userInfo, isAuthenticated, history } = this.props;

        if (!isAuthenticated) {
            history.push(`/`);
        } else {
            this.getRetirementRedinessScore();
        }

    }

    getRetirementRedinessScore = () =>{
        const { getCustomerRRScoreRequest, userInfo, isAuthenticated, history } = this.props;
        this.setState({
            isLoading: true
        });

        
        const res = new Promise((resolve, reject) =>
            getCustomerRRScoreRequest(
                {
                    "user_id": userInfo.Id,
                    "module_type": 1,
                    "retirement_age": this.state.retirementAge
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

    handleSubmitSuccess = () => {
        const { retirementReadinessScore } = this.props;
        let labels = {
            [retirementReadinessScore.age]: `${retirementReadinessScore.age}`,
            85: '85',
        }
        this.setState({
            isLoading: false,
            retirementReadinessScore: retirementReadinessScore,
            value: retirementReadinessScore.RRScoreResult === "Need Attention" ? 350 : (retirementReadinessScore.RRScoreResult === "Fair" ? 450 : (retirementReadinessScore.RRScoreResult === "Good" ? 550 : (retirementReadinessScore.RRScoreResult === "Very Good") ? 750 : 900)),
            horizontalLabels:labels
        });
    }

   

    handleExit = () => {
        const { history } = this.props;
        history.push("/productHomePage");
    }

    handleFliberJourney = () => {
        const { history,userInfo } = this.props;
        if(userInfo && userInfo.email){
        history.push("/productHomePage");
        }else{
            history.push("/userEmailUpdatePage");
        }
    }

     handleChange = value => {
       this.setState({ retirementAge:value});
    };



    render() {
        const { isLoading, value,retirementAge,horizontalLabels } = this.state;
        const { retirementReadinessScore } = this.props;
        
        return (

            <div className={styles.container}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Retirement Readiness Score</title>
                </Helmet>
                {isLoading === true ? (<Spinner />) : (
                    <div className={styles.heading} name="maindiv">
                        <h1 className={styles.heroText}>
                            About you,
                        </h1>
                        <div className={styles.cardContainer}>
                            <div className={styles.cartItemContainer}>
                            <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`My age`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {retirementReadinessScore.age}
                                    </div>
                                </div>
                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Retirement age`}
                                    </div>
                                    <div className={styles.listItem}>
                                        {retirementAge>0?retirementAge:`60`}
                                    </div>
                                </div>

                                <div className={styles.subItem}>
                                    <div className={styles.listHeader}>
                                        {`Total Corpus Amount`}
                                    </div>
                                    <div className={styles.listItem}>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={retirementReadinessScore.COR} />

                                    </div>
                                </div>
                              
                                
                                <div className={styles.subItemSecondary}>
                                    <div className={styles.listHeaderSecondary}>
                                        {`Total savings amount at time of retirement`}
                                    </div>
                                    <div className={styles.listItem}>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={retirementReadinessScore.FCA} />
                                    </div>
                                </div>
                               
                            </div>
                        </div>


                        <div className={styles.subHeading} >
                            <h1 className={styles.heroText}>
                                Retirement Readiness Score.
                            </h1>
                            <h2 className={styles.heroSubText}>
                                Your score is calculated assuming an underperforming market, so it represents a conservative estimate of how much income you could have during retirement
                            </h2>
                        </div>

                        <div className={styles.scoreContainer}>

                            <div className={styles.subHeading}>
                                <ReactSpeedometer
                                    width={500}
                                    needleHeightRatio={0.8}
                                    value={value}
                                    currentValueText={"RR Score"}
                                    segmentColors={['#EA5455', '#FFD700', '#A7D129', '#66DE93', '#72bc42']}
                                    customSegmentStops={[0, 400, 500, 650, 800, 1000]}
                                    customSegmentLabels={[
                                        {
                                            text: 'Needs Attention',
                                            position: 'INSIDE',
                                            color: '#fff',
                                            font: '300 13px "Quicksand", sans-serif;'

                                        },
                                        {
                                            text: 'FAIR',
                                            position: 'INSIDE',
                                            font: '300 13px "Quicksand", sans-serif;',
                                            color: '#fff',

                                        },
                                        {
                                            text: 'Good',
                                            position: 'INSIDE',
                                            font: '300 13px "Quicksand", sans-serif;',
                                            color: '#fff',

                                        },
                                        {
                                            text: 'Very Good',
                                            position: 'INSIDE',
                                            font: '300 13px "Quicksand", sans-serif;',
                                            color: '#fff',

                                        },

                                        {
                                            text: 'Excellent',
                                            position: 'INSIDE',
                                            font: '300 13px "Quicksand", sans-serif;',
                                            color: '#fff',

                                        }
                                    ]}
                                    ringWidth={47}
                                    needleTransitionDuration={3333}
                                    needleTransition="easeElastic"
                                    needleColor={'#527318'}
                                    textColor={'##527318'}
                                />
                            </div>
                            <div className={styles.scoreCards}>
                                <div className={styles.cardContainerButton}>
                                    <h2 className={styles.heroSmallText}> Amount needed at the age of retirement</h2>
                                    <h2 className={styles.heroSmallTextValue}>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix={'₹'}
                                            displayType={'text'}
                                            value={retirementReadinessScore.AmountRequired} />
                                    </h2>
                                </div>
                                {/* <div className={styles.cardContainer}>
                            <h2 className={styles.heroSmallText}>Amount needs to meet Corpus</h2>
                            <h2 className={styles.heroSmallTextValue}> 2000000</h2>
                        </div> */}
                            </div>
                           
                        </div>
                        <div className={styles.subHeading}>
                            <h2>Check score by modifying the retirementage with the help of slider below.</h2>
                            <label className={styles.subHeading}>Retirement Age:  {retirementAge>0?retirementAge:`60`}</label>
                        <Slider
                              min={retirementReadinessScore.age}
                              max={85}
                              value={retirementAge}
                              labels={horizontalLabels}
                              onChange={(value)=>this.handleChange(value)}
                              name="retirementAgeSlider"
                            />
                            
                            <div className={styles.buttonsdisplay}>
                                <div className={styles.linkFlex}>
                                    <p
                                        className={styles.downloadLink}
                                        onClick={() => this.getRetirementRedinessScore()}
                                    >
                                        <Link>Check Score</Link>
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.subHeading} >
                            <h2 className={styles.heroSubText}>
                                Fliber will helps you to do complete end to end retirement planning from today till end of life.
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
                                    onClick={() => this.handleFliberJourney()}
                                >
                                    <Link>Send Report</Link>
                                </p>
                            </div>
                        </div>
                    </div>)}
            </div>
        );
    }
}


RetirementReadinessScoreSummaryPage.protoTypes = {

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
    getCustomerRRScoreRequest: PropTypes.func.isRequired,
    // retirementReadinessScore: PropTypes.shape({
    //     RRScoreResult: PropTypes.string,
    //     COR: PropTypes.number,
    //     FCA: PropTypes.number,
    //     fvEPFO: PropTypes.number,
    //     fvNPS: PropTypes.number,
    //     fvGS: PropTypes.number,
    //     fvMLI: PropTypes.number,
    //     fvME: PropTypes.number,
    //     age: PropTypes.number,
    //     AmountRequired:PropTypes.number,
    // }).isRequired
};


RetirementReadinessScoreSummaryPage.defaultProps = {};
const mapStateToProps = state => ({
    retirementReadinessScore: state.rrScore.retirementReadinessScore,
    getCustomerRRScoreRequest: PropTypes.func.isRequired,
    userInfo: state.userManagement.userInfo,
    isAuthenticated: state.header.isAuthenticated,
});

const mapDispatchToProps = {
    change,
    reset,
    setAuthStatus,
    setUserName,
    getCustomerRRScoreRequest,

};

export default connect(mapStateToProps, mapDispatchToProps)(RetirementReadinessScoreSummaryPage);
