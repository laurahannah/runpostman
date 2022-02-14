#!/usr/bin/env node

const newman = require('newman'),
    chmodr = require('chmodr'),
    fs = require('fs'),
    basedir = './';

// get the current timestamp
const moment = require('moment');
const timestamp = moment().timestamp;

const PostmanWithReporters = function (collectionDescriptorJson) {
    // read in the json file that describes the collections to run and the desired options
    const configFileContent = fs.readFileSync(basedir + collectionDescriptorJson);
    // parse the json file
    const configJson = JSON.parse(configFileContent);
    // set the output directory <- this is where the reports will go
    const outputDir = basedir + 'newman-reports/';
    // make the output directory and any needed directories on the path
    fs.mkdirSync(outputDir, {recursive: true});

    // we are going to run postman for each entry in the collection descriptor file
    configJson.collections.forEach(pmCollection => {
        // determine the path to the environment, collection, and datafile (if there is one)
        if (pmCollection.environment && pmCollection.collection) {
            const environmentFile = basedir + pmCollection.environment;
            const collectionFile = basedir + pmCollection.collection;

            // set the report file name to the name specified in the collection description
            // default to the reportFile name, if not specified
            const reportName = pmCollection.reportFileName || collectionFile;

            const options = {
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
                delayRequest: pmCollection.delayRequest || 0,
                reporters: ['csv'],
                reporter: {
                    csv: {
                        export: outputDir + reportName + '.csv',
                        includeBody: pmCollection.includeBody
                    }
                }
            };

            // this is where the party gets started - run newman with the options parsed above
            newman.run(options)
                .on('start', function (err, args) {
                    if (err) {
                        return;
                    }
                    console.info(`Running ${args.cursor.length} request(s) and ${args.cursor.cycles} iteration(s)`);
                })
                .on('request', function (err, args) {
                    console.info(args.request.method.toString() + " " + args.request.url.toString());
                })
                .on('response', function (err, args) {
                    console.info('Response status: ' + args.response.status.toString());
                })
                .once('done', function (err, results) {
                    chmodr(outputDir.substring(0, outputDir.length - 1), 0o777, (err) => {
                        if (err) {
                            console.log('Failed to execute chmod');
                        } else {
                            console.log('Success')
                        }
                    });
                    console.log(reportName + ': collection run completed');
                });
        } else {
            console.log('Collection name and Environment are required');
        }
    });
}
module.exports = PostmanWithReporters;