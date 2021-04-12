import { isEmpty } from 'utils/util';

describe('Utils', () => {
  describe('isEmpty', () => {
    it('parses empty values', () => {
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
    });

    it('parses non empty values', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(['hello'])).toBe(false);
      expect(isEmpty({ hello: 5 })).toBe(false);
      expect(isEmpty(10)).toBe(false);
    });
  });
});
