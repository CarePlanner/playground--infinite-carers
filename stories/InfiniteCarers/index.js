import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Blank from '../../src/pages/manage/Blank';
import { personalDetailsTransformer } from './utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import VariantI from '../../src/components/AppointmentDialog/VariantI';
import VariantJ from '../../src/components/AppointmentDialog/VariantJ';

const stories = storiesOf('Infinite Carers', module);

stories.addDecorator(withKnobs);

const data = require('./anon.csv');

const transformedData = data.map(personalDetailsTransformer);

const careRequired = [
  'Help prepare for bed',
  'Laundry',
  'Medication support'
]

stories.add('Variant I', () => (
  <Provider store={createStore(rootReducer)}>
    <Blank
      runsEnabled={boolean('Switch on "Runs"', true)}
      carers={transformedData}
      careRequired={careRequired}
      variant={VariantI}
    />
  </Provider>
));

stories.add('Variant J', () => (
  <Provider store={createStore(rootReducer)}>
    <Blank
      runsEnabled={boolean('Switch on "Runs"', true)}
      carers={transformedData}
      careRequired={careRequired}
      variant={VariantJ}
    />
  </Provider>
));

export default stories;
