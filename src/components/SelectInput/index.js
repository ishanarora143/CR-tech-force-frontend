import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
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

  return (
    <div className="SelectInput d-flex" style={{flex: 1, flexBasis: '25%', flexShrink: 0, overflow: 'hidden'}}>
      <Autocomplete
          className={classes.formControl}
          options={options}
          value={value}
          getOptionLabel={(option) => option}
          style={{ width: "100%" }}
          onChange={(event, value) => onChange(value)}
          renderInput={(params) => (
            <TextField
              className={classes.selectEmpty}
              autoComplete="off"
              {...params}
              error={firstClick && !value}
              label={label}
              required
              variant='outlined'
              
            />
          )}
        />
    </div>
  );
};

export default SelectInput;
