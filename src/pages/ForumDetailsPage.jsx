import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TbArrowBigDown, TbArrowBigUpLine } from "react-icons/tb";
import {
  getForumPostsRoute,
  addForumPostRoute,
  deleteForumPostRoute,
  upvotePostRoute,
  downvotePostRoute,
  eventDetailsRoute,
} from '../utils/APIRoutes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const ForumDetailsPage = () => {
  const { threadId } = useParams();
  const [event, setEvent] = useState(null);
  const [thread, setThread] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const userId = user._id;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`${getForumPostsRoute}/${threadId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const eventId = data.thread.event;
      const response = await axios.get(`${eventDetailsRoute}/${eventId}`);
      const event = response.data;
      if (data.status && response.data.status) {
        setEvent(event);
        setThread(data.thread);
      }
    };
    fetchPosts();
  }, [threadId]);

  const handleAddPost = async () => {
    if (newPostContent) {
      const { data } = await axios.post(
        addForumPostRoute,
        {
          content: newPostContent,
          threadId,
          parentId: replyingTo,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (data.status) {
        setThread((prevThread) => {
          const updatedPosts = addReplyToThread(prevThread.posts, data.post);
          return { ...prevThread, posts: updatedPosts };
        });
        setNewPostContent("");
        setReplyingTo(null);
      }
    }
  };

  const addReplyToThread = (posts, newPost) => {
    if (!newPost.parent) {
      return [newPost, ...posts];
    }
    return posts.map((post) => {
      if (post._id === newPost.parent) {
        return { ...post, replies: [newPost, ...(post.replies || [])] };
      } else if (post.replies) {
        return { ...post, replies: addReplyToThread(post.replies, newPost) };
      }
      return post;
    });
  };

  const handleUpvote = async (postId) => {
    const { data } = await axios.patch(
      `${upvotePostRoute}/${postId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (data.status) {
      setThread((prevThread) => ({
        ...prevThread,
        posts: updatePostVotes(prevThread.posts, postId, data.upvotes),
      }));
    }
  };

  const handleDownvote = async (postId) => {
    const { data } = await axios.patch(
      `${downvotePostRoute}/${postId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (data.status) {
      setThread((prevThread) => ({
        ...prevThread,
        posts: updatePostVotes(prevThread.posts, postId, data.upvotes),
      }));
    }
  };

  const updatePostVotes = (posts, postId, newUpvotes) => {
    return posts.map((post) => {
      if (post._id === postId) {
        return { ...post, upvotes: newUpvotes };
      } else if (post.replies) {
        return { ...post, replies: updatePostVotes(post.replies, postId, newUpvotes) };
      }
      return post;
    });
  };

  const handleDeletePost = async (postId) => {
    const { data } = await axios.delete(
      `${deleteForumPostRoute}/${postId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (data.status) {
      setThread((prevThread) => ({
        ...prevThread,
        posts: deletePostFromThread(prevThread.posts, postId),
      }));
    }
  };

  const deletePostFromThread = (posts, postId) => {
    return posts
      .filter((post) => post._id !== postId)
      .map((post) => {
        if (post.replies) {
          return { ...post, replies: deletePostFromThread(post.replies, postId) };
        }
        return post;
      });
  };

  const renderPosts = (posts, parentId = null, depth = 0) => {
    return posts
      .filter((post) => post.parent === parentId)
      .map((post) => (
        <div
          key={post._id}
          style={{ marginLeft: `${depth * 10}px` }}
          className={`mb-1 pl-4 border-l-2 border-gray-600 bg-[#1a1a2e] rounded-r-lg p-2 
          ${depth % 2 === 0 ? 'bg-opacity-50' : 'bg-opacity-30'} 
          transition-all duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-200">{post.user.username}</span>
            <div className="flex items-center space-x-2">
              <div className='rounded-full bg-[#1e1e36] hover:bg-opacity-10 border border-transparent hover:border-gray-300 flex py-1 px-2'>
                <TbArrowBigUpLine
                  onClick={() => handleUpvote(post._id)}
                  className="text-green-400 hover:text-green-600 cursor-pointer mr-3"
                  size={20}
                />
                <span className="text-gray-300">{post.upvotes}</span>
                <TbArrowBigDown
                  onClick={() => handleDownvote(post._id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer ml-3"
                  size={20}
                />
              </div>
              {post.user._id === userId && (
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-red-500 hover:text-red-700 ml-4 transition-colors duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-300 mt-1">{post.content}</p>
          {depth < 1 && (
            <button
              onClick={() => {
                setReplyingTo(post._id);
                setNewPostContent(`@${post.user.username} `);
              }}
              className="text-blue-400 hover:underline mt-1 text-xs transition-colors duration-200"
            >
              Reply
            </button>
          )}

          {depth < 3 && post.replies && post.replies.length > 0 && (
            <div className="mt-1">
              {renderPosts(post.replies, post._id, depth + 1)}
            </div>
          )}
          {depth >= 3 && post.replies && post.replies.length > 0 && (
            <button
              onClick={() => loadMoreReplies(post._id)}
              className="mt-1 text-blue-400 hover:text-blue-600 transition-colors duration-200"
            >
              Load more replies ({post.replies.length})
            </button>
          )}
        </div>
      ));
  };

  const loadMoreReplies = (postId) => {
    console.log("Loading more replies for post:", postId);
  };

  return (
    <>
    <div className="min-h-screen bg-[#131324] text-gray-200">
      <Helmet>
        <title>{event.title}</title>
        <meta name='description' content={thread.title} />
        <link rel='canonical' href='/forum' />
      </Helmet>
      <Header />
      <div className="container mx-auto p-6">
        {event && (
          <div className="mb-2">
            <Link to={`/events/${event._id}`}><h1 className="text-xl font-bold text-gray-100 cursor-pointer">{event.title}</h1></Link>
          </div>
        )}
        {thread && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-100">{thread.title}</h2>
            <div className="mb-2">
              <textarea
                className="w-full p-3 border border-gray-600 rounded bg-[#1a1a2e] text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
                rows="2"
                placeholder="Changia..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              <button
                onClick={handleAddPost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mt-2 transition-all duration-200"
              >
                Post
              </button>
              {replyingTo && (
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setNewPostContent("");
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Cancel Reply
                </button>
              )}
            </div>
            <div className="space-y-1">{renderPosts(thread.posts)}</div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ForumDetailsPage;
