# ev-challenge

## Design Considerations

-   Language: JavaScript. While the benefits of type safety in a large repository are undeniable, for a toy application like this it is unlikely that the benefits would ever be felt, while increasing build complexity. Commiting to JS upfront allows us to use create-react-app out of the box, which is a big time saver, and will give us maximum flexibility when selecting additonal libraries. If we were ever to need TS in the future, we can simply eject the CRA app and drop in the TS compiler, as the language is a superset.
-   Hosting: For convienience, we will simply commit our build artifacts and host out of GitHub Pages directly. While comitting artifacts is an anti-pattern, in this case convienence wins out over concerns around "stale artifacts". Note that this requires copying the contents of /build into /docs. The upside for this inconvineince is an out-of-the-box CD pipeline.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
