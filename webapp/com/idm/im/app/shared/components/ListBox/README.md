# ListBox列表组件

table列头带有搜索条件，左侧第一列可配置显示/隐藏列

######ListComponent列表组件和ListBox组件的不同

|  | ListBox | ListComponent |
| ------ | ------ | ------ |
| 头部是否支持查询 | 是  | 否 |
| 头部是否支持列显示/隐藏配置 | 是  | 否 |
| 行是否有双击事件 | 是  | 否 |
| matchedRows默认选中行是否有行单机回调 | 否  | 是 |
| 是否有初始固定高度 | 否  | 是，固定250高 |

## ListBox列表组件属性说明

| 属性 | 必须 | 说明 | 类型 | 默认 |
| ------ | ------ | ------ | ------ | ------ |
| isHideLeft | 是  | 左侧是否隐藏 | boolean | false |
| tableColumnData | 是  | table列表展示列配置，属性说明见[tableColumnData说明] | boolean | false |
| searchComponentData | 是  | 搜索属性配置 | object[] |  |
| url | 是  | 获取数据请求地址 | string |  |
| rowHandles | 是  | 操作事件回调，参数：strHandles操作名称；rowObj操作对象 | function(strHandles,rowObj) |  |
| rowOperation | 是  | 行操作 | object[] |  |
| headerOperation | 是  | table列表上面的按钮操作 | object[] |  |
| subtractHeight | 否  | table列表高度控制，高度减去这个值 | string |  |
| subtractWidth | 否  | table列表宽度控制，宽度减去这个值 | string |  |
| matchedRows | 否  | 默认选中第几行数据,例如：[0,1,2] | number[] |  |
| isRowSingle | 否  | 是否单选，默认行可以多选 | boolean | false |


#### tableColumnData说明


| 属性 | 必须 | 说明 | 类型 | 默认 |
| ------ | ------| ------ | ------ | ------ |
| storageKey | 是 | 本地存储Key | string |  |
| data： | 是 |  | object[] |  |
|  data数组里的对象信息  |
| showName | 是 | table表头显示的文字 | string |  |
| columnName | 是  | 对象属性 | boolean |  |
| columnWidth | 否  | 列宽 | number | 100 |
| columnHidden  | 否 | 表格初始化时是否隐藏，列“显示/隐藏”配置中可配置 | boolean |  |
| foreverHidden | 否  | 永久隐藏，列“显示/隐藏”配置中不可配置 | boolean |  |


```
    例子：
         this.tableColumn = {
            storageKey: 'ListUserColumnConfig',
            data: [
                {
                    showName: 'id',
                    columnName: 'userId',
                    columnHidden:true,
                    foreverHidden: true
                },{
                    showName: '登录账户名',
                    columnName: 'loginName',
                    columnWidth: 130
                },{
                    showName: '人员姓名',
                    columnName: 'userName'
                },{
                    showName: '邮件地址',
                    columnName: 'email',
                    columnHidden: true
                },{
                    showName: '座机号',
                    columnName: 'phone'
                }
            ]
        }
```

#### searchComponentData说明

搜索属性配置，如果字段不配置，默认是input搜索

| 属性 | 必须 | 说明 | 类型 | 默认 |
| ------ | ------| ------ | ------ | ------ |
| showName | 否 | 显示名称 | string |  |
| name | 是 | 搜索属性，对应tableColumnData里的columnName | string |  |
| type | 是 | 搜索类型，'input'、'date'、'number'、'select'、'disabled（input输入框不可编辑）' | string | 'input' |
| maxName | 否 | 最大值， 选择小于时使用；选择范围时大值使用；（type是'date'、'number'时可用） | string |  |
| minName | 否 | 最小值， 选择大于时使用；选择范围时小值使用；（type是'date'、'number'时可用） | string |  |
| optionList | 否 | 下拉框的信息（type='select'时可用），例如：[{optionKey:'1',optionShow:'是'},{optionKey:'2',optionShow:'否'}]| object[] |  |
| url | 否 | 下拉框获取数据请求地址（type='select'时可用）| string |  |
| condition | 否 | 下拉框获取数据的查询条件（type='select'时可用），例如：{name: '123',type: 1}| object |  |


    例子：
            this.searchComponentData = [
                {
                    showName: '人员姓名',
                    name:'userName',
                    type: 'input',
                },{
                    showName: '手机号',
                    name:'mobile',
                    type: 'number',
                    maxName:'mobileMax', 
                    minName:'mobileMin' 
                },{//type=disabled 为input输入框不可编辑
                    showName: '座机号',
                    name:'phone',
                    type: 'disabled',
                },{
                    showName: '创建时间',
                    name:'gmtCreate',
                    type: 'date',
                    maxName:'gmtCreateMax',
                    minName:'gmtCreateMin'
                },{
                    showName : '是否可登录',
                    name : 'loginFlag',
                    type : 'select',
                    optionList:[
                        {
                            optionKey:'',
                            optionShow:''
                        },{
                            optionKey:'1',
                            optionShow:'是'
                        },{
                            optionKey:'0',
                            optionShow:'否'
                        }
                    ]
                },{
                     showName : '动态获取下拉框内容',
                     name : 'email',
                     type : 'select',
                     url: '/getSelectData',
                     condition: { //查询条件
                         name: '123',
                         type: '1'
                     }
                 }
            ];

#### rowOperation行操作配置说明

table列表行操作事件，现在只有行单击、行双击事件

| 属性 | 必须 | 说明 | 类型 | 默认 |
| ------ | ------| ------ | ------ | ------ |
| handleName | 是 | 事件名称，固定事件名称：单击 rowClick；双击 doubleClick | string |  |
| showName | 否 | 页面显示名称 | string |  |

    例子：
        this.rowOperation = [
            {
                handleName: 'doubleClick',
                showName: '行双击事件'
            },{
                handleName: 'rowClick',
                showName: '行单击选择事件'
            }
        ];

#### headerOperation 列表上面按钮操作配置说明

table列表上面按钮操作事件

| 属性 | 必须 | 说明 | 类型 | 默认 |
| ------ | ------| ------ | ------ | ------ |
| handleName | 是 | 事件名称，固定事件名称：导出 export | string |  |
| showName | 是 | 页面显示名称 | string |  |
| iconClass | 否 | 按钮前面的图标，使用antd提供的icon | string |  |

    例子：
        this.headerOperation = [
            {
                handleName: 'addUser',
                showName: '新增',
                iconClass: 'plus'
            },{
                handleName: 'edit',
                showName: '修改',
                iconClass: 'edit'
            },{
                handleName: 'delete',
                showName: '删除',
                iconClass: 'delete'
            },{
                handleName: 'info',
                showName: '查看',
                iconClass: 'info'
            },{
                handleName: 'assignRole',
                showName: '分配角色',
                iconClass: 'key'
            },{
                handleName: 'export',
                showName: '导出',
                iconClass: 'export'
            }
        ];




