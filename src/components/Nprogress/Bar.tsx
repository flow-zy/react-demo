import React from 'react'
import { theme } from 'antd'

const { useToken } = theme

const Bar: React.FC<{
  animationDuration: number
  progress: number
}> = ({ animationDuration, progress }) => {
  const { token } = useToken()
  return (
    <div
      style={{
        background: token.colorPrimary,
        height: 2,
        left: 0,
        marginLeft: `${(-1 + progress) * 100}%`,
        position: 'fixed',
        top: 0,
        transition: `margin-left ${animationDuration}ms linear`,
        width: '100%',
        zIndex: 1031,
      }}
    >
      <div
        style={{
          boxShadow: `0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary}'`,
          display: 'block',
          height: '100%',
          opacity: 1,
          position: 'absolute',
          right: 0,
          transform: 'rotate(3deg) translate(0px, -4px)',
          width: 100,
        }}
      />
    </div>
  )
}
export default Bar
