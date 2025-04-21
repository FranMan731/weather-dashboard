# 🌦️ Weather App - React Native with Expo

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Git

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/FranMan731/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies**:

```bash
yarn install
# or
npm install
```

3. **Set up environment**:

*You should have received .env file via email*

*Place it in the root directory*

4. **🏃 Running the App**:

```bash
expo start
```

Then choose your preferred method:

📱 Physical device: Scan QR code with Expo Go app

🖥️ Emulator: Press i (iOS) or a (Android)

### 📁 Project Structure

```bash
src/  
├── api/             # API Calls to OpenWeather  
├── components/      # Reusable UI components  
├── constants/       # Constants and config  
├── contexts/        # Context providers  
├── lib/             # GraphQL operations  
├── hooks/           # Custom hooks  
├── navigation/      # App navigation  
├── screens/         # App screens  
├── stores/          # MobX state stores  
├── theme/           # Design system  
├── types/           # TypeScript definitions  
├── utils/           # Common functions  
├── App.tsx          # Root component  
└── AppProviders.tsx # Context wrapper  
```

### ✨ Key Features

🌗 Dark/Light theme support

🔍 City search and 📍 current location weather

❤️ Favorites system with offline persistence

⚡ Optimistic UI updates

🔄 Automatic sync between local and remote data


## Key Features Implementation
### State Management

The app uses MobX for state management with the following stores:

- WeatherStore: Manages weather data and searches

- FavoriteStore: Handles favorite locations with dual persistence (local + GraphQL)

- AuthStore: Manages authentication state

### Data Persistence

- Local Persistence:

- - AsyncStorage for offline access to favorites

- - Automatic sync with backend when online

- GraphQL API:

- - Uses Apollo Client for data fetching

- - Implements optimistic UI updates

### UI Components

- Custom theming system with dark mode support

- Reusable components with proper TypeScript typing

- Skeleton loading states for better UX

- Animated transitions


### Troubleshooting

Common Issues

- Missing .env file:

*Ensure you've placed the .env file in the root directory*

*Verify all required variables are present*

- GraphQL connection errors:

*Check your internet connection*

*Verify the GraphQL endpoint in your .env file*
