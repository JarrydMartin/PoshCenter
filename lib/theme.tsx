import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#12d3cf',
    },
    // '#67eaca'
    secondary: {
      main: '#000', 
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f8f8ff',
    },
  },
});

export default theme;