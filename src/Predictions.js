import _ from 'lodash'
import React from 'react'

const formatPredictions = (predictions) => {
  const minutes = predictions.map(p => `${p.minutes}m`)
  return minutes.join(', ')
}

export default ({ predictions }) => {
  if (predictions == null) return null

  const first = _.first(predictions)
  const rest = _.slice(predictions, 1)

  const restText = formatPredictions(rest)

  const bigStyle = {
    fontSize: '1.5em'
  }

  const smallStyle = {
    opacity: '0.75'
  }

  return (
    <div>
      <span style={bigStyle}>{first.minutes} min </span>
      <span style={smallStyle}>{restText}</span>
    </div>
  )
}
