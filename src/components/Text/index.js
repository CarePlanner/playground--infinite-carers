import React from 'react';
import Radium from 'radium';

import styles from './styles';

class Text extends React.Component {

  constructor(args) {
    super(args);
  }

  render() {

    const { style, onClick } = this.props;

    return (
      <span style={[styles.defaults, ...style]} onClick={(onClick) ? onClick : null}>{this.props.children}</span>
    );
  }
}

Text = Radium(Text);

function makeText(args, style) {
  return (
    <Text {...args} style={[args.style, style]}>{args.children}</Text>
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
