import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { fork } from 'redux-saga/effects';
import { reducer as formReducer } from 'redux-form';
import { render } from 'react-dom';
import App from './App';
import createStore from './store';
import Routes from './Routes';

// global styles
import './reset.scss';

// TODO:: Import Reducers
//import landingPageReducer from './reducers/LandingPage';
import rrScoreReducer from './reducers/RRScore';
import headerReducer from './reducers/Header';
import assetAllocationReducer from './reducers/AssetAllocation';
import userManagementReducer from './reducers/UserManagement';
import riskProfileReducer from './reducers/RiskProfileScore';
import goalManagementReducer from './reducers/GoalManagement';
import incomeManagementReducer from './reducers/IncomeManagement';
import bseManagementReducer from './reducers/BSEAccountManagement';

// TODO:: Import Sagas
import rrScoreSagas from './sagas/RRScore';
import assetAllocationSagas from './sagas/AssetAllocation';
import userManagementSagas from './sagas/UserManagement';
import riskProfileScoreSagas from './sagas/RiskProfileScore';
import goalManagementSagas from './sagas/GoalManagement';
import incomeManagementSagas from './sagas/IncomeManagement';
import bseManagementSagas from './sagas/BSEAccountManagement';
import Amplify from 'aws-amplify';
import config from './UserManagement/aws_export'


const reducers = {
    rrScore: rrScoreReducer,
    form: formReducer,
    //landingPage: landingPageReducer,
    routing: routerReducer,
    header: headerReducer,
    assetAllocation: assetAllocationReducer,
    userManagement: userManagementReducer,
    riskProfileScore: riskProfileReducer,
    goalManagement: goalManagementReducer,
    incomeManagement: incomeManagementReducer,
    bseManagement: bseManagementReducer
};

const sagas = [
    fork(rrScoreSagas),
    fork(assetAllocationSagas),
    fork(userManagementSagas),
    fork(riskProfileScoreSagas),
    fork(goalManagementSagas),
    fork(incomeManagementSagas),
    fork(bseManagementSagas)
];

const browserHistory = createBrowserHistory();

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: 'testApiCall',
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            }
        ]
    }
});

render(
    <Provider store={createStore(reducers, sagas, browserHistory)}>
        <BrowserRouter history={browserHistory}>
            <App location={browserHistory.location} Routes={Routes} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

