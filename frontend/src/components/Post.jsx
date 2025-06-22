import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Post = () => {
  const [selected, setSelected] = useState(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5 }
    );
  }, []);

  const handleClick = (type) => {
    setSelected(type);
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start py-4 bg-white'>
    
      <div ref={textRef} className='text-2xl font-semibold mb-8'>
        What would you like to do today?
      </div>


      <div ref={buttonRef} className='w-full p-8 flex justify-center'>
        <div className='bg-gray-200 flex items-center font-medium rounded-lg overflow-hidden'>
          <div
            className={`px-20 py-1.5 cursor-pointer transition-all duration-300 
              ${selected === 'post' ? 'bg-black text-white rounded-lg' : 'bg-gray-300 text-black'}`}
            onClick={() => handleClick('post')}
          >
            Post Item
          </div>

          <div
            className={`px-20 py-1.5 cursor-pointer transition-all duration-300 
              ${selected === 'view' ? 'bg-black text-white rounded-lg' : 'bg-gray-300 text-black'}`}
            onClick={() => handleClick('view')}
          >
            View Item
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
