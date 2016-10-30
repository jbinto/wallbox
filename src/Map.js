import React from 'react'
import GoogleMap from 'google-map-react'
import Marker from './Marker'


const GMAPS_API_KEY = 'AIzaSyAc-O4-ql107qeHBT2E_CXIW3V2GTXs5Fk'

// https://snazzymaps.com/style/44/mapbox
const MAP_STYLES = [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

const LeftArrow = () => <p>{'<'}</p>
const RightArrow = () => <p>{'>'}</p>
const QuestionMark = () => <p>{'?'}</p>

const getDirectionArrow = ({ location, westPrefix, eastPrefix }) => {
  const { directionId } = location
  if (directionId == null) return <QuestionMark />
  const isWest = directionId.startsWith(westPrefix)
  const isEast = directionId.startsWith(eastPrefix)
  if (isWest) return <LeftArrow />
  if (isEast) return <RightArrow />
  return <QuestionMark />
}

const getMarkerColor = ({ location, expectedPrefix }) => {
  const { directionId } = location
  if (directionId == null) return 'black'
  const isSameDirectionAsExpected = directionId.startsWith(expectedPrefix)
  return (
    isSameDirectionAsExpected
      ? 'green'
      : 'red'
  )
}

const Map = ({ location, westPrefix, eastPrefix, expectedPrefix }) => {
  if (location == null) return null
  const latLng = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon),
  }

  const directionArrow = getDirectionArrow({ location, westPrefix, eastPrefix })
  const markerColor = getMarkerColor({ location, expectedPrefix })

  // Make the height of the GMaps bigger than the container so the google logo
  // is chopped off (sorry trademark lawyers)
  return <div style={{ height: 350, width: 238, display: "inline-block" }}>
    <GoogleMap
      bootstrapURLKeys={{
        key: GMAPS_API_KEY
      }}
      center={latLng}
      zoom={16}
      options={{
        styles: MAP_STYLES,
        zoomControl: false,
      }}
    >
      <Marker {...latLng} style={{ backgroundColor: markerColor }}>
        {directionArrow}
      </Marker>
    </GoogleMap>
  </div>
}

export default Map
