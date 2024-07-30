const cypress = require("cypress")
const { defineConfig } = require("cypress");
const { tagify } = require('cypress-tags');

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
   
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', tagify(config));
      // implement node event listeners here
    },
    specPattern:'cypress/Integration/API/*.spec.js',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/failures/screenshots'
  },
  env: {
    CYPRESS_INCLUDE_TAGS: 'smoke,sanity,regression',
    base_url: 'https://simple-books-api.glitch.me',
    authEndPoint : '/api-clients',
    listOfBooks : '/books',
    singleBook : '/books/1',
    submitOrder : '/orders',
    getAllOrders : '/orders',
    updateOrder : '/orders/',
    deleteOrder : '/orders/'
  },
});
