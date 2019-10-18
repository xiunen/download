//有逗号有双引号要用引号引起来，内容里的引号要转换成""
export const escapeString = (str) => {
  if (!str) return str;

  let string = `${str}`;

  const hasQuot = string.includes('"');
  if (hasQuot) {
    string = string.replace(/"/g, '""')
  }
  const hasComma = string.includes(',');
  if ((hasComma || hasQuot)) return `"${string}"`;

  return string;
}

//格式化数据
//columns [{title,dataIndex,render}]
export default (data, columns) => {
  if (!Array.isArray(data)) {
    throw new Error("data is empty");
  }

  let cols = columns;
  if (!cols) {
    cols = Object.keys(data[0]).map(key => ({ title: key, dataIndex: key }))
  }

  const header = cols.map(({ title, dataIndex }) => escapeString(title || dataIndex)).join(',');

  const content = data.map(item => {
    return cols.map(({ dataIndex, render }) => {
      const itemResult = render ? render(item[dataIndex]) : item[dataIndex]
      return escapeString(itemResult)
    }).join(',')
  }).join('\n')

  return header + '\n' + content
}