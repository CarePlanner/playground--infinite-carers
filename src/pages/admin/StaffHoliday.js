import React from 'react';
import Radium from 'radium';

import Page from '../../components/Page';
import Navbar from '../../components/Navbar';
import { H1 } from '../../components/Text';

class StaffHoliday extends React.Component {

  render() {

    const navbar = (
      <Navbar
        active={"admin"}
      />
    );

    return (
      <Page
        navbar={navbar}
      >
        <H1>Staff Holiday</H1>
      </Page>
    );
  }
}

export default Radium(StaffHoliday);
