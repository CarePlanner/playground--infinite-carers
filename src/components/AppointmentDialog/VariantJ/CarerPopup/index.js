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
  selectShadowingSupervising
} from '../../actions';
const drivingIcon = require('../../../../assets/driving.png');
const drivingIconSelected = require('../../../../assets/driving-selected.png');
const drivingIconDisabled = require('../../../../assets/driving-disabled.png');

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null,
      renderSlotSettingsPopup: false,
      searchQuery: '',
      travelMethodOptions: [
        (args.slot.carer !== null) ? `${args.slot.carer.defaultTravelMethod} (Carer\'s Default)` : 'Carer\'s Default' ,
        'Bicycle',
        'Driving',
        'Motorcycle',
        'Passenger',
        'Public Transport',
        'Walking'
      ],
      shadowingSupervisingOptions: [
        'Select to mark as shadow or supervisor',
        'Shadow',
        'Supervisor',
        'Unannounced Supervisor'
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
        (slot.carer !== null) ? `${slot.carer.defaultTravelMethod} (Carer\'s Default)` : 'Carer\'s Default' ,
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
        allowOffViewport={true}
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
    const { travelMethodOptions, shadowingSupervisingOptions } = this.state;
    const { slot } = this.props;

    return (
      <Popup trigger={this.slotSettingsLink} showOnSides={true}>
        <div style={styles.popupBody}>
          <div style={styles.slotSettingsHeader}>
            <H5 showLine={true}>Settings</H5>
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
            <H5 showLine={true}>Travel Method</H5>
          </div>
          <Select
            value={slot.travelMethod}
            options={travelMethodOptions}
            onChange={(e) => this.selectTravelMethod(e.target.value)}
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

    const { allCarers, onSelectCarer, onRemoveCarerSlot, selectedCarers, slot, selector, onClose } = this.props;
    const { highlightedCarer, searchQuery, renderSlotSettingsPopup } = this.state;

    const selectedCarer = slot.carer;

    const filteredCarers = allCarers.filter((carer) => ((selectedCarer && (carer.id === selectedCarer.id)) || !searchQuery || new RegExp(searchQuery, 'i').test(carer.name)));

    const noMatchingCarers = !filteredCarers.length || (filteredCarers.length === 1 && filteredCarers[0] === selectedCarer);

    return (
      <Popup trigger={selector} onClickOff={onClose}>
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
                {isHighlightedCarer && this.renderCarerDetailsPopup(highlightedCarer, this.carersListItems[filteredCarers.indexOf(highlightedCarer)])}
              </div>
            );
          })}
          {noMatchingCarers && <div style={{flexGrow: 2, display: 'flex', padding: '0 40px'}}><H2 style={{color: '#CCCCCC'}}>No matching carers found</H2></div>}
        </div>
        <div style={styles.popupBodyFooter} ref={this.slotSettingsLink}>
          <A onClick={this.showHideSlotSettingsPopup}>Change Slot Settings and Travel Method</A>
          {renderSlotSettingsPopup && this.renderSlotSettingsPopup()}
        </div>
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
    selectShadowingSupervising: (position, shadowingSupervising) => dispatch(selectShadowingSupervising(position, shadowingSupervising))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
