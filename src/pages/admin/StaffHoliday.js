import React from 'react';
import Radium from 'radium';

import Page from '../../components/Page';
import Navbar from '../../components/Navbar';
import { H1, Span, A, H5 } from '../../components/Text';
import { Button, Checkbox, Radio } from '../../components/Form';
import Table from '../../components/Table';
import Overlay from '../../components/Overlay';

class StaffHoliday extends React.Component {

  openOverlay() {
    this.setState({
      showOverlay: true
    });
  }

  closeOverlay() {
    this.setState({
      showOverlay: false
    })
  }

  renderOverlay() {

    return (
      <Overlay title={"Staff Holiday settings"} onClose={this.closeOverlay.bind(this)}>
        <div>
          <div>
            <Span>
              {"The holiday year starts at the beginning of"}
            </Span>
          </div>
          <div>
            <Checkbox label={'I have staff working part-time and some working irregular hours'} checked={false} />
            <div style={styles.subform}>
              <div style={styles.formSection}>
                <H5>Holiday entitlement</H5>
                <div>
                  <Radio label={'12.07% ACAS standard accrual'} checked={false} />
                  <Radio label={'8% Irish standard accrual'} checked={false} />
                  <Radio label={'Fixed at hours'} checked={false} />
                </div>
              </div>
              <div style={styles.formSection}>
                <H5>Excess hours</H5>
                <div>
                  <Radio label={'12.07% ACAS standard accrual'} checked={false} />
                  <Radio label={'8% Irish standard accrual'} checked={false} />
                  <Radio label={'Fixed at hours'} checked={false} />
                </div>
              </div>
              <div style={styles.formSection}>
                <H5>Rate of pay</H5>
                <div>
                  <Radio label={'12.07% ACAS standard accrual'} checked={false} />
                  <div style={[styles.subform, styles.formSection]}>
                    <Checkbox label={'12.07% ACAS standard accrual'} checked={false} />
                  </div>
                  <Radio label={'8% Irish standard accrual'} checked={false} />
                  <Radio label={'Fixed at hours'} checked={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    );
  }

  render() {

    const { showOverlay } = this.state;

    const navbar = (
      <Navbar active={'admin'} />
    );

    const headers = ['Year', 'Month beginning', 'Holiday calculated', 'Entitlement', 'Pay rate', ''];
    const rows = [
      ['2020', 'On the month of carers\' start date', 'Hourly', '165 hours', 'Automatic (based on a weekday pay rate)', <span><A onClick={this.openOverlay.bind(this)}>Edit</A>|<A>Delete</A></span>],
      ['2019', 'On the month of carers\' start date', 'Hourly', '165 hours', 'Automatic (based on a weekday pay rate)', <span><A onClick={this.openOverlay.bind(this)}>Edit</A>|<A>Delete</A></span>]
    ]

    return (
      <div>
        <Page navbar={navbar}>
          <H1>Staff Holiday</H1>
          <Checkbox label={'Use CarePlanner to track staff holiday allowance.'} checked={false} />
          <Button label={'Add next year'} theme={'positive'}/>
          <Table headers={headers} rows={rows}></Table>
        </Page>
        {(showOverlay) ? this.renderOverlay() : null}
      </div>
    );
  }
}

const styles = {
  subform: {
    marginLeft: 20,
    padding: 15,
    backgroundColor: 'rgba(216, 216, 216, .5)',
  },
  formSection: {
    marginBottom: 20
  }
}

export default Radium(StaffHoliday);
