/* global test */

const sayHello = (name = 'Haz') => `Hello, ${name}!`;

test('sayHello', () => {
  expect(sayHello()).toBe('Hello, Haz!');
  expect(sayHello('foo')).toBe('Hello, foo!');
});

