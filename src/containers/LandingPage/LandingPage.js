import React, { Component } from "react";
import styles from "./LandingPage.module.scss";
//import Button from '../../components/Button/Button'
import { Link } from "react-router-dom";
import goal_image from  "../../assets/img/fliber_goal_image.svg";
import retirement_image from "../../assets/img/fliber_retirement.svg";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { viewLegal: false };
  }

  render() {
    const { viewLegal } = this.state;
    return (
      <div className={styles.landingPageContainer}>
        <div className={styles.sectionContainer}>
          <div className={styles.overlayBlock}>
            <h1 className={styles.herotext}>
              <b>Fliber</b> Complete retirement solutions
            </h1>
            <p className={styles.bannerContent}>
              Fliber is an end to end retirement planning platform addressing
              both Pre and post retirement needs. It uses technology to help
              people plan for retirement and then deploy retirement corpus on
              retirement to generate monthly annuity and other cash flows so
              that the retiree can be comfortable with his life.
            </p>
            <div className={styles.linkFlex}>
              {/* <p className={styles.signUpItem}>
                New to Fliber? <Link to="/signUpPage">Sign Up</Link>
              </p> */}
              <p className={styles.signUpItem}>
                Already a Member? <Link to="LoginWithAuthPage">Sign In </Link>
              </p>
              <p
                className={styles.downloadLink}
                //onClick={() => this.setState({ viewLegal: !viewLegal })}
              >
                Download <Link> Fliber</Link>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sectionRetirementContainer}>
          <div className={styles.subContainer}>
              <div className={styles.overlayBlockSectionGoal}>
                <p className={styles.bannerContentSmall}>Have you Plan for Retirement</p>
              <h1 className={styles.bannerHeading}>
                One place to do plan and Manage your Retirement in better way.
              </h1>
              <p className={styles.bannerContentLegal}>
                Explore more by giving few informations with us and let you know where you stand at your Retirement.
              </p>
              <div className={styles.linkFlex}>
                <p
                  className={styles.downloadLink}
                  //onClick={() => this.setState({ viewLegal: !viewLegal })}
                >
                  Get <Link to="LoginWithAuthPage">Started</Link>
                </p>
              </div>
            </div>
            <div className={styles.goalImageContainer}>
              <img
              className={styles.productLogo}
               src={retirement_image}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionGoalContainer}>
          <div className={styles.subContainer}>
              <div className={styles.overlayBlockSectionGoal}>
                <p className={styles.bannerContentSmall}>Plan your financial investments</p>
              <h1 className={styles.bannerHeading}>
                Plan goals and grow your future net worth
              </h1>
              <p className={styles.bannerContentLegal}>
                See how soon you can retire and plan your financial goals
              </p>
              <div className={styles.linkFlex}>
                <p
                  className={styles.downloadLink}
                  //onClick={() => this.setState({ viewLegal: !viewLegal })}
                >
                  Start <Link to="LoginWithAuthPage">Invest now</Link>
                </p>
              </div>
            </div>
            <div className={styles.goalImageContainer}>
              <img
              className={styles.productLogo}
               src={goal_image}
              />
            </div>
          </div>
        </div>
       
        <div className={styles.footerSection}>
          <div className={styles.subContainer}>
            <div className={styles.heading} name="maindiv">
              <h1>
                <b>Fliber</b>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
