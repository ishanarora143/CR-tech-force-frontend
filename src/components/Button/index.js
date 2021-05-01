import React from 'react';
import clsx from 'clsx';
import MaterialUIButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './Button.scss';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '8px',
    textTransform: 'capitalize',
    padding: '10px 22px 10px 18px',
    justifyContent: 'flex-start',
  },
}));

const Button = ({ id, underlined, style, name, variant, icon, disabled = false, text, onClick = () => { } }) => {
  const classes = useStyles();

  const handleOnClick = (event) => {
    onClick(event);
  }

  return (
    <MaterialUIButton
      variant={variant || "contained"}
      color="primary"
      disabled={disabled}
      id={props.id}
      size="large"
      style={style}
      className={clsx(classes.button, variant ? 'Button' : 'Button linear-gradient')}
      startIcon={icon}
      onClick={handleOnClick}
    >
      <span style={{ textDecoration: underlined ? 'underline' : 'none' }}>
        {text}
      </span>
    </MaterialUIButton>
  );
};

export default Button;
