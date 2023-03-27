import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import { renderCountryInfo } from './createMarkup';
import { renderCountryList } from './createMarkup';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const counrtyListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const handleSearchCountryOnInput = e => {
  e.preventDefault();
  const seekedCountry = e.target.value.trim();

  if (!seekedCountry) {
    resetList();
    return;
  }

  fetchCountries(seekedCountry)
    .then(data => {
      if (data.length > 10) {
        resetList();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1) {
        resetList();
        const markupCountryList = renderCountryList(data);
        counrtyListEl.innerHTML = markupCountryList;
      } else {
        resetList();
        const markupCountryInfo = renderCountryInfo(data);
        countryInfoEl.innerHTML = markupCountryInfo;
      }
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

function resetList() {
  counrtyListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
