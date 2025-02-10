# React Native Movie App 🎬

An intuitive iOS-focused mobile application built with React Native that allows users to discover, search, and manage their favorite movies.

<p align="center">
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/empty-favorites.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/filters.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/movie-details.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/recent-searches.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/search-results-with-favorites.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/search-results.png" />
  <img width="30%" height="50%" src="https://github.com/fwankieeeee/movie-app/blob/main/src/screenshots/with-favorites.png" />
</p>

# Main Features
- 🔍 Search movies using [OMDb API](https://www.omdbapi.com/)
- ❤️ Add/remove movies to favorites list
- 🕒 View recent search history
- 📱 Native iOS look and feel
- 🎨 Clean and intuitive user interface
- 🔄 Real-time search results
- 💾 Persistent storage for favorites and recent searches
- 📊 Detailed movie information


# Tech Stacks
- [React Native](https://reactnative.dev/) - Core framework for building native apps using React
- [React Navigation](https://reactnavigation.org/) - Routing and navigation
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv) - Fast key-value storage
- [React Native Paper](https://callstack.github.io/react-native-paper/) - For radio buttons
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [React Native Elements](https://reactnativeelements.com/) - For images
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management

# Requirements
- an IOS device (for now)

# How to run
1. Get the API key from [OMDb API](https://www.omdbapi.com/).
2. Create an .env file.
3. Copy the contents of .env.example file and paste it into the .env file.
5. Insert values for OMDB_API_KEY and OMDB_API_URL.
4. Open a terminal window and run the ff:
- `git clone git@github.com:fwankieeeee/movie-app.git`
- `yarn install`
- `npx pod-install`
- `yarn ios` to run on iOS simulator
