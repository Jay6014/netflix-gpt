import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div>
        <div className='w-full aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
            <p className='py-6 w-1/4 hidden md:inline-block'>{overview.length > 300 ? overview.slice(0,300)+"..." : overview}</p>
            <div className='flex gap-4'>
                <button className='py-1 md:py-4 px-2 md:px-12 md:mt-0 mt-4 bg-white text-black rounded-md font-bold border-gray-500 border cursor-pointer hover:bg-opacity-70'>► Play</button>
                <button className='p-4 px-12 bg-gray-600 text-white rounded-md font-bold cursor-pointer hidden md:inline-block'>ⓘ More Info</button>
            </div>
        
        </div>
    </div>
  )
}

export default VideoTitle
