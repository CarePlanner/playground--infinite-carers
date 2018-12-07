import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import styles from './styles';

class Popup extends React.Component {

  constructor(args) {
    super(args);
    this.clickOff = this.clickOff.bind(this);
    this.calculatePopupPosition = this.calculatePopupPosition.bind(this);
  }

  componentWillMount() {
    this.calculatePopupPosition();
  }

  componentDidMount() {
    this.popupDOMNode = ReactDOM.findDOMNode(this);
    document.addEventListener('click', this.clickOff);
    document.addEventListener('scroll', this.calculatePopupPosition);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOff);
    document.removeEventListener('scroll', this.calculatePopupPosition);
  }

  clickOff(e) {
    const { onClickOff } = this.props;
    if(e.target !== this.popupDOMNode && !this.popupDOMNode.contains(e.target)) {
      onClickOff && onClickOff();
    }
  }

  calculatePopupPosition() {
      const { allowOffViewport, showOnSides } = this.props;
      const width = (this.props.style && this.props.style.width) || styles.popup.width;
      const height = (this.props.style && this.props.style.height) || styles.popup.height;
      const { x: triggerX, y: triggerY, height: triggerHeight, width: triggerWidth, top, left } = this.props.trigger.current.getBoundingClientRect();
      let { width: windowMaxX, height: windowMaxY } = window.visualViewport;

      const initialMaxX = triggerX + width;
      const initialMaxY = triggerY + height;

      const initialMinX = 50;
      const initialMinY = triggerY - height - styles.popupArrow.height;

      const maxX = (windowMaxX - triggerX) - width;
      const maxY = (windowMaxY - triggerY) - height;

      let popupX = (initialMaxX < windowMaxX) ? (triggerX < 50) ? -triggerX : 0 : maxX;
      let popupY = 0;

      const imageOffsetX = 50;

      let popupArrowX = (popupX >= 0) ? imageOffsetX - (styles.popupArrow.left * 2.25) : -popupX + styles.popupArrow.left;
      let popupArrowY = 0;

      let popupArrowPseudoStyle = '';

      const spaceAboveSelector = triggerY;
      const spaceBelowSelector = windowMaxY - triggerY - triggerHeight;
      const spaceOnLeftOfSelector = triggerX;
      const spaceOnRightOfSelector = windowMaxX - triggerX - triggerWidth;

      if(showOnSides) {
        if(spaceOnLeftOfSelector < spaceOnRightOfSelector) {
          popupX = (initialMaxX > windowMaxX && !allowOffViewport) ? maxX : triggerWidth;
          popupArrowX = styles.popupArrow.left;
          popupArrowPseudoStyle = (popupY < 50) ? 'popupArrowGone' : 'popupArrowAbove';
        } else {
          popupX = (initialMinX < 0 && !allowOffViewport) ? -initialMinX - width : -width - styles.popupArrow.width;
          popupArrowX = width - 1;
          popupArrowPseudoStyle = 'popupArrowOnRight';
        }
        popupY = - ((height / 2) - (triggerHeight / 2));
        popupArrowY = height / 2 - 1;
      } else {
        if(spaceAboveSelector < spaceBelowSelector) {
          popupY = (initialMaxY > windowMaxY && !allowOffViewport) ? maxY : ((triggerY < 50) ? -triggerY + 50 : styles.popup.top);
          popupArrowY = styles.popupArrow.top;
          popupArrowPseudoStyle = (popupY < 50) ? 'popupArrowGone' : 'popupArrowAbove';
        } else {
          popupY = (initialMinY < 0 && !allowOffViewport) ? -initialMinY - height : -height - styles.popupArrow.height;
          popupArrowY = height - 1;
          popupArrowPseudoStyle = (popupY + height > -styles.popupArrow.height) ? 'popupArrowGone' : 'popupArrowBelow';
        }
      }

      this.setState({
        popupPosition: [
          { top: popupY + top, left: popupX + left },
          { top: popupArrowY, left: popupArrowX },
          popupArrowPseudoStyle
        ]
      });
  }

  render() {

    const { children, style, ...inheritedProps } = this.props;

    const { popupPosition } = this.state;

    return (
      <div style={[styles.popup, popupPosition[0], style]} {...inheritedProps}>
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
