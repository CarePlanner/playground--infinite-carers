import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Button extends React.Component {

  render() {

    const { label, onClick, theme, style } = this.props;

    return (
      <a style={[styles.button, styles[theme], style]} onClick={this.props.onClick}>
        {label}
      </a>
    );
  }
}

export default Radium(Button);
