# download
下载组件

## API

### download(filename:String, data:String) 直接下载数据
#### filename
必填，下载文件名
#### data
必填，想要下载的数据

### downloadCSV(url:String, options:Object)

#### options.perPage:Number
每次请求的数量,默认100

#### options.filename:String
下载的文件名，默认`download.csv`

### options.query:Object
请求的额外参数，默认 `{}`

### options.columns:Array
csv输出列描述，格式如:
```javascript
  [
    dataIndex: '', //必填，列key
    title:'',//列名, 默认dataIndex
    render:(value, row)=>{//数据转换函数,
      return value;
    } 
  ]
```

#### options.responseTransformer:Function=(response)=>{}

接口响应转换函数

**return**: {data:Array, total:Number} 函数应当返回的结果，data未本次请求转换的结果数组，total是需要下载的总条数

**params**: response 服务端响应体

#### options.queryTransformer:Fucntion=(query)=>{}

对query参数进行转换

**return**  {}

**params** query 请求参数， 包括 offset和limit

### options.onUpdate:Function=({data:Array, total:Number})=>{}

**data**: 所有已经从服务端拉回来的数据

**total**: 需要下载的总条数

### csvStringify(data:Array, columns:Array):String 

将数据转化成 csv格式
```javascript
  import csvStringify from 'awesome-downloader/src/csv'
```

### requestController(url:String, {limit: Number}, onUpdate: Function, responseTransformer: Function):void

请求调度器

```javascript
  import requestController from 'awesome-downloader/src/request'
```


## Example
```javascript
  import {downloadCSV} from 'awesome-downloader'
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