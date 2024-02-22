// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['tests'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['nightwatch/pages'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: ['@nightwatch/apitesting'],
  
  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: "./config/global.js",
  
  webdriver: {},

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://www.facebook.com/',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          args: [
            '--disable-notifications',
            "--disable-infobars",
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            // '--headless'
          ]
        }
      },
      
      webdriver: {
        start_process: true,
        server_path: ''
      },
      
    },

    api_testing: {
      start_session: false,
      webdriver: {
        start_process: false,
      }
    },
    
    chrome_headless: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            '--disable-notifications',
            "--disable-infobars",
            '--headless'
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
  },
  
  usage_analytics: {
    enabled: true,
    log_path: './logs/analytics',
    client_id: '1226bcf0-6c43-4de0-93d9-bb134e6c9425'
  },
  
  "@nightwatch/apitesting" : {
    "log_responses": true
  }
  
};
