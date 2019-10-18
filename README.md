# download
下载组件

```javascript
  import {downloadCSV} from 'awesome-download'
  downloadCSV(
    '/download', //required
    {
    perPage:100, //default is 100
    filename:'test.csv', // default is download.csv
    query:{ //default is empty object
      start_time:0,
      end_time: Date.now()
    },
    columns: [
      {
        dataIndex:'title',
        title:'Title',
        render(value){
          return value;
        }
      }
    ],
    responseTransfomer(response){
      return {
        data: response.data.list, 
        total: response.data.total
      }
    },
    onUpdata({data, total}){}
  })
```