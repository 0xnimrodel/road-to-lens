import React from 'react'
import ReactPlayer from 'react-player'

const Video = ({ src }) => {
  return (
    <div
      className='rounded-lg overflow-hidden relative'
      style={{ paddingTop: '56.25%' }}
    >
      <ReactPlayer
        className='absolute top-0 left-0'
        controls
        width='100%'
        height='100%'
        url={src}
      />
    </div>
  )
}

export default Video
