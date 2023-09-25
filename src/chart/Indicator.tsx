import React, { useCallback, useEffect, useRef, useState } from 'react'
import { init, dispose, Chart, registerIndicator, CandleType, CandleTooltipCustomCallbackData } from 'klinecharts'

import generatedDataList from '../generatedDataList'
import Layout from '../Layout'

const data: any = [ { timestamp: 1631584800000, open: 150, high: 160, low: 145, close: 155, volume: 100 },
{ timestamp: 1631588400000, open: 155, high: 165, low: 150, close: 160, volume: 130 },
{ timestamp: 1631592000000, open: 160, high: 170, low: 155, close: 165, volume: 222 },
{ timestamp: 1631595600000, open: 165, high: 175, low: 160, close: 170, volume: 235 },
{ timestamp: 1631599200000, open: 170, high: 180, low: 165, close: 175, volume: 392 },
{ timestamp: 1631602800000, open: 125, high: 125, low: 110, close: 110, volume: 100 } ]

function getTooltipOptions() {
  return {
    candle: {
      tooltip: {
        showType: 'rect',
        custom: (data: CandleTooltipCustomCallbackData) => {
          const { prev, current } = data
          const prevClose = (prev?.close ?? current.open)
          const change = (current.close - prevClose) / prevClose * 100
          return [
            { title: 'open', value: current.open.toFixed(2) },
            { title: 'high', value: current.high.toFixed(2) },
            { title: 'low', value: current.low.toFixed(2) },
            { title: 'close', value: current.close.toFixed(2) },
            { title: 'volume', value: current.volume?.toFixed(2) },
            {
              title: 'Change: ',
              value: {
                text: `${change.toFixed(2)}%`,
                color: change < 0 ? '#EF5350' : '#26A69A'
              }
            }
          ]
        }
      }
    }
  }
}

export default function Indicator() {
  const chart = useRef<Chart | null>()
  const paneId = useRef<string>('')
  const [ theme, setTheme ] = useState('dark')
    
  useEffect(() => {

    chart.current = init('indicator-k-line');

    paneId.current = chart.current?.createIndicator('VOL', false) as string;

    chart.current?.applyNewData(generatedDataList());    return () => {
      dispose('indicator-k-line')
    }
  }, [])
  useEffect(() => {
    chart.current?.setStyles(getTooltipOptions() as any)
  }, [])
  useEffect(() => {
    chart.current?.setStyles(theme)
  }, [ theme ])

  return (
    <>
      <Layout>
        <div style={theme === 'dark' ? { backgroundColor: '#1f2126' } : {}} id="indicator-k-line" className="k-line-chart" />
      </Layout></>
  )
}
