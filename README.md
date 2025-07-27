# CineVerse - Movie Review Application

CineVerse is a responsive web application that allows users to browse popular movies, search for specific films, and add personal reviews. The application fetches movie data from The Movie Database (TMDb) API and provides an intuitive interface for users to interact with movie information. Built with modern web technologies, CineVerse offers a seamless experience across all device sizes.

## Tech Stack

### Frontend
- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with CSS variables, Flexbox, and Grid
- **JavaScript (ES6+)**: Dynamic content loading and DOM manipulation
- **Responsive Design**: Mobile-first approach with media queries
- **Animations**: Smooth transitions and hover effects

### Backend & APIs
- **External API**: The Movie Database (TMDb) for fetching movie data, posters, and metadata
- **Custom Review API**: For storing and managing user reviews

### Development Tools
- **Git**: Version control
- **Modern JavaScript Features**: Async/await, Fetch API, Template Literals
- **CSS Custom Properties**: For consistent theming and easy customization
- **Progressive Enhancement**: Core functionality works without JavaScript

### Performance
- Lazy loading of images
- Efficient DOM updates
- Minified and optimized assets

## Features

- **Browse Popular Movies**: View a grid of currently popular movies
- **Search Functionality**: Search for specific movies by title
- **Movie Details**: View detailed information about each movie
- **User Reviews**: Add, edit, and delete personal reviews for movies
- **Responsive Design**: Works on both desktop and mobile devices


## Project Structure

```
CineVerse/
├── index.html         # Main application page
├── movie.html         # Movie details and reviews page
├── script.js          # Main JavaScript for the home page
├── movie.js           # JavaScript for movie details and reviews
├── style.css          # Styles for the application
└── README.md          # Project documentation
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/CineVerse.git
   cd CineVerse
   ```

2. Run a local HTTP server (choose one of the following methods):

   ### Using Python (recommended):
   ```bash
   # For Python 3.x
   python3 -m http.server 8000
   ```
   Then open your browser and navigate to: http://localhost:8000

   ### Using Node.js (if you have it installed):
   ```bash
   npx http-server -p 8000
   ```
   Then open your browser and navigate to: http://localhost:8000

   ### Alternative: Direct file access
   You can also open `index.html` directly in your browser, but some features might be limited due to browser security restrictions with file:// protocol.

3. The application should now be running in your default web browser.

   > **Note:** The application requires an internet connection to fetch movie data from The Movie Database (TMDb) API.

   To stop the server, press `Ctrl+C` in the terminal where it's running.

## Usage

1. **Browse Movies**:
   - The home page displays a grid of popular movies
   - Each movie shows its poster and title

2. **Search for Movies**:
   - Use the search bar at the top to find specific movies
   - Results update as you type

3. **View Movie Details**:
   - Click on any movie to view its details
   - See existing reviews from other users

4. **Add a Review**:
   - On a movie's details page, enter your review and username
   - Click the save icon (💾) to submit your review

5. **Edit or Delete Reviews**:
   - Use the edit (✏️) and delete (🗑) icons to manage your reviews

## API Integration

The application uses the following APIs:
- **TMDb API**: For fetching movie data and images
- **Review Backend API**: For storing and retrieving user reviews

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API
- Icons used in the application are from Unicode characters