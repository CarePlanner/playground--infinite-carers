import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { Span } from '../../Text';

class Checkbox extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      checked: args.checked,
      label: args.label
    }
  }

  toggle() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {

    const { label, checked } = this.state;

    return (
      <div style={styles.container} onClick={this.toggle.bind(this)}>
        <input type={"checkbox"} style={styles.checkbox} checked={checked} />
        <Span style={styles.label}>{label}</Span>
      </div>
    );
  }
}

export default Radium(Checkbox);
