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
  selectRun
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
      renderRecommendedOverlay: false,
      renderCarerDetailsPopup: false
    };
    this.elem = React.createRef();
    this.renderCarerDetailsPopup = this.renderCarerDetailsPopup.bind(this);
  }

  showHideCarerPopup() {
    this.setState({
      renderCarerPopup: !this.state.renderCarerPopup,
    });
  }

  showHideCarerDetailsPopup(render) {
    const { position, carerSlots } = this.props;
    const selectedCarer = carerSlots[position].carer;
    if(this.state.renderCarerDetailsPopup !== render) {
      if(!selectedCarer) {
        return;
      }
      this.setState({
        renderCarerDetailsPopup: render
      });
    }
  }

  selectRun(run) {
    const { position, carerSlots } = this.props;
    const { selectedRun } = this.state;

    this.props.selectRun(position, run);

    this.setState({
      selectedRun: run
    });
  }

  renderCarerDetailsPopup() {
    const { carerSlots, position, careRequired } = this.props;
    return (
      <Popup
        trigger={this.elem}
        style={{width: 500, height: 350}}
        allowOffViewport={true}
      >
        <CarerDetails
          carer={carerSlots[position].carer}
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

    const { allCarers, position, onRemoveCarerSlot, id, careRequired } = this.props;
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

    const { position, runsEnabled, carerSlots } = this.props;
    const { renderRecommendedOverlay, renderCarerPopup, renderCarerDetailsPopup } = this.state;
    const carerSlot = carerSlots[position];
    const selectedCarer = carerSlot.carer;
    const slotNumber = position + 1;

    return (
      <div>
        <div style={styles.carerAndRun}>
          <H5 showLine={true}>Carer {slotNumber}</H5>
          {runsEnabled && this.renderRunSelector()}
        </div>
        <div style={{position: 'relative'}}>
          <div style={styles.carerSelector} ref={this.elem} onClick={this.showHideCarerPopup.bind(this)} onMouseOver={() => this.showHideCarerDetailsPopup(true)} onMouseOut={() => this.showHideCarerDetailsPopup(false)}>
            <H5 style={[styles.carerSelectorNameText, (selectedCarer) ? styles.selectedCarerSelectorNameText : null]}>
              {(selectedCarer) ? selectedCarer.name : 'Required'}
              <span style={[styles.carerSelectorArrow, (selectedCarer) ? styles.selectedCarerSelectorArrow : null]}>&#9662;</span>
              <div>{this.renderShadowingSupervisingText()}</div>
            </H5>
          </div>
          {renderCarerPopup && this.renderCarerPopup()}
          {renderCarerDetailsPopup && this.renderCarerDetailsPopup()}
        </div>
        {renderRecommendedOverlay && <Overlay title={"Recommended Carer"} onClose={this.closeRecommendedOverlay.bind(this)}><div style={{height: 1000}}/></Overlay>}
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
