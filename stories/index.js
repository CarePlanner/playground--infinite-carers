import React from 'react';
import { storiesOf } from '@storybook/react';
import Navbar from '../src/components/Navbar';
import StaffHoliday from '../src/pages/admin/StaffHoliday';

storiesOf('Navbar', module)
  .add('One menu item called "Features"', () => (
      <Navbar
        menuItems={[
          {
            key: 'features',
            title: 'Features',
            active: true
          }
        ]}
      />)
  )
  .add('The default items', () => (
    <Navbar />
  ));

storiesOf('Staff Holiday', module)
  .add('Admin Variant C', () => (
      <StaffHoliday />
    ));
