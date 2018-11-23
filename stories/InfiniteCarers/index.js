import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Blank from '../../src/pages/manage/Blank';
import { personalDetailsTransformer } from './utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const stories = storiesOf('Infinite Carers', module);

stories.addDecorator(withKnobs);

const data = require('./anon.csv');

const transformedData = data.map(personalDetailsTransformer);

const careRequired = [
  'Help prepare for bed',
  'Laundry',
  'Medication support'
]

stories.add('Example', () => (
  <Provider store={createStore(rootReducer)}>
    <Blank
      runsEnabled={boolean('Switch on "Runs"', true)}
      carers={transformedData}
      careRequired={careRequired}
    />
  </Provider>
));

export default stories;
