import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { connect } from 'react-redux';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import AppointmentDialog from '../../../components/AppointmentDialog';
import { setCarers } from './actions';
import VariantJ from '../../../components/AppointmentDialog/VariantJ';

class Blank extends React.Component {

  constructor(args) {
    super(args);
    this.ref = React.createRef();
    this.state = {
    initialDialogPosition: {
        top: 250,
        left: 250
      }
    }
  }

  componentDidMount() {
    this.props.setCarers(this.props.carers);
  }

  render() {
    const { runsEnabled, carers, careRequired } = this.props;
    const { initialDialogPosition } = this.state;

    const navbar = (
      <Navbar activeMenuItem={'manage'} activeSecondaryNavbarMenuItem={'carer-roster'} />
    );

    return (
      <div style={{height: 1000}}>
        <Page navbar={navbar}>
          <AppointmentDialog
            parent={this.ref}
            dialogPosition={initialDialogPosition}
            runsEnabled={runsEnabled}
            allCarers={carers}
            careRequired={careRequired}
            Variant={VariantJ}
          />
        </Page>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.appointmentDialogReducer,
    ...state.blankManagePageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCarers: (carers) => dispatch(setCarers(carers))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(Blank));
