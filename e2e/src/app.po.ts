import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(destination) {
    return browser.get(destination);
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }
}
