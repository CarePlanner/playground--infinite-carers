import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import CarerPopup from '../CarerPopup';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerSelectorDialog: false,
    };
  }

  toggleCarerSelector() {
    this.setState({
      renderCarerSelectorDialog: !this.state.renderCarerSelectorDialog,
    });
  }

  renderCarerPopup() {

    const { allCarers, position, onRemoveCarerSlot, id } = this.props;
    const { selectedCarer } = this.state;

    return (
      <CarerPopup
        id={id}
        position={position}
        allCarers={allCarers}
        onClose={this.toggleCarerSelector.bind(this)}
      />
    );
  }

  render() {

    const { position, runsEnabled, carerSlots } = this.props;
    const selectedCarer = carerSlots[position].carer;
    const slotNumber = position + 1;

    return (
      <div>
        <div style={styles.carerAndRun}>
          <H5 showLine={true}>Carer {slotNumber}</H5>
          {runsEnabled && <div style={styles.runSelector}>
            Run {slotNumber}
            <span style={ styles.runSelectorArrow }>&#9662;</span>
          </div>}
        </div>
        <div style={{position: 'relative'}}>
          <div style={styles.carerSelector} onClick={this.toggleCarerSelector.bind(this)}>
            <div style={styles.carerSelectorImage}></div>
            {!selectedCarer && <div style={styles.carerSelectorName}>
              <H5 style={styles.carerSelectorNameText}>Required</H5>
              <span style={ styles.carerSelectorArrow }>&#9662;</span>
            </div>}
            {selectedCarer && <div style={styles.carerSelectorName}>
              <H5 style={[styles.carerSelectorNameText, styles.selectedCarerSelectorNameText]}>{selectedCarer.name}</H5>
              <span style={[styles.carerSelectorArrow, styles.selectedCarerSelectorArrow]}>&#9662;</span>
            </div>}
          </div>
          {this.state.renderCarerSelectorDialog && this.renderCarerPopup()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.appointmentDialogReducer };
};

export default connect(
  mapStateToProps,
  null
)(Radium(CarerSelector));
