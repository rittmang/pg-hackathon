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

API base set for - 

Note: Use full_name or fname (first_name) as specified
   
   
   1) License
       
       1) Texas
       
            /api/license/texas/[license_id]?fname=[first_name]
        
        2) Pennsylvania
        
            /api/license/pennstate/[license_id]?fname=[first_name]
        
        3) Colorado
        
            /api/license/colorado/[license_id]?full_name=[full_name]
            
        
        4) Nevada
        
            /api/license/nevada/[license_id]?fname=[first name]
        
        5) New York
        
            /api/license/newyork/[license_id]?fname=[first_name]
        
        6) Pennsylvania
        
            /api/license/pennstate/[license_id]?fname=[first_name]
        
        7) California
        
            /api/license/california/[license_id]?fname=[full_name] 
        
        8) Ohio
        
            /api/license/ohio/[license_id]?full_name=[full_name]
    
   2) NPI
   
        /api/npi/[npi_id]


For all APIs if query parameter is correct, you will be redirected to status page.

If record is found (by license id) and is verified (by fname/full_name) - you are redirected to the status page.


   





