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
import styles from './RiskProfileSummaryPage.module.scss';
import ReactSpeedometer from "react-d3-speedometer"
import {
  getCustomerRiskProfileScoreRequest
} from "../../actions/RiskProfileScore";

const scores = [
  {
    result: "A",
    value: 150
  },
  {
    result: "MA",
    value: 350
  },
  {
    result: "B",
    value: 550
  },
  {
    result: "MC",
    value: 750
  },
  {
    result: "C",
    value: 950
  }
]

class RiskProfileSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gaugeValue: 0,
    };
  }

  componentDidMount() {
    const { getCustomerRiskProfileScoreRequest, userInfo, isAuthenticated,history } = this.props;
   
    if (!isAuthenticated) {
      history.push(`/`);
    }else{
      this.setState({
        isLoading: true
      });
  
      const payload = {
        user_id: userInfo.id,
        module_type: 2
      };
      const res = new Promise((resolve, reject) =>
        getCustomerRiskProfileScoreRequest(payload, { reject, resolve })
      );
      res.then(() => {
        this.handleScoreResponse();
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


  handleScoreResponse = () => {
    const { riskProfileScoreResult } = this.props;
    this.setState({
      isLoading: false,
      gaugeValue: scores.filter(x => x.result === riskProfileScoreResult.result)[0].value,
    });
  }

  handleExit = () => {
    const { history } = this.props;
    history.push("/productHomePage");
  }


  handleFliberJourney = () => {
    const { history,userInfo } = this.props;
    if(userInfo && userInfo.email){
    history.push("/AssetAllocationPage");
    }else{
        history.push("/userEmailUpdatePage");
    }
    
  }


  render() {
    const { gaugeValue, isLoading } = this.state;


    return (
      <div className={cn(styles.container)} >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Risk Profile Score</title>
        </Helmet>
        {isLoading === true ? (<Spinner />) : (
          <div>
            <ReactSpeedometer
              width={500}
              needleHeightRatio={0.7}
              value={gaugeValue}
              currentValueText="Risk Profile Score"
              customSegmentLabels={[

                {
                  text: 'Aggressive',
                  color: '#555',
                },
                {
                  text: 'Mod Aggressive',
                  color: '#555',
                },
                {
                  text: 'Balanced',

                  color: '#555',
                  fontSize: '19px',
                },
                {
                  text: 'Mod Conservative',
                  color: '#555',
                },
                {
                  text: 'Conservative',
                  color: '#555',
                },


              ]}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={'#90f2ff'}
              textColor={'##000000'}
            />

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
                  <Link>Check Asset Calculations</Link>
                </p>
              </div>
            </div>
          </div>)}

      </div>

    );
  }
}


RiskProfileSummaryPage.protoTypes = {

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
};


RiskProfileSummaryPage.defaultProps = {};
const mapStateToProps = state => ({
  riskProfileScoreResult: state.riskProfileScore.riskProfileScoreResult,
  getCustomerRiskProfileScoreRequest: PropTypes.func.isRequired,
  userInfo: state.userManagement.userInfo,
  isAuthenticated: state.header.isAuthenticated,
});

const mapDispatchToProps = {
  change,
  reset,
  setAuthStatus,
  setUserName,
  getCustomerRiskProfileScoreRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskProfileSummaryPage);
