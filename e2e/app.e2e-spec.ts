import { SimsarServantPage } from './app.po';

describe('simsar-servant App', function() {
  let page: SimsarServantPage;

  beforeEach(() => {
    page = new SimsarServantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
