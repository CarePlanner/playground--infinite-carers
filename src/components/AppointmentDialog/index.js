import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import Dialog from '../Dialog';
import { H1, Span, A, H5 } from '../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../Form';
import CarerPopup from './CarerPopup';
import CarerSelector from './CarerSelector';

import { addCarerSlot } from './actions';

class AppointmentDialog extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      activeTab: (args.activeTab) ? args.activeTab : 'appointment',
      tabs: {
        'appointment': {
            title: 'Appointment',
            body: () => this.renderAppointmentTab.bind(this)()
        },
        'care-required': {
            title: 'Care Required',
            body: ''
        },
        'finance': {
            title: 'Finance',
            body: ''
        },
        'travel': {
            title: 'Travel',
            body: ''
        },
        'Notes': {
            title: 'Notes',
            body: ''
        },
        'History': {
            title: 'History',
            body: ''
        }
      },
      allCarers: [
        {
          id: 1,
          name: 'Dale Webb',
          crmStatus: 'Active',
          jobTitle: 'HCA',
          defaultTravelMethod: 'Walking'
        },
        {
          id: 2,
          name: 'James Hollister',
          crmStatus: 'Active',
          jobTitle: 'HCA',
          defaultTravelMethod: 'Public Transport'
        }
      ]
    };
  }

  addSlot() {
    this.props.addCarerSlot();
  }

  renderAppointmentTab() {

    const { allCarers } = this.state;
    const { runsEnabled, carerSlots } = this.props;

    return (
      <div style={styles.form}>
        <div style={styles.formComponentsContainer}>
          <div style={styles.formRow}>
            <div style={styles.formLabelContainer}>
              <H5>Start Time</H5>
            </div>
            <div>
              <TextBox
                type={'text'}
                value={ '' }
                onChange={ null }
                style={{ width: 100 }}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formLabelContainer}>
              <H5>End Time</H5>
            </div>
            <div>
              <TextBox
                type={'text'}
                value={ '' }
                onChange={ null }
                style={{ width: 100 }}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formLabelContainer}>
              <H5>Duration</H5>
            </div>
            <div>
              <Span>1 hour</Span>
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formLabelContainer}>
              <H5>Booking Ref</H5>
            </div>
            <div>
              <TextBox
                type={'text'}
                value={ '' }
                onChange={ null }
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        <div style={styles.formComponentsContainer}>
          <div>
            {carerSlots.map((carerSlot, i) => (
              <CarerSelector
                key={carerSlot.id}
                id={carerSlot.id}
                position={i}
                allCarers={allCarers}
                runsEnabled={runsEnabled}
              />
            ))}
            <Button theme={'neutral'} label={'Add Carer'} style={{width: 200}} onClick={this.addSlot.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    return null
  }

  renderFooter() {
    return (
      <Button theme={'neutral'} label={'Save'}/>
    )
  }

  render() {

    const { tabs, activeTab } = this.state;
    const { parent, dialogPosition, children } = this.props;

    return (
      <Dialog
        parent={parent}
        tabs={tabs}
        activeTab={activeTab}
        dialogPosition={dialogPosition}
        header={this.renderHeader()}
        footer={this.renderFooter()}
      />
    );
  }
}

const mapStateToProps = state => {
  return { ...state.appointmentDialogReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    addCarerSlot: () => dispatch(addCarerSlot())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(AppointmentDialog));
