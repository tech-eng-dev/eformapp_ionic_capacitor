import { AppPage } from '../../../../e2e/src/app.po';
import {} from 'jasmine';
import { browser, by, element } from 'protractor';

describe('Dashboard screen', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Title should say "eForm"', () => {
    expect(page.getPageTitle()).toContain('eForm');
  });
  it('Menu should be opened', () => {
    element(by.tagName('ion-menu-button')).click();
  });
  it('Should open settings screen', () => {
    browser.sleep(1000);
    element(by.id('item-1')).click();
  });
});
