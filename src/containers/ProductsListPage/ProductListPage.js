import React, { Component } from "react";
import styles from "./ProductListPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
// import { Auth } from "aws-amplify";
import { ModuleType, Status } from "../../enums/enumHelper";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import { Link } from 'react-router-dom';
const productList = [
    {
        id: 1,
        name: "Retirement readiness score",
        longDescription: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
        productLogoLarge: "score",
        buttonText: "Check Score",
        moduleType: ModuleType.RRScore
    },
    {
        id: 2,
        name:
            "Planning for my Retirement",
        longDescription: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
        productLogoLarge: "score",
        buttonText: "Plan now",
        moduleType: ModuleType.Goals
    },
    // {
    //     id: 3,
    //     name:
    //         "Goals management",
    //     longDescription: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    //     moduleType: ModuleType.Goals
    // },
    // {
    //     id: 4,
    //     name:
    //         "Income Management",
    //     longDescription: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    //     productLogoLarge: "zero_commission",
    //     moduleType: ModuleType.Incomes
    // }
];



class ProductListPage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { history, isAuthenticated } = this.props;
        
        if (!isAuthenticated) {
            history.push(`/`);
        }
    }


    handleSelect = (moduleType) => {

        const { history } = this.props;
        const path = this.getPath(moduleType);
        history.push(`/${path}`);
    }

    getPath = (moduleType) => {
        const { userInfo } = this.props;
        if (moduleType === ModuleType.RRScore) {
            return userInfo.Status <= Status.Pending ? 'RetirementReadinessPage' : 'RetirementReadinessScoreSummaryPage'
        }
        else if (moduleType === ModuleType.RiskProfile) {
            return userInfo.Status <= Status.Pending ? 'RiskProfilePage' : 'RiskProfileSummaryPage'
           // return Status.YetToStart <= Status.Pending ? 'RiskProfilePage' : 'RiskProfileSummaryPage'
        }
        else if (moduleType === ModuleType.Goals) {
            return 'GoalManagementPage'
        }
        else if (moduleType === ModuleType.Incomes) {
            return 'IncomeManagementPage'
        }
    }

    handleSubscription = () =>{
        const {history} = this.props;
        history.push('/TermsAndConditionPage');
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
                                Welcome to <b>Fliber</b> &nbsp;

                                It's is an end to end retirement planning platform addressing both pre and post retirement needs.
                                It uses technology to help people plan for retirement and then deploy retirement corpus on retirement to generate monthly annuity and other cash flows so that the retiree can be comfortable with his life.
                            </h1>
                        </div>

                        <div className={styles.productArray}>
                            <div name="productList" className={cn(styles.productIndividual)}>
                                {/* <Carousel
                                    
                                    interval={1000}
                                    showArrows={true}
                                    showIndicators={true}
                                    centerMode={false}
                                > */}
                                {productList
                                    .map(
                                        (product, index) =>
                                            (index <= 3) && (
                                                <CardMenu
                                                    product={product}
                                                    handleSelect={this.handleSelect}
                                                    key={index}
                                                    customerNumber={''}
                                                    AuthorizeNumber={''}
                                                />
                                            )
                                    )}
                                {/* </Carousel> */}
                            </div>
                        </div>
                        <div className={styles.heading} name="upgradeFliber">
                            <h1 className={styles.heroSubTextMedium}>
                               To start Investments on mutual Funds and more value added services upgrade to <b>Fliber Gold</b> &nbsp;
                            </h1>
                            <div className={styles.linkFlex}>
                                <p
                                    className={styles.downloadLink}
                                    onClick={() => this.handleSubscription()}
                                >
                                    <Link>Upgrade to Fliber Gold.</Link>
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}
ProductListPage.propTypes = {
    customerInfo: PropTypes.shape({
        CustomerId: PropTypes.number,
        CustomerNumber: PropTypes.string,
        AuthorizeCode: PropTypes.string,
    }).isRequired,
    ProductLists: PropTypes.arrayOf(PropTypes.shape({})),
    highContrast: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    getProductsRequest: PropTypes.func.isRequired,
    saveCustomerLogsRequest: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({}).isRequired,
};

ProductListPage.defaultProps = {};
const mapStateToProps = (state) => ({
    highContrast: state.header.highContrast,
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
});
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
