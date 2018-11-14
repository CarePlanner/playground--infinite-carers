import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import {
  H1,
  H2,
  Span,
  A,
  H5
} from '../../Text';
import {
  Button,
  Checkbox,
  Radio,
  Select,
  TextBox
} from '../../Form';
import {
  deselectCarer,
  selectCarer,
  removeCarerSlot,
  selectTravelMethod,
  selectShadowingSupervising
} from '../actions';

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null,
      selectedCarer: args.carerSlots[args.position].carer,
      searchQuery: '',
      travelMethod: args.carerSlots[args.position].travelMethod,
      travelMethodOptions: [
        (args.carerSlots[args.position].carer !== null) ? `${args.carerSlots[args.position].carer.defaultTravelMethod} (Carer\'s Default)` : 'Carer\'s Default' ,
        'Bicycle',
        'Driving',
        'Motorcycle',
        'Passenger',
        'Public Transport',
        'Walking'
      ],
      shadowingSupervising: args.carerSlots[args.position].shadowingSupervising,
      shadowingSupervisingOptions: [
        'Select to mark as shadow or supervisor',
        'Shadow',
        'Supervisor',
        'Unannounced Supervisor'
      ]
    };
    this.searchField = React.createRef();
  }

  componentDidMount() {
    this.searchField.current._reactInternalFiber.child.stateNode.focus();
  }

  selectCarer(carer) {
    const { selectedCarers, carerSlots, position } = this.props;

    const wasSelectedCarer = carerSlots[position].carer && (carer.id === carerSlots[position].carer.id)
    const inAnotherCarerSlot = selectedCarers.includes(carer) && !wasSelectedCarer;

    if(!inAnotherCarerSlot) {
      this.setState({
        selectedCarer: carer,
        travelMethodOptions: [
          (carer !== null) ? `${carer.defaultTravelMethod} (Carer\'s Default)` : 'Carer\'s Default' ,
          'Bicycle',
          'Driving',
          'Motorcycle',
          'Passenger',
          'Public Transport',
          'Walking'
        ]
      });
    }
  }

  selectCarerRequired() {
    this.setState({
      selectedCarer: null,
      travelMethodOptions: [
        'Carer\'s Default',
        'Bicycle',
        'Driving',
        'Motorcycle',
        'Passenger',
        'Public Transport',
        'Walking'
      ]
    });
  }

  selectTravelMethod(travelMethod) {
    this.setState({
      travelMethod: travelMethod
    });
  }

  selectShadowingSupervising(shadowingSupervising) {
    this.setState({
      shadowingSupervising: shadowingSupervising
    });
  }

  closePopup() {
    const { onClose, position, carerSlots } = this.props;
    const { selectedCarer, travelMethod, shadowingSupervising } = this.state;
    const carerSlot = carerSlots[position];

    if(selectedCarer !== null) {
      this.props.selectCarer(position, selectedCarer);
    } else {
      if(carerSlot.carer !== null) {
        this.props.deselectCarer(position, carerSlot.carer);
      }
    }

    if(travelMethod !== carerSlot.travelMethod) {
      this.props.selectTravelMethod(position, travelMethod);
    }

    if(shadowingSupervising !== carerSlot.shadowingSupervising) {
      this.props.selectShadowingSupervising(position, shadowingSupervising);
    }

    if(onClose) {
      onClose();
    }
  }

  updateSearchQuery(input) {
    this.setState({
      searchQuery: input
    });
  }

  renderCarerDetailsSection(carer) {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={styles.carerImage}></div>
        <H5 showLine={true}>
          <Span>{carer.name} </Span><Span style={{color: '#9B9B9B'}}> · Active</Span>
        </H5>
      </div>
    );
  }

  removeCarerSlot() {
    const { id, carerSlots} = this.props;

    if(carerSlots.length > 1) {
      this.props.removeCarerSlot(id);
    }
  }

  renderShadowSelectComponent() {
    const { shadowingSupervising, shadowingSupervisingOptions } = this.state;

    return (
      <Select
        value={shadowingSupervising}
        options={shadowingSupervisingOptions}
        style={(shadowingSupervising == 0) ? styles.shadowingSupervisingNoneSelected : null}
        onChange={(e) => this.selectShadowingSupervising.bind(this)(e.target.value)}
        hideArrow={shadowingSupervising == 0}
      ></Select>
    )
  }

  calculatePopupPosition() {
      const { x: selectorX, y: selectorY, height: selectorHeight } = this.props.selector.current.getBoundingClientRect();
      let { width: windowMaxX, height: windowMaxY } = window.visualViewport;

      const initialMaxX = selectorX + styles.popup.width;
      const initialMaxY = selectorY + styles.popup.height;

      const initialMinX = 50;
      const initialMinY = selectorY - styles.popup.height - styles.popupArrow.height;

      const maxX = (windowMaxX - selectorX) - styles.popup.width;
      const maxY = (windowMaxY - selectorY) - styles.popup.height;

      let popupX = (initialMaxX < windowMaxX) ? (selectorX < 50) ? -selectorX : 0 : maxX;
      let popupY = 0;

      const imageOffsetX = 50;

      let popupArrowX = (popupX >= 0) ? imageOffsetX - (styles.popupArrow.left * 2.25) : -popupX + styles.popupArrow.left;
      let popupArrowY = 0;

      let popupArrowPseudoStyle = '';

      const spaceAboveSelector = selectorY;
      const spaceBelowSelector = windowMaxY - selectorY - selectorHeight;

      if(spaceAboveSelector < spaceBelowSelector) {
        popupY = (initialMaxY < windowMaxY) ? (selectorY < 50) ? -selectorY + 50 : styles.popup.top : maxY;
        popupArrowY = styles.popupArrow.top;
        popupArrowPseudoStyle = (popupY < 50) ? 'popupArrowGone' : 'popupArrowAbove';
      } else {
        popupY = (initialMinY < 0) ? -initialMinY - styles.popup.height : -styles.popup.height - styles.popupArrow.height;
        popupArrowY = styles.popup.height - 1;
        popupArrowPseudoStyle = (popupY + styles.popup.height > -styles.popupArrow.height) ? 'popupArrowGone' : 'popupArrowBelow';
      }

      return [
          { top: popupY, left: popupX },
          { top: popupArrowY, left: popupArrowX },
          popupArrowPseudoStyle
      ];
  }

  render() {

    const { onClose, allCarers, onSelectCarer, position, onRemoveCarerSlot, selectedCarers, carerSlots } = this.props;
    const { selectedCarer, highlightedCarer, searchQuery, travelMethod, travelMethodOptions } = this.state;

    const carerSlot = carerSlots[position];

    const filteredCarers = allCarers.filter((carer) => ((selectedCarer && (carer.id === selectedCarer.id)) || !searchQuery || new RegExp(searchQuery, 'i').test(carer.name)));

    const noMatchingCarers = !filteredCarers.length || (filteredCarers.length === 1 && filteredCarers[0] === selectedCarer);

    const popupPosition = this.calculatePopupPosition();

    return (
      <div style={[styles.popup, popupPosition[0]]}>
        <div style={[styles.popupArrow, popupPosition[1]]}>
          <div style={styles[popupPosition[2]]['::before']}></div>
          <div style={styles[popupPosition[2]]['::after']}></div>
        </div>
        <div style={styles.popupTopSection}>
          <div style={styles.popupLeftSection}>
            <div style={styles.popupLeftSectionHeader}>
              <TextBox ref={this.searchField} style={{width: 'calc(100% - 25px)'}} onKeyUp={(e) => this.updateSearchQuery(e.currentTarget.value)}/>
            </div>
            <div style={[styles.carer, (selectedCarer === null) ? styles.selectedCarer : null]} key={-1} onClick={this.selectCarerRequired.bind(this)}>
              <div style={styles.carerName}>
                <Span style={[styles.carerNameText, (selectedCarer === null) ? styles.selectedCarerNameText : null]}>Required</Span>
              </div>
            </div>
            <div style={styles.carers}>
              {filteredCarers.map((carer, i) => {
                const isSelectedCarer = selectedCarer && (carer.id === selectedCarer.id);
                const wasSelectedCarer = carerSlot.carer && (carer.id === carerSlot.carer.id)
                const inAnotherCarerSlot = selectedCarers.includes(carer) && !wasSelectedCarer;
                return (
                  <div style={[styles.carer, (isSelectedCarer) ? styles.selectedCarer : null, (inAnotherCarerSlot) ? styles.disabledCarer : null]} key={i} onClick={() => this.selectCarer(carer)}>
                    <div style={styles.carerName}>
                      <Span style={[styles.carerNameText, (isSelectedCarer) ? styles.selectedCarerNameText : null, (inAnotherCarerSlot) ? styles.disabledCarerText : null]}>{carer.name}</Span>
                    </div>
                  </div>
                );
              })}
              {noMatchingCarers && <div style={{flexGrow: 2, display: 'flex', padding: '0 40px'}}><H2 style={styles.popupRightSectionBody.H1}>No matching carers found</H2></div>}
            </div>
            <div style={styles.popupLeftSectionFooter}>
              <Button theme={'neutral'} label={'Recommend'} style={{width: 'calc(100% - 25px)'}} />
            </div>
          </div>
          <div style={styles.popupRightSection}>
              <div style={[styles.popupRightSectionBody, (!selectedCarer) ? {alignItems: 'center', justifyContent: 'center'} : null]}>
                {!selectedCarer && <H1 style={styles.popupRightSectionBody.H1}>Select a carer</H1>}
                {selectedCarer && this.renderCarerDetailsSection(selectedCarer)}
              </div>
              <div style={styles.popupRightSectionBodyFooter}>
                <div style={{
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10
                }}>
                  <H5 showLine={true}>Settings</H5>
                </div>
                {this.renderShadowSelectComponent()}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  marginTop: 20
                }}>
                  <H5 showLine={true}>Travel Method</H5>
                </div>
                <Select
                  value={travelMethod}
                  options={travelMethodOptions}
                  onChange={(e) => this.selectTravelMethod.bind(this)(e.target.value)}
                ></Select>
              </div>
            </div>
        </div>
        <div style={styles.popupBottomSection}>
          <Button theme={'neutral'} label={'OK'} style={{width: 50}} onClick={this.closePopup.bind(this)} />
          <div>
              <A style={{marginRight: 20}} onClick={onClose}>Cancel</A>
              <A style={[{color: '#FF0400'}, (carerSlots.length === 1) ? {color: '#CCCCCC', cursor: 'not-allowed'} : null]} onClick={this.removeCarerSlot.bind(this)}>Carer Not Required</A>
          </div>
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
