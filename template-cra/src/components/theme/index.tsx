import { createMuiTheme } from '@material-ui/core/styles';
import {
  // amber,
  // blue,
  // blueGrey,
  // brown,
  // cyan,
  // common,
  // deepOrange,
  // deepPurple,
  // green,
  grey,
  // lightBlue,
  // lightGreen,
  // lime,
  orange,
  // pink,
  // purple,
  red,
  // teal,
  // yellow
} from '@material-ui/core/colors';

// A custom theme for this app
const theme = () => {
  return createMuiTheme({
    palette: {
      primary: orange,
      secondary: grey,
      error: red,
      background: {
        paper: '#fff',
        default: '#fafafa',
      },
      text: {
        primary: '#2A2A2A',
        secondary: '#54545E',
        disabled: '#A9A9AE',
        hint: '#d1d2d5',
      },
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      button: {
        textTransform: 'unset',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 4,
    },
    zIndex: {
      mobileStepper: 1000,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  });
};

export default theme;
