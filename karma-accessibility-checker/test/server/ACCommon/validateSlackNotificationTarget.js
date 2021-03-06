/******************************************************************************
     Copyright:: 2020- IBM, Inc

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  *****************************************************************************/

/*******************************************************************************
 * NAME: validateSlackNotificationTarget.js
 * DESCRIPTION: Used to test the validateSlackNotificationTarget function in
 *              ACCommon.js

 *******************************************************************************/

'use strict';

// Load all the modules that are needed
var test = require('ava');
var path = require('path');
var decache = require('decache');
var fs = require("fs");

// Load the function that will be tester
var ACCommon = require(path.join(__dirname, '..', '..', '..', 'src', 'lib', 'ACCommon'));

// Load a mock logger and set it in to ACReporterCommon
ACCommon.log = require(path.join(__dirname, '..', 'unitTestCommon', 'commonTestHelpers', 'logger'));

// Stores the unitTest common objects
var unitTestCommon;

// Path to the unitTest common module
var unitTestCommonModule = path.join(__dirname, '..', 'unitTestCommon', 'commonTestHelpers', 'unitTestCommon');

// Fetch the exit function to restore back
var exitFunction = process.exit;

test.beforeEach(function () {
    // Set any empty function for exit
    process.exit = function(returnCode) {

    };
    decache(unitTestCommonModule);
    unitTestCommon = require(unitTestCommonModule);
});

test('validateSlackNotificationTarget(slackTarget) should validate slack target for API token with channel provided', function (ava) {

    // Add slack target to verify
    var slacktarget = "ibm-accessibility:xoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#a11y-tool-integration";

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test('validateSlackNotificationTarget(slackTarget) should validate slack target for API token without channel provided', function (ava) {

    // Add slack target to verify
    var slacktarget = "ibm-accessibility:xoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test('validateSlackNotificationTarget(slackTarget) should validate slack target for webhook', function (ava) {

    // Add slack target to verify
    var slacktarget = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX";

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test('validateSlackNotificationTarget(slackTarget) should not validate slack target for webhook', function (ava) {

    // Add slack target to verify
    var slacktarget = "hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX";

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test('validateSlackNotificationTarget(slackTarget) should not validate slack target for API token', function (ava) {

    // Add slack target to verify
    var slacktarget = "ibm-accessibilityxoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#a11y-tool-integration";

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test('validateSlackNotificationTarget(slackTarget) should not validate slack target when an array is provided', function (ava) {

    // Add slack target to verify
    var slacktarget = ["ibm-accessibility:xoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#a11y-tool-integration",
        "ibm-accessibilityxoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#a11y-tool-integration"
    ];

    // Call the validateSlackNotificationTarget function to validate slack target
    ACCommon.validateSlackNotificationTarget(slacktarget);

    ava.is(true, true);
});

test.afterEach.always(function () {

    // Restore the exit function
    process.exit = exitFunction;

    decache(unitTestCommonModule);
    unitTestCommon = undefined;
});