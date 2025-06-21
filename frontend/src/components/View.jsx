import React from 'react'

const View = () => {
  return (
    <div className='w-[100%] h-screen flex flex-col'>

      <div className='w-full h-full'>

        <div className='w-full p-8 flex justify-center'>
          <div className=' bg-gray-200 flex items-center font-medium'>
            <div className='rounded-md bg-black text-white px-20 py-1.5'>
              Post Item
            </div>

            <div className='px-20 py-1.5 rounded-xl'>
              View Item
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default View;
