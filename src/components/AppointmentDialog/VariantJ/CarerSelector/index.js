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
  removeCarerSlot,
  deselectCarer
} from '../../actions';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerPopup: false,
      renderRecommendedOverlay: false,
      renderCarerPopupWithSlotSettingsOpen: false,
      renderRemovePopup: false
    };
    this.selectorElem = React.createRef();
    this.removeLinkElem = React.createRef();
    this.openRecommendedOverlay = this.openRecommendedOverlay.bind(this);
    this.closeRecommendedOverlay = this.closeRecommendedOverlay.bind(this);
    this.showHideCarerPopup = this.showHideCarerPopup.bind(this);
    this.showHideRemovePopup = this.showHideRemovePopup.bind(this);
    this.removeCarerSlot = this.removeCarerSlot.bind(this);
    this.removeCarerAndClosePopup = this.removeCarerAndClosePopup.bind(this);
  }

  showHideCarerPopup(withSlotSettingsOpen) {
    this.setState({
      renderCarerPopup: !this.state.renderCarerPopup,
      renderCarerPopupWithSlotSettingsOpen: withSlotSettingsOpen
    });
  }

  showHideRemovePopup() {
    this.setState({
      renderRemovePopup: !this.state.renderRemovePopup,
    });
  }

  removeCarerSlot() {
    const { id, carerSlots } = this.props;

    if(carerSlots.length > 1) {
      this.props.removeCarerSlot(id);
    }
  }

  removeCarerAndClosePopup() {
    const { position, slot } = this.props;
    this.props.deselectCarer(position, slot.carer);
    this.showHideRemovePopup();
  }

  renderCarerDetailsPopup() {
    const { slot, careRequired } = this.props;
    return (
      <Popup
        trigger={this.selectorElem}
        style={{width: 500, height: 350, offsetX: 5}}
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
    const { renderCarerDetailsPopup, renderCarerPopupWithSlotSettingsOpen } = this.state;

    return (
      <CarerPopup
        selector={this.selectorElem}
        id={id}
        position={position}
        slot={slot}
        allCarers={allCarers}
        careRequired={careRequired}
        onClose={this.showHideCarerPopup.bind(this)}
        withSlotSettingsOpen={renderCarerPopupWithSlotSettingsOpen}
        style={{offsetX: 5}}
      />
    );
  }

  renderRemovePopup() {

    const { renderCarerDetailsPopup } = this.state;
    const { carerSlots } = this.props;
    const carer = this.props.slot.carer;

    return (
      <Popup
        trigger={this.removeLinkElem}
        style={{
          height: (carer && carerSlots.length > 1) ? 119 : 74,
          width: 267,
          offsetX: 5
        }}
        onClickOff={this.showHideRemovePopup}
      >
        <div style={styles.popupBody}>
          <div style={styles.removeCarerLinkWithinPopupHeader}>
            <H5>Select an action</H5>
          </div>
          {carer && <A style={styles.removeCarerLinkWithinPopup} onClick={this.removeCarerAndClosePopup}>Unassign {carer.name}</A>}
          {carerSlots.length > 1 && ( <A style={styles.removeCarerLinkWithinPopup} onClick={this.removeCarerSlot}>Reduce number of carers to {carerSlots.length - 1}{carer && ` and unassign ${carer.name}`}</A>)}
        </div>
      </Popup>
    );
  }

  renderRunIndicator() {
    let { run } = this.props.carerSlots[this.props.position];
    run = parseInt(run);
    switch(run) {
      case 3:
      return <span style={styles.runIndicator} onClick={() => this.showHideCarerPopup(true)}>Run 3</span>;
      case 2:
      return <span style={styles.runIndicator} onClick={() => this.showHideCarerPopup(true)}>Run 2</span>;
      case 1:
      return <span style={styles.runIndicator} onClick={() => this.showHideCarerPopup(true)}>Run 1</span>;
      default:
      return null;
    }
  }

  renderShadowingSupervisingText() {
    let { shadowingSupervising } = this.props.carerSlots[this.props.position];
    shadowingSupervising = parseInt(shadowingSupervising);
    switch(shadowingSupervising) {
      case 3:
        return (
          <Span style={styles.carerSelectorIndicators} onClick={() => this.showHideCarerPopup(true)}>Unannounced Supervisor</Span>
        );
      case 2:
        return (
          <Span style={styles.carerSelectorIndicators} onClick={() => this.showHideCarerPopup(true)}>Supervisor</Span>
        );
      case 1:
        return (
          <Span style={styles.carerSelectorIndicators} onClick={() => this.showHideCarerPopup(true)}>Shadow</Span>
        );
      default:
        return null;
    }
  }

  render() {

    const { position, runsEnabled, slot, carerSlots } = this.props;
    const { renderRecommendedOverlay, renderCarerPopup, renderRemovePopup } = this.state;
    const selectedCarer = slot.carer;
    const carerSelectorHovered = Radium.getState(this.state, `carer-selector-${position}`, ':hover');
    const carerSelectorInnerHovered = Radium.getState(this.state, `carer-selector-inner-${position}`, ':hover');

    return (
      <div>
        <div style={styles.carerSelectorContainer}>
          <div style={styles.carerSelector} ref={this.selectorElem} key={`carer-selector-${position}`}>
            <div style={styles.carerSelectorInner} key={`carer-selector-inner-${position}`}>
              <div style={styles.carerSelectorImage}></div>
              <H5 style={[styles.carerSelectorNameText, (selectedCarer) ? styles.selectedCarerSelectorNameText : null]}>
                <div onClick={() => this.showHideCarerPopup(false)}>
                  {(selectedCarer) ? selectedCarer.name : 'Required'}
                  <span style={[styles.carerSelectorArrow, (selectedCarer) ? styles.selectedCarerSelectorArrow : null]}>&#9662;</span>
                </div>
                <div>{this.renderShadowingSupervisingText()}</div>
                {this.renderRunIndicator()}
              </H5>
            </div>
            <span ref={this.removeLinkElem}>
              <A onClick={this.showHideRemovePopup} style={[styles.removeSlotLink, (carerSelectorHovered || renderRemovePopup) && {opacity: 1}, (carerSlots.length === 1 && !selectedCarer) && {color: '#CCCCCC', cursor: 'not-allowed', pointerEvents: 'none'}]}>Remove</A>
            </span>
            <A onClick={this.openRecommendedOverlay}>Recommend</A>
          </div>
          {renderRemovePopup && this.renderRemovePopup()}
          {renderCarerPopup && this.renderCarerPopup()}
          {carerSelectorInnerHovered && selectedCarer && !renderCarerPopup && !renderRemovePopup && this.renderCarerDetailsPopup()}
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
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id)),
    deselectCarer: (position, carer) => dispatch(deselectCarer(position, carer))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerSelector));
