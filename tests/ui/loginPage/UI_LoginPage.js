describe('The Login Page', function () {
  const loginPage = browser.page.login.loginPage(); 
  const homePage = browser.page.home.homePage(); 

  // execute before each test
  beforeEach((browser) => {
    browser.navigateTo("https://www.facebook.com/");

    // Wait for elements
    loginPage.waitForElementPresent("@emailInput");
  });

  /**
   * Test 1 : Test the Login Functionality with right Credentials
   * 1. Wait for Elements to show
   * 2. Set text on Email address field input
   * 3. Set text for password field input
   * 4. Click Login Button 
   * 5. Assert that the home page will be visible by checking element (eg home button)
   * 6. Log out to get out of session
   */
  it("should login with correct credentials", (browser) => {

    // Login
    loginPage.login("aburr2779@gmail.com", "@Rjonsensal11!!");

    // Assert that the home page will be visible by checking element (eg home button)
    homePage.waitForElementPresent("@homeButton", 10000);
    homePage.assert.visible("@homeButton");
    
    // logout
    homePage.logout();
  });

  /**
   * Test 2 : Test Login with wrong credentials 
   * 1. Wait for Elements to show
   * 2. Set text on Email address field input
   * 3. Set text for password field input
   * 4. Click Login Button 
   * 5. Assert that the login page will be visible by checking element (eg email field)
   * 6. Assert that the error message will appear
   */  
  it("should not login with wrong credentials", (browser) => {
    
    let randomNum = Math.random() * 7899;
    // Login
    loginPage.login(`${randomNum}`, `${randomNum}`);

    // Assert that the login page will be visible by checking element (eg email field)
    loginPage.waitForElementPresent("@emailInput", 10000);
    loginPage.assert.visible("@loginErrorMessage");
    loginPage.assert.textContains("@loginErrorMessage", "The email or mobile number you entered isn’t connected to an account.");
  });

  /**
   * Test 3 : Test Create account Button 
   * 1. Wait for Elements to show
   * 2. Click create account button
   * 3. Assert if modal will be visible
   */
  it("should show the registration modal box", (browser) => {
    
    // Click create account button
    loginPage.element.find("@createAccountButton").click();

    // assert modal is visible
    loginPage.waitForElementPresent("#reg_box", 10000);
    loginPage.assert.visible("#reg_box");
  });

  after((browser) => {
    browser.end();
  });
});
