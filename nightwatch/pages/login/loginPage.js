
const elements = {
  emailInput: "#email",
  passwordInput: "#pass",
  loginButton: "button[name='login']",
  forgotPasswordLink: "//a[text()='Forgot password?']",
  createAccountButton: "a[data-testid='open-registration-form-button']",
  loginErrorMessage: "div#email_container div:nth-child(3)"
}

const pageCommands = {

  /**
   * Login on Page
   * @param {string} email Email to type
   * @param {string} password password to type
   */
  login(email, password) {
    let browser = this.element;

    // enter user and password
    browser.find("@emailInput").sendKeys(email);
    browser.find("@passwordInput").sendKeys(password);

    // login
    browser.find("@loginButton").click();
  },
};

module.exports = {
  commands: [ pageCommands ],
  elements: [elements]
};
