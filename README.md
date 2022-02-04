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


## Newman GitHubRepo
```
https://github.com/postmanlabs/newman
```



| Event     | Description   |
|-----------|---------------|
| start                     | The start of a collection run |
| beforeIteration           | Before an iteration commences |
| beforeItem                | Before an item execution begins (the set of prerequest->request->test) |
| beforePrerequest          | Before `prerequest` script is execution starts |
| prerequest                | After `prerequest` script execution completes |
| beforeRequest             | Before an HTTP request is sent |
| request                   | After response of the request is received |
| beforeTest                | Before `test` script is execution starts |
| test                      | After `test` script execution completes |
| beforeScript              | Before any script (of type `test` or `prerequest`) is executed |
| script                    | After any script (of type `test` or `prerequest`) is executed |
| item                      | When an item (the whole set of prerequest->request->test) completes |
| iteration                 | After an iteration completes |
| assertion                 | This event is triggered for every test assertion done within `test` scripts |
| console                   | Every time a `console` function is called from within any script, this event is propagated |
| exception                 | When any asynchronous error happen in `scripts` this event is triggered |
| beforeDone                | An event that is triggered prior to the completion of the run |
| done                      | This event is emitted when a collection run has completed, with or without errors |



```

## Newman options
```
### `newman run <collection-file-source> [options]`

