import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './SelectInput.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flex: 1,
  },
  selectEmpty: {
    marginTop: '4px',
    marginBottom: '-4px',
    '& fieldset': {
      borderWidth: 0,
    }
  },
  select: {
    '&:focus': {
      background: 'none',
    },
  },
}));

const SelectInput = ({ label, placeholder, options, value, onChange, firstClick, errorMsg }) => {
  const classes = useStyles();

  const optionsData = options.map((option, index) => (
    <MenuItem key={index} value={option}>
      {option}
    </MenuItem>
  ));

  return (
    <div className="SelectInput d-flex flex-grow-1">
      <FormControl className={classes.formControl} error={firstClick && !value}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          {label}
        </InputLabel>
        <Select
          disableUnderline
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          displayEmpty
          className={classes.selectEmpty}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem style={{ opacity: 0.3 }} value="">
            <span>{placeholder}</span>
          </MenuItem>
          {optionsData}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
