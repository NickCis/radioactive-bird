import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import { createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import yellow from 'material-ui/colors/yellow';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
  palette: {
    primary: red,
    accent: yellow,
    type: 'light',
  },
});

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

// This is needed in order to inject the critical CSS.
const sheetsRegistry = new SheetsRegistry();

export { jss, theme, sheetsManager, sheetsRegistry };
