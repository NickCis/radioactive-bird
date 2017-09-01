export const fetchCounter = () => {
  return fetch('/api/counter').then(res => res.json());
};
