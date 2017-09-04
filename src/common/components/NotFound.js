import React from 'react';
import NotIdealState from './NotIdealState';
import MoodBad from 'material-ui-icons/MoodBad';

export const NotFound = () => (
  <NotIdealState
    headline="404: Not Found"
    subheading="The page you requested was not found"
    Icon={MoodBad}
  />
);

export default NotFound;
