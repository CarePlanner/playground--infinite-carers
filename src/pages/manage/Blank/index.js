import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import AppointmentDialog from '../../../components/AppointmentDialog';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

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
    this.store = createStore(rootReducer);
  }

  render() {
    const { runsEnabled } = this.props;
    const { initialDialogPosition } = this.state;

    const navbar = (
      <Navbar activeMenuItem={'manage'} activeSecondaryNavbarMenuItem={'carer-roster'} />
    );

    return (
      <Provider store={this.store}>
        <div style={{height: 1000}}>
          <Page navbar={navbar}>
            <AppointmentDialog
              parent={this.ref}
              dialogPosition={initialDialogPosition}
              runsEnabled={runsEnabled}
            />
          </Page>
        </div>
      </Provider>
    );
  }
}

export default Radium(Blank);
