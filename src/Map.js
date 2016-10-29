import React from 'react'
import GoogleMap from 'google-map-react'
import Marker from './Marker'


// https://snazzymaps.com/style/44/mapbox
const MAP_STYLES = [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

const Map = ({ location }) => {
  if (location == null) return null
  const getLatLng = (o) => ({ lat: parseFloat(o.lat), lng: parseFloat(o.lon) })

  // Make the height of the GMaps bigger than the container so the google logo
  // is chopped off (sorry trademark lawyers)
  return <div style={{ height: 350, width: 238, display: "inline-block" }}>
    <GoogleMap
      center={getLatLng(location)}
      zoom={16}
      options={{
        styles: MAP_STYLES,
        zoomControl: false,
      }}
    >
      <Marker {...getLatLng(location)} />
    </GoogleMap>
  </div>
}

export default Map
