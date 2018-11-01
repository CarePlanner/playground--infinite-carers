import React from 'react';
import Radium from 'radium';
import styles from './styles';
import Dialog from '../Dialog';
import { H1, Span, A, H5 } from '../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../Form';
import CarerPopup from './CarerPopup';

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
      renderCarerSelectorDialog: false
    };
  }

  toggleCarerSelector(e) {
    this.setState({
      renderCarerSelectorDialog: !this.state.renderCarerSelectorDialog,
    });
  }

  renderAppointmentTab() {
    let carerImageRef = React.createRef();

    let carerPopup = <CarerPopup />;

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
            <div style={styles.carerAndRun}>
              <H5 showLine={true}>Carer 1</H5>
              <div style={styles.runSelector}>
                Run 1
                <span style={ styles.runSelectorArrow }>&#9662;</span>
              </div>
            </div>
            <div style={{position: 'relative'}}>
              <div style={styles.carerSelector} onClick={this.toggleCarerSelector.bind(this)}>
                <div style={styles.carerSelectorImage}></div>
                <div style={styles.carerSelectorName}>
                  <H5 style={styles.carerSelectorNameText}>Required</H5>
                  <span style={ styles.carerSelectorArrow }>&#9662;</span>
                </div>
              </div>
              {this.state.renderCarerSelectorDialog && carerPopup}
            </div>
            <Button theme={'neutral'} label={'Add Carer'} style={{width: 200}} />
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
