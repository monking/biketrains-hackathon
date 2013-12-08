# Bike Train service

Serve bike train locations realtime (Hack For LA Hackathon 2013-12-07)

## Install

### MongoDB

In the works...

### Setup Grunt

```
npm install -g grunt-cli
npm install
```

### Create a `config.js` file like this:

```
module.exports = {
  title: 'Bike Trains',
  redirectURI: 'http://localhost:3000/token',
  defaultService: "strava",
  services: {
    strava: {
      authorizationPath: '/oauth/authorize',
      tokenPath: '/oauth/token',
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      site: 'https://www.strava.com/api/v3',
      authSite: ' https://www.strava.com',
      scope: 'public',
      debugToken: 'your-debug-token'
    },
    google: {
      authorizationPath: '/oauth2/auth',
      tokenPath: '/oauth2/token',
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      site: 'https://www.googleapis.com/tracks/v1',
      authSite: 'https://accounts.google.com/o',
      scope: 'https://www.googleapis.com/auth/tracks'
    },
    esriGeotrigger: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      site: 'http://localhost:3000/auth',
      tokenPath: ''
    }
  }
};
```

## What's the goal?

- Realtime, bike-relavant location data
  - bike train route info
    - where are the currently running trains within their routes?
    - search for routes near you
  - road and route closures, detours
- Serve/fetch publicly available data through common JSON API
  - serve bike train route info
  - fetch crowd-sourced bike-friendly locations

## References, opportunities

- [mapmyrun.com](http://mapmyrun.com/)
- [crow](http://solid.it.cx/bikemap2)
- [firebase - realtime open data (transit, etc.)](http://firebase.com/)
- LA River Revitalization Project
  - connecting communities along the length of the river thorugh policy and advocacy
  - encourage services/popups along the river, establish to lasting
- LA City Socrata open data
  - [controllerdata.lacity.org](http://controllerdata.lacity.org) (updated monthly)
  - [data.lacity.org](http://data.lacity.org)
    - [street resurfacing data](https://data.lacity.org/Geographic-Information/Street-Resurfacing-Projects-Fiscal-Year-2013-2014-/qj6r-5v4t)
- [leaflet.js - open-source implementation of OpenStreetMaps](leafletjs.con)
