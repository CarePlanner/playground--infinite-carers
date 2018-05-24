import React from 'react';
import Radium from 'radium';

import Page from '../../components/Page';
import Navbar from '../../components/Navbar';
import { H1, Span } from '../../components/Text';
import { Button, Checkbox } from '../../components/Form';
import Table from '../../components/Table';

class StaffHoliday extends React.Component {

  render() {

    const navbar = (
      <Navbar active={'admin'} />
    );

    const headers = ['Year', 'Month beginning', 'Holiday calculated', 'Entitlement', 'Pay rate', ''];
    const rows = [
      ['2020', 'On the month of carers\' start date', 'Hourly', '165 hours', 'Automatic (based on a weekday pay rate)'],
      ['2019', 'On the month of carers\' start date', 'Hourly', '165 hours', 'Automatic (based on a weekday pay rate)']
    ]

    return (
      <Page navbar={navbar}>
        <H1>Staff Holiday</H1>
        <Checkbox label={'Use CarePlanner to track staff holiday allowance.'} checked={false} />
        <Button label={'Add next year'} theme={'positive'}/>
        <Table headers={headers} rows={rows}></Table>
      </Page>
    );
  }
}

export default Radium(StaffHoliday);
