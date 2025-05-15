# FairXORNG Frontend

This is the React + Tailwind CSS frontend for the FairXORNG system, which provides a fair random number generation algorithm with dynamic probability adjustment.

## Prerequisites

- Node.js 14+
- npm or yarn

## Setup

Install the dependencies:

```bash
npm install
# or
yarn install
```

## Running the Frontend

Start the development server:

```bash
npm start
# or
yarn start
```

The application will run on `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Features

- Add, edit, and remove drop classes with customizable probabilities
- Configure outcome categories with weights
- Roll for outcomes using the FairXORNG algorithm
- View detailed results, including deterministic drops
- Persistent storage using localStorage
- Real-time API status monitoring 