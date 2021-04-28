import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import Button from '../Button';
import ROUTES from './../../constants/routes';
import { Context as SearchContext } from './../../context/SearchContext';
import './PopularCities.scss';

const popularStateCity = [
  {
    state: 'Delhi (National Capital Territory)',
    city: 'Delhi'
  },
  {
    state: 'Uttar Pradesh',
    city: 'Noida'
  },
  {
    state: 'Haryana',
    city: 'Gurgaon'
  },
  {
    state: 'Karnataka',
    city: 'Bangalore'
  },
  {
    state: 'Telangana',
    city: 'Hyderabad'
  },
  {
    state: 'Tamil Nadu',
    city: 'Chennai'
  },
  {
    state: 'Maharashtra',
    city: 'Mumbai'
  }
]

const PopularCities = (props) => {
  const { searchInputs } = useContext(SearchContext);
  const { history } = props;

  const cityButtons = popularStateCity.map(({ state, city }) => (
    <Button
      underlined={true}
      variant="text"
      name="Popular cities"
      style={{ marginRight: '8px', marginBottom: '8px' }}
      key={city}
      text={city}
      onClick={() => handleSubmit(city, state)}
    />
  ));

  const handleSubmit = (city, state) => {
    const searchQuery = {
      state,
      city,
    };
    searchInputs(searchQuery);
    history.push(`${ROUTES.SEARCH}?executeSearch=true`);
  };

  return (
    <div className="PopularCities">
      <div className="PopularCities-title text-align-center">
        POPULAR CITIES
      </div>
      <div className="d-flex PopularCities-cities">{cityButtons}</div>
    </div>
  );
};

export default withRouter(PopularCities);
