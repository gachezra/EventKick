var commentFormWrapper = document.querySelector('.comment-form-wrapper');

if (userAuthenticated) {
  commentFormWrapper.style.display = 'block';
} else {
  commentFormWrapper.style.display = 'none';
}
