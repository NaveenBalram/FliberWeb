import React, { Component } from "react";
import styles from "./PostRetireeDashboardPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
// import StoreWorks from "../../components/StoreWorks/StoreWorks";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import { ModuleType,Status } from "../../enums/enumHelper";

const productList = [
  {
    id: 1,
    name: "Sustainability Score",
    longDescription : "A score of 50 means that the company is considered average relative to its peer group; a score of 70 or higher means that the company is rated at least two standard deviations above average in its peer group",
    buttonText: "Check your Score",
    productUrl:"/SustainabilityScorePage",
    moduleType:ModuleType.SustainabilityScore
  },
  {
    id: 2,
    name:
      "My Networth",
      longDescription : "Net worth is the value of the assets a person or corporation owns, minus the liabilities they owe. It is an important metric to gauge a person's  financial health, providing a useful snapshot of its current financial position.",
      buttonText: "Add your Networth",
      productUrl: "/NetWorthPage",
      moduleType:ModuleType.NetWorth
    },
    {
        id: 3,
        name:
            "My Retirement Plan",
        longDescription: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
        buttonText: "Add Income Details",
        productUrl: "/GoalManagementPage",
        moduleType:ModuleType.Incomes
    },
];



class PostRetireeDashboardPage extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
   
  }


  handleSelect = (moduleType)=>{
    const { history } = this.props;
    const path = this.getPath(moduleType);
    history.push(`/${path}`);
  }

  getPath = (moduleType)=>{
    const { history , userInfo } = this.props;
    //if(moduleType === ModuleType.SustainabilityScore){
    //  return userInfo.status <= Status.Pending ? 'SustainabilityScorePage' : 'SustainabilityScoreSummaryPage'
    //}
    //else{
    //  // return goals related page
    //}

      switch (moduleType) {

          case ModuleType.SustainabilityScore:
              return userInfo.status <= Status.Pending ? 'SustainabilityScorePage' : 'SustainabilityScoreSummaryPage'
              break;
          case ModuleType.Goals:
              return 'GoalManagementPage'
              break;
          case ModuleType.Incomes:
              return 'IncomeManagementPage'
              break;
          case ModuleType.NetWorth:
              return 'NetWorthPage'
      }
    
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
     const { highContrast,  } = this.props;
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
              <title>Shop Page</title>
            </Helmet>
            <div className={styles.heading} name="maindiv">
              <h1>
                Welcome to <b>Fliber</b> &nbsp;
              
              It's is an end to end retirement planning platform addressing both pre and post retirement needs. 
          It uses technology to help people plan for retirement and then deploy retirement corpus on retirement to generate monthly annuity and other cash flows so that the retiree can be comfortable with his life.
              </h1>
            </div>
            
            <div className={styles.productArray}>
              <div name="productList" className={cn(styles.productIndividual)}>
                {productList
                  .map(
                    (product, index) =>
                      (index <= 3  ) && (
                        <CardMenu
                          product={product}
                          handleSelect={this.handleSelect}
                          key={index}
                          customerNumber={''}
                          AuthorizeNumber={''}
                        />
                      )
                  )}
              </div>
              </div>
          </div>
        )}
      </div>
    );
  }
}
PostRetireeDashboardPage.propTypes = {
  userInfo: PropTypes.shape({}).isRequired,
};
const mapStateToProps = (state) => ({
  userInfo: state.userManagement.userInfo,
});
const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRetireeDashboardPage);
