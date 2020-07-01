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

For all APIs if query parameter is correct, you will be redirected to status page.

If record is found (by license id) and is verified (by fname i.e first name) - you are redirected to the status page.

1) Texas

    /texas/[license_id]?fname=[first_name]
  
2) Pennsylvania

    /pennstate/[license_id]?fname=[first_name]
 

3) Colorado

    /colorado/[license_id]?full_name=[full_name]
    
    Use full name here. 
    
4) Nevada

    /nevada/[license_id]?fname=[first name]

5) New York

    /newyork/[license_id]?fname=[first_name]
    
6) Pennsylvania

    /pennstate/[license_id]?fname=[first_name]
    
7) California

   /california/[icense_id]?fname=[full_name] 
   





