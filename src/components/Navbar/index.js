import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { Select } from '../Form';

class Navbar extends React.Component {

  constructor() {
    super();
    this.state = {
      defaults: {
        activeMenuItem: 'dashboard',
        activeSecondaryNavbarMenuItem: 'carer-roster',
        menuItems: {
            'dashboard': {
                title: 'Dashboard'
            },
            'carer': {
                title: 'Carers'
            },
            'client': {
                title: 'Clients'
            },
            'manage': {
                title: 'Manage',
                secondaryNavbarMenuItems: {
                    'weekly-overview': {
                        title: 'Weekly Overview'
                    },
                    'weekly-carer-roster': {
                        title: 'Weekly Carer Roster'
                    },
                    'carer-roster': {
                        title: 'Carer Roster'
                    },
                    'client-roster': {
                        title: 'Client Roster'
                    },
                    'call-monitoring': {
                        title: 'Call Monitoring'
                    },
                    'diary': {
                        title: 'Diary'
                    },
                    'monthly-live-in': {
                        title: 'Monthly Live-In'
                    },
                    'training': {
                        title: 'Training'
                    },
                    'map-view': {
                        title: 'Map View'
                    },
                    'live-map': {
                        title: 'Live Map'
                    }
                }
            },
            'reports': {
                title: 'Reports'
            },
            'finance': {
                title: 'Finance'
            },
            'admin': {
                title: 'Admin'
            },
        },
        secondaryMenuItems: {
            'user': {
                title: 'Dale Webb'
            },
            'whats-new': {
                title: 'What\'s New'
            },
            'get-support': {
                title: 'Get Support'
            },
            'log-out': {
                title: 'Log out'
            }
        }
      },
      users: [
        'Aaron Aaronson'
      ],
      regions: [
        'Bristol'
      ]
    }
  }

  render() {
    const { defaults, users, regions } = this.state;

    const menuItems = (this.props.menuItems) ? this.props.menuItems : defaults.menuItems;
    const secondaryMenuItems = (this.props.secondaryMenuItems) ? this.props.secondaryMenuItems : defaults.secondaryMenuItems;
    const activeMenuItemKey = (this.props.activeMenuItem) ? this.props.activeMenuItem : defaults.activeMenuItem;
    const activeSecondaryNavbarMenuItemKey = (this.props.activeSecondaryNavbarMenuItem) ? this.props.activeSecondaryNavbarMenuItem : defaults.activeSecondaryNavbarMenuItem;
    const activeMenuItem = menuItems[activeMenuItemKey];


    return (
      <div style={styles.navbarContainer}>
        <div style={styles.navbar}>
          <div style={styles.menu}>
            <img style={styles.logo} src={require('./tiny-logo.png')} />
            {Object.keys(menuItems).map((key) => (
              <div style={[styles.menuItem, (key === activeMenuItemKey) ? styles.menuItem.active : null]} key={key}>
                {menuItems[key].title}
              </div>
            ))}
          </div>
          <div>
            <Select inline={ true } placeholder={ 'User Search' } options={ users } style={{ width: 224 }} />
            <Select inline={ true } placeholder={ 'All' } options={ regions } style={{ width: 224, marginLeft: -15 }} />
          </div>
        </div>
        <div style={styles.secondaryMenu}>
          {Object.keys(secondaryMenuItems).map((key, i, arr) => (
            <div style={[styles.secondaryMenuItem, (i === (arr.length - 1)) ? styles.secondaryMenuItem[':last'] : null]} key={key}>
              {secondaryMenuItems[key].title}
            </div>
          ))}
        </div>
        {activeMenuItem.secondaryNavbarMenuItems && <div style={styles.secondaryNavbar}>
            {Object.keys(activeMenuItem.secondaryNavbarMenuItems).map((key) => (
              <div style={[styles.secondaryNavbarMenuItem, (key === activeSecondaryNavbarMenuItemKey) ? styles.secondaryNavbarMenuItem.active : null]} key={key}>
                {activeMenuItem.secondaryNavbarMenuItems[key].title}
              </div>
            ))}
        </div>
        }
      </div>
    );
  }
}

export default Radium(Navbar);
