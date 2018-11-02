import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { H1, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import CarerPopup from '../CarerPopup';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerSelectorDialog: false,
      selectedCarer: null
    };
  }

  toggleCarerSelector() {
    this.setState({
      renderCarerSelectorDialog: !this.state.renderCarerSelectorDialog,
    });
  }

  selectCarer(carer) {
    const { onSelectCarer, position } = this.props;
    this.setState({
      selectedCarer: carer
    });
    if(onSelectCarer) {
      onSelectCarer(position, carer);
    }
  }

  renderCarerPopup() {

    const { allCarers, selectedCarers, position, onRemoveCarerSlot } = this.props;
    const { selectedCarer } = this.state;

    return (
      <CarerPopup
        position={position}
        allCarers={allCarers}
        selectedCarers={selectedCarers}
        selectedCarer={selectedCarer}
        onRemoveCarerSlot={onRemoveCarerSlot}
        onSelectCarer={this.selectCarer.bind(this)}
        onClose={this.toggleCarerSelector.bind(this)}
      />
    );
  }

  render() {

    const { position, runsEnabled } = this.props;
    const { selectedCarer } = this.state;
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

export default Radium(CarerSelector);
