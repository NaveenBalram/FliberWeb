import React, { PureComponent } from 'react';
//import { assertValidHtmlId } from 'react-accessible-accordion/dist/types/helpers/uuid';
import loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';

const load = loader => loadable({ loader, loading: Spinner });

const LandingPage = load(() => import('./containers/LandingPage/LandingPage'));
const SignInPage = load(() => import('./containers/SignInPage/SignInPage'));
const SignUpPage = load(() => import('./containers/SignUpPage/SignUpPage'));
const ConfirmUserPage = load(() => import('./containers/ConfirmUserPage/ConfirmUserPage'));
const ProductHomePage = load(() => import('./containers/ProductsListPage/ProductListPage'));
const AccountInformationPage = load(() => import('./containers/MyAccountInformation/MyAccountInformation'));
const ConfirmPasscodePage = load(() => import('./containers/ConfirmUserPage/ConfirmUserPage'));
const ResetPasswordPage = load(() => import('./containers/ResetPasswordPage/ResetPasswordPage'));
const EmailChangePage = load(() => import('./containers/ChangeEmailPage/ChangeEmailPage'));
const PasswordChangePage = load(() => import('./containers/ChangePasswordPage/ChangePasswordPage'));
const MobileWithAuthPage = load(() => import('./containers/SignInPageWithMobile/SignInPageWithMobile'));
const RetirementReadinessScorePage = load(() => import('./containers/RetirementReadinessScorePage/RetirementReadinessScorePage'));
const RetirementReadinessScoreSummaryPage = load(() => import('./containers/RetirementReadinessScoreSummaryPage/RetirementReadinessScoreSummaryPage'));
const AssetAllocationPage = load(() => import('./containers/AssetAllocationPage/AssetAllocationPage'));
const RiskProfilePage = load(() => import('./containers/RiskProfilePage/RiskProfilePage'));
const RiskProfileSummaryPage = load(() => import('./containers/RiskProfileSummaryPage/RiskProfileSummaryPage'));
const SustainabilityScorePage = load(() => import('./containers/SustainabilityScorePage/SustainabilityScorePage'));
const PostRetireeDashboardPage = load(() => import('./containers/PostRetireeDashboardPage/PostRetireeDashboardPage'));
const SustainabilityScoreSummaryPage = load(() => import('./containers/SustainabilityScoreSummaryPage/SustainabilityScoreSummaryPage'));
const GoalManagementPage = load(() => import('./containers/GoalManagementPage/GoalManagementPage'));
const IncomeManagementPage = load(() => import('./containers/IncomeManagementPage/IncomeManagementPage'));
const PreRetirementGoalPage = load(() => import('./containers/PreRetirementGoalPage/PreRetirementGoalPage'));
const KYCInformationPage = load(() => import('./containers/KYCInformationPage/KYCInformationPage'));
const AccountCreationPage =load(() => import('./containers/AccountCreationPage/AccountCreationPage'));
const ProfessionalDetailPage = load(()=> import('./containers/ProfessionalDetailsPage/ProfessionalDetailsPage'));
const NomineesDetailPage = load(() => import('./containers/NomineesDetailPage/NomineesDetailPage'));
const BankDetailPage = load(()=> import('./containers/BankDetailPage/BankDetailPage'));
const SignzyIntegrationPage = load(()=> import('./containers/SignzyIntegrationPage/SignzyIntegrationPage'));
const TermsAndConditions = load(()=>import('./containers/LegalPage/LegalPage'));
const EsignatureUploadPage = load(()=>import('./containers/EsignatureUploadPage/EsignatureUploadPage'));
const IPSMenuPage = load(()=>import('./containers/IPSMenuPage/IPSMenuPage'));
const AddressDetailsPage = load(()=>import('./containers/AddressDetailsPage/AddressDetailsPage'));
const NetWorthPage = load(()=>import('./containers/NetWorthPage/NetWorthPage'));
const UserInformationPage = load(()=>import('./containers/UserInformationPage/UserInformationPage'));
const DOBValidationPage = load(()=>import('./containers/DOBValidationPage/DOBValidationPage'));


export default class Routes extends PureComponent {
    render() {
        return (
            <Switch>
                <Route component={LandingPage} exact path="/" />
                <Route component={SignInPage} exact path="/signIn" />
                <Route component={SignUpPage} exact path="/signUpPage" />
                <Route component={ConfirmUserPage} exact path="/confirmUserPage" />
                <Route component={ProductHomePage} exact path="/productHomePage" />
                <Route component={PasswordChangePage} exact path="/resetMpinPage"/>
                <Route
                    component={AccountInformationPage}
                    exact
                    path="/accountInfoPage"
                />
                <Route component={ConfirmPasscodePage} exact path="/confirmPasscodePage" />
                <Route component={ResetPasswordPage} exact path="/resetPasswordPage" />
                <Route component={EmailChangePage} exact path="/userEmailUpdatePage" />
                <Route component={MobileWithAuthPage} exact path="/LoginWithAuthPage" />
                <Route component={RetirementReadinessScorePage} exact path="/RetirementReadinessPage" />
                <Route component={RetirementReadinessScoreSummaryPage} exact path="/RetirementReadinessScoreSummaryPage" />
                <Route component={AssetAllocationPage} exact path="/AssetAllocationPage" />
                <Route component={RiskProfilePage} exact path="/RiskProfilePage" />
                <Route component={RiskProfileSummaryPage} exact path="/RiskProfileSummaryPage" />
                <Route component={SustainabilityScorePage} exact path="/SustainabilityScorePage" />
                <Route component={PostRetireeDashboardPage} exact path="/PostRetireeDashboardPage" />
                <Route component={SustainabilityScoreSummaryPage} exact path="/SustainabilityScoreSummaryPage" />
                <Route component={GoalManagementPage} exact path="/GoalManagementPage" />
                <Route component={IncomeManagementPage} exact path="/IncomeManagementPage" />
                <Route component={PreRetirementGoalPage} exact path="/PreRetirementGoalPage" />
                <Route component={KYCInformationPage} exact path="/KYCInformationPage"/>
                <Route component={AccountCreationPage} exact path="/AccountCreationPage"/>
                <Route component={ProfessionalDetailPage} exact path="/ProfessionalDetailPage"/>
                <Route component={NomineesDetailPage} exact path="/NomineesDetailPage" />
                <Route component={BankDetailPage} exact path="/BankDetailPage" />
                <Route component={SignzyIntegrationPage} exact path="/SignzyIntegrationPage" />
                <Route component={TermsAndConditions} exact path="/TermsAndConditionPage" />
                <Route component={EsignatureUploadPage} exact path="/EsignatureUploadPage" />
                <Route component={IPSMenuPage} exact path="/IPSMenuPage" />
                <Route component={AddressDetailsPage} exact path="/AddressDetailsPage"/>
                <Route component={NetWorthPage} exact path="/NetWorthPage"/>
                <Route component={UserInformationPage} exact path="/UserInformationPage"/>
                <Route component={DOBValidationPage} exact path="/DOBValidationPage"/>
            </Switch>
        );
    }
}
