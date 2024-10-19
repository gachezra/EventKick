import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import axios from 'axios';
import { shareTrackingRoute } from '../utils/APIRoutes';

const EventShare = ({ event }) => {
  const shareMessage = `Check out this amazing event on EventKick! https://eventkick.ke/events/${event._id}`;
  const encodedMessage = encodeURIComponent(shareMessage);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedMessage}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
    instagram: `https://www.instagram.com/`,
  };

  const handleShare = async (platform) => {
    if (platform === 'instagram') {
      navigator.clipboard.writeText(shareMessage).then(() => {
        alert('Message copied! You can now paste it into your Instagram story or post.');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      window.open(shareLinks[platform], '_blank');
    }
    try {
      await axios.post(shareTrackingRoute(event._id), { platform });
      
    } catch (error) {
      console.error('Failed to track share:', error.response.data);
    }
  };

  const buttonStyles = {
    whatsapp: 'border-green-500 text-green-500 hover:bg-green-500',
    twitter: 'border-blue-400 text-blue-400 hover:bg-blue-400',
    instagram: 'border-pink-500 text-pink-500 hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Share event</p>
      <div className="flex space-x-2">
        {['whatsapp', 'twitter', 'instagram'].map((platform) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className={`p-2 rounded-full border-2 bg-transparent ${buttonStyles[platform]} hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${platform === 'instagram' ? 'pink' : platform}-500`}
            aria-label={`Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
          >
            {platform === 'whatsapp' && <FaWhatsapp size={20} title="WhatsApp" />}
            {platform === 'twitter' && <FaXTwitter size={20} title="Twitter X" />}
            {platform === 'instagram' && <FaInstagram size={20} title="Instagram" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventShare;