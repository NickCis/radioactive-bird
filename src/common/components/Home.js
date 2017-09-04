import React from 'react';
import NotIdealState from './NotIdealState';
import Search from 'material-ui-icons/Search';

export const Home = () => (
  <NotIdealState
    headline="Search tweets!"
    subheading="Use the upper Search bar"
    Icon={Search}
  />
);

export default Home;
