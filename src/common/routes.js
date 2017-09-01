import App from './components/App';
import Counter from './containers/Counter';
import NotFound from './components/NotFound';

const routes = [
  {
    component: App,
    routes: [
      {
        component: Counter,
        path: '/',
        exact: true,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
