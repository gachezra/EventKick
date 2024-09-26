import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TECollapse } from 'tw-elements-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  return (
    <>
      <div className="bg-[#131324] text-white min-h-screen">
        <Helmet>
            <title>About Us</title>
            <meta name='description' content='EventKick is your go-to platform for discovering, planning and experiencing amazing events. Our mission is to make event planning and discovery seamless and enjoyable for everyone.'/>
            <link rel='canonical' href='https://www.eventkick.ke/about' />
        </Helmet>
        <Header />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 p-6">About EventKick</h1>
          <p className="text-lg mb-6 p-6">
            EventKick is your go-to platform for discovering, planning and experiencing amazing events.
            Our mission is to make event planning and discovery seamless and enjoyable for everyone.
          </p>

          <div className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
            <p className="text-lg mb-4 ">
              Discover and plan events effortlessly with EventKick. Our platform offers comprehensive tools for event planners and atendees, including:
            </p>
            <ul className="list-disc list-inside text-lg">
              <li>Discover events based on your interests.</li>
              <li>Plan and manage events with ease.</li>
              <li>Manage tickets on user profile</li>
              <li>Secure and seamless payment options.</li>
              <li>Forums for registered events for user engagement.</li>
              <li>Ratings and reviews of events.</li>
            </ul>
          </div>

          <div className="mb-12 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Frequently Asked Questions</h2>
            <div id="accordionExample">
                <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingOne">
                    <button
                        className={`${
                        activeElement === "element1" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element1")}
                    >
                        What is EventKick?
                        <span
                        className={`${
                            activeElement === "element1"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element1"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        EventKick is a platform designed to help you discover and plan events effortlessly. Whether you're hosting a small meetup or a large conference, EventKick provides the tools you need to make your event a success.
                        </p>
                    </div>
                    </TECollapse>
                </div>
                <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingTwo">
                    <button
                        className={`${
                        activeElement === "element2" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element2")}
                    >
                        How do I create an event?
                        <span
                        className={`${
                            activeElement === "element2"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element2"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        To create an event, simply sign in to your account, navigate to the <Link to="/plan" className='text-white font-bold' > Plan</Link> page, and fill out the event submission form. Make sure to include all the necessary details such as the event title, description, date, location, and an image. Once submitted, your event will be reviewed and approved by our team.
                        </p>
                    </div>
                    </TECollapse>
                </div>
                <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingThree">
                    <button
                        className={`${
                        activeElement === "element3" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element3")}
                    >
                        How do I access my tickets?
                        <span
                        className={`${
                            activeElement === "element3"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element3"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        After registering for an event, you can find your tickets in the <Link to="/profile" className='text-white font-bold' > Profile</Link> section. Head to the 'My Tickets' section to view and manage your event tickets.
                        </p>
                    </div>
                    </TECollapse>
                </div>
                <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingFour">
                    <button
                        className={`${
                        activeElement === "element4" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element4")}
                    >
                        How can I participate in forums?
                        <span
                        className={`${
                            activeElement === "element4"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element4"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        Our forums allow users to engage in discussions related to specific events. To participate, navigate to the <Link to="/events" className='text-white font-bold' > Events</Link> section, find the event you're interested in, register and join the conversation.
                        Alternatively you can find the event link under 'My Tickets' in your <Link to="/profile" className='text-white font-bold' > Profile</Link> page for your registered event's forum.
                        </p>
                    </div>
                    </TECollapse>
                </div>
                <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingFive">
                    <button
                        className={`${
                        activeElement === "element5" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element5")}
                    >
                        How do payments work?
                        <span
                        className={`${
                            activeElement === "element5"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element5"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        EventKick ensures secure and seamless payments for event registrations. All transactions are encrypted and processed through trusted payment gateways. You can always find your payment history in the <Link to="/profile" className='text-white font-bold' > Profile</Link> section.
                        </p>
                    </div>
                    </TECollapse>
                </div>
                {/* <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                    <h2 className="mb-0" id="headingSix">
                    <button
                        className={`${
                        activeElement === "element6" &&
                        "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element6")}
                    >
                        Notice for Event Planners
                        <span
                        className={`${
                            activeElement === "element6"
                            ? "rotate-[-180deg] -mr-1"
                            : "rotate-0"
                        } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300`}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        </span>
                    </button>
                    </h2>
                    <TECollapse
                    show={activeElement === "element6"}
                    className="!mt-0 !shadow-none"
                    >
                    <div className="px-5 py-4 text-[#E2C2C6]">
                        <p>
                        Event planners can find valuable resources and guidelines on our <Link to="/resources" className='text-white' > Resources</Link> page. We provide tips, best practices, and tools to help you plan and execute successful events.
                        </p>
                    </div>
                    </TECollapse>
                </div> */}
                 {/* <div className="border-b border-neutral-600 bg-[#1e1e36] rounded-none">
                        <h2 className="mb-0" id="headingThree">
                        <button
                            className={${
                            activeElement === "element3" &&
                            "text-[#CE4257] [box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                            } group flex w-full items-center bg-[#1e1e36] px-5 py-4 text-left text-base text-[#ACF7C1] transition hover:z-[2] focus:z-[3] focus:outline-none}
                            type="button"
                            onClick={() => handleClick("element3")}
                        >
                            How can I join the waitlist for EventKickAI?
                            <span
                            className={${
                                activeElement === "element3"
                                ? "rotate-[-180deg] -mr-1"
                                : "rotate-0"
                            } ml-auto h-5 w-5 transition-transform duration-200 ease-in-out fill-blue-300}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                            </span>
                        </button>
                        </h2>
                        <TECollapse
                        show={activeElement === "element3"}
                        className="!mt-0 !shadow-none"
                        >
                        <div className="px-5 py-4 text-[#E2C2C6]">
                            <p>
                            EventKickAI is our upcoming advanced AI-driven event management tool. To join the waitlist, <Link to="/waitlist" className="text-[#94BFBE] hover:text-[#ACF7C1]">click here</Link>. Be among the first to experience the next generation of event planning!
                            </p>
                        </div>
                        </TECollapse>
                    </div> */}
            </div>
          </div>
          {/* <div className="mt-12 p-6">
                <h2 className="text-2xl font-semibold mb-4">EventKickAI is Coming Soon!</h2>
                <p className="mb-6 text-lg">
                    We are excited to introduce EventKickAI, a revolutionary tool designed to help you plan, analyze, and optimize your events. With EventKickAI, you'll get insights on event trends, pricing strategies, and audience preferences. Stay ahead of the game and make your events a resounding success!
                    </p>
                <Link to="/waitlist" className="text-blue-300 underline text-center">Join the Waitlist</Link>
            </div> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
