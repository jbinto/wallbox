import React from 'react'

const WIDTH = 5
const HEIGHT = 5

const style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: WIDTH,
  height: HEIGHT,
  left: -WIDTH / 2,
  top: -HEIGHT / 2,

  border: '1px solid #3f51b5',
  borderRadius: HEIGHT,
  backgroundColor: '#f44336',
  textAlign: 'center',
  color: '#3f51b5',
  padding: 4
};

const Marker = ({ children }) => <div style={style}>{children}</div>

export default Marker
