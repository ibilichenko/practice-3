import { JSDOM } from 'jsdom';

if (typeof global !== 'undefined') {
  const { window } = new JSDOM();
  global.window = window;
  global.document = window.document;
}
