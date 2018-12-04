import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import Popup from '../../../Popup';
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
  }

  componentDidMount() {
    const { position, carerSlots, allCarers } = this.props;
    const carer = carerSlots[position].carer;

    this.searchField.current._reactInternalFiber.child.stateNode.focus();

    const listPosition = allCarers.indexOf(carer);

    if(carer) {
      this.carersList.current.scrollTop = 35 * listPosition;
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
        if(onClose) {
          setTimeout(onClose, 500);
        }
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

  render() {

    const { allCarers, onSelectCarer, position, onRemoveCarerSlot, selectedCarers, carerSlots, selector, onClose } = this.props;
    const { highlightedCarer, searchQuery, renderRecommendedOverlay } = this.state;

    const carerSlot = carerSlots[position];
    const selectedCarer = carerSlot.carer;

    const filteredCarers = allCarers.filter((carer) => ((selectedCarer && (carer.id === selectedCarer.id)) || !searchQuery || new RegExp(searchQuery, 'i').test(carer.name)));

    const noMatchingCarers = !filteredCarers.length || (filteredCarers.length === 1 && filteredCarers[0] === selectedCarer);

    return (
      <Popup trigger={selector} onClickOff={onClose}>
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
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
