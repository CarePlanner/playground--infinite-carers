import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import Dialog from '../Dialog';
import { H1, H2, Span, A, H5 } from '../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../Form';
import CarerPopup from './CarerPopup';
import CarerSelector from './CarerSelector';

import { addCarerSlot } from './actions';

const bin = require('../../assets/bin.png');
const cross = require('../../assets/cross.png');
const reload = require('../../assets/reload.png');

class AppointmentDialog extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      activeTab: (args.activeTab) ? args.activeTab : 'appointment',
      tabs: {
        'appointment': {
            title: 'Appointment',
            body: () => this.renderAppointmentTab.bind(this)()
        }
      }
    };
  }

  addSlot() {
    this.props.addCarerSlot();
  }

  renderAppointmentTab() {

    const { allCarers, runsEnabled, carerSlots, careRequired } = this.props;

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
                careRequired={careRequired}
                runsEnabled={runsEnabled}
              />
            ))}
            <Button theme={'neutral'} label={'Add Carer'} style={{width: '100%'}} onClick={this.addSlot.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <div style={styles.header}>
        <div>
          <H2>Client: </H2>
          &nbsp;
          <H2 style={styles.headerClientName}>Amelie Gibson</H2>
        </div>
        <div style={styles.headerLinks}>
          <A style={styles.headerLink}>
            <img src={cross} style={styles.headerLinkImage} />
            Cancel
          </A>
          <A style={styles.headerLink}>
            <img src={bin} style={styles.headerLinkImage} />
            Delete
          </A>
          <A style={styles.headerLink}>
            <img src={reload} style={styles.headerLinkImage} />
            View in schedule
          </A>
        </div>
      </div>
    );
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
