import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import Popup from '../../../Popup';
import CarerDetails from '../CarerDetails';
import {
  H1,
  H2,
  Span,
  A,
  H5
} from '../../../Text';
import {
  Button,
  Checkbox,
  Radio,
  Select,
  TextBox
} from '../../../Form';
import {
  deselectCarer,
  selectCarer,
  removeCarerSlot,
  selectTravelMethod,
  selectShadowingSupervising,
  selectRun
} from '../../actions';
const drivingIcon = require('../../../../assets/driving.png');
const drivingIconSelected = require('../../../../assets/driving-selected.png');
const drivingIconDisabled = require('../../../../assets/driving-disabled.png');

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null,
      renderSlotSettingsPopup: args.withSlotSettingsOpen,
      searchQuery: '',
      travelMethodOptions: [
        (args.slot.carer !== null) ? `Change from ${args.slot.carer.name.split(' ')[0]}'s default (${args.slot.carer.defaultTravelMethod})` : 'Click to change from carer\'s default',
        'Bicycle',
        'Driving',
        'Motorcycle',
        'Passenger',
        'Public Transport',
        'Walking'
      ],
      shadowingSupervisingOptions: [
        'Click to mark as shadow or supervisor',
        'Shadow',
        'Supervisor',
        'Unannounced Supervisor'
      ],
      runOptions: [
        'Click to add to a Run',
        'Run 1',
        'Run 2',
        'Run 3'
      ]
    };
    this.searchField = React.createRef();
    this.carersList = React.createRef();
    this.slotSettingsLink = React.createRef();
    this.carersListItems = args.allCarers.map(React.createRef);
    this.showHideSlotSettingsPopup = this.showHideSlotSettingsPopup.bind(this);
    this.selectTravelMethod = this.selectTravelMethod.bind(this);
    this.selectShadowingSupervising = this.selectShadowingSupervising.bind(this);
  }

  componentDidMount() {
    const { slot, allCarers } = this.props;

    this.searchField.current._reactInternalFiber.child.stateNode.focus();

    const listPosition = allCarers.indexOf(slot.carer);

    if(slot.carer) {
      this.carersList.current.scrollTop = 35 * listPosition;
    }
  }

  selectCarer(carer) {
    const { selectedCarers, position, slot, onClose } = this.props;
    const wasSelectedCarer = slot.carer && (carer.id === slot.carer.id)
    const inAnotherCarerSlot = selectedCarers.includes(carer) && !wasSelectedCarer;

    if(!inAnotherCarerSlot) {
      if(slot.carer !== null) {
        this.props.deselectCarer(position, slot.carer);
      }
      if(!wasSelectedCarer) {
        this.props.selectCarer(position, carer);
        if(onClose) {
          setTimeout(onClose, 500);
        }
      }
    }
  }

  selectTravelMethod(travelMethod) {
    const { position, slot } = this.props;
    this.props.selectTravelMethod(position, travelMethod);
    this.setState({
      travelMethodOptions: [
        (slot.carer !== null) ? `Change from ${slot.carer.name.split(' ')[0]}'s default (${slot.carer.defaultTravelMethod})` : 'Click to change from carer\'s default',
        'Bicycle',
        'Driving',
        'Motorcycle',
        'Passenger',
        'Public Transport',
        'Walking'
      ]
    });
  }

  selectShadowingSupervising(shadowingSupervising) {
    const { position } = this.props;
    this.props.selectShadowingSupervising(position, shadowingSupervising);
  }

  selectRun(run) {
    const { position } = this.props;
    this.props.selectRun(position, run);
  }

  highlightCarer(carer) {
    this.setState({
      highlightedCarer: carer
    });
  }

  unhighlightCarer(carer) {
    if(this.state.highlightedCarer === carer) {
      this.setState({
        highlightedCarer: null
      });
    }
  }

  showHideSlotSettingsPopup() {
    this.setState({
      renderSlotSettingsPopup: !this.state.renderSlotSettingsPopup
    });
  }

  renderCarerDetailsPopup(carer, trigger) {
    const { careRequired } = this.props;
    return (
      <Popup
        trigger={trigger}
        style={{width: 500, height: 350}}
        showOnSides={true}
      >
        <CarerDetails
          carer={carer}
          careRequired={careRequired}
        />
      </Popup>
    )
  }

  renderSlotSettingsPopup() {
    const { travelMethodOptions, shadowingSupervisingOptions, runOptions } = this.state;
    const { slot } = this.props;

    if(!this.slotSettingsLink.current) {
       return null;
    }

    return (
      <Popup
        trigger={this.slotSettingsLink}
        showOnSides={true}
        style={{ height: (slot.shadowingSupervising == 0 && slot.run == 0) ? 202 : (slot.shadowingSupervising != 0 && slot.run != 0) ? 230 : 216 }}
      >
        <div style={styles.popupBody}>
          <div style={styles.slotSettingsHeader}>
            <H5>Special Role</H5>
          </div>
          <Select
            value={slot.shadowingSupervising}
            options={shadowingSupervisingOptions}
            style={(slot.shadowingSupervising == 0) ? styles.shadowingSupervisingNoneSelected : null}
            onChange={(e) => this.selectShadowingSupervising(e.target.value)}
            hideArrow={slot.shadowingSupervising == 0}
          ></Select>
        </div>
        <div style={styles.popupBody}>
          <div style={styles.slotSettingsHeader}>
            <H5>Travel Method</H5>
          </div>
          <Select
            value={slot.travelMethod}
            options={travelMethodOptions}
            style={(slot.travelMethod == 0) ? styles.shadowingSupervisingNoneSelected : null}
            onChange={(e) => this.selectTravelMethod(e.target.value)}
            hideArrow={slot.travelMethod == 0}
          ></Select>
        </div>
        <div style={styles.popupBody}>
          <div style={styles.slotSettingsHeader}>
            <H5>Run</H5>
          </div>
          <Select
            value={slot.run}
            options={runOptions}
            style={(slot.run == 0) ? styles.shadowingSupervisingNoneSelected : null}
            onChange={(e) => this.selectRun(e.target.value)}
            hideArrow={slot.run == 0}
          ></Select>
        </div>
      </Popup>
    );
  }

  updateSearchQuery(input) {
    this.setState({
      searchQuery: input,
      highlightedCarer: null
    });
  }

  removeCarerSlot() {
    const { id, carerSlots } = this.props;

    if(carerSlots.length > 1) {
      this.props.removeCarerSlot(id);
    }
  }

  render() {

    const { allCarers, onSelectCarer, onRemoveCarerSlot, selectedCarers, slot, selector, onClose, style } = this.props;
    const { highlightedCarer, searchQuery, renderSlotSettingsPopup } = this.state;

    const selectedCarer = slot.carer;

    const filteredCarers = allCarers.filter((carer) => ((selectedCarer && (carer.id === selectedCarer.id)) || !searchQuery || new RegExp(searchQuery, 'i').test(carer.name)));

    const noMatchingCarers = !filteredCarers.length || (filteredCarers.length === 1 && filteredCarers[0] === selectedCarer);

    return (
      <Popup trigger={selector} onClickOff={onClose} style={style}>
        <div style={styles.popupBodyHeader}>
          <TextBox ref={this.searchField} placeholder={'Type to search...'} style={{width: '100%', border: 0, boxShadow: 'none'}} onKeyUp={(e) => this.updateSearchQuery(e.currentTarget.value)}/>
        </div>
        <div style={styles.carers} ref={this.carersList} onScroll={() => this.unhighlightCarer(highlightedCarer)}>
          {filteredCarers.map((carer, i) => {
            const isSelectedCarer = selectedCarer && (carer.id === selectedCarer.id);
            const isHighlightedCarer = highlightedCarer && (carer.id === highlightedCarer.id);
            const inAnotherCarerSlot = selectedCarers.includes(carer);
            return (
              <div
                style={[styles.carer, (isSelectedCarer) ? styles.selectedCarer : (inAnotherCarerSlot) ? styles.disabledCarer : null]}
                key={i}
                ref={this.carersListItems[i]}
                onClick={() => this.selectCarer(carer)}
                onMouseOver={() => this.highlightCarer(carer)}
                onMouseOut={() => this.unhighlightCarer(carer)}
              >
                <div style={styles.carerName}>
                  {carer.defaultTravelMethod === 'Driving' && <img style={styles.carerIcon} src={(isSelectedCarer) ? drivingIconSelected : (inAnotherCarerSlot) ? drivingIconDisabled : drivingIcon} />}
                  <Span style={[styles.carerNameText, (isSelectedCarer) ? styles.selectedCarerNameText : (inAnotherCarerSlot) ? styles.disabledCarerText : null]}>{carer.name}</Span>
                </div>
                {isHighlightedCarer && !renderSlotSettingsPopup && this.renderCarerDetailsPopup(highlightedCarer, this.carersListItems[filteredCarers.indexOf(highlightedCarer)])}
              </div>
            );
          })}
          {noMatchingCarers && <div style={{flexGrow: 2, display: 'flex', padding: '0 40px'}}><H2 style={{color: '#CCCCCC'}}>No matching carers found</H2></div>}
        </div>
        <div style={styles.popupBodyFooter} ref={this.slotSettingsLink}>
          <A onClick={this.showHideSlotSettingsPopup}>Change Role, Travel Method and Run</A>
        </div>
        {renderSlotSettingsPopup && this.renderSlotSettingsPopup()}
      </Popup>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.appointmentDialogReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCarer: (position, carer) => dispatch(selectCarer(position, carer)),
    deselectCarer: (position, carer) => dispatch(deselectCarer(position, carer)),
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id)),
    selectTravelMethod: (position, travelMethod) => dispatch(selectTravelMethod(position, travelMethod)),
    selectShadowingSupervising: (position, shadowingSupervising) => dispatch(selectShadowingSupervising(position, shadowingSupervising)),
    selectRun: (position, run) => dispatch(selectRun(position, run))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
