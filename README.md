# App runs

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/rittmang/pg-hackathon.git *# or clone your own fork*

$ cd pg-hackathon

$ npm install

$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).


Test on Heroku locally: 
```sh

$ heroku local
```

Deploy manually on Heroku to save Dyno hours

# API
API base set for 2 states till now.
1) Texas

    /texas/[license_id]?fname=[first_name]
  
2) Pennsylvania

    /pennstate/[license_id]?fname=[first_name]
  
For both cases, if record is found (by license id) and is verified (by fname i.e first name) - you are redirected to the status page.



