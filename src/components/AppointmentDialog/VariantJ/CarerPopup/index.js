import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
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
  removeCarerSlot
} from '../../actions';
const drivingIcon = require('../../../../assets/driving.png');
const drivingIconSelected = require('../../../../assets/driving-selected.png');
const drivingIconDisabled = require('../../../../assets/driving-disabled.png');

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null,
      searchQuery: ''
    };
    this.searchField = React.createRef();
    this.carersList = React.createRef();
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    const { position, carerSlots, allCarers } = this.props;
    const carer = carerSlots[position].carer;

    this.searchField.current._reactInternalFiber.child.stateNode.focus();

    const listPosition = allCarers.indexOf(carer);

    if(carer) {
      this.carersList.current.scrollTop = 35 * listPosition;
    }

    document.addEventListener('click', this.closePopup);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopup);
  }

  closePopup(e) {
    const popupDOMNode = ReactDOM.findDOMNode(this);
    if(e.target !== popupDOMNode && !popupDOMNode.contains(e.target)) {
      this.props.onClose();
    }
  }

  selectCarer(carer) {
    const { selectedCarers, carerSlots, position, onClose } = this.props;
    const carerSlot = carerSlots[position];
    const wasSelectedCarer = carerSlot.carer && (carer.id === carerSlot.carer.id)
    const inAnotherCarerSlot = selectedCarers.includes(carer) && !wasSelectedCarer;

    if(!inAnotherCarerSlot) {
      if(carerSlot.carer !== null) {
        this.props.deselectCarer(position, carerSlot.carer);
      }
      if(!wasSelectedCarer) {
        this.props.selectCarer(position, carer);
      }
      if(onClose) {
        setTimeout(onClose, 500);
      }
    }
  }

  updateSearchQuery(input) {
    this.setState({
      searchQuery: input
    });
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
    const { highlightedCarer, searchQuery, renderRecommendedOverlay } = this.state;

    const carerSlot = carerSlots[position];
    const selectedCarer = carerSlot.carer;

    const filteredCarers = allCarers.filter((carer) => ((selectedCarer && (carer.id === selectedCarer.id)) || !searchQuery || new RegExp(searchQuery, 'i').test(carer.name)));

    const noMatchingCarers = !filteredCarers.length || (filteredCarers.length === 1 && filteredCarers[0] === selectedCarer);

    const popupPosition = this.calculatePopupPosition();

    return (
      <div style={[styles.popup, popupPosition[0]]}>
        <div style={[styles.popupArrow, popupPosition[1]]}>
          <div style={styles[popupPosition[2]]['::before']}></div>
          <div style={styles[popupPosition[2]]['::after']}></div>
        </div>
        <div style={styles.popupBody}>
          <div style={styles.popupBodyHeader}>
            <TextBox ref={this.searchField} placeholder={'Type to search...'} style={{width: '100%', border: 0, boxShadow: 'none'}} onKeyUp={(e) => this.updateSearchQuery(e.currentTarget.value)}/>
          </div>
          <div style={styles.carers} ref={this.carersList}>
            {filteredCarers.map((carer, i) => {
              const isSelectedCarer = selectedCarer && (carer.id === selectedCarer.id);
              const inAnotherCarerSlot = selectedCarers.includes(carer);
              return (
                <div style={[styles.carer, (isSelectedCarer) ? styles.selectedCarer : (inAnotherCarerSlot) ? styles.disabledCarer : null]} key={i} onClick={() => this.selectCarer(carer)}>
                  <div style={styles.carerName}>
                    {carer.defaultTravelMethod === 'Driving' && <img style={styles.carerIcon} src={(isSelectedCarer) ? drivingIconSelected : (inAnotherCarerSlot) ? drivingIconDisabled : drivingIcon} />}
                    <Span style={[styles.carerNameText, (isSelectedCarer) ? styles.selectedCarerNameText : (inAnotherCarerSlot) ? styles.disabledCarerText : null]}>{carer.name}</Span>
                  </div>
                </div>
              );
            })}
            {noMatchingCarers && <div style={{flexGrow: 2, display: 'flex', padding: '0 40px'}}><H2 style={{color: '#CCCCCC'}}>No matching carers found</H2></div>}
          </div>
          <div style={styles.popupBodyFooter}>
            <A>Change Slot Settings and Travel Method</A>
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
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
