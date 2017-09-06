import React from 'react';
import Status from './Status';
import NotIdealState from './NotIdealState';
import MoodBad from 'material-ui-icons/MoodBad';

export const NotFound = () => (
  <Status code={404}>
    <NotIdealState
      headline="404: Not Found"
      subheading="The page you requested was not found"
      Icon={MoodBad}
    />
  </Status>
);

export default NotFound;
