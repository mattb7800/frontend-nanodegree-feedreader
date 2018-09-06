/* feedreader.js */
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


        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. (step 8)
         */
        it('url defined', function() {
                allFeeds.forEach(function(feed) {
                  expect(feed.url).toBeDefined();
                  expect(feed.url.length).not.toBe(0);
                });

        });
        /* Test loops through each feed
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


    /* Wrote a new test suite named "The menu" (step 10)*/
    /* Test that ensures the menu element is
     * hidden by default.  (step 11)
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
     /* Wrote a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should has two expectations: The menu is displayed when
      * clicked and it is hidden when clicked again. (step 12)
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

    /* Wrote a new test suite named "Initial Entries" (step 13) */
    /* Wrote a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * The loadFeed() is asynchronous requires
     * the use of Jasmine's beforeEach and asynchronous done() function.(step 14)
     * Good info on the children property at:
     * https://www.w3schools.com/jsref/prop_element_children.asp
     * Thanks to first review on pointing me in the right direction to get
     * the parent and child for the Initial Entries test suite.
     */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('load feed with at least one entry', function() {
                const InitEntry = document.querySelectorAll('.feed .entry');
                expect(InitEntry.length > 0).toBe(true);
              });
    });

    /* Wrote a new test suite named "New Feed Selection" (step 15)*/
    /* Wrote a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * (step 16)
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
                expect(InitalFeed).not.toEqual(newFeed);
            });
    });

}());
