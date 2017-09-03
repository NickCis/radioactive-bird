export const fetchCounter = () => {
  return fetch('/api/counter').then(res => res.json());
};

export const searchTweets = query => {
  return fetch(`/api/search/${query}`).then(res => res.json());
};

export const fetchTweet = id => {
  return fetch(`/api/tweet/${id}`).then(res => res.json());
};
