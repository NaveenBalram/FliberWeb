import React, { Component } from "react";
import styles from "./NetWorthPage.module.scss";
import { Link } from "react-router-dom";
import Button from '../../components/Button/Button';
import { HorizontalMenuList } from "../../components/HorizontalMenuList/HorizontalMenuList";

const listData = [{
    'MainCategory': [
        {
            id: 0,
            title: 'Assets'
        },
        {
            id: 1,
            title: 'Liabilities'
        },
        {
            id: 2,
            title: 'Incomes'
        }
    ],

    'Assets': [
        {
            id: 0,
            title: 'Fixed Assets'
        },
        {
            id: 1,
            title: 'Financial Assets'
        },
    ],

    'financialAssets': [
        {
            id: 0,
            title: 'Market Linked Financial Assets'
        },
        {
            id: 1,
            title: 'Non-Market Linked Financial Assets'
        }
    ],

    'liabilities': [
        {
            id: 0,
            title: 'House Loan'
        },
        {
            id: 1,
            title: 'Vehicle Loan'
        },
        {
            id: 2,
            title: 'Credit Card Loan'
        },
        {
            id: 3,
            title: 'Personal Loan'
        },
        {
            id: 4,
            title: 'Others'
        }
    ]
}];
const items = [
    {
        name: "Fixed Assets",
        color: "#527318",
        href: "#"
    },
    {
        name: "Financial Assets",
        color: "#527318",
        href: "#"
    },
    {
        name: "Liabilities",
        color: "#527318",
        href: "#"
    },
    {
        name: "Savings",
        color: "#527318",
        href: "#"
    },
    {
        name: "Govt Schemes",
        color: "#527318",
        href: "#"
    }
];


class NetWorthPage extends Component {
    constructor() {
        super();
        this.state = {
            screen: 0,
        };
    }

    handleScreen = (item) => {
        const { screen } = this.state;
        this.setState({ screen: screen === 0 ? 1 : (screen === 1 && item.id === 0) || (screen === 2 && item.id === 1) ? screen + 1 : (screen === 1 && item.id === 1) ? 4 : screen });
    }

    render() {

        const { screen } = this.state;
        const cardData = (screen === 1 ? listData[0].MainCategory : screen === 2 ? listData[0].Assets : screen === 3 ? listData[0].financialAssets : listData[0].liabilities);
        return (
            <div className={styles.landingPageContainer}>
                <div className={styles.sectionContainer}>
                    {
                        (screen === 0) ?
                            (<div className={styles.overlayBlock}>
                                <h1 className={styles.herotext}>
                                    <b>Fliber NetWorth Management</b>
                                </h1>
                                <p className={styles.bannerContent}>
                                    NetWorth Management is to manage your assets and Liabilities state.<br />
                                    NetWorth requires discipline, clearly defined Assets, and Liabilities.<br />
                                    Give us few information on your Assets, Liabilities & Income and will let you know where you stand on retirement.
                                </p>
                                <div className={styles.linkFlex}>
                                    <p className={styles.signUpItem}>
                                    </p>
                                    <p className={styles.downloadLink}
                                        onClick={() => this.handleScreen(null)}
                                    >
                                        <Link>Continue</Link>
                                    </p>
                                </div>
                            </div>)
                            :
                            (
                                <div className={styles.cardContainer}>
                                    <HorizontalMenuList
                                     items={items}
                                    />
                                    {/* {cardData.map(item =>
                                        <div className={styles.overlayCard}
                                            onClick={() => this.handleScreen(item)}
                                        >
                                            <h2>
                                                <b>{item.title}</b>
                                            </h2>
                                            <div className={styles.overlayCardBottom}>
                                                <h3>
                                                    <b>{`₹ 0.0`}</b>
                                                </h3>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            )}
                </div>
                {
                    screen > 0 ? (
                        <div className={styles.actionBar}>
                            <Button
                                className={styles.next}
                                disabled={false}
                                onClick={() => this.setState({ screen: screen === 4 ? 1 : screen - 1 })}
                                type="submit"
                            >
                                <span>Back</span>
                            </Button>
                        </div>) : null}
            </div>
        );
    }
}

export default NetWorthPage;
