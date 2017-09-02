const functions = {};

export const fetchCounter = () => {
  return Promise.resolve({ number: 1 });
};

export const searchTweets = (...args) => functions.searchTweets ? functions.searchTweets(...args) : Promise.resolve();
export const fetchTweet = (...args) => functions.fetchTweet ? functions.fetchTweet(...args) : Promise.resolve();

export const __setCallingFunction = (name, f) => functions[name] = f;
