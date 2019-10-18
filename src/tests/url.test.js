import { appendQuery } from '../url';

describe('test url', () => {
  test('should return /a', () => {
    expect(appendQuery('/a')).toEqual("/a")
  })


  test('should return http://localhost/a?b=c', () => {
    expect(appendQuery('/a', { b: 'c' })).toEqual("http://localhost/a?b=c")
  })

  test('should return http://localhost/a?a=1&b=c', () => {
    expect(appendQuery('/a?a=1', { b: 'c' })).toEqual("http://localhost/a?a=1&b=c")
  })
})