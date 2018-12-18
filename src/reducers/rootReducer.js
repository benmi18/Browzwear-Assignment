import clients from "../dbStore/clients.json";
const customers = clients.Customers;

const initState = {};
// set id for each entry eg. country, city, company
let id = 1;

customers.forEach(row => {
  // Reorder the Data and adding counts for cities and companies from JSON file to new initState obj
  const country = row.Country;
  const city = row.City;
  const company = row.CompanyName;
  const address = row.Address;

  if (!initState[country]) {
    // if country not in the initState obj, add it
    initState[country] = { count: 1 };
    initState[country].cities = [];
    initState[country].cities.push({ cityName: city, id: id++ });
    initState[country].cities[0].companyCount = 1;
    initState[country].cities[0].companies = [];
    initState[country].cities[0].companies.push({
      companyName: company,
      address: address,
      id: id++
    });
  } else {
    // if country in the initState obj
    let cityRes = initState[country].cities.find(element => {
      // try to find the current city in the country obj
      return element.cityName === city;
    });
    if (cityRes === undefined) {
      // if city not there, push it to the country obj
      initState[country].count++;
      initState[country].cities.push({ cityName: city, id: id++ });
      initState[country].cities[
        initState[country].cities.length - 1
      ].companyCount = 1;
      initState[country].cities[
        initState[country].cities.length - 1
      ].companies = [];
      initState[country].cities[
        initState[country].cities.length - 1
      ].companies.push({ companyName: company, address: address, id: id++ });
    } else {
      // if city in the country obj
      let companyRes = initState[country].cities[ // try to find the company in the city obj
        initState[country].cities.length - 1
      ].companies
        .find(element => {
          return element === company;
        });
      if (companyRes === undefined) {
        // if company no there, push it to the city obj
        initState[country].cities[initState[country].cities.length - 1]
          .companyCount++;
        initState[country].cities[
          initState[country].cities.length - 1
        ].companies.push({ companyName: company, address: address, id: id++ });
      }
    }
  }
});

// new obj for sorting the needed data
let sortedState = { all: [] };
for (let obj in initState) {
  sortedState.all.push({
    id: id++,
    country: obj,
    count: initState[obj].count,
    cities: initState[obj].cities
  });
}

// Sort coutries by number of cities
sortedState.all.sort((a, b) => {
  return b.count - a.count;
});

// Sort cities by number of companies
sortedState.all.forEach(obj => {
  obj.cities.sort((a, b) => {
    return b.companyCount - a.companyCount;
  });
});

// sort companies by a,b,c
sortedState.all.forEach(obj => {
  obj.cities.forEach(city => {
    city.companies.sort();
  });
});

// init first country cities
sortedState.initCities = sortedState.all[0].cities;
// init first city companies
sortedState.initCompanies = sortedState.all[0].cities[0].companies;
// init first company map address
sortedState.initMap = sortedState.all[0].cities[0].companies[0].address;

const rootReducer = (state = sortedState, action) => {
  if (action.type === "SHOW_CITIES") {
    const country = state.all.filter(country => {
      return country.id === action.id;
    });
    return {
      ...state,
      initCities: country[0].cities,
      initCompanies: country[0].cities[0].companies
    };
  }

  if (action.type === "SHOW_COMPANIES") {
    const city = state.initCities.filter(city => {
      return city.id === action.id;
    });
    return {
      ...state,
      initCompanies: city[0].companies,
      initMap: city[0].companies[0].address
    };
  }

  if (action.type === "SHOW_MAP") {
    const company = state.initCompanies.filter(company => {
      return company.id === action.id;
    });
    return {
      ...state,
      initMap: company[0].address
    };
  }
  return state;
};

export default rootReducer;
