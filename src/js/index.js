import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import '../css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const counrtyListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const handleSearchCountryOnInput = e => {
  e.preventDefault();
  const seekedCountry = e.target.value.trim();

  if (!seekedCountry) {
    counrtyListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }

  fetchCountries(seekedCountry)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1) {
        renderCountryList(data);
      } else renderCountryInfo(data);
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    });
};

inputEl.addEventListener(
  'input',
  debounce(handleSearchCountryOnInput, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  countryInfoEl.innerHTML = '';

  const markupCountryList = countries
    .map(country => {
      return `
          <li class='country-list__item'>
            <img src='${country.flags.svg}' alt='${country.name.official}' width='20'>
            <p>${country.name.official}</p>
          </li>
      `;
    })
    .join('');

  counrtyListEl.innerHTML = markupCountryList;
}

function renderCountryInfo(countries) {
  counrtyListEl.innerHTML = '';

  const markupCountryInfo = countries
    .map(country => {
      return `
      <h1>
        <img src='${country.flags.svg}' 
        alt='${country.name.official}' width='20'>
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

  countryInfoEl.innerHTML = markupCountryInfo;
}
