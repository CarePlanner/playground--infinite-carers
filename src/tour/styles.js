export default {
  container: {
    position: 'fixed',
    bottom: 30,
    right: 30,
    display: 'flex',
    flexDirection: 'column',
    width: 500,
    maxHeight: 'calc(100% - 60px)',
    borderRadius: 10,
    boxShadow: '#55555555 0px 2px 20px 0px',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundImage: 'linear-gradient(to right, #3023AE, #C86DD7)',
  },
  headerTitle: {
    marginTop: 0,
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 18
  },
  headerDescription: {
    marginTop: 0,
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 1.75,
    whiteSpace: 'pre-wrap'
  },
  body: {
    flexGrow: 1,
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  bodyItems: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  bodyText: {
    marginTop: 0,
    marginBottom: 10,
    color: '#222222',
    fontSize: 15,
    lineHeight: 1.75,
    whiteSpace: 'pre-wrap'
  },
  bodyHelpText: {
    marginTop: 0,
    marginBottom: 10,
    color: '#CCCCCC',
    fontSize: 12
  },
  formControls: {
    marginTop: 10,
    marginBottom: 10
  },
  textField: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CCCCCC',
    borderRadius: 5,
    fontSize: 13,
    padding: 10,
    boxSizing: 'border-box'
  },
  textarea: {
    height: 200
  },
  checkbox: {
    marginRight: 10
  },
  option: {
    display: 'block',
    marginBottom: 10,
    marginRight: 20
  },
  footer: {
    position: 'relative',
    display: 'flex',
    borderTopColor: '#EEEEEE',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    padding: 15,
    minHeight: 49
  },
  footerButton: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
    cursor: 'pointer',
    opacity: .6,
    ':hover': {
      opacity: 1
    }
  },
  buttonPositive: {
    backgroundColor: '#7ED321',
    color: '#FFFFFF'
  },
  buttonNeutral: {
    backgroundColor: '#EFEFEF',
    color: '#9B9B9B'
  },
  scrollIndicator: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: -50,
    left: 0,
    height: 50,
    width: '100%',
    color: '#555555',
    textAlign: 'center',
    boxShadow: 'inset 0 -10px 40px -10px #5555',
    transition: 'opacity .5s',
    opacity: 0
  }
};
