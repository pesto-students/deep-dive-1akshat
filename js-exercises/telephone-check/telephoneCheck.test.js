import { telephoneCheck } from './telephoneCheck';

describe('telephoneCheck', () => {
  test('should return correct boolean', () => {
    expect(telephoneCheck('1 (555) 555-5555')).toBe(true);
    expect(telephoneCheck('(555)555-5555')).toBe(true);
    expect(telephoneCheck('555-5555')).toBe(false);
    expect(telephoneCheck('1 555)555-5555')).toBe(false);
    expect(telephoneCheck('123**&!!asdf#')).toBe(false);
    expect(telephoneCheck('0 (757) 622-7382')).toBe(false);
    expect(telephoneCheck('-1 (757) 622-7382')).toBe(false);
    expect(telephoneCheck('(555)5(55?)-5555')).toBe(false);
  });
});
