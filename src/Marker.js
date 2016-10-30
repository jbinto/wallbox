import React from 'react'

const WIDTH = 30
const HEIGHT = 30

const getLatLng = (o) => ({ lat: parseFloat(o.lat), lng: parseFloat(o.lon) })


const Marker = ({ children, style }) => {
  const markerStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    left: -WIDTH / 2,
    top: -HEIGHT / 2,

    border: '1px solid #3f51b5',
    fontSize: '24px',
    borderRadius: HEIGHT,
    textAlign: 'center',
    color: 'white',
    padding: 0,
    margin: 0,
    opacity: '0.55',
    // backgroundColor: 'black',
    ...style
  };

  return (
    <div style={markerStyle}>
      {children}
    </div>
  )
}

export default Marker
