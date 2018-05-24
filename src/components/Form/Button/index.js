import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Button extends React.Component {

  render() {

    const { label, onClick, theme } = this.props;

    return (
      <div style={styles.container}>
        <a style={[styles.button, styles[theme]]} onClick={this.props.onClick}>
          {label}
        </a>
      </div>
    );
  }
}

export default Radium(Button);