- `-e <source>`, `--environment <source>`<br />
  Specify an environment file path or URL. Environments provide a set of variables that one can use within collections.
  [Read More](https://learning.postman.com/docs/postman/variables-and-environments/managing-environments/)

- `-g <source>`, `--globals <source>`<br />
  Specify the file path or URL for global variables. Global variables are similar to environment variables but have a lower
  precedence and can be overridden by environment variables having the same name.

- `-d <source>`, `--iteration-data <source>`<br />
  Specify a data source file (JSON or CSV) to be used for iteration as a path to a file or as a URL.
  [Read More](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/)

- `-n <number>`, `--iteration-count <number>`<br />
  Specifies the number of times the collection has to be run when used in conjunction with iteration data file.

- `--folder <name>`<br />
  Run requests within a particular folder/folders or specific requests in a collection. Multiple folders or requests can be specified by using
  --folder multiple times, like so: --folder f1 --folder f2 --folder r1 --folder r2.


- `--working-dir <path>`<br />
  Set the path of the working directory to use while reading files with relative paths. Default to current directory.

- `--no-insecure-file-read`<br />
  Prevents reading of files situated outside of the working directory.

- `--export-environment <path>`<br />
  The path to the file where Newman will output the final environment variables file before completing a run.

- `--export-globals <path>`<br />
  The path to the file where Newman will output the final global variables file before completing a run.

- `--export-collection <path>`<br />
  The path to the file where Newman will output the final collection file before completing a run.

- `--timeout <ms>`<br />
  Specify the time (in milliseconds) to wait for the entire collection run to complete execution.

- `--timeout-request <ms>`<br />
  Specify the time (in milliseconds) to wait for requests to return a response.

- `--timeout-script <ms>`<br />
  Specify the time (in milliseconds) to wait for scripts to complete execution.

- `-k`, `--insecure`<br />
  Disables SSL verification checks and allows self-signed SSL certificates.

- `--ignore-redirects`<br />
  Prevents newman from automatically following 3XX redirect responses.

- `--delay-request`<br />
  Specify the extent of delay between requests (milliseconds).

- `--cookie-jar <path>`<br />
  Specify the file path for a JSON Cookie Jar. Uses [`tough-cookie`](https://github.com/salesforce/tough-cookie) to deserialize the file.

- `--export-cookie-jar <path>`<br />
  The path to the file where Newman will output the final cookie jar file before completing a run. Uses `tough-cookie`'s serialize method.

- `--bail [optional modifiers]`<br />
  Specify whether or not to stop a collection run on encountering the first test script error.<br />
  Can optionally accept modifiers, currently include `folder` and `failure`.<br />
  `folder` allows you to skip the entire collection run in case an invalid folder
  was specified using the `--folder` option or an error was encountered in general.<br />
  On the failure of a test, `failure` would gracefully stop a collection run after completing the current test script.

- `-x`, `--suppress-exit-code`<br />
  Specify whether or not to override the default exit code for the current run.

- `--color <value>`<br />
  Enable or Disable colored CLI output. The color value can be any of the three: `on`, `off` or `auto`*(default)*.<br/>
  With `auto`, Newman attempts to automatically turn color on or off based on the color support in the terminal.
  This behaviour can be modified by using the `on` or `off` value accordingly.

- `--disable-unicode`<br />
  Specify whether or not to force the unicode disable option. When supplied, all symbols in the output will be replaced
  by their plain text equivalents.

- `--global-var "<global-variable-name>=<global-variable-value>"`<br />
  Allows the specification of global variables via the command line, in a key=value format. Multiple CLI global variables
  can be added by using `--global-var` multiple times, like so: `--global-var "foo=bar" --global-var "alpha=beta"`.

- `--env-var "<environment-variable-name>=<environment-variable-value>"`<br />
  Allows the specification of environment variables via the command line, in a key=value format. Multiple CLI environment variables
  can be added by using `--env-var` multiple times, like so: `--env-var "foo=bar" --env-var "alpha=beta"`.

- `--verbose`<br />
  Show detailed information of collection run and each request sent.

```

## Newman help
https://www.npmjs.com/package/newman

```
  -e, --environment <path>              Specify a URL or path to a Postman Environment
  -g, --globals <path>                  Specify a URL or path to a file containing Postman Globals
  -r, --reporters [reporters]           Specify the reporters to use for this run (default: ["cli"])
  -n, --iteration-count <n>             Define the number of iterations to run
  -d, --iteration-data <path>           Specify a data file to use for iterations (either JSON or CSV)
  --folder <path>                       Specify the folder to run from a collection. Can be specified multiple times to run multiple folders (default: [])
  --global-var <value>                  Allows the specification of global variables via the command line, in a key=value format (default: [])
  --env-var <value>                     Allows the specification of environment variables via the command line, in a key=value format (default: [])
  --export-environment <path>           Exports the final environment to a file after completing the run
  --export-globals <path>               Exports the final globals to a file after completing the run
  --export-collection <path>            Exports the executed collection to a file after completing the run
  --postman-api-key <apiKey>            API Key used to load the resources from the Postman API
  --bail [modifiers]                    Specify whether or not to gracefully stop a collection run on encountering an error and whether to end the run with an error based on the optional modifier
  --ignore-redirects                    Prevents Newman from automatically following 3XX redirect responses
  -x , --suppress-exit-code             Specify whether or not to override the default exit code for the current run
  --silent                              Prevents Newman from showing output to CLI
  --disable-unicode                     Forces Unicode compliant symbols to be replaced by their plain text equivalents
  --color <value>                       Enable/Disable colored output (auto|on|off) (default: "auto")
  --delay-request [n]                   Specify the extent of delay between requests (milliseconds) (default: 0)
  --timeout [n]                         Specify a timeout for collection run (milliseconds) (default: 0)
  --timeout-request [n]                 Specify a timeout for requests (milliseconds) (default: 0)
  --timeout-script [n]                  Specify a timeout for scripts (milliseconds) (default: 0)
  --working-dir <path>                  Specify the path to the working directory
  --no-insecure-file-read               Prevents reading the files situated outside of the working directory
  -k, --insecure                        Disables SSL validations
  --ssl-client-cert-list <path>         Specify the path to a client certificates configurations (JSON)
  --ssl-client-cert <path>              Specify the path to a client certificate (PEM)
  --ssl-client-key <path>               Specify the path to a client certificate private key
  --ssl-client-passphrase <passphrase>  Specify the client certificate passphrase (for protected key)
  --ssl-extra-ca-certs <path>           Specify additionally trusted CA certificates (PEM)
  --cookie-jar <path>                   Specify the path to a custom cookie jar (serialized tough-cookie JSON)
  --export-cookie-jar <path>            Exports the cookie jar to a file after completing the run
  --verbose                             Show detailed information of collection run and each request sent
  -h, --help                            display help for command
```

## Html Extra options
From https://www.npmjs.com/package/newman-reporter-htmlextra
```
        htmlextra: {
            // export: './report.html',
            // template: './template.hbs'
            // logs: true,
            // showOnlyFails: true,
            // noSyntaxHighlighting: true,
            // testPaging: true,
            // browserTitle: "My Newman report",
            // title: "My Newman Report",
            // titleSize: 4,
            // omitHeaders: true,
            // skipHeaders: "Authorization",
            // omitRequestBodies: true,
            // omitResponseBodies: true,
            // hideRequestBody: ["Login"],
            // hideResponseBody: ["Auth Request"],
            // showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            // showFolderDescription: true,
            // timezone: "Australia/Sydney",
            // skipFolders: "folder name with space,folderWithoutSpace",
            // skipRequests: "request name with space,requestNameWithoutSpace",
            // displayProgressBar: true
        }
```

