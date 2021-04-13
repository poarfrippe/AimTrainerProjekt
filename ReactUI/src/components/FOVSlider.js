import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import PanoramaWideAngleIcon from '@material-ui/icons/PanoramaWideAngle';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function FOVSlider() {
  const classes = useStyles();
  let startvalue = Number(localStorage.getItem("FOV"))
  const [value, setValue] = React.useState(startvalue)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("FOV", newValue)
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    localStorage.setItem("FOV", event.target.value)
  };

  const handleBlur = () => {
    if (value < 40) {
      setValue(40);
      localStorage.setItem("FOV", 40)
    } else if (value > 120) {
      setValue(120);
      localStorage.setItem("FOV", 120)
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Field Of View
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <PanoramaWideAngleIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={120}
            min={40}
            step={1}
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
              step: 1,
              min: 40,
              max: 120,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}