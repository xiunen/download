import requestController from './request'
import csvStringify from './csv'

//下载
export const download = (filename, data) => {
  if (typeof data !== 'string') {
    throw new Error('data should be string');
  }
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a')
  link.href = url;
  link.download = filename;
  link.click()
}
//拉取数据，进行转换，调用done函数
//done: (data:Array, total)=>{}


export const downloadCSV = (url, {
  perPage = 100,
  filename, //strin
  query = {},
  columns, //[{title,dataIndex,render(){}}]
  responseTransfomer,
  onUpdate = ({ data, total }) => { } //({totalSize, currentSize})=>{}
}) => {
  const perUpdate = ({ data, total, finished }) => {
    onUpdate({ data, total })

    if (finished) {
      download(filename || 'download.csv', csvStringify(data, columns))
    }
  }
  requestController(url, { ...query, limit: perPage }, perUpdate, responseTransfomer)
}