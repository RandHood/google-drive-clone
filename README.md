# Google Drive Clone

This is a simple project mimicking some of Google Drive's features and look.

---

### Tools and libraries

The app is built with React, Node.js (v14.15.4), NPM (v6.14.10) and Firebase.

## How to run

This web app is still in development mode. To run it locally follow these steps.

#### Setup NPM

You must have NPM installed in order to run the app. Download for:
* [Windows](https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi)
* [Mac](https://nodejs.org/dist/v14.15.4/node-v14.15.4.pkg)

Skip this part if you already have NPM installed.

#

#### Install modules

To install the required node packages run the following command in the terminal:
**`npm install`**

#

#### Firebase

Create a Firebase project and activate the following:
* Authentication with email and passowrd
* Cloud Firestore with the rules below

```
allow read, write: if request.auth != null;
```

Once you finish that, create a file named `.env.local` in your app directory and set these values with the ones of your Firebase project.
```
REACT_APP_FIREBASE_API_KEY=123456789012345678901234567890
REACT_APP_FIREBASE_AUTH_DOMAIN=project-name-12345.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=project-name-12345
REACT_APP_FIREBASE_STORAGE_BUCKET=project-name-12345.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:12345678901234567890
REACT_APP_FIREBASE_MEASUREMENT_ID=G-1234567890
```

#

#### Running on browser

Now that you have everything setup and ready, open your terminal app directory and run the following command: **`npm start`**

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
