export default {
  popupBodyHeader: {
    flexShrink: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderBottomStyle: 'solid',
  },
  popupBody: {
    padding: 15
  },
  slotSettingsHeader: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  popupBodyFooter: {
    flexShrink: 1,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    borderTopStyle: 'solid',
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
