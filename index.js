const { Builder, By, Key, until } = require("selenium-webdriver");

class RunFFTests {
  constructor() {
    this.driver = new Builder().forBrowser("firefox").build();
  }

  async searchFor(searchInput, checkSearch) {
    let driver = this.driver;
    let baseUrl = "http://www.google.rs";
    driver.get(baseUrl);
    driver
      .findElement(
        By.xpath(
          "/html/body//form[@role='search']//div[@class='A8SBwf']//div[@class='a4bIc']/input[@role='combobox']"
        )
      )
      .sendKeys(searchInput, Key.RETURN)
      .then(async () => {
        let searchResults = await driver.wait(until.elementLocated(By.id("search")), 10000);
        let findResults = searchResults.findElement(By.xpath(`//*[text()='${checkSearch}']`));
        if (findResults) {
          findResults.click();
          console.log(`${checkSearch} found`);
        } else {
          console.log(`${checkSearch} isn't found`);
        }
      });
  }
}

let testBloxico = new RunFFTests();
testBloxico.searchFor("Bloxico", "bloxico.com");
