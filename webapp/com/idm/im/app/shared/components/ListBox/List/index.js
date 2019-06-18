import React, {Component} from 'react'
import {Table, Column, Cell} from 'fixed-data-table-2'
import Dimensions from 'react-dimensions'
import { Spin, Icon } from 'antd';
import  store from '../../../stores/main';
import  ColumnConfig from './ColumnConfig';
import  SortHeaderCell from './SortHeaderCell';

const storage = window.localStorage;//本地存储

import styles from  './index.scss'

class TextCell extends Component {
    render() {
        const {data, rowIndex, columnKey, showOption, ...props} = this.props;
        let cellDate = data[rowIndex][columnKey];
        //列表展示汉字，例如：性别，后台返回数据为‘1’，前台展示 ‘男’
        if(typeof showOption !== 'undefined'){
            let option = showOption.filter( (item) => {
                return item.optionKey === data[rowIndex][columnKey]
            });
            if(option.length > 0){
                cellDate = option[0].optionShow;
            }
        }
        return (
            <Cell {...props}>
                {cellDate}
            </Cell>
        );
    }
}

class FlexGrow extends Component {
    constructor(props) {
        super(props);
        let columnWidths = {};
        let columnOrder = [];
        let tableColumn = this.props.tableColumnData.data; //table 显示列
        this.searchComponentData = this.props.searchComponentData; //搜索条件
        //初始化每一列的宽度，默认宽度100
        console.log(this.props.tableColumnData.data)
        tableColumn.map((e, index) => {
            let columnWidth = 100;
            if(e.columnWidth){
                columnWidth = e.columnWidth;
            }
            columnWidths[e.columnName] = columnWidth;
            columnOrder.push(e.columnName);
        });

        this._dataList = [];
        this._defaultSortIndexes = [];
        let matchedRowsDefault = this.props.matchedRows;
        console.log(matchedRowsDefault)
        if(matchedRowsDefault == null || matchedRowsDefault === '' || matchedRowsDefault.length == 0){
            matchedRowsDefault = -1;
        }
        this.state = {
            loading: true,
            isHideLeft:false,
            tableColumn: tableColumn,
            columnWidths: columnWidths,   //初始化每一列的宽度
            columnOrder: columnOrder,     //初始化列显示顺序
            sortedDataList: [],          //排序后的数据
            colSortDirs: {},             //列 + 排序的顺序
            matchedRows: matchedRowsDefault >= 0  ? [matchedRowsDefault] : [],             //当前选中的行
            isRowSingle: this.props.isRowSingle ? this.props.isRowSingle : false, //table行是否单选，默认是多选
            conditionX:[],
            selectAllflag:0
        };

        this.unsubscribe = store.listen( (data)=>{
            this.setState(data);
        });

        this.condition = {}; //查询条件
        this.conditionX1={}
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    componentDidMount() {
        //从本地存储中读取当前列表的配置
        let storageKey = this.props.tableColumnData.storageKey;
        let tableColumnConfig = storage.getItem(storageKey);
        if(tableColumnConfig != null){
            this.columnConfig(tableColumnConfig.split(","));
        }
    }
    //列显示/不显示配置
    showColumnConfig= () =>{
        this.refs.ColumnConfig.showModal();
    };
    columnConfig = (checkedList) =>{
        let _tableColumnData = this.state.tableColumn;
        _tableColumnData.map( (e) => {
            if(checkedList.indexOf(e.columnName) > -1 ){
                e['columnHidden'] = false;  //不隐藏列
            }else {
                e['columnHidden'] = true; //隐藏列
            }
        });
        this.setState({tableColumn: _tableColumnData});
    };
    clear = () =>{//子组件调用父组件，将显示拼装数据置为空
        this.setState({
            conditionX:{}
        })
        this.conditionX1={}
    }

    //头部搜索条件的回调，把搜索条件拼装成对象
       searchConditionCallback = (condition,markDate,keyName) => {

            
        this.conditionX1 = Object.assign(this.conditionX1, condition)
            this.setState({
                conditionX:this.conditionX1 
            })
            console.log("conditionX拼装数据用于显示组件初始化",this.state.conditionX)//拼装数据用于显示组件初始化


            if(markDate==1){             //marke==1为时间控件特殊处理 第一个值置为空
                condition[keyName]="";
            
            }
            this.condition = Object.assign(this.condition, condition)
            
            console.log("'查询数据拼装",this.condition)//查询数据拼装

      
    };

    searchHandle = () => {
        console.log("查询条件===", this.condition);
        this.props.pageNext(null, null, this.condition);  //要去页码,跳转到第几页
    };
    resetSearchHandle = () => {
        this.condition = {};
        for (let prop in this.refs){
            if(prop.indexOf("SortHeaderCell") > -1){
                    this.refs[prop].resetHandle()
            }
        }
    };
    //行操作事件
    rowHandles = (strHandles, rowObj) => {
        this.props.rowHandles(strHandles, rowObj);
    };

    //拖拽列宽度事件
    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }
    //移动列事件
    _onColumnReorderEndCallback(event) {
        //console.log(event);
        let columnOrder = this.state.columnOrder.filter((columnKey) => {
            return columnKey !== event.reorderColumn;
        });

        if (event.columnAfter) {
            let index = columnOrder.indexOf(event.columnAfter);
            columnOrder.splice(index, 0, event.reorderColumn);
        } else {
            columnOrder.push(event.reorderColumn);
        }
        this.setState({
            columnOrder: columnOrder
        });
    }
    //列排序事件
    _onSortChange(columnKey, sortDir) {
        let sortIndexes = this._defaultSortIndexes.slice();
        sortIndexes.sort((indexA, indexB) => {
            let valueA = this._dataList[indexA][columnKey];
            let valueB = this._dataList[indexB][columnKey];
            if(valueA==null){
                valueA = '-1';
            }
            if(valueB==null){
                valueB = '-1';
            }
            let sortVal = 0;
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }

            if (sortVal !== 0 && sortDir === 'ASC') {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        let _sortedDataList = [];
        for(let i=0; i<sortIndexes.length; i++){
            _sortedDataList.push(this._dataList[sortIndexes[i]])
        }

        this.setState({
            sortedDataList: _sortedDataList,
            colSortDirs: {
                [columnKey]: sortDir,
            },
            matchedRows: [],             //当前选中的行清空
        });
    }
    componentWillReceiveProps(nextProps) {
        this._dataList = nextProps.indexList;
        if(this._dataList == null){
            this._dataList = [];
        }
        const size = this._dataList.length;
        this._defaultSortIndexes = [];
        for (let index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        let nextMatchedRows = nextProps.matchedRows;
        if(nextMatchedRows == null || nextMatchedRows === '' || nextMatchedRows.length == 0){
            nextMatchedRows = -1;
        }
        this.setState({
            loading: nextProps.loading,

            sortedDataList: this._dataList,
            colSortDirs: {},
            matchedRows: nextMatchedRows >= 0 ? [nextMatchedRows] :[],             //当前选中的行清空
        });
    }



    //全选事件
    selectAllRowClick = (e, index) => {
        let isRowSingle = this.state.isRowSingle;//行是否单选

        if (this.state.selectAllflag==0) {

                let arr = []
                for(var i=0;i<this.props.pageSize;i++){
                    arr[i] = i
                }

            let matchedRows = arr


            console.log(matchedRows)

            if (isRowSingle) {//单选行
                let isHave = matchedRows.indexOf(index);
                if (isHave < 0) {
                    matchedRows.splice(0, 1);
                    matchedRows = matchedRows.concat(index);
                } else {
                    matchedRows.splice(0, 1);
                }
                this.setState({matchedRows: matchedRows});
            } else {//多选行
                let itemIndex = matchedRows.findIndex((item) => {
                    return item === index
                });
                if (itemIndex < 0) {
                    matchedRows = matchedRows.concat(index);
                    matchedRows.sort((a, b) => {
                        return a - b
                    });
                    this.setState({matchedRows: matchedRows});
                } else {
                    console.log(matchedRows)
                    matchedRows.splice(itemIndex, 1);
                    this.setState({matchedRows: matchedRows});
                }
            }
            matchedRows.splice(-1,1)
            let rowsObj = []; //当前选中行的数据对象
            console.log(matchedRows.length)
            console.log(matchedRows)

            matchedRows.map((item, index) => {
                rowsObj.push(
                    {
                        rowIndex: item,
                        data: this.state.sortedDataList[item]
                    }
                )
            });

            console.log(rowsObj)

            this.props.selectedRowsObjHandles(rowsObj);
            this.props.rowHandles('rowClick', rowsObj);
            this.setState({
                selectAllflag:1
            })
        }else{
            let matchedRows = []


            if (isRowSingle) {//单选行
                let isHave = matchedRows.indexOf(index);
                if (isHave < 0) {
                    matchedRows.splice(0, 1);
                    matchedRows = matchedRows.concat(index);
                } else {
                    matchedRows.splice(0, 1);
                }
                this.setState({matchedRows: matchedRows});
            } else {//多选行
                let itemIndex = matchedRows.findIndex((item) => {
                    return item === index
                });
                if (itemIndex < 0) {
                    matchedRows = matchedRows.concat(index);
                    matchedRows.sort((a, b) => {
                        return a - b
                    });
                    this.setState({matchedRows: matchedRows});
                } else {
                    matchedRows.splice(itemIndex, 1);
                    this.setState({matchedRows: matchedRows});
                }
            }
            matchedRows.splice(-1,1)

            let rowsObj = []; //当前选中行的数据对象
            matchedRows.map((item, index) => {
                rowsObj.push(
                    {
                        rowIndex: item,
                        data: this.state.sortedDataList[item]
                    }
                )
            });
            console.log(rowsObj)
            this.props.selectedRowsObjHandles(rowsObj);
            this.props.rowHandles('rowClick', rowsObj);
            this.setState({
                selectAllflag:0
            })
        }
    };



    //行单击事件
    onRowClick = (e, index) => {
        let isRowSingle = this.state.isRowSingle;//行是否单选
        let matchedRows = this.state.matchedRows;
        if(isRowSingle){//单选行
            let isHave = matchedRows.indexOf(index);
            if(isHave < 0){
                matchedRows.splice(0,1);
                matchedRows = matchedRows.concat(index);
            }else{
                matchedRows.splice(0,1);
            }
            this.setState({matchedRows: matchedRows});
        }else{//多选行
            let itemIndex = this.state.matchedRows.findIndex( (item) => {
                return item === index
            });
            if(itemIndex < 0){

                matchedRows = matchedRows.concat(index);
                matchedRows.sort( (a, b) => {
                    return a - b
                });
                this.setState({matchedRows: matchedRows});
            }else{
                matchedRows.splice(itemIndex,1);
                this.setState({matchedRows: matchedRows});
            }
        }
        let rowsObj = []; //当前选中行的数据对象
        console.log(matchedRows)
        matchedRows.map( (item, index) => {
            rowsObj.push(
                {
                    rowIndex: item,
                    data: this.state.sortedDataList[item]
                }
            )
        });
        console.log(rowsObj)
        this.props.selectedRowsObjHandles(rowsObj);
        this.props.rowHandles('rowClick', rowsObj);
    };
    //双击展示详情
    onRowDoubleClick = (e, index) => {
        let isRowSingle = this.state.isRowSingle;//行是否单选
        let matchedRows = this.state.matchedRows;
        if(isRowSingle){//单选行
            let isHave = matchedRows.indexOf(index);
            if(isHave < 0){
                matchedRows.splice(0,1);
                matchedRows = matchedRows.concat(index);
            }
            this.setState({matchedRows: matchedRows});
        }else {//多选行
            let itemIndex = matchedRows.findIndex( (item) => {
                return item === index
            });
            if(itemIndex < 0){
                matchedRows = matchedRows.concat(index);
                matchedRows.sort( (a, b) => {
                    return a - b
                });
                this.setState({matchedRows: matchedRows});
            }
        }
        let rowsObj = []; //当前选中行的数据对象
        rowsObj.push(
            {
                rowIndex: index,
                data: this.state.sortedDataList[index]
            }
        );
        this.props.selectedRowsObjHandles(rowsObj);
        this.props.rowHandles('doubleClick', rowsObj);
    };

    rowClassNameGetter = (rowIndex) => {



        let matchedRows = this.state.matchedRows;
        // if (this.props.matchedRows){
        //     matchedRows=this.props.matchedRows
        //     let itemIndex = matchedRows.findIndex( (item) => {
        //         return item === rowIndex
        //     });
        //     if(itemIndex > -1){
        //         return 'active-row';
        //     }
        // }else {
            let itemIndex = matchedRows.findIndex( (item) => {
                return item === rowIndex
            });
            if(itemIndex > -1){
                return 'active-row';
            }
        // }








    };

    render() {
        let {containerHeight, containerWidth, subtractHeight, subtractWidth, ...props} = this.props;
        //subtractHeight 和 subtractWidth 是页面传过来的值
        if(typeof subtractHeight !== 'undefined'){
            containerHeight = containerHeight - subtractHeight;
        }
        if(typeof subtractWidth !== 'undefined'){
            containerWidth = containerWidth - subtractWidth;
        }
        let containerWidth_hide_left = containerWidth;
        //当左侧隐藏时，列表宽度加上左侧的宽度，
        // 当前this.props.isHideLeft 是从父组件ListBox传过来
        //this.props.isHideLeft 最顶级赋值是在页面 containers/Main/main.js
        if(this.state.isHideLeft){
            containerWidth_hide_left += 210;
        }


        let _tableColumnData = this.state.tableColumn;
        let tableColumnData = [];
        this.state.columnOrder.map( (columnKey) => { //根据拖拽后的列顺序（this.state.columnOrder）重新对传递过来的列顺序（this.props.tableColumnData）排序
            _tableColumnData.map( (e) => {
                if(e.columnName === columnKey){
                    tableColumnData.push(e);
                }
            });
        });

        let {sortedDataList, colSortDirs} = this.state;
        let rowOperation = this.props.rowOperation;
        let columnWidths = this.state.columnWidths;
        let spinLoading;
        //loading效果
        if(this.state.loading){
            sortedDataList = [];
            // spinLoading = <div style={{position: 'absolute', left: '0', right: '0', top: '40px', bottom: '0',borderRadius: '3px', paddingTop: '37px', marginLeft: '15px', width: containerWidth_hide_left, height:containerHeight + 40, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: '2'}}>
            //                     <Spin delay={500} tip="Loading..." style={{position: 'absolute', left: containerWidth_hide_left / 2, bottom: containerHeight / 2,zIndex: '2'}} size="large" />
            //              </div>
            spinLoading = <div style={{position: 'absolute', left: '0', right: '0', top: '0', bottom: '0',borderRadius: '3px', paddingTop: '37px', width: containerWidth_hide_left, height:containerHeight + 40, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: '2'}}>
                                <Spin delay={500} tip="Loading..." style={{position: 'absolute', left: containerWidth_hide_left / 2, bottom: containerHeight / 2,zIndex: '2'}} size="large" />
                            </div>
        }
        return (
            <div style={{position: 'relative'}}>
                {spinLoading}
                <Table
                    style={{fontSize:'12px'}}
                    rowHeight={30}
                    headerHeight={60}
                    rowsCount={sortedDataList.length}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    onColumnReorderEndCallback={this._onColumnReorderEndCallback}
                    isColumnReordering={false}
                    width={containerWidth_hide_left}
                    height={containerHeight}
                    onRowClick={this.onRowClick}
                    onRowDoubleClick={this.onRowDoubleClick}
                    rowClassNameGetter={this.rowClassNameGetter}
                    {...this.props}>

                    <Column
                        header={
                            <Cell>
                                <Icon onClick={this.showColumnConfig} style={{
                                    float: 'left',
                                    cursor: 'pointer',
                                    marginBottom: '10px',
                                    marginTop: '-15px'
                                }} type="filter"/>
                                <Icon onClick={this.selectAllRowClick} style={{float: 'left',cursor:'pointer',marginLeft:'7px', marginBottom: '10px', marginTop: '-15px'}} type="check" />
                                <Icon onClick={this.searchHandle} style={{float: 'left',clear:'both',cursor:'pointer'}} type="search" />
                                <Icon onClick={this.resetSearchHandle} style={{float: 'left',cursor:'pointer',marginLeft:'7px'}} type="reload" />


                            </Cell>
                        }
                        cell={({rowIndex}) => (<Cell>{rowIndex+1}</Cell>)}
                        fixed={true}
                        width={50}
                    />

                    {
                        tableColumnData.map((e, index) => {

                            if(!e.columnHidden){
                                return(
                                    <Column
                                        key={index}
                                        columnKey={e.columnName}
                                        header={
                                            <SortHeaderCell
                                                ref={"SortHeaderCell_" +　e.columnName}
                                                onSortChange={this._onSortChange}
                                                sortDir={colSortDirs[e.columnName]}
                                                searchComponentData = {this.searchComponentData}
                                                searchConditionCallback = {this.searchConditionCallback}
                                                clear={this.clear}
                                                conditionX={this.state.conditionX}
                                            >
                                                {e.showName}
                                            </SortHeaderCell>
                                        }
                                        cell={<TextCell showOption={e.showOption} data={sortedDataList} />}
                                        flexGrow={1}
                                        width={columnWidths[e.columnName]}
                                        isResizable={true}
                                        isReorderable={true}
                                        allowCellsRecycling={true}
                                    />
                                )
                            }
                        })              
                    }
                    {/*header={<Cell>{e.showName}</Cell>}*/}

                    {/*<Column*/}
                        {/*columnKey=""*/}
                        {/*header={<Cell>操作 <Icon onClick={this.showColumnConfig} style={{float: 'right',marginTop: '-10px'}} type="filter" /></Cell>}*/}
                        {/*cell={*/}
                            {/*({rowIndex}) => (*/}
                                {/*<Cell>*/}
                                    {/*{*/}
                                        {/*rowOperation.map( (e, index) => {*/}
                                            {/*return(*/}
                                                {/*<a key={index} onClick={this.rowHandles.bind(this, e.handleName, sortedDataList[rowIndex])} className={e.iconClass}></a>*/}
                                            {/*)*/}
                                        {/*})*/}
                                    {/*}*/}
                                {/*</Cell>*/}
                            {/*)*/}
                        {/*}*/}
                        {/*flexGrow={1}*/}
                        {/*width={rowOperation.length * 35}*/}
                        {/*rightFixed={true}*/}
                    {/*/>*/}
                </Table>
                <ColumnConfig ref="ColumnConfig" columnConfigCallBack={this.columnConfig} tableColumnData={this.props.tableColumnData}/>
            </div>
        );
    }
}

export default Dimensions({
    getHeight: function(element) {
        return window.innerHeight - 205;
    },
    getWidth: function(element) {
        let widthOffset = 230;
        return window.innerWidth - widthOffset;
    },
    //containerStyle: {marginLeft: 5, marginRight: 5} //, transitionProperty: 'width', transitionDuration: '0.5s', transitionTimingFunction:'linear'
})(FlexGrow);
