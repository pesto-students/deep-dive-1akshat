import { abbreviateString } from './abbreviateString';

describe('abbreviateString', () => {
  it('abbreviates the following strings', () => {
    expect(abbreviateString('Hacktober Fest')).toEqual('Hacktober F.');
    expect(abbreviateString('Leeroy Fitzgerald Jenkins')).toEqual('Leeroy J.');
    expect(abbreviateString('Some arbitrary string length here.')).toEqual('Some H.');
  });

  it('throws error on invalid parameters', () => {
    expect(() => abbreviateString(123)).toThrow();
    expect(() => abbreviateString([])).toThrow();
    expect(() => abbreviateString({})).toThrow();
    expect(() => abbreviateString(null)).toThrow();
  });
});
