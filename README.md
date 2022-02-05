# runpostman
This is a script put together that reads a json file and runs multiple postman collections
with the given parameters as options. Currently this script has only a csv reporter, 
which is handy because it can be imported into a database and manipulated from there
to generate any sort of report needed.

## Decisions on which reporters to include
At this time, the html reporters have security concerns and have opted to not fold them
into this script at this time. I am finding, however, that the csv reporter provides
most of the information that is needed anyway, so the first iteration will only contain
this reporter while I create a new one.

## Json Configuration
The json configuration allows for providing options to the newman postman runner, but
also provides some customization for the reporters included. At this time, only the csv
reporter is bundled in, but as more reporters are added, more options can be specified.

The collections json item contains an array of postman run configurations. Things that are
required are the collection name and the environment file. The rest of the options
have defaults that seemed reasonable at the time of writing. If no report file name
is specified, it will default to the collection name with the fitting extension type
for the report.

note: at the time of this writing, the error checking on the json configuration is not
terribly robust. The script will error out if the format is incorrect. This is an area
for development.

### available options and default values

```
  {
            verbose: pmCollection.verbose || true,
            collection: collectionFile,
            environment: environmentFile,
            iterationData: pmCollection.dataFile ? (basedir + pmCollection.dataFile) : undefined,
            iterationCount: isNaN(pmCollection.iterations) ? 0 : pmCollection.iterations,
            ignoreRedirects: true,
            insecure: true,
            timeoutRequest: pmCollection.timeoutRequest || 0,
            timeoutResponse: pmCollection.timeoutResponse || 0,
            timeout: pmCollection.timeout || 0,
            timeoutScript: pmCollection.timeoutScript || 0,
            delayRequest: pmCollection.delayRequest || 0
  }
```
### samples/multiconfig.json
There is an example postman collection in the samples directory.
```
{
  "collections": [
    {
      "reportFileName": "RestExample",
      "collection": "collections/RestExample.postman_collection.json",
      "environment": "environments/RestExample.postman_environment.json",
      "iterationCount": "all",
      "includeBody": false
    },
    {
      "reportFileName": "RestExampleWithData",
      "collection": "collections/RestExample.postman_collection.json",
      "environment": "environments/RestExample.postman_environment.json",
      "datafile": "datafiles/datafile.csv",
      "iterationCount": "all",
      "delayRequest": 500,
      "includeBody": true
    }
  ]
}
```

## Suggested project structure
- root dir
  - newmandir/
    - collections/
    - datafiles/
    - enviornments/
    - newman-reports/
    - jsonconfig.json

## Console output
The console is being written to for each request issued. This can be removed 
or perhaps toggled with an option
```
Lauras-iMac:laura$ node bin/runpostman.js -k multiconfig.json
Running 2 request(s) and 1 iteration(s)
Running 2 request(s) and 1 iteration(s)
GET https://jsonplaceholder.typicode.com/users
POST https://jsonplaceholder.typicode.com/posts
CSV write complete!
RestExample: collection run completed
Success
GET https://jsonplaceholder.typicode.com/users
POST https://jsonplaceholder.typicode.com/posts
CSV write complete!
RestExampleWithData: collection run completed
Success
```

## Report files
The report files are will be written to ./newman-reports
e.g.
```
- newman-reports
    - RestExample.csv
    - RestExampleWithData.csv
```

### Sample csv report
```text
iteration,collectionName,requestName,method,url,status,code,responseTime,responseSize,executed,failed,skipped,body
"1","RestExample","users","GET","https://jsonplaceholder.typicode.com/users","OK","200","162","5645","Status code is 200"
"1","RestExample","posts","POST","https://jsonplaceholder.typicode.com/posts","Created","201","89","130","Status code is 200, Validate response content"
```

## Newman GitHubRepo
```
https://github.com/postmanlabs/newman
```
