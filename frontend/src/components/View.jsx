import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


const View = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://stockview-backend-b4gx.onrender.com/api/viewitems')
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='w-[100%] h-screen flex flex-col'>

      <div className='w-full h-full px-15 flex flex-col gap-2'>

        <div className='w-full p-8 flex justify-center'>
          <div className=' bg-gray-200 flex items-center font-medium'>
            <div
              className='px-20 py-1.5 rounded-xl cursor-pointer hover:bg-gray-300'
              onClick={() => navigate('/')}
            >
              Post Item
            </div>
            <div className='rounded-md bg-black text-white px-20 py-1.5'>
              View Item
            </div>
          </div>
        </div>

        <div className='w-full text-xl font-medium text-center'>
          Click On Any Card To View Each Item's Description.
        </div>

        <div className="w-full bg-gray-50 rounded-xl shadow-xl p-4 flex flex-wrap gap-4 justify-start min-h-[200px]">
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="w-[50%] sm:w-[35%] md:w-[20%] py-2 rounded-2xl 
                   flex flex-col items-center justify-between gap-2 
                   cursor-pointer overflow-hidden bg-black "
                onClick={() => setSelectedItem(item)}
              >
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <div className="w-[95%] h-[200px] flex items-center justify-center bg-white rounded-full ">
                  <img
                    src={item.coverImage}
                    alt={item.type}
                    className="w-full h-full object-cover rounded-xl "
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {selectedItem && (
          <div className='fixed h-screen w-full inset-0 bg-black/60 flex justify-center items-center z-50'>
            <div className='w-[45%] h-full flex items-center'>
              <button
                className="absolute top-2 right-4 text-black text-xl cursor-pointer"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
              <div className='w-full bg-white px-6 py-8 flex gap-8 rounded-xl'>

                <div className=' w-1/2 flex flex-col gap-4 '>
                  <div className='w-full h-[200px] border border-gray-400 bg-gray-200 rounded-2xl p-2 '>
                    <img
                      src={selectedItem.coverImage}
                      alt={selectedItem.type}
                      className="w-full h-full object-cover rounded-xl "
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <h2 className="text-4xl font-bold">{selectedItem.name}</h2>
                    <p className="flex flex-col">
                      <p className='font-medium'>Type:</p>
                      <p className='ml-5 font-normal'>{selectedItem.type}</p>
                    </p>
                    <p className="flex flex-col">
                      <p className='font-medium'>Description:</p>
                      <p className='ml-5 font-normal'>{selectedItem.description}</p>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 w-full md:w-1/2 rounded-2xl shadow-lg">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="w-full rounded-xl"
                  >
                    {selectedItem.additionalImages.map((img, index) => (
                      <SwiperSlide key={index} className="flex items-center justify-center">
                        <div className="w-full h-[250px] flex items-center justify-center bg-gray-100 rounded-xl shadow-sm p-2">
                          <img
                            src={img}
                            alt={`img-${index}`}
                            className="h-full object-contain rounded-xl"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default View;
