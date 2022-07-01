import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  regions: [],
  districts: [],
  crops: [],
  role: null,
  countries: [],
  months: [],
  productTypes: [],
  seedTypes: [],
  login: token => {},
  logout: () => {},
  getRole: role => {},
  fetchRegion: regions => {},
  fetchDistrict: districts => {},
  fetchCrop: crops => {},
  getCountries: countries => {},
  getMonths: months => {},
  getProductTypes: productTypes => {},
  getSeedTypes: seedTypes => {}
});

export const AuthContextProvider = props => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(null);

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [crops, setCrops] = useState([]);

  const [countries, setCountries] = useState([]);
  const [months, setMonths] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [seedTypes, setSeedTypes] = useState([]);

  //   let userIsLoggedIn = false;
  //   if (token) {
  //     userIsLoggedIn = true;
  //   }
  const userIsLoggedIn = !!token;
  //   const userRole = role;

  const loginHandler = token => {
    localStorage.setItem('token', token);
    setToken(token);
    console.log(userIsLoggedIn);
    window.location.reload();
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const fetchRegionHandler = regions => {
    setRegions(regions);
  };

  const fetchDistrictHandler = districts => {
    setDistricts(districts);
  };

  const fetchCropHandler = crops => {
    setCrops(crops);
  };

  const getRoleHandler = role => {
    setRole(role);
  };

  const getCountriesHandler = countries => {
    setCountries(countries);
  }

  const getMonthsHandler = months => {
    setMonths(months);
  }

  const getProductTypesHandler = productTypes => {
    setProductTypes(productTypes);
  }

  const getSeedTypesHandler = seedTypes => {
    setSeedTypes(seedTypes);
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    regions: regions,
    districts: districts,
    crops: crops,
    role: role,
    countries: countries,
    months: months,
    productTypes: productTypes,
    seedTypes: seedTypes,
    login: loginHandler,
    logout: logoutHandler,
    fetchRegion: fetchRegionHandler,
    fetchDistrict: fetchDistrictHandler,
    fetchCrop: fetchCropHandler,
    getRole: getRoleHandler,
    getCountries: getCountriesHandler,
    getMonths: getMonthsHandler,
    getProductTypes: getProductTypesHandler,
    getSeedTypes: getSeedTypesHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
