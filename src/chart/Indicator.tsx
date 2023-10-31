import React, { useCallback, useEffect, useRef, useState } from 'react'
import { init, dispose, Chart, registerIndicator } from 'klinecharts'

import generatedDataList from '../generatedDataList'
import Layout from '../Layout'
import moment from 'moment'


// function getTooltipOptions() {
//   return {
//     candle: {
//       tooltip: {
//         showType: 'rect',
//         custom: (data: CandleTooltipCustomCallbackData) => {
//           const { prev, current } = data
//           const prevClose = (prev?.close ?? current.open)
//           const change = (current.close - prevClose) / prevClose * 100
//           return [
//             { title: 'open', value: current.open.toFixed(2) },
//             { title: 'high', value: current.high.toFixed(2) },
//             { title: 'low', value: current.low.toFixed(2) },
//             { title: 'close', value: current.close.toFixed(2) },
//             { title: 'volume', value: current.volume?.toFixed(2) },
//             {
//               title: 'Change: ',
//               value: {
//                 text: `${change.toFixed(2)}%`,
//                 color: change < 0 ? '#EF5350' : '#26A69A'
//               }
//             }
//           ]
//         }
//       }
//     }
//   }
// }
// tech template
const data: any = [
  { timestamp: Date.now(), open: 4999, high: 5015, low: 4999, close: 5010, volume: 100 },
  { timestamp: Date.now() + 60000, open: 5040, high: 5060, low: 5035, close: 5055, volume: 100 },
  { timestamp: Date.now() + 60000, open: 5010, high: 5020, low: 4995, close: 5015, volume: 100 },
  { timestamp: Date.now() + 120000, open: 5015, high: 5030, low: 5015, close: 5025, volume: 100 },
]
// const macdGoldCross = {
//   name: 'MacdGoldCross',
//   shortName: '',
//   calcParams: [],
//   calcTechnicalIndicator: (dataList: any[]) => {
//     const params = [ 12, 26, 9 ]
//     let closeSum = 0
//     let emaShort: number
//     let emaLong: number
//     let dif = 0
//     let difSum = 0
//     let dea = 0
//     const maxPeriod = Math.max(params[ 0 ], params[ 1 ])
//     return dataList.map((kLineData, i) => {
//       const macd: any = {}
//       const close = kLineData.close
//       closeSum += close
//       if (i >= params[ 0 ] - 1) {
//         if (i > params[ 0 ] - 1) {
//           emaShort = (2  close + (params[ 0 ] - 1)  emaShort) / (params[ 0 ] + 1)
//         } else {
//           emaShort = closeSum / params[ 0 ]
//         }
//       }
//       if (i >= params[ 1 ] - 1) {
//         if (i > params[ 1 ] - 1) {
//           emaLong = (2  close + (params[ 1 ] - 1)  emaLong) / (params[ 1 ] + 1)
//         } else {
//           emaLong = closeSum / params[ 1 ]
//         }
//       }
//       if (i >= maxPeriod - 1) {
//         dif = emaShort - emaLong
//         macd.dif = dif
//         difSum += dif
//         if (i >= maxPeriod + params[ 2 ] - 2) {
//           if (i > maxPeriod + params[ 2 ] - 2) {
//             dea = (dif  2 + dea  (params[ 2 ] - 1)) / (params[ 2 ] + 1)
//           } else {
//             dea = difSum / params[ 2 ]
//           }
//           macd.macd = (dif - dea) * 2
//           macd.dea = dea
//         }
//       }
//       return macd
//     })
//   },
//   render: ({
//     ctx, dataSource, viewport, xAxis, yAxis
//   }:  any) => {
//     const { from, to, kLineDataList, technicalIndicatorDataList } = dataSource
//     console.log(from, to, kLineDataList, technicalIndicatorDataList)
//     const { barSpace } = viewport
//     for (let i = from; i < to; i++) {
//       const preTechData = technicalIndicatorDataList[ i - 1 ]
//       const currentTechData = technicalIndicatorDataList[ i ]
//       if (
//         preTechData &&
//         ('dif' in preTechData) &&
//         ('dea' in preTechData) &&
//         currentTechData &&
//         ('dif' in currentTechData) &&

