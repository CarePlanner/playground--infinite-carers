import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import CarerPopup from '../CarerPopup';
import {
  selectRun
} from '../actions';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerSelectorDialog: false,
      selectedRun: 0,
      runs: [
        'Add to Run',
        'Run 1',
        'Run 2',
        'Run 3'
      ]
    };
    this.elem = React.createRef();
  }

  toggleCarerSelector() {
    this.setState({
      renderCarerSelectorDialog: !this.state.renderCarerSelectorDialog,
    });
  }

  selectRun(run) {
    const { position, carerSlots } = this.props;
    const { selectedRun } = this.state;

    this.props.selectRun(position, run);

    this.setState({
      selectedRun: run
    });
  }

  renderCarerPopup() {

    const { allCarers, position, onRemoveCarerSlot, id } = this.props;
    const { selectedCarer } = this.state;

    return (
      <CarerPopup
        selector={this.elem}
        id={id}
        position={position}
        allCarers={allCarers}
        onClose={this.toggleCarerSelector.bind(this)}
      />
    );
  }

  renderRunSelector() {
    const { selectedRun, runs } = this.state;

    return (
      <Select
        style={(selectedRun == 0) ? styles.runSelector : styles.selectedRunSelector}
        value={selectedRun}
        options={runs}
        onChange={(e) => this.selectRun.bind(this)(e.target.value)}
        hideArrow={true}
      >
        <span style={(selectedRun == 0) ? styles.runSelectorArrow : styles.selectedRunSelectorArrow }>&#9662;</span>
      </Select>
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
          {runsEnabled && this.renderRunSelector()}
        </div>
        <div style={{position: 'relative'}} ref={this.elem}>
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

const mapDispatchToProps = dispatch => {
  return {
    selectRun: (position, run) => dispatch(selectRun(position, run))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerSelector));
