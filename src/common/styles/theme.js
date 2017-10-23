import { createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import yellow from 'material-ui/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: red,
    accent: yellow,
    type: 'light',
  },
});

export default theme;
