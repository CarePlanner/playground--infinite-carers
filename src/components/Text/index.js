import React from 'react';
import Radium from 'radium';

import styles from './styles';

class Text extends React.Component {

  constructor(args) {
    super(args);
  }

  render() {

    const { textStyle, style } = this.props;

    return (
      <span style={[styles.default, textStyle, style]}>{this.props.children}</span>
    );
  }
}

Text = Radium(Text);

function makeText(args, style) {
  return (
    <Text style={[args.style, style]} {...args}>{args.children}</Text>
  );
};

export const H1 = (args) => makeText(args, styles.H1);
export const Span = (args) => makeText(args, styles.Span);
export const A = (args) => makeText(args, styles.A);
export const B = (args) => makeText(args, styles.B);
export const I = (args) => makeText(args, styles.I);
