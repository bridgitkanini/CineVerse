// API Configuration
const APILINK = "https://review-backend.beaucarnes.repl.co/api/v1/reviews/";

// DOM Elements
const title = document.getElementById("title");
const reviewsContainer = document.getElementById("reviews-container");

// Get movie details from URL
const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

// Set page title
title.textContent = movieTitle || 'Movie Reviews';

// Simple alert for errors
function showError(message) {
  alert(message || 'An error occurred. Please try again.');
}

// No need to create form dynamically as it's now in the HTML

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Create review card
function createReviewCard(review) {
  const div = document.createElement('div');
  div.className = 'review-card';
  div.id = review._id;
  
  // Escape single quotes in review text and username
  const safeReview = review.review ? review.review.replace(/'/g, "\\'") : '';
  const safeUser = review.user ? review.user.replace(/'/g, "\\'") : '';
  
  div.innerHTML = `
    <div class="review-header">
      <span class="review-user">${review.user || 'Anonymous'}</span>
      <span class="review-date">${formatDate(review.createdAt || new Date().toISOString())}</span>
    </div>
    <div class="review-content">
      <p>${review.review}</p>
    </div>
    <div class="review-actions">
      <button class="icon-btn" onclick="editReview('${review._id}','${safeReview}', '${safeUser}')">
        ✏️
      </button>
      <button class="icon-btn" onclick="deleteReview('${review._id}')">
        🗑
      </button>
    </div>
  `;
  return div;
}

// Edit review form
function editReview(id, review, user) {
  const element = document.getElementById(id);
  if (!element) return;
  
  // Unescape single quotes
  const safeReview = review.replace(/\\'/g, "'");
  const safeUser = user ? user.replace(/\\'/g, "'") : '';
  
  element.innerHTML = `
    <div class="card">
      <h3>Edit Review</h3>
      <div class="form-group">
        <label>Your Review:</label>
        <textarea id="edit_review_${id}" rows="4" required>${safeReview}</textarea>
      </div>
      <div class="form-group">
        <label>Your Name:</label>
        <input type="text" id="edit_user_${id}" value="${safeUser}" required>
      </div>
      <div class="form-actions">
        <button class="btn" onclick="saveReview('edit_review_${id}', 'edit_user_${id}', '${id}')">
          Save Changes
        </button>
        <button class="btn btn-secondary" onclick="returnReviews()">
          Cancel
        </button>
      </div>
    </div>
  `;
  
  // Focus the first input field
  const firstInput = element.querySelector('textarea, input');
  if (firstInput) {
    firstInput.focus();
  }
}

// Save review
async function saveReview(reviewInputId, userInputId, id = '') {
  const reviewElement = document.getElementById(reviewInputId);
  const userElement = document.getElementById(userInputId);
  
  if (!reviewElement || !userElement) {
    showError('Could not find review form elements');
    return;
  }
  
  const review = reviewElement.value.trim();
  const user = userElement.value.trim();
  
  if (!review || !user) {
    showError('Please fill in all fields');
    return;
  }
  
  try {
    const url = id ? `${APILINK}${id}` : `${APILINK}new`;
    const method = id ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user, 
        review,
        movieId: new URLSearchParams(window.location.search).get('id')
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Clear form if it's a new review
    if (!id) {
      reviewElement.value = '';
      userElement.value = '';
    }
    
    // Reload reviews after successful save
    returnReviews();
  } catch (error) {
    console.error('Error saving review:', error);
    showError('Failed to save review. Please try again.');
  }
}

// Delete review
async function deleteReview(id) {
  if (!confirm('Are you sure you want to delete this review?')) {
    return;
  }
  
  try {
    const response = await fetch(`${APILINK}${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Remove the review from the DOM
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    showError('Failed to delete review. Please try again.');
  }
}

// Fetch and display reviews
async function returnReviews() {
  const movieId = new URLSearchParams(window.location.search).get('id');
  
  if (!movieId) {
    showError('No movie ID provided');
    return;
  }
  
  try {
    const response = await fetch(`${APILINK}movie/${movieId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Clear existing reviews (but keep the form which is now in the HTML)
    const existingReviews = document.querySelectorAll('.review-card');
    existingReviews.forEach(review => review.remove());
    
    // Add each review
    if (data.length === 0) {
      const noReviews = document.createElement('div');
      noReviews.className = 'no-reviews';
      noReviews.textContent = 'No reviews yet. Be the first to review!';
      reviewsContainer.insertBefore(noReviews, reviewsContainer.firstChild);
    } else {
      data.forEach(review => {
        reviewsContainer.appendChild(createReviewCard(review));
      });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    showError('Failed to load reviews. Please try again later.');
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
}

// Initialize the page when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', returnReviews);
} else {
  returnReviews();
}
