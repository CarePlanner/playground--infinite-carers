import React from 'react';
import Radium from 'radium';
import styles from './styles';
import Dialog from '../Dialog';
import { H1, Span, A, H5 } from '../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../Form';
import CarerPopup from './CarerPopup';
import CarerSelector from './CarerSelector';

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
          name: 'Dale Webb'
        },
        {
          id: 2,
          name: 'James Hollister'
        }
      ],
      selectedCarers: [{}]
    };
  }

  addCarerSlot() {
    let currentCarers = this.state.selectedCarers;
    currentCarers.push({});
    this.setState({
      selectedCarers: currentCarers
    });
  }

  removeCarerSlot(i) {
    let currentCarers = this.state.selectedCarers;
    currentCarers.splice(i, 1);
    this.setState({
      selectedCarers: currentCarers
    });
  }

  renderAppointmentTab() {

    const { selectedCarers, allCarers } = this.state;

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
            {selectedCarers.map((carer, i) => (
              <CarerSelector
                position={i}
                allCarers={allCarers}
                selectedCarers={selectedCarers}
                onSelectCarer={null}
                onRemoveCarerSlot={this.removeCarerSlot.bind(this)}
              />
            ))}
            <Button theme={'neutral'} label={'Add Carer'} style={{width: 200}} onClick={this.addCarerSlot.bind(this)}/>
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

export default Radium(AppointmentDialog);
