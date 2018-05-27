export default {
  navbarContainer: {
    position: 'relative'
  },
  navbar: {
    display: 'flex',
    height: 48,
    padding: '0 20px',
    alignContent: 'flex-start',
    alignItems: 'center',
    background: '#256990',
    justifyContent: 'space-between'
  },
  logo: {
    paddingRight: 10
  },
  menu: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    display: 'flex',
    height: 'calc(100% - 2px)',
    alignContent: 'center',
    alignItems: 'center',
    fontFamily: 'Droid Sans',
    fontSize: 13,
    color: '#FFFFFF',
    padding: '0 10px',
    borderTopWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    ':hover': {
      borderTopColor: '#FFFFFF'
    },
    'active': {
      backgroundColor: '#1b4b67',
      ':hover': {
        borderTopColor: 'transparent'
      }
    }
  },
  secondaryMenu: {
    position: 'absolute',
    bottom: -22,
    right: 17,
    display: 'flex',
    backgroundColor: '#256990'
  },
  secondaryMenuItem: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: 22,
    padding: '0 5px',
    fontSize: 11,
    fontFamily: 'Droid Sans',
    color: '#FFFFFF',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: '#1a4a66',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#1a4a66',
    cursor: 'pointer',
    userSelect: 'none',
    ':hover': {
      backgroundColor: '#1b4b67'
    },
    ':last': {
      borderRightWidth: 0
    }
  }
}
