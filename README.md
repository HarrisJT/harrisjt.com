# HarrisJT.com

This repository contains the source code powering [harrisjt.com](https://harrisjt.com), the personal webpage of Harris J. Thompson.
The website features mostly software project case studies and blog posts on various topics.

Built with [React](https://reactjs.org/), powered by [Gatsby](https://www.gatsbyjs.org/), served on [Netlify](https://www.netlify.com/).

#### Project structure

For a basic overview of the project structure, please refer to the [Gatsby documentation](https://www.gatsbyjs.org/docs/building-with-components/).

## Installation

To run this project, you will need [Git](https://git-scm.com/downloads) and [Node](https://nodejs.org/en/download/).

### Initial setup

1.  `git clone https://github.com/HarrisJT/harrisjt.com.git` to clone this repository
1.  `npm i` to install dependencies

### Run project locally (for development)

1.  `npm run dev` to start the hot-reloading development server (powered by [Gatsby](https://www.gatsbyjs.org/))
1.  Navigate to `localhost:8000` in your preferred browser

### Build the project (for production)

1.  `npm run build` to generate an optimized production build
1.  `gatsby serve` to start a local server for the built site

## Contribution Guidelines

### Create a branch

1.  `git checkout master` from any folder in your local `harrisjt.com` repository
1.  `git pull origin master` to ensure you have the latest code from harrisjt's repository
1.  `git checkout -b BRANCH-NAME` (replacing `BRANCH-NAME` with a suitable name) to create a branch

### Make the change

1.  Follow the "Run project locally" instructions
1.  If visual changes were made, please try to test them in multiple browsers and on mobile
1.  Run `npm run format` from the project root to lint and format

### Push it

1.  `git add -A && git commit -m "MESSAGE-HERE"` (replacing `MESSAGE-HERE` with a short description of your change)
1.  `git push origin BRANCH-NAME` to push your changes to the main repository
1.  Visit the [harrisjt.com repo](https://github.com/harrisjt/harrisjt.com) and follow GitHub's instructions

## Troubleshooting

* `npm run purge` to delete the previously generated gatsby build files
* Reinstall the dependencies by deleting the `node_modules` folder and running `npm i`
