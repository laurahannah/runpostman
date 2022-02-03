#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const version = require('../package.json').version;
const runPostmanWithReporters = require('../lib/index.js');

program
    .name('runpostman')
    .description('Run postman collection(s) with the specified options')
    .version(version, '-f, --version')
    .addHelpCommand(true)
    .requiredOption('-k --keyDescriptor <keyDescriptor>', 'Postman Collection Description Json \n' +
        'Format is: \n' +
        '\t{\n' +
        '\t\t"collections"\t: [\n' +
        '\t\t{\n' +
        '\t\t"collection"\t:\t"collections/samplerest.postman_collection.json"\n' +
        '\t\t"environment"\t:\t"environments/sample.postman_environment.json"\n' +
        '\t\t"datafile"\t:\t"datafiles/datafile.csv"\n' +
        '\t\t"iterationCount"\t:\t"all"\n' +
        '\t\t"delayRequest"\t:\t0\n' +
        '\t\t"reportFile"\t:\t"sampleRestWithData"\n' +
        '\t\t"reportTitle"\t:\t"Sample Rest Collection"\n' +
        '\t\t}\n' +
        '\t]}\n')
    .parse();

const options = program.opts();

// runPostmanWithReporters(runpostman.keyDescriptor);

//Run this script if this is a direct stdin.
!module.parent && runPostmanWithReporters(options.keyDescriptor);

module.exports = exports = program;

