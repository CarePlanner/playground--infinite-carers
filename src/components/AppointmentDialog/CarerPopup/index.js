import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import { deselectCarer, selectCarer, removeCarerSlot } from '../actions';

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null
    };
  }

  selectCarer(carer) {
    const { onClose, position, carerSlots } = this.props;
    const selectedCarer = carerSlots[position].carer;

    if(selectedCarer && (carer.id === selectedCarer.id)) {
      this.props.deselectCarer(position);
    } else {
      this.props.selectCarer(position, carer);
    }

    if(onClose) {
      onClose();
    }
  }

  showCarerDetails(carer) {
    this.setState({
      highlightedCarer: carer
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
    const { id } = this.props;
    this.props.removeCarerSlot(id);
  }

  render() {

    const { onClose, allCarers, onSelectCarer, position, onRemoveCarerSlot, carerSlots } = this.props;
    const { highlightedCarer } = this.state;
    const selectedCarer = carerSlots[position].carer;

    return (
      <div style={[styles.popup]}>
        <div style={styles.popupArrow}>
          <div style={styles.popupArrow['::before']}></div>
          <div style={styles.popupArrow['::after']}></div>
        </div>
        <div style={styles.popupLeftSection}>
          <div style={styles.popupLeftSectionHeader}>
            <div style={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <H5 showLine={true}>Select Carer</H5>
              <A>Recommend</A>
            </div>
            <TextBox style={{width: 'calc(100% - 25px)'}}/>
          </div>
          <div style={styles.carers}>
            {allCarers.map((carer, i) => {
              const isSelectedCarer = selectedCarer && (carer.id === selectedCarer.id);
              const isHighlightedCarer = highlightedCarer && (carer.id === highlightedCarer.id);
              return (
                <div style={[styles.carer, (isSelectedCarer) ? styles.selectedCarer : null, (!isSelectedCarer && isHighlightedCarer) ? styles.highlightedCarer : null]} key={i} onClick={() => this.selectCarer(carer)} onMouseOver={() => this.showCarerDetails(carer)}>
                  <div style={styles.carerImage}></div>
                  <div style={styles.carerName}>
                    <Span style={[styles.carerNameText, (isSelectedCarer) ? styles.selectedCarerNameText : null]}>{carer.name}</Span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.popupRightSection}>
          <div style={styles.popupRightSectionBody}>
            <div style={styles.popupRightSectionBodyBody}>
              {highlightedCarer && this.renderCarerDetailsSection(highlightedCarer)}
              {(selectedCarer && !highlightedCarer) && this.renderCarerDetailsSection(selectedCarer)}
            </div>
            <div style={styles.popupRightSectionBodyFooter}>
              <div style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}>
                <H5 showLine={true}>Slot Settings</H5>
              </div>
              <Checkbox
                label={'Shadowing'}
              />
            </div>
          </div>
          <div style={styles.popupRightSectionFooter}>
            <A style={[{color: '#FF0400'}, (position === 0) ? {color: '#CCCCCC', cursor: 'not-allowed', pointerEvents: 'none'} : null]} onClick={this.removeCarerSlot.bind(this)}>Remove Slot</A>
            <Button theme={'neutral'} label={'OK'} style={{width: 50}} onClick={onClose} />
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
    deselectCarer: (position) => dispatch(deselectCarer(position)),
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
