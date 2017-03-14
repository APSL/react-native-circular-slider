/* @flow */

import React, { PureComponent, PropTypes } from 'react'
import { G, Circle, Text, Line } from 'react-native-svg'
import range from 'lodash.range'

export default class ClockFace extends PureComponent {

  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
    steps: PropTypes.number,
    showClockLines: PropTypes.bool,
  }

  render () {
    const { r, stroke, steps, showClockLines } = this.props
    const faceRadius = r - 5
    const textRadius = r - 26
    const lines = steps * 4
    return (
      <G>
        {
          range(lines).map(i => {
            const cos = Math.cos((2 * Math.PI / lines * i) - (Math.PI / 2))
            const sin = Math.sin((2 * Math.PI / lines * i) - (Math.PI / 2))
            if (i % 4 !== 0 && showClockLines === false) {
              return
            }
            return (
              <Line
                key={i}
                stroke={(i === 0) ? 'red' : stroke}
                strokeWidth={i % 4 === 0 ? 3 : 1}
                x1={cos * faceRadius}
                y1={sin * faceRadius}
                x2={cos * (faceRadius - 7)}
                y2={sin * (faceRadius - 7)}
              />
            )
          })
        }
        <G transform={{translate: "0, -9"}}>
          {
            range(steps).map((h, i) => (
              <Text
                key={i}
                fill={stroke}
                fontSize="16"
                textAnchor="middle"
                style={{color: 'red'}}
                x={textRadius * Math.cos((2 * Math.PI / steps * i) - (Math.PI / 2) + (Math.PI / (steps / 2)))}
                y={textRadius * Math.sin((2 * Math.PI / steps * i) - (Math.PI / 2) + (Math.PI / (steps / 2)))}>
                {h + 1}
              </Text>
            ))
          }
        </G>
      </G>
    )
  }
}
