import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import CarerSelector from './CarerSelector';
import { H1, H2, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import { addCarerSlot } from '../actions';

class VariantJ extends React.Component {

  constructor(args) {
    super(args);
    this.addCarerSlot = this.addCarerSlot.bind(this);
  }

  addCarerSlot() {
    this.props.addCarerSlot();
  }

  render() {
    const { runsEnabled, careRequired, carerSlots, allCarers } = this.props;

    return (
      <div>
        <div style={styles.carersHeading}>
          <H5 showLine={true}>Carers</H5>
          <A onClick={this.addCarerSlot}>Add</A>
        </div>
        <div>
        {carerSlots.map((carerSlot, i) => (
          <CarerSelector
            key={carerSlot.id}
            id={carerSlot.id}
            slot={carerSlot}
            position={i}
            allCarers={allCarers}
            careRequired={careRequired}
            runsEnabled={runsEnabled}
          />
        ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.appointmentDialogReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    addCarerSlot: () => dispatch(addCarerSlot())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(VariantJ));
