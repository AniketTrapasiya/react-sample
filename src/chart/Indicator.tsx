import React, { useEffect, useRef, useState } from 'react'
import { init, dispose, registerIndicator, Chart } from 'klinecharts'
import generatedDataList from '../generatedDataList'
import Layout from '../Layout'

const fruits = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌',
  '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
  '🍍', '🥥', '🥝', '🥭', '🥑', '🍏'
]

interface EmojiEntity {
  emoji: number
  text: string
}

// 自定义指标
registerIndicator<EmojiEntity>({
  name: 'EMOJI',
  figures: [
    { key: 'emoji' }
  ],
  calc: (kLineDataList) => {
    return kLineDataList.map(kLineData => ({ emoji: kLineData.close, text: fruits[Math.floor(Math.random() * 17)] }))
  },
  draw: ({
    ctx,
    barSpace,
    visibleRange,
    indicator,
    xAxis,
    yAxis
  }) => {
    const { from, to } = visibleRange

    ctx.font = `${barSpace.gapBar}px Helvetica Neue`
    ctx.textAlign = 'center'
    const result = indicator.result
    for (let i = from; i < to; i++) {
      const data = result[i]
      const x = xAxis.convertToPixel(i)
      const y = yAxis.convertToPixel(data.emoji)
      ctx.fillText(data.text, x, y)
    }
    return false
  }
})

// const subIndicators = ['VOL']
const themes = [
  { key: 'dark', text: '深色' },
  { key: 'light', text: '浅色' }
]
export default function Indicator () {
  const chart = useRef<Chart | null>()
  const paneId = useRef<string>('')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    chart.current = init('indicator-k-line')
    paneId.current = chart.current?.createIndicator('VOL', true) as string
    chart.current?.applyNewData(generatedDataList())
    return () => {
      dispose('indicator-k-line')
    }
  }, [])
  useEffect(() => {
    chart.current?.setStyles(theme)
  }, [theme])
  return (
    <Layout>
      <div style={theme === 'dark' ? { backgroundColor: '#1f2126' } : {}} id="indicator-k-line" className="k-line-chart"/>
      {/* <div
        className="k-line-chart-menu-container">
        {
          subIndicators.map(type => {
            return (
              <button
                key={type}
                onClick={_ => {
                  chart.current?.createIndicator(type, false, { id: paneId.current })
                }}>
                {type}
              </button>
            )
          })
        }
      </div> */}
    </Layout>
  )
}
