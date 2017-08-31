import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import createPalette from 'material-ui/styles/palette'
import createMuiTheme from 'material-ui/styles/theme'
import { red, yellow } from 'material-ui/colors'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

const theme = createMuiTheme({
  palette: createPalette({
    primary: red,
    accent: yellow,
    type: 'light',
  }),
});

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

// This is needed in order to inject the critical CSS.
const sheetsRegistry = new SheetsRegistry();

export {
  jss,
  theme,
  sheetsManager,
  sheetsRegistry,
}
