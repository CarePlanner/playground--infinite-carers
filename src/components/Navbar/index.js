import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Navbar extends React.Component {

  constructor() {
    super();
    this.state = {
      defaults: {
        active: 'dashboard',
        menuItems: [
          {
            key: 'dashboard',
            title: 'Dashboard'
          },
          {
            key: 'carer',
            title: 'Carers'
          },
          {
            key: 'client',
            title: 'Clients'
          },
          {
            key: 'manage',
            title: 'Manage'
          },
          {
            key: 'reports',
            title: 'Reports'
          },
          {
            key: 'finance',
            title: 'Finance'
          },
          {
            key: 'admin',
            title: 'Admin'
          },
        ],
        secondaryMenuItems: [
          {
            key: 'user',
            title: 'Dale Webb'
          },
          {
            key: 'whats-new',
            title: 'What\'s New'
          },
          {
            key: 'get-support',
            title: 'Get Support'
          },
          {
            key: 'log-out',
            title: 'Log out'
          }
        ]
      }
    }
  }

  render() {
    const defaults = this.state.defaults;

    const menuItems = (this.props.menuItems) ? this.props.menuItems : defaults.menuItems;
    const secondaryMenuItems = (this.props.secondaryMenuItems) ? this.props.secondaryMenuItems : defaults.secondaryMenuItems;
    const active = (this.props.active) ? this.props.active : defaults.active;

    return (
      <div style={styles.navbarContainer}>
        <div style={styles.navbar}>
          <img style={styles.logo} src={require('./tiny-logo.png')} />
          <div style={styles.menu}>
            {menuItems.map((item) => (
              <div style={[styles.menuItem, (item.key === active) ? styles.menuItem.active : null]} key={item.key}>
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.secondaryMenu}>
          {secondaryMenuItems.map((item, i, arr) => (
            <div style={[styles.secondaryMenuItem, (i === (arr.length - 1)) ? styles.secondaryMenuItem[':last'] : null]} key={item.key}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Radium(Navbar);
