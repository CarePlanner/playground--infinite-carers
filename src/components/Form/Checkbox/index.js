import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { Span } from '../../Text';

class Checkbox extends React.Component {

  render() {

    const { label, children, value, onClick, selectedValues, style } = this.props;

    let isSelected = false;

    if(selectedValues) {
      if(typeof selectedValues === 'array' && value) {
        isSelected = selectedValues.indexOf(value) > -1
      } else {
        isSelected = !!selectedValues;
      }
    }

    return (
      <div style={ style }>
        <span onClick={ (onClick) ? onClick.bind(this, value || !isSelected) : null }>
          <input type={"checkbox"} style={styles.checkbox} checked={isSelected} onChange={ null } />
          <Span style={styles.label}>
            {label}
            {children}
          </Span>
        </span>
      </div>
    );
  }
}

export default Radium(Checkbox);
