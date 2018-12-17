import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, Span, A, H5 } from '../../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../../Form';
import CarerPopup from '../CarerPopup';
import Overlay from '../../../Overlay';
import Popup from '../../../Popup';
import CarerDetails from '../CarerDetails';
import {
  selectRun,
  removeCarerSlot
} from '../../actions';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerPopup: false,
      selectedRun: 0,
      runs: [
        'Add to Run',
        'Run 1',
        'Run 2',
        'Run 3'
      ],
      renderRecommendedOverlay: false
    };
    this.elem = React.createRef();
    this.closeRecommendedOverlay = this.closeRecommendedOverlay.bind(this);
    this.showHideCarerPopup = this.showHideCarerPopup.bind(this);
    this.removeCarerSlot = this.removeCarerSlot.bind(this);
  }

  showHideCarerPopup() {
    this.setState({
      renderCarerPopup: !this.state.renderCarerPopup,
    });
  }

  removeCarerSlot() {
    const { id, carerSlots } = this.props;

    if(carerSlots.length > 1) {
      this.props.removeCarerSlot(id);
    }
  }

  selectRun(run) {
    const { position } = this.props;
    const { selectedRun } = this.state;

    this.props.selectRun(position, run);

    this.setState({
      selectedRun: run
    });
  }

  renderCarerDetailsPopup() {
    const { slot, careRequired } = this.props;
    return (
      <Popup
        trigger={this.elem}
        style={{width: 500, height: 350}}
        allowOffViewport={true}
      >
        <CarerDetails
          carer={slot.carer}
          careRequired={careRequired}
        />
      </Popup>
    )
  }

  openRecommendedOverlay() {
    this.setState({
      renderRecommendedOverlay: true
    });
  }

  closeRecommendedOverlay() {
    this.setState({
      renderRecommendedOverlay: false
    });
  }

  renderCarerPopup() {

    const { allCarers, position, onRemoveCarerSlot, id, careRequired, slot } = this.props;
    const { renderCarerDetailsPopup } = this.state;

    if(renderCarerDetailsPopup !== false) {
      this.setState({
        renderCarerDetailsPopup: false
      });
    }

    return (
      <CarerPopup
        selector={this.elem}
        id={id}
        position={position}
        slot={slot}
        allCarers={allCarers}
        careRequired={careRequired}
        onClose={this.showHideCarerPopup.bind(this)}
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

  renderShadowingSupervisingText() {
    const { shadowingSupervising } = this.props.carerSlots[this.props.position];
    switch(shadowingSupervising) {
      case 3:
      case '3':
        return (
          <Span style={styles.carerSelectorIndicators}>Unannounced Supervisor</Span>
        );
      case 2:
      case '2':
        return (
          <Span style={styles.carerSelectorIndicators}>Supervisor</Span>
        );
      case 1:
      case '1':
        return (
          <Span style={styles.carerSelectorIndicators}>Shadow</Span>
        );
      default:
        return null;
    }
  }

  render() {

    const { position, runsEnabled, slot, carerSlots } = this.props;
    const { renderRecommendedOverlay, renderCarerPopup } = this.state;
    const selectedCarer = slot.carer;
    const carerSelectorHovered = Radium.getState(this.state, `carer-selector-${position}`, ':hover');

    return (
      <div>
        <div style={styles.carerSelectorContainer}>
          <div style={styles.carerSelector} ref={this.elem} key={`carer-selector-${position}`}>
            <div style={styles.carerSelectorInner} onClick={this.showHideCarerPopup}>
              <div style={styles.carerSelectorImage}></div>
              <H5 style={[styles.carerSelectorNameText, (selectedCarer) ? styles.selectedCarerSelectorNameText : null]}>
                {(selectedCarer) ? selectedCarer.name : 'Required'}
                <span style={[styles.carerSelectorArrow, (selectedCarer) ? styles.selectedCarerSelectorArrow : null]}>&#9662;</span>
                <div>{this.renderShadowingSupervisingText()}</div>
              </H5>
            </div>
            <A onClick={this.removeCarerSlot} style={[styles.removeSlotLink, carerSlots.length === 1 ? {color: '#CCCCCC', cursor: 'not-allowed'} : null, carerSelectorHovered ? {opacity: 1} : null]}>Remove Slot</A>
          </div>
          {renderCarerPopup && this.renderCarerPopup()}
          {carerSelectorHovered && selectedCarer && !renderCarerPopup && this.renderCarerDetailsPopup()}
        </div>
        {renderRecommendedOverlay && <Overlay title={"Recommended Carer"} onClose={this.closeRecommendedOverlay}><div style={{height: 1000}}/></Overlay>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.appointmentDialogReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    selectRun: (position, run) => dispatch(selectRun(position, run)),
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerSelector));
