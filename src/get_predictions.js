import _ from 'lodash'

const LOCATION_URL = 'http://restbus.info/api/agencies/ttc/routes/320/vehicles'
// export const STOPS = [
//   {
//     code: 'E',
//     name: 'East',
//     url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/10133/predictions',
//   },
//   {
//     code: 'W',
//     name: 'West',
//     url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/9322/predictions',
//   },
// ]

export const STOPS = [
  {
    code: 'E',
    name: 'East',
    url: 'http://restbus.info/api/agencies/ttc/routes/320/stops/8510/predictions',
        // url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/9322/predictions',
  },
  {
    code: 'W',
    name: 'West',
    url: 'http://restbus.info/api/agencies/ttc/routes/320/stops/3097/predictions',
// url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/9322/predictions',
  },
]




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