//         ('dea' in currentTechData)
//       ) {
//         const preDif = preTechData.dif
//         const preDea = preTechData.dea
//         const currentDif = currentTechData.dif
//         const currentDea = currentTechData.dea
//         if (i == to - 1 && technicalIndicatorDataList.length == to) {
//           const x = xAxis.convertToPixel(i)
//           const kLineData = kLineDataList[ i ]
//           const openY = yAxis.convertToPixel(kLineData.open)
//           const closeY = yAxis.convertToPixel(kLineData.close)
//           const highY = yAxis.convertToPixel(kLineData.high)
//           const lowY = yAxis.convertToPixel(kLineData.low)
//           // color can take values from styles
//           ctx.fillStyle = 'white'
//           const min = Math.min(openY, closeY)
//           ctx.fillRect(x - 0.5, highY, 1, min - highY)
//           ctx.fillRect(x - barSpace / 2, min, barSpace, Math.max(Math.abs(openY - closeY), 1))
//           const max = Math.max(openY, closeY)
//           ctx.fillRect(x - 0.5, max, 1, lowY - max)
//         }
//       }
//     }
//   }
// }
registerIndicator({
  name: 'MacdGoldCross',
  figures: [
    { key: 'emoji' }
  ],

  calc: (data) => {

    // calculate normally
    // const last = data[ data.length - 1 ];
    // last.ohlc.upColor = '#888888';
    // last.ohlc.downColor = '#888888';

    return data;

  },

  draw({
    ctx,
    barSpace,
    visibleRange,
    indicator,
    xAxis,
    yAxis
  }) {

    const { from, to } = visibleRange;
    const { result } = indicator;

    ctx.font = `${barSpace.gapBar}px Helvetica Neue`
    ctx.textAlign = 'center'

    // Draw all candles
    ctx.beginPath();
    console.log(result)
    for (let i = from; i < to; i++) {
      const preTechData = result[ i - 1 ]
      const currentTechData = result[ i ]
      if (
        preTechData &&
        currentTechData) {
        if (result[i].timestamp > Date.now()) {
          const kLineData = result[i]
          // format the timestamp into HH:MM:ss using moment.js
          const unixTimestamp = kLineData.timestamp / 1000
          
          const x = xAxis.convertToPixel(unixTimestamp)
          const openY = yAxis.convertToPixel(kLineData.open)
          const closeY = yAxis.convertToPixel(kLineData.close)
          const highY = yAxis.convertToPixel(kLineData.high)
          const lowY = yAxis.convertToPixel(kLineData.low)
          // color can take values from styles
          const pixelDifference = xAxis.convertToPixel(60000) - xAxis.convertToPixel(0)
          
          const barWidth = Math.min(barSpace.gapBar * 60000 * 100)
          console.log(x, barWidth, pixelDifference);
          
          ctx.fillStyle = 'white'
          const min = Math.min(openY, closeY)
          const max = Math.max(openY, closeY)
          console.log(min,max, (x - barWidth))
          ctx.fillRect(x - 0.5, highY, 1, min - highY)
          ctx.fillRect(x - barWidth / 2, min, barWidth, Math.max(Math.abs(openY - closeY), 1))
          ctx.fillRect(x - 0.5, max, 1, lowY - max)
        }
      }
    }
    // for (let i = from; i < to; i++) {

    //   const data: any = result[i];
    //   const x = xAxis.convertToPixel(i);
    //   console.log(data);

    //   const y = yAxis.convertToPixel(data?.volume);

    //   if (i === from) {
    //     ctx.moveTo(x, y)
    //   } else {
    //     ctx.lineTo(x, y)
    //   }
    // }
    // // Draw last candle separately
    // const lastData: any = result[to - 1];
    // const lastX = xAxis.convertToPixel(to - 1);
    // const lastY = yAxis.convertToPixel(lastData?.volume);

    // ctx.fillStyle = '#888888';
    // ctx.fillRect(lastX, lastY, 1, 1);

    // // Finish path and stroke
    // ctx.lineTo(lastX, lastY);
    // ctx.stroke();

    // Rest of function
    return false

  }


});

// use

export default function Indicator() {
  const chart = useRef<Chart | any>()
    
  useEffect(() => {

    chart.current = init('indicator-k-line');
    // chart.current?.overrideIndicator(macdGoldCross)

    chart.current?.createIndicator('MacdGoldCross', false, { id: 'candle_pane' })
    const applyData = [ ...generatedDataList() , ...data]
    chart.current?.applyNewData(applyData);    return () => {
      dispose('indicator-k-line')
    }
  }, [])

  return (
    <>
      <Layout>
        <div id="indicator-k-line" className="k-line-chart" />
      </Layout></>
  )
}
