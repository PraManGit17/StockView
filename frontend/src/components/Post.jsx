import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Image } from 'phosphor-react';
import axios from 'axios';

const Post = () => {
  const [selected, setSelected] = useState(null);
  const [post, setPost] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [step, setStep] = useState(0);
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const refs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
  };

  const handleClick = (type) => {
    setSelected(type);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setFileName(file.name);
    } else {
      setCoverImage(null);
      setFileName('No file chosen');
    }
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && images.length < 5) {
      const extension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png'];
      if (validExtensions.includes(extension)) {
        setAdditionalImages((prev) => [...prev, file]);
        setImages((prev) => [...prev, file.name]);
      }
    }
    e.target.value = null;
  };

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

  useEffect(() => {
    if (post && textRef1.current) {
      gsap.fromTo(
        textRef1.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
      );
      setStep(1);
    }
  }, [post]);

  useEffect(() => {
    if (refs[step]?.current) {
      gsap.fromTo(
        refs[step].current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }
  }, [step]);

  const handleNameChange = (e) => {
    if (e.target.value.trim() !== '') setStep(2);
  };

  const handleTypeChange = (e) => {
    if (e.target.value !== '') setStep(3);
  };

  const handleDescChange = (e) => {
    if (e.target.value.trim() !== '') setStep(4);
  };

  const handleCoverChange = (e) => {
    handleFileChange(e);
    setStep(5);
  };

  const handleAdditionalChange = (e) => {
    handleAddImage(e);
    setStep(6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', e.target['item-name'].value);
    formData.append('type', e.target['item-type'].value);
    formData.append('description', e.target['description'].value);
    formData.append('coverImage', coverImage);
    additionalImages.forEach((img) => {
      formData.append('additionalImages', img);
    });
    try {
      const res = await axios.post('https://stockview-backend-b4gx.onrender.com/api/postitems', formData);
      alert('Item successfully added');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start py-4 bg-white'>

      <div ref={textRef} className='text-2xl font-semibold mb-8'>
        What would you like to do today?
      </div>

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
                setPost(true);
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
              setTimeout(() => {
                navigate('/viewitems');
              }, 300);
            }}
          >
            View Item
          </div>
        </div>
      </div>

      {post && (
        <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col items-center py-4 px-4'>
          <div ref={textRef1} className='text-lg font-semibold mb-8'>
            Provide Following Details About Your Item
          </div>

          <form className='w-full flex flex-col gap-4 items-center' onSubmit={handleSubmit}>
            {step >= 1 && (
              <div ref={refs[1]} className='w-[90%] border-2 rounded-xl py-2 px-2 flex flex-col gap-2 bg-black shadow-xl shadow-gray-700'>
                <div className='font-semibold text-white px-2'>Item : Name</div>
                <input
                  type='text'
                  name='item-name'
                  placeholder='eg.gucci,prada,etc.'
                  onChange={handleNameChange}
                  className='w-full p-2 border-none outline-0 rounded-lg bg-white placeholder:text-gray-500 placeholder:font-normal placeholder:px-2'
                />
              </div>
            )}

            {step >= 2 && (
              <div ref={refs[2]}
                className='w-[90%] relative z-10 border-2 rounded-xl py-2 px-2 flex flex-col gap-2 bg-black shadow-xl shadow-gray-700'
              >
                <div className='font-semibold text-white px-2'>Item : Type</div>
                <select
                  name='item-type'
                  onChange={handleTypeChange}
                  className='w-full p-2 border-none outline-0 rounded-lg bg-white text-gray-700'
                  defaultValue=""
                >
                  <option value="" disabled>Select type</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothing">Clothing</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="jeans">Jeans</option>
                  <option value="trousers">Trousers</option>
                  <option value="shorts">Shorts</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="watches">Watches</option>
                  <option value="bags">Bags</option>
                  <option value="hats">Hats</option>
                  <option value="belts">Belts</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="scarf">Scarves</option>
                  <option value="socks">Socks</option>
                  <option value="underwear">Underwear</option>
                  <option value="perfume">Perfume</option>
                </select>
              </div>
            )}

            {step >= 3 && (
              <div ref={refs[3]} className='w-[90%] border-2 rounded-xl py-2 px-2 flex flex-col gap-2 bg-black shadow-xl shadow-gray-700'>
                <div className='font-semibold text-white px-2'>Item : Description</div>
                <textarea
                  name='description'
                  rows="4"
                  placeholder='Describe the item...'
                  onChange={handleDescChange}
                  className='w-full p-2 border-none outline-0 rounded-lg bg-white placeholder:text-gray-500 placeholder:font-normal placeholder:px-2 resize-none'
                />
              </div>
            )}

            {step >= 4 && (
              <div ref={refs[4]} className='w-[90%] border-2 rounded-xl py-2 px-2 flex flex-col gap-2 bg-black shadow-xl shadow-gray-700'>
                <div className='font-semibold text-white px-2'>Item : Cover Image</div>

                <div className='w-full h-[120px] relative bg-white rounded-lg flex flex-col items-center justify-center gap-2 px-4 text-center'>
                  <Image size={32} color="#6b7280" weight="duotone" />
                  <span className="text-sm text-gray-600 truncate">{fileName}</span>

                  <input
                    name='coverImage'
                    type='file'
                    accept=".jpg, .jpeg, .png"
                    onChange={handleCoverChange}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                </div>
              </div>
            )}

            {step >= 5 && (
              <div ref={refs[5]} className='w-[90%] border-2 rounded-xl py-2 px-2 flex flex-col gap-2 bg-black shadow-xl shadow-gray-700'>
                <div className='font-semibold text-white px-2'>Item : Additional Images (Max 5)</div>

                <div className='w-full h-[140px] relative bg-white rounded-lg flex flex-col items-center justify-center gap-2 px-4 py-2 text-center'>
                  <Image size={32} color="#6b7280" weight="duotone" />
                  <span className="text-sm text-gray-600">
                    {images.length === 0
                      ? 'No additional images chosen'
                      : `${images.length} file${images.length > 1 ? 's' : ''} selected`}
                  </span>

                  <input
                    type='file'
                    accept=".jpg, .jpeg, .png"
                    onChange={handleAdditionalChange}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                    disabled={images.length >= 5}
                  />
                </div>

                {images.length > 0 && (
                  <div className="px-2 text-sm text-white">
                    {images.map((name, idx) => (
                      <div key={idx} className="truncate">• {name}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step >= 6 && (
              <div ref={refs[6]} className='w-[90%] flex justify-center mt-6'>
                <button
                  type='submit'
                  className='bg-black text-white w-[50%] py-2 rounded-xl font-semibold shadow-lg shadow-gray-700 hover:bg-gray-900 transition duration-300'
                >
                  Submit Item
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
