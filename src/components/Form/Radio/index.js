import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { Span } from '../../Text';

class Radio extends React.Component {

  render() {

    const { label, children, name, value, onClick, selectedValue, style } = this.props;

    return (
      <div style={ style }>
        <span onClick={ (onClick) ? onClick.bind(this, value) : null }>
          <input type={"radio"} style={styles.radio} checked={ value === selectedValue } onChange={ null } />
          <Span style={styles.label}>
            {label}
            {children}
          </Span>
        </span>
      </div>
    );
  }
}

export default Radium(Radio);
