import React from 'react'

const Overlay = ({ styles, children }) => (
  <div style={{
    zIndex: 999,
    position: "absolute",
    width: 238,
    height: 45,
    backgroundColor: 'black',
    opacity: 0.7,
    fontSize: "0.7em",
    textAlign: 'center',
    whiteSpace: 'normal',
    ...styles
  }}>
    {children}
  </div>
)

export default Overlay
