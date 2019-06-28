import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import './index.scss';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(5),
  }
}));

const Control = ({controlType, text}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={controlType}
    >
        {text} Control
    </Button>
  )
}

Control.propTypes = {
  controlType: PropTypes.func,
  text: PropTypes.string,
}

export default Control;
