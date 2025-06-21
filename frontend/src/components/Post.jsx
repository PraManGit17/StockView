import React from 'react'

const Post = () => {


  const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear'];

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

        <div className='w-full flex justify-center'>

          <div className='w-2/5 border-2 flex flex-col items-center gap-4 p-2'>
            <div className='font-semibold text-4xl'>About Item</div>
            <hr className='w-[90%] border border-gray-200 mt-2'></hr>



            <form className="w-full flex flex-col gap-4 mt-3 px-6">


              <div className="flex items-center w-full px-4 py-2 border-2 border-black bg-gray-50">
                <label className="w-20 font-semibold text-md">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Item-Name"
                  required
                  className="w-full bg-transparent outline-none border-none placeholder:text-md placeholder:font-semibold placeholder:text-gray-400"
                />
              </div>


              <div className="flex items-center w-full px-4 py-2 border-2 border-black bg-gray-50">
                <label className="w-20  font-semibold text-md">Select:</label>
                <select
                  name="type"
                  required
                  className="w-full bg-transparent outline-none border-none text-md text-gray-400 font-semibold"
                >
                  <option value="">Select Item-Type</option>
                  {itemTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start w-full px-4 py-2 border-2 border-black bg-gray-50">
                <label className="w-28 font-semibold text-md pt-1">Description:</label>
                <textarea
                  name="description"
                  placeholder="Item Description"
                  className="w-full bg-transparent outline-none border-none placeholder:py-1 placeholder:px-1 placeholder:text-md placeholder:font-semibold placeholder:text-gray-400 resize-none"
                  rows={3}
                  required
                ></textarea>
              </div>


              <div className="w-full">
                <label className="block font-semibold text-sm mb-2">
                  Cover Image <span className="text-gray-400 font-normal">(optional)</span>
                </label>

                <label
                  htmlFor="cover-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 bg-gray-50 cursor-pointer hover:border-purple-500 transition rounded-md"
                >
                   {/* <UploadSimple size={32} className="text-purple-600" /> */}
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-semibold text-black">Click to upload</span> or drag and drop
                  </p>
                </label>

                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  // onChange={onChange}
                  className="hidden"
                />
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Post
