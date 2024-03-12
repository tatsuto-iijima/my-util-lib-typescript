import {describe, expect, test} from '@jest/globals';
import { Password } from '../password';

describe('Password generate test', () => {
  describe('Check password length', () => {
    describe.each([
      { length: 8 },
      { length: 12 },
    ])('When argument "length" is $length', ({length}) => {
      test(`The password length is ${length}`, () => {
        const password = new Password(length);
        expect(password.toString()).toMatch(new RegExp(`\\w{${length}}`));
      });
    });
  });

  describe('Check password character type', () => {
    describe.each([
      { upperCase: true, lowerCase: false, number: false, symbol: false },
      { upperCase: false, lowerCase: true, number: false, symbol: false },
      { upperCase: false, lowerCase: false, number: true, symbol: false },
      { upperCase: false, lowerCase: false, number: false, symbol: true },
    ])('When argument "option" is %o', option => {
      let pattern: string;
      let message;
      if (option.upperCase) {
        pattern = '[A-Z]{8}';
        message = 'uppercase';
      } else if (option.lowerCase) {
        pattern = '[a-z]{8}';
        message = 'lowercase';
      } else if (option.number) {
        pattern = '[0-9]{8}';
        message = 'number';
      } else {
        pattern = '[!@#\\$%\\^&\\*\\(\\)-_\\+=\\[\\]\\{\\};:"\\\'\\\|~`,\\.<>/\\?]{8}';
        message = 'symbol';
      }
      const password = new Password(8, option);

      test(`Only ${message} letters in passwords`, () => {
        expect(password.toString()).toMatch(new RegExp(pattern));
      });
    });
  });

  describe('Check validation for argument "option"', () => {
    describe('When argument "option" is all false', () => {
      test('Throw Error', () => {
        expect(() => new Password(8, {
          upperCase: false,
          lowerCase: false,
          number: false,
          symbol: false,
        })).toThrow('None of the characters used in the password are enabled');
      });
    });
  });

  describe('Check validation for password length', () => {
    describe.each([
      { length: 0, option: { upperCase: true, lowerCase: false, number: false, symbol: false } },
      { length: 1, option: { upperCase: true, lowerCase: true, number: false, symbol: false } },
      { length: 2, option: { upperCase: true, lowerCase: true, number: true, symbol: false } },
      { length: 3, option: { upperCase: true, lowerCase: true, number: true, symbol: true } },
      { length: 4, option: { upperCase: true, lowerCase: true, number: true, symbol: true } },
    ])('When argument "length" is $length and "option" is $option', ({length, option}) => {
      if (length < 4) {
        test('Throw error', () => {
          expect(() => new Password(length, option)).toThrow(/^Specified number of characters is less than /);
        });
      } else {
        test('Not throw error', () => {
          expect(() => new Password(length, option)).not.toThrow();
        });
      }
    });
  });
});