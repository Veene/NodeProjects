const axios = require('axios')

//USD, CAD, 20
//20 USD is worth 26 CAD (guess). You can spend these in the following countries: [list countries]

// from will be 3 character currency as will to

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=e3b92fbcdf2fab98d4e4314a6c8a07a2&format=1')
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if(isNaN(rate)) {
            throw new Error()
        }

        return rate;
    } catch (error) {
        throw new Error('unable to get exchange rate')
    }
    
    
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
const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to)
    const countries = await getCountries(to)
    const convertedAmount = (amount * rate).toFixed(2)
    return `${amount} ${from} is worth ${convertedAmount} ${to} .you can spend it in: ${countries.join(', ')}`;
}

// const convertCurrency = async (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2)
//         return getCountries(to)
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to} .you can spend it in: ${countries.join(', ')}`;
//     })
// }
// getConversionAndCountries('usd', 'cad');
convertCurrency('USD', 'CAD', 20).then((message) => console.log(message))
.catch((e) => console.log(e))


//20 USD is worth 26 CAD (guess). You can spend these in the following countries: [list countries]