
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import emailjs from 'emailjs-com';

const View = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [contentVisible, setContentVisible] = useState(false);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (type) => {
    setSelected(type);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://stockview-backend-b4gx.onrender.com/api/viewitems');
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        onComplete: () => setContentVisible(true),
      }
    );

    handleClick('view');
  }, []);

  useEffect(() => {
    if (contentVisible && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, [contentVisible]);

  const sendEnquiryEmail = (item) => {
    const templateParams = {
      item_name: item.name,
      item_type: item.type,
      item_description: item.description
    };

    emailjs.send(
      'service_0ph894v',
      'template_d9840sj',
      templateParams,
      'l_ALLg-7iRuBGN27R'
    ).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Enquiry email sent successfully!');
      },
      (err) => {
        console.log('FAILED...', err);
        alert('Failed to send enquiry email.');
      }
    );
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='w-full h-full px-15 flex flex-col gap-2'>



        <div ref={buttonRef} className='w-full px-4 py-4 flex justify-center'>
          <div className='bg-gray-200 flex flex-col sm:flex-row items-center font-medium rounded-lg overflow-hidden w-full max-w-[400px]'>
            <div
              className={`w-full text-center px-6 py-2 cursor-pointer transition-all duration-300
        ${selected === 'post'
                  ? 'bg-black text-white rounded-lg'
                  : 'bg-gray-300 text-black'}`}
              onClick={() => {
                handleClick('post');
                setTimeout(() => {
                  navigate('/');
                }, 300);
              }}
            >
              Post Item
            </div>
            <div
              className={`w-full text-center px-6 py-2 cursor-pointer transition-all duration-300
        ${selected === 'view'
                  ? 'bg-black text-white rounded-lg'
                  : 'bg-gray-300 text-black'}`}
              onClick={() => {
                handleClick('view');
              }}
            >
              View Item
            </div>
          </div>
        </div>

        {contentVisible && (
          <div ref={contentRef} className='flex flex-col gap-4'>
            <div className='w-full text-xl font-medium text-center'>
              Click On Any Card To View Each Item's Description.
            </div>

            <div className="w-full bg-gray-50 rounded-xl shadow-xl p-4 flex flex-wrap gap-4 justify-start min-h-[200px]">
              {isLoading ? (
                <div className="w-full text-lg font-medium  flex flex-col justify-center items-center h-[200px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
                  Wait Till Items are Loaded
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
                    <div className="w-[95%] h-[200px] flex items-center justify-center bg-white rounded-full">
                      <img
                        src={item.coverImage}
                        alt={item.type}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {selectedItem && (
          <div className='fixed h-screen w-full inset-0 bg-black/60 flex justify-center items-center z-50'>
            <div className='w-full md:w-[45%] h-full flex items-center px-4'>
              <button
                className="absolute w-10 h-10 top-25 right-90 text-white text-2xl cursor-pointer bg-black rounded-full"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>

              <div className='w-full bg-white px-6 py-8 flex flex-col md:flex-row gap-8 rounded-xl overflow-y-auto max-h-[90vh]'>

                <div className='w-full md:w-1/2 flex flex-col gap-4'>
                  <div className='w-full h-[200px] border border-gray-400 bg-gray-200 rounded-2xl p-2'>
                    <img
                      src={selectedItem.coverImage}
                      alt={selectedItem.type}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <h2 className="text-4xl font-bold">{selectedItem.name}</h2>
                    <p className="flex flex-col">
                      <span className='font-medium'>Type:</span>
                      <span className='ml-5 font-normal'>{selectedItem.type}</span>
                    </p>
                    <p className="flex flex-col">
                      <span className='font-medium'>Description:</span>
                      <span className='ml-5 font-normal'>{selectedItem.description}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 w-full md:w-1/2 rounded-2xl shadow-l flex flex-col gap-4 items-center justify-between">
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

                  <button onClick={() => sendEnquiryEmail(selectedItem)}
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg w-[40%]'>
                    Enquire
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default View;
