import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Select extends React.Component {

  render() {

    const { multiple, options, style, disabled, value, onChange, placeholder, hideArrow } = this.props;

    return (
      <div style={styles.container}>
        <select
          multiple={multiple}
          value={value}
          onChange={ (onChange) ? onChange.bind(this) : null }
          style={[styles.textBox, (disabled) ? styles.disabled : null, style]}
          disabled={disabled}
        >
          {(!value) ? <option value="" disabled selected>{placeholder || 'Select a value'}</option> : null}
          {options ? options.map((option, i) => <option value={i}>{option}</option>) : null}
        </select>
        {!hideArrow && <span style={ styles.arrow }>&#9662;</span>}
      </div>
    );
  }
}

export default Radium(Select);
