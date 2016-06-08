MockHero
===

This is a small project to help AOL developers with the service mocking for functional testing.

Installation
===

 * Open [chrome://extensions](chrome://extensions)
 * Enable 'Developer Mode' checkbox
 * Click 'Load unpacked extensions...'
 * Select the `MockHero` folder

Usage
===

While on any page, launch the devtools, you should see a new tab called 'MockHero'.
Press f5 and it will list all the calls with JSON response done to the server.
Each call on the list will have a 'Get Info!' button, pressing that button will show the JSON needed for the mock.

Copy the response and format it in your favorite JSON formatter! example https://jsonformatter.curiousconcept.com/
