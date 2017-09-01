export const fetchCounter = () => {
  return new Promise(rs => {
    console.log('SSR Fetch counter');
    rs({
      number: Math.round(Math.random() * 1000),
    });
  });
};
