import { FC, useEffect, useState } from 'react'
interface TextProps {
    percentage: number
}
interface CircleProps {
    size: number
    strokeWidth: number
    color: string
    progress?: number
}
interface ProgressBarProps {
    percentage: number
    color: string
    size: number
    strokeWidth: number
}

const Text: FC<TextProps> = props => {
  const { percentage } = props
  return (
    <>
      <text
        x='50%'
        y='50%'
        dominantBaseline='central'
        textAnchor='middle'
        fontSize={'1.5em'}
      >
        {percentage.toFixed(0)}%
      </text>
    </>
  )
}

const Circle: FC<CircleProps> = props => {
  const  { size, color, strokeWidth, progress=100 } = props
  const radius = (size-strokeWidth) / 2
  const circumference = radius * Math.PI * 2
  const dash = ((100 - progress) * circumference) / 100.5
  return (
    <circle
      fill='none'
      stroke={color}
      cx={size / 2}
      cy={size / 2}
      r={radius}
      strokeWidth={`${strokeWidth}px`}
      transform={`rotate(-90 ${size/2} ${size/2})`}
      strokeDasharray={circumference}
      strokeLinecap='round'
      strokeDashoffset={dash}
      style={{ transition: 'all 0.5s' }}
    />
  )
}

export const ProgressBar: FC<ProgressBarProps> = props => {
  const [progress, setProgress] = useState<number>(0)
  const { size, strokeWidth, percentage, color } = props
  const viewBox = `0 0 ${size} ${size}`

  useEffect(() => {
    setProgress(percentage)
  }, [percentage])
  return (
    <>
      <svg width={size} height={size} viewBox={viewBox}>
        <Circle
          size={size}
          color={'#ccc'}
          strokeWidth={strokeWidth}
        />
        <Circle
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          progress={progress}
        />
        <Text percentage={percentage}/>
      </svg>
    </>
  )
}
