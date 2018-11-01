import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import styles from './styles';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import { H1, Span, A, H5 } from '../../../components/Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../../components/Form';
import Table from '../../../components/Table';
import AppointmentDialog from '../../../components/AppointmentDialog';
import HoverBox from '../../../components/HoverBox';

class CallMonitoring extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderHoverBox: false,
      renderAppointmentDialog: false
    };
    this.ref = React.createRef();
  }

  render() {

    const self = this;

    const { initialDialogPosition } = this.state;

    const navbar = (
      <Navbar activeMenuItem={'manage'} activeSecondaryNavbarMenuItem={'call-monitoring'} />
    );

  	const headers = ['Date', 'Planned Time', 'Actual Times', 'Client', 'Carer', 'Punctuality', 'Duration', 'Care Provided', 'Medication Provided', 'Source', 'Status', 'Notes'];

  	const rows = [
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', '', 'Not Started', ''],
  	];

    const bodyTrStyle = (row, i) => {
      return {
        ':hover': {
          backgroundColor: '#E9f0F1'
        },
        cursor: 'pointer',
        backgroundColor: (row[4] === 'Required') ? '#F9D4B2' : '#FFFFFF'
      }
    };

    const bodyTrOnClick = (e, row, i, elem) => {
      self.setState({
        renderAppointmentDialog: !self.state.renderAppointmentDialog,
        initialDialogPosition: {
          top: elem.offsetTop + 250,
          left: (elem.offsetLeft + elem.offsetWidth / 2) - 436
        }
      });
    };

    const bodyTdOnMouseMove = (e, cell, i) => {
      if(i === 8) {
        self.setState({
          renderHoverBox: true
        });
      } else {
        self.setState({
          renderHoverBox: false
        });
      }
    };

    const bodyTdOnMouseLeave = (e, cell, i) => {
      if(i === 8) {
        self.setState({
          renderHoverBox: false
        });
      }
    };

  const dialog = (
    <AppointmentDialog
      parent={this.ref}
      dialogPosition={initialDialogPosition}
    >
      {<span></span>}
    </AppointmentDialog>
  )

  const hoverBox = (
    <HoverBox
      parent={this.ref}
    />
  )

    return (
      <div ref={this.ref}>
        <Page navbar={navbar}>
          <div style={{display: 'flex', alignContent: 'flex-start', alignItems: 'center', justifyContent: 'flex-start'}}>
            <div>
              <H5>Date</H5>
              <Select></Select>
            </div>
            <div>
              <H5>Carers</H5>
              <Select options={['AaronNolan']}></Select>
            </div>
            <div>
              <H5>Clients</H5>
              <Select options={['AaronNolan']}></Select>
            </div>
            <div>
              <H5>Status</H5>
              <Select options={['AaronNolan']}></Select>
            </div>
            <div>
              <H5>Care Provided</H5>
              <Select options={['AaronNolan']}></Select>
            </div>
            <div>
              <H5>Duration Reasons</H5>
              <Select options={['AaronNolan']}></Select>
            </div>
          </div>
          <Button label={'Filter'} theme={'neutral'} />
          <div>
            <Table
              headers={headers}
              rows={rows}
              bodyTrStyle={bodyTrStyle}
              bodyTrOnClick={bodyTrOnClick}
              bodyTdOnMouseMove={bodyTdOnMouseMove}
              bodyTdOnMouseLeave={bodyTdOnMouseLeave}>
            </Table>
          </div>
        </Page>
        {this.state.renderAppointmentDialog && dialog}
      </div>
    );
  }
}

export default Radium(CallMonitoring);
