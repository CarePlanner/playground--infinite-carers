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
  removeCarerSlot
} from '../../actions';

class CarerSelector extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      renderCarerPopup: false,
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

  renderCarerDetailsPopup() {
    const { slot, careRequired } = this.props;
    return (
      <Popup
        trigger={this.elem}
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
        style={{offsetX: 5}}
      />
    );
  }

  renderRunIndicator() {
    let { run } = this.props.carerSlots[this.props.position];
    run = parseInt(run);
    switch(run) {
      case 3:
      return <span style={styles.runIndicator}>Run 3</span>;
      case 2:
      return <span style={styles.runIndicator}>Run 2</span>;
      case 1:
      return <span style={styles.runIndicator}>Run 1</span>;
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
          <Span style={styles.carerSelectorIndicators}>Unannounced Supervisor</Span>
        );
      case 2:
        return (
          <Span style={styles.carerSelectorIndicators}>Supervisor</Span>
        );
      case 1:
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
                {this.renderRunIndicator()}
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
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerSelector));
