import React from 'react';
import Radium from 'radium';
import styles from './styles';

class TextBox extends React.Component {

  render() {

    const {
      type,
      style,
      inline,
      disabled,
      value,
      onChange,
      min,
      max,
      ref,
      onKeyUp
    } = this.props;

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={ (onChange) ? onChange.bind(this) : null }
        onKeyUp={onKeyUp}
        style={[styles.textBox, (inline) ? styles.inline : null, (disabled) ? styles.disabled : null, style]}
        disabled={disabled}
        min={ min }
        max={ max }
      />
    );
  }
}

export default Radium(TextBox);
