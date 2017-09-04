import App from './components/App';
import Home from './components/Home';
import TweetList from './containers/TweetList';
import Tweet from './containers/Tweet';
import NotFound from './components/NotFound';

const routes = [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true,
      },
      {
        component: TweetList,
        path: '/search/:query',
      },
      {
        component: Tweet,
        path: '/tweet/:id',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
