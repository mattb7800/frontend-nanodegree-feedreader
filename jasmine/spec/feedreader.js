/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. (step 8)
         */
        it('url defined', function() {
                allFeeds.forEach(function(feed) {
                  expect(feed.url).toBeDefined();
                  expect(feed.url.length).not.toBe(0);
                });

        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. (step 9)
         */
        it('name defined', function() {
                allFeeds.forEach(function(feed) {
                  expect(feed.name).toBeDefined();
                  expect(feed.name.length).not.toBe(0);
                });
        });

    });


    /* TODO: Write a new test suite named "The menu" (step 10)*/
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element. (step 11)
     * reviwed using classList property at:
     * https://www.w3schools.com/jsref/prop_element_classlist.asp
     * contains: Returns a Boolean value, indicating whether an element has the
     * specified class name.
     */
    describe('The menu', function() {
          const menu = document.querySelector('body');
          it('menu hidden by default', function() {
                expect(menu.classList.contains('menu-hidden')).toBe(true);
          });
     /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again. (step 12)
      * reviwed Click() method use on:
      * https://www.w3schools.com/jsref/met_html_click.asp
      */
          it('menu is visible when clicked', function() {
                const menuIcon = document.querySelector('.menu-icon-link');
                menuIcon.click();
                expect(menu.classList.contains('menu-hidden')).toBe(false);
                menuIcon.click();
                expect(menu.classList.contains('menu-hidden')).toBe(true);
          });

    });

    /* TODO: Write a new test suite named "Initial Entries" (step 13) */
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.(step 14)
     * Good info on the children property at:
     * https://www.w3schools.com/jsref/prop_element_children.asp
     */
    describe('Initial Entries', function() {
              const feed = document.querySelector('.feed');
              beforeEach(function(done) {
                loadFeed(0, done);
              });
              it('load feed with at least one entry', function() {
                expect(feed.children.length > 0).toBe(true);
              });
    });

    /* TODO: Write a new test suite named "New Feed Selection" (step 15)*/
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.(step 16)
     */
    describe('New Feed Selection', function() {
              const feed = document.querySelector('.feed');
              const InitalFeed = [];
              const newFeed = [];
    /* used Jasmine documentation for asynchronous work:
     * https://jasmine.github.io/tutorials/async
     */
              beforeEach(function(done) {
                loadFeed(0, function() {
                  InitalFeed.push(feed.children[0].innerText);
                  loadFeed(1, function() {
                    newFeed.push(feed.children[0].innerText);
                  done();
                });

              });
            });
            it('content changes', function() {
                expect(InitalFeed === newFeed).toBe(false);
            });
    });

}());
