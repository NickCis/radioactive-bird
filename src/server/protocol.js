import { client } from './api';

const getClient = () => {
  if (client.bearerToken) return Promise.resolve(client);

  return client.auth();
};

export const searchTweets = query => {
  return getClient().then(twitter => twitter.search(decodeURIComponent(query)));
};

export const fetchTweet = id => {
  return getClient().then(twitter => twitter.getTweet(id));
};
