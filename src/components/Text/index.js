import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

import styles from './styles';

class Text extends React.Component {

  constructor(args) {
    super(args);
  }

  componentDidMount() {
    this.DOMNode = ReactDOM.findDOMNode(this);
  }

  render() {

    const { style, onClick, showLine, children, ...inheritedProps } = this.props;

    let addLineRightMargin = true;

    if(showLine) {
      if(this.DOMNode && !this.DOMNode.nextSibling) {
        addLineRightMargin = false;
      }
    }

    return (
      <span style={[styles.textContainer, showLine ? { flexGrow: 2 } : null]} {...inheritedProps}>
        <span style={[styles.defaults, ...style]} onClick={(onClick) ? onClick : null}>{children}</span>
        {showLine && <div style={[styles.line, (!addLineRightMargin) ? { marginRight: 0 } : null]}></div>}
      </span>
    );
  }
}

Text = Radium(Text);

function makeText(args, style) {
  return (
    <Text {...args} style={[style, args.style]}>{args.children}</Text>
  );
};

export const H1 = (args) => makeText(args, styles.H1);
export const H2 = (args) => makeText(args, styles.H2);
export const H3 = (args) => makeText(args, styles.H3);
export const H5 = (args) => makeText(args, styles.H5);
export const Span = (args) => makeText(args, styles.Span);
export const A = (args) => makeText(args, styles.A);
export const B = (args) => makeText(args, styles.B);
export const I = (args) => makeText(args, styles.I);
