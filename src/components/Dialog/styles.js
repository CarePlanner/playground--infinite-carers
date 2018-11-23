export default {
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: 730,
    boxShadow: '0 10px 10px 1px rgba(0,0,0,.45)',
    border: '1px solid #256990',
    padding: 0,
    borderRadius: 5,
    backgroundColor: '#FCFDFD',
    zIndex: 100,
    minHeight: 500
  },
  dialogTitleBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'move',
    backgroundColor: '#256990',
    padding: 0,
    border: 0,
    zIndex: 2,
    height: 34,
    borderRadius: 0,
  },
  dialogCloseButton: {
    width: 17,
    height: 17,
    border: 0,
    right: '.7em',
    padding: 0
  },
  dialogTitleBarItem: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    fontFamily: 'Droid Sans',
    fontSize: 13,
    color: '#FFFFFF',
    padding: '0 10px',
    cursor: 'pointer',
    userSelect: 'none',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: '#FFFFFF',
    ':hover': {
      backgroundColor: '#FFFFFF',
      color: '#256990'
    },
    'active': {
      backgroundColor: '#FFFFFF',
      color: '#256990'
    }
  },
  dialogBody: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    flexGrow: 2
  },
  dialogBodyHeader: {
    paddingLeft: 20,
    paddingRight: 20
  },
  dialogBodyFooter: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  dialogBodyBody: {
    flexGrow: 2,
    padding: 20
  }
};
