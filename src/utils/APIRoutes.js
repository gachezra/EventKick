//export const host = "http://localhost:5000";
export const host = "https://eventkick-server.onrender.com";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const verifyEmailRoute = `${host}/api/auth/verify-email`;
export const forgotPasswordRoute = `${host}/api/auth/forgot-password`;
export const resetPasswordRoute = `${host}/api/auth/reset-password`;

export const allUsersRoute = `${host}/api/auth/allusers`;
export const getUserDetailsRoute = `${host}/api/auth/user`;
export const updateUserRoute = `${host}/api/auth/user`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const getUserEventsRoute = `${host}/api/events/user`;

export const allEventsRoute = `${host}/api/events/getevnt`;
export const createEventRoute = `${host}/api/events/addevnt`;
export const eventDetailsRoute = `${host}/api/events`;
export const updateEventRoute = `${host}/api/events`;
export const deleteEventRoute = `${host}/api/events`;
export const popularEventsRoute = `${host}/api/events/popular`;
export const upcomingEventsRoute = `${host}/api/events/upcoming`;
export const incrementOpenedCountRoute = `${host}/api/events/incrementOpenedCount`;

export const getCommentsRoute = `${host}/api/comments/event`;
export const addCommentRoute = `${host}/api/comments/add`;
export const deleteCommentRoute = `${host}/api/comments`;

// export const getFriendsRoute = `${host}/api/friends`;
// export const addFriendRoute = `${host}/api/friends/addfriend`;
// export const deleteFriendRoute = `${host}/api/friends/deletefriend`;

export const getPendingEventsRoute = `${host}/api/events/admin/pending`;
export const approveEventRoute = `${host}/api/events/admin/approve`;
export const disapproveEventRoute = `${host}/api/events/admin/disapprove`;
export const getApprovedEventsRoute = `${host}/api/events/admin/approved`;
export const registerEventRoute = `${host}/api/events/register`;
export const getUserRegisteredEventsRoute = `${host}/api/events/user`;

export const saveTransactionRoute = `${host}/api/transactions`;
export const getTransactionRoute = `${host}/api/transactions`;

export const getReviewsRoute = `${host}/api/reviews/event`;
export const addReviewRoute = `${host}/api/reviews/add`;
export const deleteReviewRoute = `${host}/api/reviews`;
export const editReviewRoute = `${host}/api/reviews`;

export const getForumThreadsRoute = `${host}/api/forums/threads`;
export const addForumThreadRoute = `${host}/api/forums/add-thread`;
export const getForumPostsRoute = `${host}/api/forums/thread`;
export const addForumPostRoute = `${host}/api/forums/add-post`;

export const deleteForumPostRoute = `${host}/api/forums/posts`;
export const downvotePostRoute = `${host}/api/forums/posts/downvote`;
export const upvotePostRoute = `${host}/api/forums/posts/upvote`;