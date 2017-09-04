import App from './components/App';
import Counter from './containers/Counter';
import TweetList from './containers/TweetList';
import Tweet from './containers/Tweet';
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
        key: 'tweet-list',
        component: TweetList,
        path: '/search/:query',
      },
      {
        key: 'tweet',
        component: Tweet,
        path: '/tweet/:id',
      },
      {
        key: 'not-found',
        component: NotFound,
      },
    ],
  },
];

export default routes;
