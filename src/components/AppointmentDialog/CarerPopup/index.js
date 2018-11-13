import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import { H1, H2, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import { deselectCarer, selectCarer, removeCarerSlot } from '../actions';

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      highlightedCarer: null,
      selectedCarer: args.selectedCarer,
      searchQuery: ''
    };
    this.searchField = React.createRef();
  }

  componentDidMount() {
    this.searchField.current._reactInternalFiber.child.stateNode.focus();
  }

  selectCarer(carer) {
    const { onSelectCarer } = this.props;
    const { selectedCarer } = this.state;
    if(carer === null) {
      this.setState({
        selectedCarer: null
      })
    } else {
      this.setState({
        selectedCarer: carer
      })
    }
  }

  closePopup() {
    const { onSelectCarer, onClose } = this.props;
    const { selectedCarer } = this.state;
    if(onSelectCarer) {
      onSelectCarer(selectedCarer);
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
    const { id } = this.props;
    this.props.removeCarerSlot(id);
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

    const { onClose, allCarers, onSelectCarer, position, onRemoveCarerSlot } = this.props;
    const { selectedCarer, highlightedCarer, searchQuery } = this.state;

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
          <div style={[styles.carer, (selectedCarer === null) ? styles.selectedCarer : null]} key={-1} onClick={() => this.selectCarer(null)}>
            <div style={styles.carerName}>
              <Span style={[styles.carerNameText, (selectedCarer === null) ? styles.selectedCarerNameText : null]}>Required</Span>
            </div>
          </div>
          <div style={styles.carers}>
            {filteredCarers.map((carer, i) => {
              const isSelectedCarer = selectedCarer && (carer.id === selectedCarer.id);
              return (
                <div style={[styles.carer, (isSelectedCarer) ? styles.selectedCarer : null]} key={i} onClick={() => this.selectCarer(carer)}>
                  <div style={styles.carerName}>
                    <Span style={[styles.carerNameText, (isSelectedCarer) ? styles.selectedCarerNameText : null]}>{carer.name}</Span>
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
              <Checkbox
                label={'Shadow'}
              />
              <Checkbox
                label={'Supervision'}
              />
              <Checkbox
                label={'Unannounced Supervision'}
              />
            </div>
          </div>
          <div style={styles.popupRightSectionFooter}>
            <Button theme={'neutral'} label={'OK'} style={{width: 50}} onClick={this.closePopup.bind(this)} />
            <div>
                <A style={{marginRight: 20}} onClick={onClose}>Cancel</A>
                <A style={[{color: '#FF0400'}, (position === 0) ? {color: '#CCCCCC', cursor: 'not-allowed', pointerEvents: 'none'} : null]} onClick={this.removeCarerSlot.bind(this)}>Carer Not Required</A>
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
    deselectCarer: (position) => dispatch(deselectCarer(position)),
    removeCarerSlot: (id) => dispatch(removeCarerSlot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CarerPopup));
