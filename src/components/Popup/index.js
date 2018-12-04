import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import styles from './styles';

class Popup extends React.Component {

  constructor(args) {
    super(args);
    this.clickOff = this.clickOff.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.clickOff);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOff);
  }

  clickOff(e) {
    const { onClickOff } = this.props;
    const popupDOMNode = ReactDOM.findDOMNode(this);
    if(e.target !== popupDOMNode && !popupDOMNode.contains(e.target)) {
      onClickOff && onClickOff();
    }
  }

  calculatePopupPosition() {
      const { x: triggerX, y: triggerY, height: triggerHeight } = this.props.trigger.current.getBoundingClientRect();
      let { width: windowMaxX, height: windowMaxY } = window.visualViewport;

      const initialMaxX = triggerX + styles.popup.width;
      const initialMaxY = triggerY + styles.popup.height;

      const initialMinX = 50;
      const initialMinY = triggerY - styles.popup.height - styles.popupArrow.height;

      const maxX = (windowMaxX - triggerX) - styles.popup.width;
      const maxY = (windowMaxY - triggerY) - styles.popup.height;

      let popupX = (initialMaxX < windowMaxX) ? (triggerX < 50) ? -triggerX : 0 : maxX;
      let popupY = 0;

      const imageOffsetX = 50;

      let popupArrowX = (popupX >= 0) ? imageOffsetX - (styles.popupArrow.left * 2.25) : -popupX + styles.popupArrow.left;
      let popupArrowY = 0;

      let popupArrowPseudoStyle = '';

      const spaceAboveSelector = triggerY;
      const spaceBelowSelector = windowMaxY - triggerY - triggerHeight;

      if(spaceAboveSelector < spaceBelowSelector) {
        popupY = (initialMaxY < windowMaxY) ? (triggerY < 50) ? -triggerY + 50 : styles.popup.top : maxY;
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

    const { children } = this.props;

    const popupPosition = this.calculatePopupPosition();

    return (
      <div style={[styles.popup, popupPosition[0]]}>
        <div style={[styles.popupArrow, popupPosition[1]]}>
          <div style={styles[popupPosition[2]]['::before']}></div>
          <div style={styles[popupPosition[2]]['::after']}></div>
        </div>
        <div style={styles.popupBody}>
          {children}
        </div>
      </div>
    );
  }
}

export default Radium(Popup);
