# OSRSDle Frontend

The **OSRSDle Frontend** is a web application built using **Next.js**, **TypeScript**, and **Tailwind CSS** for a game called *OSRSDle*. This is a guessing game based on the popular game *Old School RuneScape (OSRS)*. The frontend interacts with the **OSRSDle API** (available at [GitHub - OSRSDle API](https://github.com/dan-perosa/osrs-api)) to fetch data such as items, monsters, quests, and high scores, which are used to display content in the game.

The project is hosted on **Vercel** and is designed to provide a responsive, user-friendly interface for players to enjoy the game.


### Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [API Integration](#api-integration)
- [Game Features](#game-features)
- [User Authentication](#user-authentication)
- [Contributing](#contributing)
- [Additional Information](#additional-information)

### Installation

To get started with the OSRSDle Frontend, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dan-perosa/osrsdle.git
   cd osrsdle

2. **Install dependencies**: Make sure you have Node.js installed.
   ```bash
   npm install

3. **Set up environment variables**: Create a .env.local file in the root directory and configure it with the following variables:
   ```bash
   BASE_URL=https://osrsdle-api-url.com  # API URL of your backend

4. **Run the application locally**: Create a .env.local file in the root directory and configure it with the following variables:
   ```bash
   npm run dev

The application should now be running at http://localhost:3000.

### Technologies

This frontend application uses the following technologies:

- **Next.js**: A React framework for building server-side rendered applications and static websites. It provides powerful features like routing, API routes, and automatic code splitting.
- **TypeScript**: A statically typed superset of JavaScript that improves the development experience with type safety, autocompletion, and refactoring capabilities.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development with minimal custom CSS. Tailwind enables a flexible and customizable design system.
- **React**: A JavaScript library for building user interfaces, used under the hood by Next.js to handle the rendering and component structure of the frontend.
- **Vercel**: The platform used for hosting the OSRSDle frontend application. Vercel provides seamless deployment, automatic scaling, and easy integration with Next.js.

### API Integration

The frontend fetches data from the OSRSDle API. This data includes:

- **Equipments**: A list of all equipments in the game, grouped by type, or even a full list.
- **Monsters**: A complete list of the monsters found in the game.
- **Quests**: A list containing all quests and its informations.
- **Highscores**: The highscore list containing all the OSRSdle players and their pointsThe game has a highscore system based on the number of attempts to get the correct answer.

### Game Features

The game is designed to provide the following features:

- **Daily Guessing Gameplay**: Players try to guess the correct items, monsters, and quests based on their previous guesses, reseting all minigames everyday at midnight.
- **User Authentication**: Users can register and login, with password cryptography and use of JWT Token.
- **Leaderboards**: View the highscores and compare your progress with other users.
- **Visual Hints**: Everytime the user tries to guess, a complete list of information will show, with red color on wrong information, green on right and orange on partial. 

### User Authentication

The frontend integrates with the **OSRSDle API** to provide user authentication functionality. The key features related to user authentication include:

- **Registration**: Users can create a new account by providing necessary details such as username and password. The frontend sends the registration data to the backend, where a new user record with password cryptography is created in the database.
  
- **Login**: Users can log in by providing their username and password. Upon successful login, the backend generates a **JWT (JSON Web Token)**, which is returned to the frontend. This token is then used to authenticate subsequent requests to protected API endpoints.

- **Logout**: Users can log out of the application, which effectively invalidates their session. The frontend will remove the stored JWT token (from localStorage or cookies) to prevent further access to protected routes.

- **Session Management**: The JWT token is stored securely in the browser after login. This token is included in the `token` header of every subsequent API request that requires user authentication, ensuring the user is authenticated for each action.

### Contributing

I always welcome contributions! If you'd like to help improve the frontend, please follow these steps:

1. **Fork the repository**: Click on the "Fork" button on the top-right of this repository to create your own copy of the project.

2. **Clone your fork**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/yourusername/osrsdle-frontend.git
   cd osrsdle-frontend

3. **Create a new branch**: Create a new branch for your feature or bugfix.
   ```bash
   git checkout -b your-feature-branch

4. **Make your changes**: Implement your changes or additions to the codebase. Make sure to follow the project's coding style and best practices.

5. **Commit your changes**: Commit your changes with a clear and descriptive commit message.
   ```bash
   git commit -m "Description of the changes made"

6. **Push your changes**: Push your changes to your forked repository.
   ```bash
   git push origin your-feature-branch

7. **Create a pull request**: Go to the original repository and create a pull request to merge your changes. Provide a clear description of what your pull request does and why it's important.

I appreciate any contributions you make and will review your pull request as soon as possible!

### Additional Information

This project is a study project created by a fan based on a licensed game. I do not hold any rights over the game or its content. The purpose of this project is solely for educational and personal learning purposes.


