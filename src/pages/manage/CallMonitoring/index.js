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
    };
  }

  render() {

    const navbar = (
      <Navbar activeMenuItem={'manage'} activeSecondaryNavbarMenuItem={'call-monitoring'} />
    );

	const headers = ['Date', 'Planned Time', 'Actual Times', 'Client', 'Carer', 'Punctuality', 'Duration', 'Care Provided', 'Source', 'Status', 'Notes'];

	const rows = [
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
		['Today', '00:00 - 23:59', '', 'AaronNolan', 'Required', '', '', '', '', 'Not Started', ''],
	];

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
            <Table headers={headers} rows={rows}></Table>
          </div>
        </Page>
      </div>
    );
  }
}

export default Radium(CallMonitoring);
