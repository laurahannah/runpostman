#!/usr/bin/env node

const {Command} = require('commander'),
    runpostman = new Command(),
    version = require('../package.json').version,
    runPostmanWithReporters = require('../lib/index.js')
;

runpostman
.name('runpostman')
.version(version, '-f, --version')
    .addHelpCommand(true)
    .requiredOption('-k --keyDescriptor <keyDescriptor>', 'Postman Collection Description Json \n' +
        'Format is: \n' +
        '---Finish this with the json multiconfig format---')
    .parse(process.argv);

collectionDescriptorJson => {
    console.info('Hello');
    runPostmanWithReporters(runpostman.keyDescriptor);
}
module.exports = exports = runpostman;

