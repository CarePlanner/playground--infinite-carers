import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { settingsTransformer } from './utils';
import StaffHoliday from '../../src/pages/admin/StaffHoliday';

const stories = storiesOf('Staff Holiday/Admin Variant C', module);

stories.add('Example', () => (
  <StaffHoliday />
));

const data = require('./staff-holiday-data.csv');

data.forEach((row, i) => {
  if(i > 0) {
    const instance = row[0].replace(/\.care-planner\.co\.uk/g,'');
    const enableStaffHoliday = !!row[1];
    const yearTemplate = settingsTransformer(row);
    stories.add(instance, () => (
      <StaffHoliday
        enableStaffHoliday={ enableStaffHoliday }
        yearTemplate={ yearTemplate }
      />
    ));
  }
});

export default stories;
