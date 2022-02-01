# dockernewman

## Prerequisites
```
sudo npm install -g newman-reporter-html
```

## Newman GitHubRepo
```
https://github.com/postmanlabs/newman
```

## Newman library options

### newman.run(options: _object_ , callback: _function_) => run: EventEmitter
The `run` function executes a collection and returns the run result to a callback function provided as parameter. The
return of the `newman.run` function is a run instance, which emits run events that can be listened to.

| Parameter | Description   |
|-----------|---------------|
| options                   | This is a required argument and it contains all information pertaining to running a collection.<br /><br />_Required_<br />Type: `object` |
| options.collection        | The collection is a required property of the `options` argument. It accepts an object representation of a Postman Collection which should resemble the schema mentioned at [https://schema.getpostman.com/](https://schema.getpostman.com/). The value of this property could also be an instance of Collection Object from the [Postman Collection SDK](https://github.com/postmanlabs/postman-collection).<br /><br />As `string`, one can provide a URL where the Collection JSON can be found (e.g. [Postman Cloud API](https://api.getpostman.com/) service) or path to a local JSON file.<br /><br />_Required_<br />Type: `object\|string` [PostmanCollection](https://github.com/postmanlabs/postman-collection/wiki#Collection) |
| options.environment       | One can optionally pass an environment file path or URL as `string` to this property and that will be used to read Postman Environment Variables from. This property also accepts environment variables as an `object`. Environment files exported from Postman App can be directly used here.<br /><br />_Optional_<br />Type: `object\|string` |
| options.envVar            | One can optionally pass environment variables as an array of key-value string object pairs. It will be used to read Postman Environment Variables as well as overwrite environment variables from `options.environments`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.globals           | Postman Global Variables can be optionally passed on to a collection run in form of path to a file or URL. It also accepts variables as an `object`.<br /><br />_Optional_<br />Type: `object\|string` |
| options.globalVar         | One can optionally pass global environment variables as an array of key-value string object pairs. It will be used to read Postman Global Environment Variables as well as overwrite global environment variables from `options.globals`. <br /><br />_Optional_<br />Type: `array\|object` |
| options.iterationCount    | Specify the number of iterations to run on the collection. This is usually accompanied by providing a data file reference as `options.iterationData`.<br /><br />_Optional_<br />Type: `number`, Default value: `1` |
| options.iterationData     | Path to the JSON or CSV file or URL to be used as data source when running multiple iterations on a collection.<br /><br />_Optional_<br />Type: `string` |
| options.folder            | The name or ID of the folder/folders (ItemGroup) in the collection which would be run instead of the entire collection.<br /><br />_Optional_<br />Type: `string\|array` |
| options.workingDir        | The path of the directory to be used as working directory.<br /><br />_Optional_<br />Type: `string`, Default value: `Current Directory` |
| options.insecureFileRead  | Allow reading files outside of working directory.<br /><br />_Optional_<br />Type: `boolean`, Default value: `true` |
| options.timeout           | Specify the time (in milliseconds) to wait for the entire collection run to complete execution.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutRequest    | Specify the time (in milliseconds) to wait for requests to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.timeoutScript     | Specify the time (in milliseconds) to wait for scripts to return a response.<br /><br />_Optional_<br />Type: `number`, Default value: `Infinity` |
| options.delayRequest      | Specify the time (in milliseconds) to wait for between subsequent requests.<br /><br />_Optional_<br />Type: `number`, Default value: `0` |
| options.ignoreRedirects   | This specifies whether newman would automatically follow 3xx responses from servers.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.insecure          | Disables SSL verification checks and allows self-signed SSL certificates.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.bail              | A switch to specify whether or not to gracefully stop a collection run (after completing the current test script) on encountering the first error. Takes additional modifiers as arguments to specify whether to end the run with an error for invalid name or path.<br /><br/>Available modifiers: `folder` and `failure`.<br />eg. `bail : ['folder']`<br /><br />_Optional_<br />Type: `boolean\|object`, Default value: `false` |
| options.suppressExitCode  | If present, allows overriding the default exit code from the current collection run, useful for bypassing collection result failures. Takes no arguments.<br /><br />_Optional_<br />Type: `boolean`, Default value: `false` |
| options.reporters         | Specify one reporter name as `string` or provide more than one reporter name as an `array`.<br /><br />Available reporters: `cli`, `json`, `junit`, `progress` and `emojitrain`.<br /><br />_Optional_<br />Type: `string\|array` |
| options.reporter          | Specify options for the reporter(s) declared in `options.reporters`. <br /> e.g. `reporter : { junit : { export : './xmlResults.xml' } }` <br /> e.g. `reporter : { html : { export : './htmlResults.html', template: './customTemplate.hbs' } }` <br /><br />_Optional_<br />Type: `object` |
| options.color             | Enable or Disable colored CLI output.<br/><br/>Available options: `on`, `off` and `auto`<br /><br />_Optional_<br />Type: `string`, Default value: `auto` |
| options.sslClientCert     | The path to the public client certificate file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientKey      | The path to the private client key file.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientPassphrase | The secret client key passphrase.<br /><br />_Optional_<br />Type: `string` |
| options.sslClientCertList | The path to the client certificate configuration list file. This option takes precedence over `sslClientCert`, `sslClientKey` and `sslClientPassphrase`. When there is no match in this configuration list, `sslClientCert` is used as fallback.<br /><br />_Optional_<br />Type: `string\|array` |
| options.sslExtraCaCerts   | The path to the file, that holds one or more trusted CA certificates in PEM format.<br /><br />_Optional_<br />Type: `string` |
| options.requestAgents     | Specify the custom requesting agents to be used when performing HTTP and HTTPS requests respectively. Example: [Using Socks Proxy](#using-socks-proxy)<br /><br />_Optional_<br />Type: `object` |
| options.cookieJar     | One can optionally pass a CookieJar file path as `string` to this property and that will be deserialized using [`tough-cookie`](https://github.com/salesforce/tough-cookie). This property also accepts a `tough-cookie` CookieJar instance.<br /><br />_Optional_<br />Type: `object\|string` |
| options.newmanVersion     | The Newman version used for the collection run.<br /><br />_This will be set by Newman_ |
| callback                  | Upon completion of the run, this callback is executed with the `error`, `summary` argument.<br /><br />_Required_<br />Type: `function` |

### newman.run~callback(error: _object_ , summary: _object_)

The `callback` parameter of the `newman.run` function receives two arguments: (1) `error` and (2) `summary`

| Argument  | Description   |
|-----------|---------------|
| error                     | In case newman faces an error during the run, the error is passed on to this argument of callback. By default, only fatal errors, such as the ones caused by any fault inside Newman is passed on to this argument. However, setting `abortOnError:true` or `abortOnFailure:true` as part of run options will cause newman to treat collection script syntax errors and test failures as fatal errors and be passed down here while stopping the run abruptly at that point.<br /><br />Type: `object` |
| summary                   | The run summary will contain information pertaining to the run.<br /><br />Type: `object` |
| summary.error             | An error object which if exists, contains an error message describing the message <br /><br />Type: `object` |
| summary.collection        | This object contains information about the collection being run, it's requests, and their associated pre-request scripts and tests.<br /><br />Type: `object` |
| summary.environment       | An object with environment variables used for the current run, and the usage status for each of those variables.<br /><br />Type: `object` |
| summary.globals           | This object holds details about the globals used within the collection run namespace.<br /><br />Type: `object` |
| summary.run               | A cumulative run summary object that provides information on .<br /><br />Type: `object` |
| summary.run.stats         | An object which provides details about the total, failed, and pending counts for pre request scripts, tests, assertions, requests, and more.<br /><br />Type: `object` |
| summary.run.failures      | An array of failure objects, with each element holding details, including the assertion that failed, and the request.<br /><br />Type: `array.<object>` |
| summary.run.executions    | This object contains information about each request, along with it's associated activities within the scope of the current collection run.<br /><br />Type: `array.<object>` |

### newman.run~events

Newman triggers a whole bunch of events during the run.

```javascript
newman.run({
    collection: require('./sample-collection.json'),
    iterationData: [{ "var": "data", "var_beta": "other_val" }],
    globals: {
        "id": "5bfde907-2a1e-8c5a-2246-4aff74b74236",
        "name": "test-env",
        "values": [
            {
                "key": "alpha",
                "value": "beta",
                "type": "text",
                "enabled": true
            }
        ],
        "timestamp": 1404119927461,
        "_postman_variable_scope": "globals",
        "_postman_exported_at": "2016-10-17T14:31:26.200Z",
        "_postman_exported_using": "Postman/4.8.0"
    },
    globalVar: [ 
        { "key":"glboalSecret", "value":"globalSecretValue" },
        { "key":"globalAnotherSecret", "value":`${process.env.GLOBAL_ANOTHER_SECRET}`}
    ],
    environment: {
        "id": "4454509f-00c3-fd32-d56c-ac1537f31415",
        "name": "test-env",
        "values": [
            {
                "key": "foo",
                "value": "bar",
                "type": "text",
                "enabled": true
            }
        ],
        "timestamp": 1404119927461,
        "_postman_variable_scope": "environment",
        "_postman_exported_at": "2016-10-17T14:26:34.940Z",
        "_postman_exported_using": "Postman/4.8.0"
    },
    envVar: [ 
        { "key":"secret", "value":"secretValue" },
        { "key":"anotherSecret", "value":`${process.env.ANOTHER_SECRET}`}
    ],
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});


All events receive two arguments (1) `error` and (2) `args`. **The list below describes the properties of the second
argument object.**

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

<!-- TODO: write about callback summary -->


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

