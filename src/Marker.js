import React from 'react'

const WIDTH = 400
const HEIGHT = 100

const getLatLng = (o) => ({ lat: parseFloat(o.lat), lng: parseFloat(o.lon) })


const Marker = ({ children, style }) => {
  const markerStyle = {
    display: 'inline-block',
    fontSize: '24px',
    padding: '0px 20px',
    borderRadius: '10px',
    lineHeight: '0',
    opacity: '0.55',
    ...style
  };

  return (
    <div style={markerStyle}>
      {children}
    </div>
  )
}

export default Marker
