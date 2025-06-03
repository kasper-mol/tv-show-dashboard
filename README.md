# TV Shows Dashboard

A modern Vue.js application that displays TV shows information from the TVMaze API. Browse shows by genre, search for specific shows, and explore detailed information about your favorite series.

## 🌟 Features

- **Genre-based Browsing**: Navigate TV shows by genre in smooth, horizontal scrollable lists
- **Search Functionality**: Find shows instantly by name with debounced search
- **Detailed Show Information**:
  - Show summary and plot
  - Rating and reviews
  - Cast and crew information
  - Network details and broadcast schedule
- **Responsive Design**: Seamless experience across all devices
- **Modern UI/UX**: Clean interface with fluid animations
- **State Management**: Efficient state handling with Pinia
- **Component Architecture**: Modular, reusable components

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd tv-shows-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. For production build:

```bash
npm run build
```

## 🧪 Testing

Run unit tests with Vitest:

```bash
npm run test:unit
```

## 📁 Project Structure

```
src/
├── assets/         # Static assets and global styles
├── components/     # Reusable Vue components
│   ├── base/      # Base UI components
│   └── shows/     # Show-specific components
├── router/         # Vue Router configuration
├── services/      # API and utility services
├── store/         # Pinia stores
├── views/         # Page components
└── App.vue        # Root component
```

## 🏗️ Architecture

### Key Components

- `ShowCard.vue`: Show information display card
- `HorizontalList.vue`: Genre-based show list
- `SearchInput.vue`: Debounced search input
- `RatingStars.vue`: Interactive rating display

### Technical Stack

- **Framework**: Vue.js with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **Testing**: Vitest
- **API Integration**: TVMaze API
- **Styling**: Tailwind CSS with scoped components

## 🏗️ Architectural Decisions

### Vue.js & Composition API

We chose Vue.js as our primary framework for several key reasons:

- **Performance**: Vue's virtual DOM and reactive system offer excellent performance out of the box
- **Developer Experience**: Excellent tooling support with Vue DevTools and Volar
- **Component Model**: Intuitive component system that encourages reusability and maintainability
- **Growing Ecosystem**: Rich ecosystem of plugins and libraries that integrate seamlessly
- **Preffered Framework**: Vue is the preffered framework for both the software engineer and the business

### Pinia for State Management

Pinia was selected as our state management solution because:

- **Modular Design**: Stores can be split into multiple files and imported as needed
- **DevTools Integration**: Excellent debugging capabilities with Vue DevTools
- **Composition API Compatible**: Perfect integration with Vue's Composition API
- **Simpler API**: More intuitive API compared to Vuex with less boilerplate
- **Future Proof**: Official state management solution for Vue.js

### Tailwind CSS

We implemented Tailwind CSS for styling because:

- **Utility-First**: Rapid UI development with predefined utility classes
- **Customization**: Easy to extend and customize through configuration
- **Performance**: Built-in purge system for minimal production CSS
- **Responsive Design**: Intuitive breakpoint system for responsive layouts
- **Component Consistency**: Standardized design tokens ensure consistent UI
- **Developer Productivity**: Faster development with inline styling without context switching

## 🔌 API Integration

The application uses the following TVMaze API endpoints:

- `GET /shows`: Retrieve all shows
- `GET /search/shows`: Search shows by name
- `GET /shows/:id`: Get detailed show information
- `GET /shows/:id/cast`: Fetch cast information
