export default {
  container: {
    position: 'relative',
    fontFamily: 'Droid Sans',
    fontSize: 13,
    color: '#333333'
  },
  textBox: {
    position: 'relative',
    display: 'block',
    width: '100%',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 30,
    fontWeight: 400,
    fontSize: 13,
    fontFamily: 'Droid Sans',
    color: '#555555',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CCCCCC',
    borderRadius: 4,
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
    transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    WebkitAppearance: 'none',
    boxSizing: 'border-box'
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: '#EEEEEE'
  },
  arrow: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: '#888888'
  }
};
