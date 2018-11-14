import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Blank from '../../src/pages/manage/Blank';

const stories = storiesOf('Infinite Carers', module);

stories.addDecorator(withKnobs);

stories.add('Example', () => (
  <Blank
    runsEnabled={boolean('Switch on "Runs"', true)}
  />
));

export default stories;
