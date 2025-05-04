# Country Explorer

This is a React-based project that allows users to explore countries, filter them by region and language, and view detailed information about each country. The project uses Redux for state management and TailwindCSS for styling.

---

## Live Demo

You can access the live version of the application here: [Country Explorer Live](https://country-explorer-it22256164.netlify.app)

---

## Features

- Search for countries by name.
- Filter countries by region and language.
- View detailed information about a selected country.
- Toggle between light and dark modes.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22256164
   cd country-app-fe
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   Start the development server using Vite:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

4. **Build for Production**:
   To create a production build, run:
   ```bash
   npm run build
   ```

5. **Preview the Production Build**:
   To preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Running Tests

This project uses Jest for testing. Follow these steps to run the tests:

1. **Run All Tests**:
   ```bash
   npm test
   ```

2. **Run Tests in Watch Mode**:
   To run tests in watch mode:
   ```bash
   npm test -- --watchAll
   ```

3. **Run Specific Tests**:
   To run a specific unit test:
   ```bash
   npm test -- <test-file-path>
   ```

4. **Run Integration Tests**:
   To run only the integration tests:
   ```bash
   npm run integration-test
   ```

---

## Project Structure

- **`src/`**: Contains the source code for the application.
  - **`components/`**: Reusable React components.
  - **`redux/`**: Redux actions, reducers, and store configuration.
  - **`utils/`**: Utility functions for filtering and other logic.
- **`tests/`**: Contains test files for components and utilities.
- **`public/`**: Static assets like the favicon.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Redux**: State management library.
- **TailwindCSS**: Utility-first CSS framework.
- **Vite**: Build tool for fast development.
- **Jest**: Testing framework.

---

## Report

### Chosen APIs
The application uses the [REST Countries API](https://restcountries.com/) to fetch data about countries, including their names, regions, languages, and other details. This API was chosen for its simplicity, reliability, and comprehensive dataset, which aligns well with the application's requirements.

### Challenges Faced
1. **Handling API Errors**:
   - **Issue**: The API occasionally returned unexpected responses or failed due to network issues.
   - **Resolution**: Implemented robust error handling in the API calls and displayed user-friendly error messages in the UI to inform users of any issues.

2. **State Management**:
   - **Issue**: Managing the state of filters, search results, and selected countries across multiple components was complex.
   - **Resolution**: Used Redux to centralize state management, making it easier to share and manage state across components.

3. **Styling Consistency**:
   - **Issue**: Maintaining consistent styling across the application was challenging due to the dynamic nature of the UI.
   - **Resolution**: Used TailwindCSS to apply utility-first styling, ensuring a consistent and responsive design system.

4. **Testing Integration**:
   - **Issue**: Writing integration tests for both frontend components and API interactions was time-consuming and required careful setup.
   - **Resolution**: Used `@testing-library/react` for frontend tests and `jest` for API integration tests, ensuring comprehensive test coverage and reliability.

### Conclusion
The project successfully implements a country explorer application with robust features and a clean user interface. The challenges faced during development were resolved effectively, resulting in a stable and user-friendly application. The use of modern technologies like React, Redux, and TailwindCSS, combined with thorough testing, ensures the application's quality and maintainability.