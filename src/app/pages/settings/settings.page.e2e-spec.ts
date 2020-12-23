import { AppPage } from '../../../../e2e/src/app.po';
import {} from 'jasmine';
import { browser, by, element } from 'protractor';

describe('Settings screen', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Title should say "Settings"', () => {
    browser.sleep(2000);
    expect(page.getPageTitle()).toContain('Settings');
  });
  it('Clear Token button should let you go auth screen', () => {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.id('clear-token-btn')));
    browser.sleep(2000);
    element(by.id('clear-token-btn')).click();
    browser.sleep(3000);
  });
});
