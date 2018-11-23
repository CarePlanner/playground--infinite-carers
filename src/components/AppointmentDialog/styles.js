export default {
  form: {
    display: 'flex',
    alignContent: 'center'
  },
  formComponentsContainer: {
    flexGrow: 1
  },
  formRow: {
    display: 'flex',
    marginBottom: 20
  },
  formLabelContainer: {
    display: 'flex',
    width: 120
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerClientName: {
    color: '#256990'
  },
  headerLinks: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerLink: {
    display: 'flex',
    marginLeft: 15
  },
  headerLinkImage: {
    marginRight: 5,
    height: 15
  },
  carerAndRun: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  runSelector: {
    position: 'relative',
    display: 'inline-block',
    borderRadius: 2,
    backgroundColor: '#01023D',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Droid Sans',
    fontSize: 13,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    cursor: 'pointer'
  },
  runSelectorArrow: {
    marginLeft: 5,
    color: '#FFFFFF'
  },
  line: {
    width: 100,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#D8D8D8'
  },
  carerSelector: {
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    height: 45,
    cursor: 'pointer'
  },
  carerSelectorContainer: {

  },
  carerSelectorImage: {
    borderRadius: '100%',
    width: 30,
    height: 30,
    backgroundColor: '#EEEEEE',
    pointerEvents: 'none'
  },
  carerSelectorName: {
    display: 'flex',
    marginLeft: 10,
    pointerEvents: 'none',
    userSelect: 'none'
  },
  carerSelectorNameText: {
    color: '#9B9B9B'
  },
  carerSelectorArrow: {
    marginLeft: 5,
    color: '#9B9B9B',
    userSelect: 'none'
  },
  carerSelectorDialog: {
    display: 'flex',
    position: 'absolute',
    width: 660,
    boxShadow: '0 2px 10px 0px rgba(204,204,204,.5)',
    border: '1px solid #CCCCCC',
    padding: 0,
    zIndex: 100,
    height: 351,
    top: 50,
    left: -10,
    backgroundColor: '#FFFFFF'
  },
  carerSelectorDialogArrow: {
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
  carerSelectorDialogLeftSection: {
    flexGrow: 1,
    height: '100%',
    borderRight: '1px solid #CCCCCC'
  },
  carerSelectorDialogRightSection: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    height: '100%',
  },
  carerSelectorDialogRightSectionBody: {
    flexGrow: 4,
    width: '100%'
  },
  carerSelectorDialogRightSectionFooter: {
    flexGrow: 1,
    width: '100%',
    borderTop: '1px solid #CCCCCC'
  }
};
