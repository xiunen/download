import { appendQuery } from './url'

//responseTransformer 返回done所需要格式
export const fetchData = (url, { offset = 0, limit = 100, ...rest } = {}, done, responseTransformer) => {
  const dataUrl = appendQuery(url, { offset, limit, ...rest });
  window.fetch(dataUrl, { method: 'GET' }).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(`fetch failed with url: ${url}, params: ${JSON.stringify({ offset, limit, ...rest })}`);
  }).then((res) => {
    if (typeof responseTransformer === 'function') return responseTransformer(res);
    if (Array.isArray(res)) {
      return {
        data: res,
        total: res.length
      }
    }
    return res;
  }).then(done).catch((e) => {
    console.warn(e);
    fetchData(url, { offset, limit, ...rest } = {}, done, responseTransformer)
  })
}

//请求调度器
//onUpdate {data, total}
export default (url, { limit = 100, ...rest } = {}, onUpdate, responseTransformer) => {
  const downloadData = [];
  const done = ({ data, total }) => {
    downloadData.push(...data);
    if (typeof onUpdate === 'function') {
      onUpdate({ data: downloadData, total, finished: total <= downloadData.length })
    }
    if (downloadData.length < total) {
      fetchData(url, { offset: downloadData.length, limit, ...rest }, done, responseTransformer)
    }
  }
  fetchData(url, { limit, ...rest }, done, responseTransformer)
}