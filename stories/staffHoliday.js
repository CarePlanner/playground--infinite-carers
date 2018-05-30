import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import StaffHoliday from '../src/pages/admin/StaffHoliday';

export default storiesOf('Staff Holiday', module)
  .add('Admin Variant C', () => (
      <StaffHoliday />
    ));
