import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';

import Navbar from '../src/components/Navbar';

const defaultMenuItems = [
  {
    key: 1,
    title: 'Dashboard'
  },
  {
    key: 2,
    title: 'Carers'
  },
  {
    key: 3,
    title: 'Clients'
  },
  {
    key: 4,
    title: 'Manage'
  },
  {
    key: 5,
    title: 'Reports'
  },
  {
    key: 6,
    title: 'Finance'
  },
  {
    key: 7,
    title: 'Admin'
  }
];

const stories = storiesOf('Navbar', module)

stories.addDecorator(withKnobs);

stories.add('Customisable menu items', () => {

  let menuItems = [];

  const numberOfMenuItems = number('# of menu items', defaultMenuItems.length, {}, 'config');

  for(let i = 0; i < numberOfMenuItems; i++) {
    const title = (i < defaultMenuItems.length) ? defaultMenuItems[i].title : '';
    menuItems[i] = {
      key: text(`Name of menu item ${i+1}`, title, `Menu item ${i+1}`),
      title: text(`Name of menu item ${i+1}`, title, `Menu item ${i+1}`)
    };
  }

  const active = select('The active menu item', Array.from(menuItems, (a) => a.title), menuItems[0].key, 'config');

  return (
      <Navbar
        active={ active }
        menuItems={ menuItems }
      />
  );
});

stories.add('The default items', () => (
    <Navbar />
));

export default stories;
