import React from 'react';
import Radium from 'radium';
import styles from './styles';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import { H1, Span, A, H5 } from '../../../components/Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../../components/Form';
import Table from '../../../components/Table';

class CallMonitoring extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderTooltip: false,
      renderAppointmentDialog: false,
      tooltipPosition: {
        top: 0,
        left: 0
      },
      appointmentDialogPosition: {
        top: 0,
        left: 0
      }
    };
  }

  renderTooltip() {
    return (
      <div style={[styles.tooltip, this.state.tooltipPosition]}>
        <div>
          <div style={styles.tooltipTitle}>Joshua Gregory</div>
          <div>
            <div>
              <div style={styles.tooltipRowTitle}>Address</div>
              <div style={styles.tooltipRowText}>
                58 Brackendene, Bradley Stoke, Bristol, South Gloucestershire
                <br />
                BS32 9DH
              </div>
            </div>
            <div>
              <div style={styles.tooltipRowTitle}>Phone</div>
              <div style={styles.tooltipRowText}>07775592938</div>
            </div>
            <div>
              <div style={styles.tooltipRowTitle}>Mobile</div>
              <div style={styles.tooltipRowText}>07775592938</div>
            </div>
            <div>
              <div style={styles.tooltipRowTitle}>Region(s)</div>
              <div style={styles.tooltipRowText}></div>
            </div>
            <div>
              <div style={styles.tooltipRowTitle}>Default Invoice Group</div>
              <div style={styles.tooltipRowText}>Local Authority</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {

    const self = this;

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

  const bodyTdOnClick = (e, cell, i) => {
    if(i === 8) {

    }
  };

  const bodyTdOnMouseMove = (e, cell, i) => {
    if(i === 8) {
      self.setState({
        renderTooltip: true,
        tooltipPosition: {
          top: e.pageY + 15,
          left: e.pageX + 15,
        }
      });
    } else {
      self.setState({
        renderTooltip: false
      });
    }
  };

  const bodyTdOnMouseLeave = (e, cell, i) => {
    if(i === 8) {
      self.setState({
        renderTooltip: false
      });
    }
  };

    return (
      <div>
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
              bodyTdOnClick={bodyTdOnClick}
              bodyTdOnMouseMove={bodyTdOnMouseMove}
              bodyTdOnMouseLeave={bodyTdOnMouseLeave}>
            </Table>
            {this.state.renderTooltip && this.renderTooltip()}
          </div>
        </Page>
      </div>
    );
  }
}

export default Radium(CallMonitoring);
