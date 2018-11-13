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
    userSelect: 'none'
  },
  popupArrowAbove: {
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
  popupArrowBelow: {
      '::before': {
        position: 'absolute',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '.5rem .5rem 0',
        bottom: 0,
        borderTopColor: '#CCCCCC'
      },
      '::after': {
        position: 'absolute',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '.5rem .5rem 0',
        bottom: 1,
        borderTopColor: '#FFFFFF',
      }
  },
  popupLeftSection: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
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
    flexDirection: 'column',
    H1: {
      color: '#CCCCCC'
    }
  },
  popupRightSectionBodyFooter: {
  },
  popupRightSectionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTop: '1px solid #CCCCCC',
    padding: 15
  },
  popupLeftSectionHeader: {
    flexShrink: 1,
    padding: 15
  },
  popupLeftSectionFooter: {
    flexShrink: 1,
    padding: 15,
    borderTop: '1px solid #CCCCCC'
  },
  carers: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    overflow: 'scroll',
  },
  carer: {
    position: 'relative',
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
      backgroundColor: '#EFEFEF'
    }
  },
  carerImage: {
    borderRadius: '100%',
    width: 30,
    height: 30,
    backgroundColor: '#EEEEEE',
    marginRight: 10
  },
  carerName: {
    display: 'flex',
    userSelect: 'none'
  },
  carerNameText: {
  },
  selectedCarer: {
    backgroundColor: '#256990',
    ':hover': {
      backgroundColor: '#256990'
    }
  },
  selectedCarerNameText: {
    color: '#E9F0F4',
    fontWeight: 'bold',
    ':hover': {
      color: '#E9F0F4',
      fontWeight: 'bold',
    }
  },
  disabledCarer: {
    cursor: 'not-allowed'
  },
  disabledCarerText: {
    color: '#AAAAAA'
  }
};
