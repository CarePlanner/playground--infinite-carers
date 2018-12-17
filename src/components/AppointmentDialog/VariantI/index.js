import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import CarerSelector from './CarerSelector';
import { H1, H2, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';
import { addCarerSlot } from '../actions';

class VariantI extends React.Component {

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
      <Button onClick={this.addCarerSlot} style={{width: '100%'}}>Add Carer</Button>
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
)(Radium(VariantI));
