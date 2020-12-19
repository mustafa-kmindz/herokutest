import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './content')
);
const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
);
const ProductStatusDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ProductStatus/productstatus')
);

const BankListDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './BankList/BankList')
);
const KycListDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './KycList/KycList')
);

const CountryListDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './CountryList/CountryList')
);
const ConversionPriceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ConversionPrice/ConversionPrice')
);
const KycSettingDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './KycSetting/KycSetting')
);
const FeesSettingDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './FeesSetting/FeesSetting')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={(props) => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={(props) => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={(props) => <AnalyticsDefault {...props} />}
      />
      <Route
        path={`${match.url}/productstatus`}
        render={(props) => <ProductStatusDefault {...props} />}
      />

      {/* <Route
        path={`${match.url}/banklist`}
        render={(props) => <BankListDefault {...props} />}
      />

      <Route
        path={`${match.url}/kyclist`}
        render={(props) => <KycListDefault {...props} />}
      />

      <Route
        path={`${match.url}/countrylist`}
        render={(props) => <CountryListDefault {...props} />}
      />

      <Route
        path={`${match.url}/conversionpricelist`}
        render={(props) => <ConversionPriceDefault {...props} />}
      />
      <Route
        path={`${match.url}/kycsetting`}
        render={(props) => <KycSettingDefault {...props} />}
      /> */}

      <Route
        path={`${match.url}/feessetting`}
        render={(props) => <FeesSettingDefault {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
