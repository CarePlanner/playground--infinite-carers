export default {
  popup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: 262,
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
    left: 0,
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
  popupArrowOnRight: {
      '::before': {
        position: 'absolute',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '.5rem',
        bottom: 2,
        right: -8,
        borderLeftColor: '#CCCCCC'
      },
      '::after': {
        position: 'absolute',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '.5rem',
        bottom: 2,
        right: -7,
        borderLeftColor: '#FFFFFF',
      }
  },
  popupArrowOnLeft: {
    '::before': {
      position: 'absolute',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '.5rem',
      bottom: 2,
      left: -16,
      borderRightColor: '#CCCCCC'
    },
    '::after': {
      position: 'absolute',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '.5rem',
      bottom: 2,
      left: -15,
      borderRightColor: '#FFFFFF',
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
  popupBody: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  }
};
