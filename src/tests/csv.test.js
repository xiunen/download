import csvStringify from '../csv'

describe('test csv', () => {
  test('', () => {
    const result = `姓名,gender
User1,Female
"User,2",Female
"User""3""",Male`
    expect(csvStringify(
      [
        { name: 'User1', gender: 'F' },
        { name: 'User,2', gender: 'F' },
        { name: 'User"3"', gender: 'M' },
      ],
      [
        { dataIndex: 'name', title: '姓名' },
        {
          dataIndex: 'gender', render(gender) {
            return { F: 'Female', M: 'Male' }[gender]
          }
        }
      ]
    )).toEqual(result)
  })
})