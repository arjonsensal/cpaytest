
const elements = {
  homeButton: "a[aria-label='Home']",
  profileButton: "svg[aria-label='Your profile'] image",
  logoutButton: "div[role='listitem']:nth-child(5)"
}

const pageCommands = {
  
  /**
   * Log out of the home page
   */
  logout() {
    let homePage = this.element;

    // wait for element profile button then click
    this.waitForElementPresent("@profileButton");
    homePage.find("@profileButton").click();

    // wait for element logout button then click
    this.waitForElementPresent("@logoutButton");
    homePage.find("@logoutButton").click();
  }
}

module.exports = {
  commands: [pageCommands],
  elements: [elements]
};
