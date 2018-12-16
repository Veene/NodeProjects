const axios = require('axios')

//USD, CAD, 20
//20 USD is worth 26 CAD (guess). You can spend these in the following countries: [list countries]

// from will be 3 character currency as will to

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=e3b92fbcdf2fab98d4e4314a6c8a07a2&format=1')
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
    
    // return axios.get('http://data.fixer.io/api/latest?access_key=e3b92fbcdf2fab98d4e4314a6c8a07a2&format=1')
    // .then((response) => {
    //     const euro = 1 / response.data.rates[from];
    //     const rate = euro * response.data.rates[to];
    //     return rate
    // })
};
const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    const countries = response.data.map((country) => country.name)
    return countries;

    // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    // .then((response => {
    //     return response.data.map((country) => country.name)
    // }))
}
getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate)
})
getCountries('CAD').then((countries) => {
    console.log(countries)
})
const getConversionAndCountries = (from, to) => {
    const rate = getExchangeRate(from, to)
    let value = rate * 20
    const countries = getCountries(to)
    console.log(`20 ${from} is worth ${value} ${to}. You can spend these in the following countries: ${countries}`) 
}

getConversionAndCountries('usd', 'cad');
//20 USD is worth 26 CAD (guess). You can spend these in the following countries: [list countries]