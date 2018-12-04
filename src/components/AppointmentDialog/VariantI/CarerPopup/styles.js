export default {
  popup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: 660,
    boxShadow: '0 2px 10px 0px rgba(204,204,204,.5)',
    border: '1px solid #CCCCCC',
    padding: 0,
    zIndex: 100,
    height: 461,
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
  popupArrowGone: {
      '::before': {
        display: 'none'
      },
      '::after': {
        display: 'none'
      }
  },
  popupTopSection: {
    display: 'flex',
    flexGrow: 2
  },
  popupLeftSection: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    borderRight: '1px solid #CCCCCC',
  },
  popupRightSection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    padding: 10
  },
  popupRightSectionBody: {
    display: 'flex',
    flexGrow: 2,
    flexDirection: 'column',
    H1: {
      color: '#CCCCCC'
    }
  },
  recommendedTextStatement: {
    paddingBottom: 15
  },
  recommendedTextStatementPositive: {
    color: '#060'
  },
  recommendedTextStatementNegative: {
    color: '#DF2D2A'
  },
  popupBottomSection: {
    display: 'flex',
    minHeight: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #CCCCCC',
    paddingLeft: 10,
    paddingRight: 10
  },
  popupLeftSectionHeader: {
    flexShrink: 1,
    padding: 10
  },
  popupLeftSectionFooter: {
    flexShrink: 1,
    padding: 10,
    borderTop: '1px solid #CCCCCC'
  },
  carers: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    overflowX: 'hidden',
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
  carerIcon: {
    marginRight: 5,
    width: 15,
    height: 15
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
  selectedCarerIcon: {
    fill: '#E9F0F4'
  },
  disabledCarer: {
    cursor: 'not-allowed'
  },
  disabledCarerText: {
    color: '#AAAAAA'
  },
  shadowingSupervisingNoneSelected: {
    color: '#256990',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    height: 'initial',
    width: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    boxShadow: 'none',
    transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    WebkitAppearance: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};
