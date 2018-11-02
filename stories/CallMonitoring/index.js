import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import CallMonitoring from '../../src/pages/manage/CallMonitoring';

const stories = storiesOf('Call Monitoring', module);

stories.addDecorator(withKnobs);

stories.add('Example', () => (
  <CallMonitoring
    runsEnabled={boolean('Switch on "Runs"', true)}
  />
));

export default stories;
