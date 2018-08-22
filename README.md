<div align="center">
<h1>🗺️<br>Neighborhood Map</h1>
<p>
<a href="https://www.codacy.com/project/sixl.daniel/fend-neighborhood-map/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sixl-Daniel/fend-neighborhood-map&amp;utm_campaign=Badge_Grade_Dashboard"><img src="https://api.codacy.com/project/badge/Grade/bca2db8857524055bc7542976b75429f" alt="Codacy - Code Quality Status"></a>
<a href="https://david-dm.org/Sixl-Daniel/fend-neighborhood-map"><img src="https://david-dm.org/Sixl-Daniel/fend-neighborhood-map/status.svg" alt="David Dependency Management - Dependencies Status"></a><br>
<a href="https://david-dm.org/Sixl-Daniel/fend-neighborhood-map?type=dev"><img src="https://david-dm.org/Sixl-Daniel/fend-neighborhood-map/dev-status.svg" alt="David Dependency Management - DevDependencies Status"></a>
<a href="https://ci.appveyor.com/project/Sixl-Daniel/fend-neighborhood-map"><img src="https://ci.appveyor.com/api/projects/status/n5kica58k102kysh?svg=true" alt="AppVeyor - Build Status"></a>
</p>
<p><a href="https://app.netlify.com/start/deploy?repository=https://github.com/Sixl-Daniel/fend-neighborhood-map"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a></p>



<p><strong>Neighborhood Map</strong> is the eighth project for the <strong>Udacity Frontend Developer Nanodegree Program.</strong></p>
<p><strong><a href="https://fend-neighborhood-map.netlify.com/" target="_blank" rel="noopener noreferrer">⭐ Show a demo of this app ⭐</a></strong></p>
</div>

## Table of contents

- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Built With](#built-with)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites <img src='https://res.cloudinary.com/sixl/image/upload/v1534412781/GitHub/brands/nodejs-new-pantone-black.png' align="right">

You need [Node.js®](https://nodejs.org/en/) and [npm](https://www.npmjs.com) to run this app. 

The Node Package Manager (npm) is distributed with Node.js. When you download Node.js, you automatically get npm installed on your computer.

Download the latest stable release from [https://nodejs.org/en/download/]() and install it with default settings. On Linux and macOS, you can install Node via the package manager, [as described here](https://nodejs.org/en/download/package-manager/).

To verify your installation open your terminal and look up where node and npm were installed and check their versions:

```console
foo@bar:~$ which node && node -v
foo@bar:~$ which npm && npm -v
```

### Installing

1. **Clone or download this repository**  
Change to a folder you want the app folder in. Then clone the files of this repo to a new directory and changee into it: 

```console
foo@bar:~$ git clone https://github.com/Sixl-Daniel/fend-neighborhood-map.git NewAppDirectory
foo@bar:~$ cd NewAppDirectory
```

2. **Install project dependencies**

```console
foo@bar:~$ npm install
```

3. **Start the development server**

```console
foo@bar:~$ npm start
```

Then point your browser to [http://localhost:3000/]() to see the app.

## Deployment

Build the app for production to the `/build` folder:

```console
foo@bar:~$ npm run build-ui && npm run build
```

Open your `package.json` and add a homepage field, if needed. The app is now ready to be deployed. 

You can use a static web hosting service like [surge](http://surge.sh/), [netlify](https://www.netlify.com/), [GitHub Pages](https://pages.github.com/) or [Zeit](https://zeit.co/) for fast and easy publishing.

## Built With

### Software

* [Create React App](https://github.com/facebook/create-react-app)
* [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React)
* [React Toastify](https://github.com/fkhadra/react-toastify)

### API's

* [Google Maps](https://cloud.google.com/maps-platform/maps/)
* [Foursquare](https://developer.foursquare.com/)

### Services

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"/>
</a>

## License

This project was submitted by Daniel Sixl as part of the Frontend Developer Nanodegree Program at Udacity.

As part of [Udacity Honor Code](https://www.udacity.com/legal/community-guidelines), your submissions must be your own work, hence submitting this project as yours will cause you to break the Udacity Honor Code and the suspension of your account. Me, the author of the project, allow you to check the code as a reference, but if you submit it, it's your own responsibility if you get expelled.

&copy; 2018 Daniel Sixl

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## Acknowledgments

* Using Axios with React
https://alligator.io/react/axios-react/

* A template to make good `README.md`  
https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

* How to use Semantic UI with a custom theme in your CRA app  
https://jsramblings.com/2018/03/04/how-to-use-semantic-ui-with-a-custom-theme-in-your-CRA-app.html

* How to load the google maps api `<script>` in my react app only when it is required?
https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/41710341

* How to serialize an Object into a list of URL query parameters?
https://stackoverflow.com/questions/6566456/how-to-serialize-an-object-into-a-list-of-url-query-parameters

* Resize svg icon for google map marker
https://stackoverflow.com/questions/23264872/resize-svg-icon-for-google-map-marker

* Making Google Maps work with React
https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
