export default {
  container: {
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 13,
    fontFamily: '"Droid Sans"'
  },
  neutral: {
    background: '-webkit-gradient(linear,left bottom,left top,color-stop(0,#ddd),color-stop(1,#fff))',
    color: '#256990',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#B7B7B7',
    ':hover': {
      background: '-webkit-gradient(linear,left bottom,left top,color-stop(0,#f7f7f7),color-stop(1,#eaeaea))'
    }
  },
  positive: {
    background: '-webkit-gradient(linear,left bottom,left top,color-stop(0,#449d44),color-stop(1,#80c780))',
    color: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4cae4c',
    ':hover': {
      background: '-webkit-gradient(linear,left bottom,left top,color-stop(0,#80c780),color-stop(1,#449d44))'
    }
  }
};
