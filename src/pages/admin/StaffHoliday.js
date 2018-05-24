import React from 'react';
import Radium from 'radium';

import Page from '../../components/Page';
import Navbar from '../../components/Navbar';
import { H1, Span } from '../../components/Text';
import { Checkbox } from '../../components/Form';

class StaffHoliday extends React.Component {

  render() {

    const navbar = (
      <Navbar active={"admin"} />
    );

    return (
      <Page navbar={navbar}>
        <H1>Staff Holiday</H1>
        <Checkbox label={"Use CarePlanner to track staff holiday allowance."} checked={false} />
      </Page>
    );
  }
}

export default Radium(StaffHoliday);
