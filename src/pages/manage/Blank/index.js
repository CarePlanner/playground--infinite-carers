import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { connect } from 'react-redux';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import AppointmentDialog from '../../../components/AppointmentDialog';
import VariantI from '../../../components/AppointmentDialog/VariantI';
import VariantJ from '../../../components/AppointmentDialog/VariantJ';
import { setCarers } from './actions';
import { selectCarer, resetState } from '../../../components/AppointmentDialog/actions';
import Tour from '../../../tour';

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
    const { runsEnabled, carers, careRequired, variant } = this.props;
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
          <Tour
            sectionActions={[
              (context) => {
                this.props.resetState();
                this.props.selectCarer(0, this.props.carers[1]);
              },
              null,
              (context) => {
                this.props.resetState();
                this.props.selectCarer(0, this.props.carers[0]);
              }
            ]}
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
    setCarers: (carers) => dispatch(setCarers(carers)),
    selectCarer: (position, carer) => dispatch(selectCarer(position, carer)),
    resetState: () => dispatch(resetState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(Blank));
