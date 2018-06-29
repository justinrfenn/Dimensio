# Dimensio
It's spheres

`npm install`

Install http-server for local development
`npm install -g http-server`

Open Command line in directory and run:
`http-server -p 3000`

Build code (Note: there will be webpack warnings. Will fix these in a future version)
`npx webpack`

Open it at http://localhost:3000/index.html

*NOTE:* To test it with a phone or mobile emulator, uncomment out 'touchstart' event listener in the `Start()` method of Game.ts and comment out the click event listener right above it.

