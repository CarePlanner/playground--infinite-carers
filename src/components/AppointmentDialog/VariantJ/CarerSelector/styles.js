export default {
  carerSelector: {
    position: 'relative',
    display: 'inline-flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
    ':hover': {}
  },
  carerSelectorContainer: {
    display: 'flex',
    flexGrow: 1
  },
  carerSelectorInner: {
    display: 'flex',
    flexGrow: 1,
    ':hover': {}
  },
  carerSelectorImage: {
    borderRadius: '100%',
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: '#EEEEEE'
  },
  carerSelectorNameText: {
    color: '#9B9B9B'
  },
  carerSelectorArrow: {
    marginLeft: 5,
    color: '#9B9B9B',
    userSelect: 'none'
  },
  carerSelectorIndicators: {
    fontSize: 11,
    fontWeight: 'normal'
  },
  selectedCarerSelectorNameText: {
    color: '#256990'
  },
  selectedCarerSelectorArrow: {
    color: '#256990'
  },
  removeSlotLink: {
    color: '#DF2D2A',
    marginRight: 15,
    opacity: 0
  },
  runIndicator: {
    borderRadius: 2,
    backgroundColor: '#01023D',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Droid Sans',
    fontSize: 11,
    paddingLeft: 4,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 1
  }
};
