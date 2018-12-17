import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Button extends React.Component {

  render() {

    const { children, onClick, theme, style } = this.props;

    return (
      <a style={[styles.button, theme ? styles[theme] : styles['neutral'], style]} onClick={this.props.onClick}>
        {children}
      </a>
    );
  }
}

export default Radium(Button);
