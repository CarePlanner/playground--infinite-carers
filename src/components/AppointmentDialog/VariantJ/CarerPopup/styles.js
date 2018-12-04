export default {
  popupBodyHeader: {
    flexShrink: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderBottomStyle: 'solid',
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
  }
};
