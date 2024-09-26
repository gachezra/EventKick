// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import Map from '../components/Map';
// import { createEventRoute } from "../utils/APIRoutes"
// import { Helmet } from 'react-helmet-async';

// const Plan = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [location, setLocation] = useState('');
//   const [image, setImage] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const [ticketPrice, setTicketPrice] = useState('');
//   const [error, setError] = useState('');
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [fileName, setFileName] = useState('Choose an image');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleCoordinatesChange = (coordinates) => {
//     setLatitude(coordinates.lat);
//     setLongitude(coordinates.lon);
//     console.log('Coordinates: ', coordinates.lat, coordinates.lon)
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate('/login');
//       return;
//     }

//     const storedUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
//     const userId = storedUser._id;

//     try {
//       // let imageUrl = null;
//       // if (image) {
//       //   const formData = new FormData();
//       //   formData.append('file', image);
//       //   formData.append('upload_preset', 'events'); // Use your upload preset name here

//       //   const response = await axios.post('https://api.cloudinary.com/v1_1/dykwdjdaf/image/upload', formData);
//       //   imageUrl = response.data.secure_url;
//       // }

//       const eventData = {
//         title,
//         description,
//         date: `${date}T${time}`,
//         location,
//         latitude,
//         longitude,
//         user: userId,
//         image: image,
//         isPaid,
//         ticketPrice: isPaid ? parseFloat(ticketPrice) : 0,
//       };

//       console.log(eventData)

//       await axios.post(createEventRoute, eventData,{
//         headers:{
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
//       });
//       setTitle('');
//       setDescription('');
//       setDate('');
//       setTime('');
//       setLocation('');
//       setImage(null);
//       setImagePreview(null);
//       setError('Event Posted!');
//     } catch (err) {
//       setError(err.message);
//       console.error('Error creating event:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#131324] text-white">
//       <Helmet>
//         <title>Plan Your Event</title>
//         <meta name='description' content='Post details about your events which will be published after admin review.' />
//         <link rel='canonical' href='https://www.eventkick.ke/plan' />
//       </Helmet>
//       <Header />
//       <div className="container mx-auto flex-grow p-4">
//         <h1 className="text-3xl font-bold mb-4">Plan Your Event</h1>
//         <p className="mb-4">
//           Follow the instructions below to publish your event:
//         </p>
//         <ol className="list-decimal list-inside mb-4">
//           <li>Enter the title of your event.</li>
//           <li>Provide a detailed description of the event.</li>
//           <li>Select the date and time for the event.</li>
//           <li>Enter the location where the event will be held, precise locations help EventKickers find it (...Location, County).</li>
//           <li>Upload an image for your event (optional).</li>
//           <li>Click the "Submit" button to publish your event.</li>
//         </ol>
//         <form onSubmit={handleSubmit} className="bg-[#1e1e36] p-6 rounded-md shadow-md">
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//               required
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
//             <div className="md:w-1/2">
//               <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
//               <input
//                 type="date"
//                 id="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//                 className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//                 required
//               />
//             </div>
//             <div className="md:w-1/2">
//               <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
//               <input
//                 type="time"
//                 id="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="image" className="block text-sm font-medium mb-2">Event Image</label>
//             <div className="relative">
//               {/* <input
//                 type="file"
//                 id="image"
//                 onChange={handleImageChange}
//                 className="absolute inset-0 w-auto h-full opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//               <button
//                 type="button"
//                 className="rounded border-2 border-indigo-600 px-6 pb-[6px] pt-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
//                 onClick={() => document.getElementById('image').click()}
//               >
//                 {fileName}
//               </button> */}
//               <input
//                 type="text"
//                 id="image"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//                 required
//               />
//             </div>
//           </div>
//           {imagePreview && (
//             <div className="mb-4">
//               <img src={imagePreview} alt="Event preview" className="max-w-full h-auto" />
//             </div>
//           )}
//           <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Event Type</label>
//             <div>
//               <label className="inline-flex items-center mr-4">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="eventType"
//                   value="free"
//                   checked={!isPaid}
//                   onChange={() => setIsPaid(false)}
//                 />
//                 <span className="ml-2">Free</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="eventType"
//                   value="paid"
//                   checked={isPaid}
//                   onChange={() => setIsPaid(true)}
//                 />
//                 <span className="ml-2">Paid</span>
//               </label>
//             </div>
//           </div>

//           {isPaid && (
//             <div className="mb-4">
//               <label htmlFor="ticketPrice" className="block text-sm font-medium mb-2">Ticket Price</label>
//               <input
//                 type="number"
//                 id="ticketPrice"
//                 value={ticketPrice}
//                 onChange={(e) => setTicketPrice(e.target.value)}
//                 className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//           )}
//           <div className="mb-4">
//             <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
//               required
//             />
//           </div>
//           <Map 
//             location={location}
//             onCoordinatesChange={handleCoordinatesChange}
//           />
//           <div className="mx-auto">
//             <div className="items-center justify-center mx-auto text-center">
//               <button
//                 type="submit"
//                 className="mt-8 rounded-full border-2 border-indigo-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Plan;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import { createEventRoute } from "../utils/APIRoutes"
import { Helmet } from 'react-helmet-async';

const Plan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [ticketPrice, setTicketPrice] = useState('');
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('Choose an image');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCoordinatesChange = (coordinates) => {
    setLatitude(coordinates.lat);
    setLongitude(coordinates.lon);
    console.log('Coordinates: ', coordinates.lat, coordinates.lon)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/login');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const userId = storedUser._id;

    try {
      let imageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'events'); // Use your upload preset name here

        const response = await axios.post('https://api.cloudinary.com/v1_1/dykwdjdaf/image/upload', formData);
        imageUrl = response.data.secure_url;
      }

      const eventData = {
        title,
        description,
        date: `${date}T${time}`,
        location,
        latitude,
        longitude,
        user: userId,
        image: imageUrl,
        isPaid,
        ticketPrice: isPaid ? parseFloat(ticketPrice) : 0,
      };

      await axios.post(createEventRoute, eventData,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
      setImage(null);
      setImagePreview(null);
      setError('Event Posted!');
    } catch (err) {
      setError(err.message);
      console.error('Error creating event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Plan Your Event</title>
        <meta name='description' content='Post details about your events which will be published after admin review.' />
        <link rel='canonical' href='https://www.eventkick.ke/plan' />
      </Helmet>
      <Header />
      <div className="container mx-auto flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">Plan Your Event</h1>
        <p className="mb-4">
          Follow the instructions below to publish your event:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Enter the title of your event.</li>
          <li>Provide a detailed description of the event.</li>
          <li>Select the date and time for the event.</li>
          <li>Enter the location where the event will be held.</li>
          <li>Upload an image for your event (optional).</li>
          <li>Click the "Submit" button to publish your event.</li>
        </ol>
        <form onSubmit={handleSubmit} className="bg-[#1e1e36] p-6 rounded-md shadow-md">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="md:w-1/2">
              <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="md:w-1/2">
              <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium mb-2">Event Image</label>
            <div className="relative">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="absolute inset-0 w-auto h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              <button
                type="button"
                className="rounded border-2 border-indigo-600 px-6 pb-[6px] pt-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                onClick={() => document.getElementById('image').click()}
              >
                {fileName}
              </button>
            </div>
          </div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Event preview" className="max-w-full h-auto" />
            </div>
          )}
          <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Event Type</label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="eventType"
                  value="free"
                  checked={!isPaid}
                  onChange={() => setIsPaid(false)}
                />
                <span className="ml-2">Free</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="eventType"
                  value="paid"
                  checked={isPaid}
                  onChange={() => setIsPaid(true)}
                />
                <span className="ml-2">Paid</span>
              </label>
            </div>
          </div>

          {isPaid && (
            <div className="mb-4">
              <label htmlFor="ticketPrice" className="block text-sm font-medium mb-2">Ticket Price</label>
              <input
                type="number"
                id="ticketPrice"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
                min="0"
                step="0.01"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location (Precice Location)</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <Map 
            location={location}
            onCoordinatesChange={handleCoordinatesChange}
          />
          <div className="mx-auto">
            <div className="items-center justify-center mx-auto text-center">
              <button
                type="submit"
                className="mt-8 rounded-full border-2 border-indigo-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Plan;