import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, H2, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import { deselectCarer, selectCarer, removeCarerSlot, selectTravelMethod } from '../actions';

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

  closePopup() {
    const { onClose, position, carerSlots } = this.props;
    const { selectedCarer, travelMethod } = this.state;
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

  calculatePopupPosition() {
      const { x: selectorX, y: selectorY, height: selectorHeight } = this.props.selector.current.getBoundingClientRect();
      let { width: windowMaxX, height: windowMaxY } = window.visualViewport;

      windowMaxX-=50; //Buffer of 50px between the edges
      windowMaxY-=100; //Buffer of 50px between the edges (taking into account 50px offset)

      const initialMaxX = selectorX + styles.popup.width;
      const initialMaxY = selectorY + styles.popup.height;

      const minX = 50;

      const maxX = (windowMaxX - selectorX) - styles.popup.width;
      const maxY = (windowMaxY - selectorY) - styles.popup.height;

      let popupX = (initialMaxX < windowMaxX) ? (selectorX < 50) ? -selectorX + 50 : 0 : maxX;
      let popupY = (initialMaxY < windowMaxY) ? 50 : maxY;

      let popupArrowX = (popupX >= 0) ? minX - (styles.popupArrow.left * 2.25) : -popupX + styles.popupArrow.left;
      let popupArrowY = styles.popupArrow.top;

      let popupArrowPsudoStyle = 'popupArrowAbove';

      if(popupY < 0) {
          if(selectorY > (windowMaxY - (selectorY + selectorHeight))) {
              //Put popup above the selector
              popupY = -styles.popup.height - styles.popupArrow.height;
              popupArrowY = styles.popup.height - 1;
              popupArrowPsudoStyle = 'popupArrowBelow';
          }
      }

      return [
          { top: popupY, left: popupX },
          { top: popupArrowY, left: popupArrowX },
          popupArrowPsudoStyle
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
            {noMatchingCarers && <div style={{flexGrow: 2, display: 'flex', padding: '0 40px'}}><H2 style={styles.popupRightSectionBodyBody.H1}>No matching carers found</H2></div>}
          </div>
          <div style={styles.popupLeftSectionFooter}>
            <Button theme={'neutral'} label={'Recommend'} style={{width: 'calc(100% - 25px)'}} />
          </div>
        </div>
        <div style={styles.popupRightSection}>
          <div style={styles.popupRightSectionBody}>
            <div style={[styles.popupRightSectionBodyBody, (!selectedCarer) ? {alignItems: 'center', justifyContent: 'center'} : null]}>
              {!selectedCarer && <H1 style={styles.popupRightSectionBodyBody.H1}>Select a carer</H1>}
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
              <A>Select to mark as shadow or supervisor</A>
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
          <div style={styles.popupRightSectionFooter}>
            <Button theme={'neutral'} label={'OK'} style={{width: 50}} onClick={this.closePopup.bind(this)} />
            <div>
                <A style={{marginRight: 20}} onClick={onClose}>Cancel</A>
                <A style={[{color: '#FF0400'}, (carerSlots.length === 1) ? {color: '#CCCCCC', cursor: 'not-allowed'} : null]} onClick={this.removeCarerSlot.bind(this)}>Carer Not Required</A>
            </div>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
