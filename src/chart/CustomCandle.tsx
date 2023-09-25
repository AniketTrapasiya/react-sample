// import React, { useEffect, useRef, useState } from 'react'
// import { init, dispose, Chart, registerIndicator, CandleTooltipCustomCallbackData, CandleType } from 'klinecharts'

// import generatedDataList from '../generatedDataList'
// import Layout from '../Layout'
// const fruits = [
//   '🍏', '🍎', '🍐', '🍊', '🍋', '🍌',
//   '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
//   '🍍', '🥥', '🥝', '🥭', '🥑', '🍏'
// ]

// interface EmojiEntity {
//   emoji: number
//   text: string
// }

// // 自定义指标
// registerIndicator < any > ({
//   name: 'EMOJI',
//   figures: [
//     { key: 'emoji' }
//   ],
//   calc: (kLineDataList) => {
//     return kLineDataList.map(kLineData => ({ emoji: kLineData.close, text: fruits[Math.floor(Math.random() * 17)] }))
//   },
//   draw: ({
//     ctx,
//     barSpace,
//     visibleRange,
//     indicator,
//     xAxis,
//     yAxis
//   }) => {
//     const { from, to } = visibleRange

//     ctx.font = `${barSpace.gapBar}px Helvetica Neue`
//     ctx.textAlign = 'center'
//     const { result } = indicator;
//     for (let i = from; i < to; i++) {
//       const data = result[i]
//       const color = data?.close > data?.open ? '#888888' : 'yellow'
//       const x = xAxis.convertToPixel(i)
//       const y = yAxis.convertToPixel(data.emoji)
//       ctx.fillStyle = color
//       ctx.fillRect(x - barSpace.gapBar, y, barSpace.gapBar * 2, yAxis.convertToPixel(data?.open) - y)
//       ctx.fillText(data.text, x, y)
//       if (i === from) {
//         ctx.moveTo(x, y)
//       } else {
//         ctx.lineTo(x, y)
//       }
//     }
//     ctx.stroke()
//     return false
//   }
// })
// const data: any = [{ timestamp: 1631584800000, open: 150, high: 160, low: 145, close: 155, volume: 100 },
// { timestamp: 1631588400000, open: 155, high: 165, low: 150, close: 160, volume: 130 },
// { timestamp: 1631592000000, open: 160, high: 170, low: 155, close: 165, volume: 222 },
// { timestamp: 1631595600000, open: 165, high: 175, low: 160, close: 170, volume: 235 },
// { timestamp: 1631599200000, open: 170, high: 180, low: 165, close: 175, volume: 392 },
// { timestamp: 1631602800000, open: 125, high: 125, low: 110, close: 110, volume: 100 }]
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
// registerIndicator({
//   name: 'LastCandle',
//   figures: [
//     { key: 'emoji' }
//   ],

//   calc: (data) => {

//     // calculate normally
//     // const last = data[ data.length - 1 ];
//     // last.ohlc.upColor = '#888888';
//     // last.ohlc.downColor = '#888888';

//     return data;

//   },

//   draw({
//     ctx,
//     barSpace,
//     visibleRange,
//     indicator,
//     xAxis,
//     yAxis
//   }) {

//     const { from, to } = visibleRange;
//     const { result } = indicator;

//     ctx.font = `${barSpace.gapBar}px Helvetica Neue`
//     ctx.textAlign = 'center'

//     // Draw all candles
//     ctx.beginPath();
//     for (let i = from; i < to; i++) {

//       const data: any = result[i];
//       const x = xAxis.convertToPixel(i);
//       console.log(data);

//       const y = yAxis.convertToPixel(data?.volume);

//       if (i === from) {
//         ctx.moveTo(x, y)
//       } else {
//         ctx.lineTo(x, y)
//       }
//     }
//     // Draw last candle separately
//     const lastData: any = result[to - 1];
//     const lastX = xAxis.convertToPixel(to - 1);
//     const lastY = yAxis.convertToPixel(lastData?.volume);

//     ctx.fillStyle = '#888888';
//     ctx.fillRect(lastX, lastY, 1, 1);

//     // Finish path and stroke
//     ctx.lineTo(lastX, lastY);
//     ctx.stroke();

//     // Rest of function
//     return false

//   }


// });

// export default function Indicator() {
//   const chart = useRef < Chart | null > ()
//   const paneId = useRef < string > ('')
//   const [theme, setTheme] = useState('dark')

//   useEffect(() => {
    // chart.current = init('indicator-k-line'
    //   , {
    //   styles: {
    //     candle: {
    //       type: CandleType.CandleSolid,
    //       bar: {
    //         upBorderColor: '#8888',
    //         upWickColor: '#8888',
    //         upColor: "#8888",
    //         downBorderColor: '#8888',
    //         downColor: '#8888',
    //         downWickColor: "#8888",
    //       }
    //     }
    //   }

    //   }
    // );

//     paneId.current = chart.current?.createIndicator('VOL') as string
//     chart.current?.applyNewData(data);

//     // chart.current?.setCandlestickStyle({ upColor: 'green', downColor: 'yellow', lastUpColor: 'blue', lastDownColor: 'red' })
//     return () => {
//       dispose('indicator-k-line')
//     }
//   }, [])
//   useEffect(() => {
//     chart.current?.setStyles(getTooltipOptions() as any)
//   }, [])
//   useEffect(() => {
//     chart.current?.setStyles(theme)
//   }, [theme])

//   return (
//     <>
//       <Layout>
//         <div style={theme === 'dark' ? { backgroundColor: '#1f2126' } : {}} id="indicator-k-line" className="k-line-chart" />
//         {/* <div
//         className="k-line-chart-menu-container">
//         {
//           subIndicators.map(type => {
//             return (
//               <button
//                 key={type}
//                 onClick={_ => {
//                   chart.current?.createIndicator(type, false, { id: paneId.current })
//                 }}>
//                 {type}
//               </button>
//             )
//           })
//         }
//       </div> */}
//       </Layout></>
//   )
// }
