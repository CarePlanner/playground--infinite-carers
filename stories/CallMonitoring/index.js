import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import CallMonitoring from '../../src/pages/manage/CallMonitoring';

const stories = storiesOf('Call Monitoring', module);

stories.add('Example', () => (
  <CallMonitoring />
));

export default stories;
