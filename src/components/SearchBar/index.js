/* eslint-disable/ */
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';

import statesCitiesData from './../../utils/state-city-map';
import { requirements } from './../../constants';
import ROUTES from './../../constants/routes';

import { Context as SearchContext } from './../../context/SearchContext';

import Button from './../Button';
import SelectInput from './../SelectInput';

import './SearchBar.scss';

const SearchBar = (props) => {
  const { history } = props;
  const { searchInputs, state } = useContext(SearchContext);
  const [selectedState, setSelectedState] = useState(state.searchInputs ? state.searchInputs.state : '');
  const [selectedCity, setSelectedCity] = useState(state.searchInputs ? state.searchInputs.city : '');
  const [selectedRequirement, setSelectedRequirement] = useState(state.searchInputs ? state.searchInputs.requirement : '');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (state && state.searchInputs) {
      setSelectedState(selectedState);
      setSelectedCity(selectedCity);
      const selectedStatData = statesCitiesData.find(
        (state) => state.state === selectedState
      );

      const citiesData =
        !!selectedStatData &&
          !!selectedStatData.cities &&
          selectedStatData.cities.length > 0
          ? selectedStatData.cities
          : [];

      setCities(citiesData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const states = statesCitiesData.map((state) => state.state);


  const handleStateChange = (selectedState) => {
    setSelectedState(selectedState);
    setSelectedCity('');
    const selectedStatData = statesCitiesData.find(
      (state) => state.state === selectedState
    );

    const citiesData =
      !!selectedStatData &&
        !!selectedStatData.cities &&
        selectedStatData.cities.length > 0
        ? selectedStatData.cities
        : [];

    setCities(citiesData);
  };




  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
  };

  const handleRequirementChange = (selectedRequirement) => {
    setSelectedRequirement(selectedRequirement);
  };

  const handleSubmit = () => {
    const {
      location: { pathname },
    } = history;
    const searchQuery = {
      state: selectedState,
      city: selectedCity,
      requirement: selectedRequirement,
    };
    searchInputs(searchQuery);

    if (props.onSubmit
    ) {
      props.onSubmit();
    }

    pathname === '/' && history.push(`${ROUTES.SEARCH}?executeSearch=true`);
  };

  return (
    <div className="SearchBar d-flex w-100">
      <SelectInput
        label="Select State"
        placeholder="Enter your state"
        value={selectedState || ''}
        options={states}
        onChange={handleStateChange}
      />
      <SelectInput
        label="Select City / Region"
        placeholder="Enter your city"
        value={selectedCity || ''}
        options={cities}
        onChange={handleCityChange}
      />
      <SelectInput
        label="What are you're looking for"
        placeholder="eg. ICU Beds, Oxygen"
        value={selectedRequirement || ''}
        options={requirements}
        onChange={handleRequirementChange}
      />
      <Button
        label="Find Leads"
        icon={<SearchIcon />}
        id="searchButton"
        name="Search leads"
        onClick={() => handleSubmit()}
        disabled={!(selectedRequirement || selectedCity || selectedState)}
      />
    </div>
  );
};

export default withRouter(SearchBar);
