export default {
  popup: {
    display: 'flex',
    position: 'absolute',
    width: 660,
    boxShadow: '0 2px 10px 0px rgba(204,204,204,.5)',
    border: '1px solid #CCCCCC',
    padding: 0,
    zIndex: 100,
    height: 351,
    top: 50,
    left: 0,
    backgroundColor: '#FFFFFF'
  },
  popupArrow: {
    position: 'absolute',
    display: 'block',
    width: 10,
    height: 10,
    top: -8,
    left: 15,
    userSelect: 'none',
    '::before': {
      position: 'absolute',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '0 .5rem .5rem .5rem',
      top: 0,
      borderBottomColor: '#CCCCCC'
    },
    '::after': {
      position: 'absolute',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '0 .5rem .5rem .5rem',
      top: 1,
      borderBottomColor: '#FFFFFF',
    }
  },
  popupLeftSection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    borderRight: '1px solid #CCCCCC',
  },
  popupRightSection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    height: '100%',
  },
  popupRightSectionBody: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 4,
    padding: 15
  },
  popupRightSectionBodyBody: {
    display: 'flex',
    flexGrow: 4,
  },
  popupRightSectionBodyFooter: {
  },
  popupRightSectionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTop: '1px solid #CCCCCC',
    padding: 20
  },
  popupLeftSectionHeader: {
    flexGrow: 1,
    padding: 20
  },
  carers: {
    flexGrow: 2,
    overflow: 'scroll',
  },
  carer: {
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    transition: 'background-color .1s ease-in-out',
    ':hover': {
      backgroundColor: '#D8D8D8'
    }
  },
  carerImage: {
    borderRadius: '100%',
    width: 30,
    height: 30,
    backgroundColor: '#EEEEEE'
  },
  carerName: {
    display: 'flex',
    marginLeft: 10,
    userSelect: 'none'
  },
  carerNameText: {
    color: '#9B9B9B'
  },
  line: {
    width: 100,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#D8D8D8'
  }
};
