import { AppPage } from '../../../../e2e/src/app.po';
import {} from 'jasmine';
import { browser, by, element } from 'protractor';

describe('Auth screen', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('/auth');
  });

  it('Title should say "Microting eForm"', () => {
    expect(page.getPageTitle()).toContain('Microting eForm');
  });
  it('App should go to dashboard screen', () => {
    browser.sleep(1000);
    element(by.css('ion-input[name="customer-num"] input')).sendKeys('1');
    browser.sleep(1000);
    element(by.css('ion-input[name="opt-code"] input')).sendKeys('2');
    browser.sleep(1000);
    element(by.id('auth-btn')).click();
    browser.sleep(2000);
  });
});
