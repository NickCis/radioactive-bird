import App from './components/App';
import Counter from './containers/Counter';
import NotFound from './components/NotFound';

const routes = [
  {
    key: 'app',
    component: App,
    routes: [
      {
        key: 'counter',
        component: Counter,
        path: '/',
        exact: true,
      },
      {
        key: 'not-found',
        component: NotFound,
      },
    ],
  },
];

export default routes;
