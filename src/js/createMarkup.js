export function renderCountryList(countries) {
  return countries
    .map(country => {
      return `
          <li class='country-list__item'>
            <img src='${country.flags.svg}' alt='${country.name.official}' width='30'>
            <p>${country.name.official}</p>
          </li>
      `;
    })
    .join('');
}

export function renderCountryInfo(countries) {
  return countries
    .map(country => {
      return `
      <h1 class='country-list__title'>
        <img src='${country.flags.svg}' 
        alt='${country.name.official}' width='30'>
        <p>${country.name.official}</p> 
      </h1> 
      <ul> 
        <li class='country-list__item'>Capital: ${country.capital}</li> 
        <li class='country-list__item'>Population: ${country.population}</li> 
        <li class='country-list__item'>Languages: ${Object.values(
          country.languages
        )}</li> 
      </ul>
      `;
    })
    .join('');
}
