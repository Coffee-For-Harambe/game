# Coffee For Harambe - The Game

## Play it here!
You can play the latest deployed version of the game over at http://coffe-for-harambe.co 


## Running Locally
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
   This starts the app in development mode on http://localhost:8080 by default. The page will automatically reload if any files are modified

## Creating a Release Ruild
1. Clone the repository
2. Run `npm install`
3. Run `npm start` 
   This uses snowpack to create the `build/` folder.

## Deploying
1. Create a merge request from the `master` branch onto the `live` branch.
2. The CD pipeline (GitHub Actions) will update the GitHub Pages deployment automatically!
