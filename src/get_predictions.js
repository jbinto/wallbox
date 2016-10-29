import _ from 'lodash'

const LOCATION_URL = 'http://restbus.info/api/agencies/ttc/routes/85/vehicles'
export const STOPS = [
  {
    code: 'E',
    name: '85A SHEPPARD - EASTBOUND to BAYVIEW',
    url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/10133/predictions',
  },
  {
    code: 'W',
    name: '85A SHEPPARD - WESTBOUND to YONGE',
    url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/9322/predictions',
  },
]

export const EASTBOUND_PREFIX = "85_0_"
export const WESTBOUND_PREFIX = "85_1_"

const getLocations = async () => {
  const response = await fetch(LOCATION_URL)
  const locations = await response.json()
  return locations.map(
    (l) => _.pick(l, [
      'id',
      'directionId',
      'predictable',
      'secsSinceReport',
      'lat',
      'lon',
    ])
  )
}

const getPredictionsAndLocation = async (stopPredictionURL) => {
  const response = await fetch(stopPredictionURL)
  const json = await response.json()
  if (json.length === 0) return []

  const {values} = json[0]

  if (values.length === 0) return []

  const predictions = values.map((v) => ({
    minutes: v.minutes,
    seconds: v.seconds,
    vehicle_id: v.vehicle.id,
    title: v.direction.title,
  }))

  const locations = await getLocations()
  const location = _.find(locations, {
    // Return the first vehicle   only to keep it simple for now
    id: predictions[0].vehicle_id
  })

  return {
    predictions,
    location,
  }
}

export default getPredictionsAndLocation
