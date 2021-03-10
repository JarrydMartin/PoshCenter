import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#12d3cf',
    },
    secondary: {
      main: '#67eaca',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fcf9ec',
    },
  },
});

export default theme;