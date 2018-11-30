export default {
  defaults: {
    fontFamily: 'Droid Sans',
    fontSize: 13,
    color: '#333333',
  },
  Span: {

  },
  A: {
    color: '#256990',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  H1: {
    fontSize: 22,
    fontWeight: 700,
    color: '#256990',
    paddingTop: 0,
  },
  H2: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.1,
    marginTop: 0,
    padding: '5px 0'
  },
  H3: {
    display: 'block',
    fontSize: 16,
    color: '#256990',
  },
  H5: {
    display: 'block',
    fontWeight: 700,
    color: '#256990',
    lineHeight: '17px'
  },
  line: {
    flexGrow: 2,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#D8D8D8'
  },
  textContainer: {
    display: 'inline-flex',
    alignItems: 'center'
  }
};
