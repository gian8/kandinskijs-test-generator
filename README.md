# kandinskijs-test-generator


## How-to

You can run the test generator against your CSS file through this command:

`./node_modules/.bin/cross-env CSS_PATH=examples/base.css URL=http://localhost/ node demo/demo-index.js`

You can then run the testSuite generated via:

`./node_modules/.bin/mocha testSuite/*.js`