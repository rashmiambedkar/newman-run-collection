var fs = require('fs'),
    newman = require('newman'),

    results = []; // require newman in your project
 
// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./sample-collection.json'),
    environment: require('./environment.json'),
    iterationData: './data_postman.csv',
    reporters: 'cli'
}).on('request', function (err, args) {
    if (!err) {
        // here, args.response represents the entire response object
        var rawBody = args.response.stream, // this is a buffer
            body = rawBody.toString(); // stringified JSON

        results.push(JSON.parse(body)); // this is just to aggregate all responses into one object
    }
})
// a second argument is also passed to this handler, if more details are needed.
.on('done', function (err, summary) {
    // write the details to any file of your choice. The format may vary depending on your use case
    fs.writeFileSync('migration-report.json', JSON.stringify(results, null, 4));
});