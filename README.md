# TV Shows Dashboard

A Vue.js application that displays TV shows from the TVMaze API, allowing users to browse shows by genre and search for specific shows.

## Features

- Browse TV shows by genre in horizontal scrollable lists
- Search for TV shows by name
- View detailed information about each show, including:
  - Show summary
  - Rating
  - Cast information
  - Network and schedule details
- Responsive design that works on mobile and desktop
- Clean and modern UI with smooth animations
- Efficient state management with Pinia
- Component-based architecture with reusable components

## Technical Decisions

### Framework Choice: Vue.js

Vue.js was chosen for this project because:

- It provides an excellent developer experience with its Composition API
- It has a gentle learning curve while being powerful enough for complex applications
- It offers great performance out of the box
- It has a strong ecosystem with tools like Vue Router and Pinia

### State Management: Pinia

Pinia was selected over Vuex because:

- It provides better TypeScript support
- It has a simpler and more intuitive API
- It's the new official state management solution for Vue.js
- It offers better developer tools integration

### Styling Approach

The project uses a combination of:

- Custom CSS for global styles and animations
- Scoped component styles for component-specific styling
- CSS utility classes for common patterns
- This approach provides a good balance between maintainability and flexibility

## Project Setup

### Prerequisites

- Node.js version 18 or higher
- npm version 9 or higher

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tv-shows-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Testing

The project includes unit tests using Vitest. To run the tests:

```bash
npm run test:unit
```

## Project Structure

```
src/
├── assets/         # Static assets and global styles
├── components/     # Reusable Vue components
├── router/         # Vue Router configuration
├── services/       # API and utility services
├── store/          # Pinia stores
├── views/          # Page components
└── App.vue         # Root component
```

## Component Architecture

The application is built with the following key components:

- `BaseButton.vue`: Reusable button component with different variants
- `ShowCard.vue`: Card component for displaying show information
- `HorizontalList.vue`: Scrollable list component for show genres
- `SearchInput.vue`: Search input with debouncing
- `RatingStars.vue`: Star rating display component

## API Integration

The application integrates with the TVMaze API using the following endpoints:

- `/shows`: Get all shows
- `/search/shows`: Search shows by name
- `/shows/:id`: Get detailed show information
- `/shows/:id/cast`: Get show cast information

## Future Improvements

Potential areas for enhancement:

1. Add more advanced filtering options
2. Implement show favorites functionality
3. Add more detailed cast information
4. Implement infinite scrolling for show lists
5. Add more comprehensive error handling
6. Implement caching for API responses
7. Add end-to-end tests
8. Implement PWA features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
