import request from '../request'

describe('test request', () => {
  const host = 'http://localhost'
  const path = '/download'
  const url = `${host}${path}`;

  test('', (done) => {
    const onUpdate = ({ data, total, finished }) => {
      if (finished) {
        expect(data.length).toEqual(total)
        done()
      }
    }
    fetch.mockResponseOnce(JSON.stringify({ data: [{ id: 1 }], total: 2 }))
    fetch.mockResponseOnce(JSON.stringify({ data: [{ id: 2 }], total: 2 }))
    request(url, { limit: 1 }, onUpdate);

  })

  test('', (done) => {
    const onUpdate = ({ data, total, finished }) => {
      expect(data.length).toEqual(total)
      done()
    }
    fetch.mockResponseOnce(JSON.stringify([{ id: 3 }]))
    request(url, { limit: 1 }, onUpdate);

  })

})