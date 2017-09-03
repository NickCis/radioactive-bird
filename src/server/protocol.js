import searchStubResponse from './api/searchStubResponse';

export const fetchCounter = () => {
  return new Promise(rs => {
    console.log('SSR Fetch counter');
    rs({
      number: Math.round(Math.random() * 1000),
    });
  });
};

export const searchTweets = query => {
  return new Promise(rs => {
    rs(searchStubResponse);
  });
};

export const fetchTweet = id => {
  return new Promise(rs => {
    rs(searchStubResponse.statuses[0]);
  });
};
