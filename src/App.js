import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import createRequest, { fetchRequest, request } from './helpers/createRequest';
import AuthContext from './store/auth-context';
import Login from './views/pages/Login/Login';
import ChangePassword from './views/pages/account/ChangePassword';
// import Limit from './views/pages/Limit/Limit';
// import InstitutionForm from './views/pages/InstitutionForm/InstitutionForm';

// const getRegions = async () => {
//   const regions = await createRequest.get('regions/').then(res => res.data);
//   return regions;
// };

// const getDistricts = async () => {
//   const districts = await createRequest.get('districts/').then(res => res.data);
//   return districts;
// };

// const getExpenses = async () => {
//   const expenses = await createRequest.get('expenses/').then(res => res.data);
//   return expenses;
// };

// const getRole = async () => {
//   const role = await fetchRequest.get('user/').then(res => res.data);
//   return role;
// };

const getCountries = async () => {
  const countries = await request.get('country')
  .then(res => res.data)   
   return countries;
}

const getMonths = async () => {
  const months = await request.get('months').then(res => res.data);
  return months
}

const getProductTypes = async () => {
  const productTypes = await request.get('product/type').then(res => res.data);
  return productTypes
}

// const getSeedTypes = async () => {
//  const seedTypes = await request.get('plants').then(res => res.data);
//   return seedTypes
// }

export default function App() {
  const authCtx = useContext(AuthContext);

  useEffect(async () => {
    if(authCtx.isLoggedIn) {
      if(authCtx.countries.length === 0){
        const loadedCountries = await getCountries();
        authCtx.getCountries(loadedCountries)
      }
      if(authCtx.months.length === 0) {
        const loadedMonths = await getMonths();
        authCtx.getMonths(loadedMonths)
      }
      if(authCtx.productTypes.length === 0) {
        const loadedTypes = await getProductTypes();
        authCtx.getProductTypes(loadedTypes);
      }
      // if(authCtx.seedTypes.length === 0) {
      //   const loadedTypes = await getSeedTypes();
      //   authCtx.getSeedTypes(loadedTypes);
      // }
    }
  }, [])

  return (
    <Switch>
      {!authCtx.isLoggedIn && (
        <Route path="/login">
          <Login />
        </Route>
      )}
      <Route path="/changepassword" component={ChangePassword}/>
      {authCtx.isLoggedIn && <Route component={DashboardLayout} />}
      
      {/* <Route path="/center">
        <InstitutionForm />
      </Route> */}
      {!authCtx.isLoggedIn && <Redirect to="/login" />}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
