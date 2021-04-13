import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import MouseIcon from '@material-ui/icons/Mouse';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(forwhat) {
  const classes = useStyles();
  let startvalue = Number(localStorage.getItem(forwhat.forwhat))
  startvalue += 2
  const [value, setValue] = React.useState(startvalue)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem(forwhat.forwhat, newValue - 2)
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    localStorage.setItem(forwhat.forwhat, event.target.value - 2)
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      localStorage.setItem(forwhat.forwhat, 0 - 2)
    } else if (value > 4) {
      setValue(3.9);
      localStorage.setItem(forwhat.forwhat, 3.9 - 2)
    }
  };

  let desctiption;
  if (forwhat.forwhat === "sensix") {
    desctiption = "Mouse Sensitivity in X direction"
  } else {
      desctiption = "Mouse Sensitivity in Y direction"
  }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        {desctiption}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <MouseIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={3.9}
            step={0.1}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 3.9,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <br></br>
    </div>
  );
}