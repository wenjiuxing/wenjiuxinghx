import React, {Component} from 'react'
import {Table, Column, Cell} from 'fixed-data-table-2'
import NumberOption from './SearchOption/NumberOption'
import DateOption from './SearchOption/DateOption'
import SelectDynamic from './SearchOption/SelectDynamic'
import { Input, Icon } from 'antd';

//排序选项
const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};
//排序组件
export default class SortHeaderCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }
    _onSortChange = (e) => {
        e.preventDefault();

        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.props.sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
            );
        }
    };
    resetHandle = () => {
        console.log("重置表单");
        this.setState({
            value: ''
        });
        this.props.clear();
    };
    //input框事件
    inputChangeHandle = (e) => {
        let inputValue_1 = e.target.value;
        let inputValue = inputValue_1.replace(/(^\s*)|(\s*$)/g, "");
        let inputName = e.target.name;
        let condition = [];
        condition[inputName] = inputValue;
        this.props.searchConditionCallback(condition);
       // console.log("condition",condition)
        this.setState({
            value: inputValue
        });
    };
  
    componentWillMount(){
     //this.inputChangeHandle();
     var conditionX=this.props.conditionX
     var columnKey=this.props.columnKey
     
        //console.log("X?",conditionX)

     for(var x in conditionX){//对比拼装显示数据初始化赋值
        //console.log("X?",conditionX[x])
            if(x==columnKey){
                this.state.value=conditionX[columnKey]
            }
       }

    }

    //下拉事件
    selectChangeHandle = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        let condition = [];
        condition[inputName] = inputValue;
        this.props.searchConditionCallback(condition);
        this.setState({
            value: inputValue
        });
    };
    //动态获取内容的select下拉框
    selectDynamicCallback = (condition) => {
        this.props.searchConditionCallback(condition);
        this.setState({
            value: '123123', //不为空就行
        });
    };
    //数字类型查询条件
    showNumberOption = (searchColumnItem) => {
        this.refs.NumberOption.showModal(searchColumnItem);
    };
    numberCallback = (searchCondition, viewCondition) => {
        this.setState({
            value: viewCondition
        });
        this.props.searchConditionCallback(searchCondition);
    };
    //时间类型查询条件
    showDateOption = (searchColumnItem) => {
        this.refs.DateOption.showModal(searchColumnItem);
    };
    dateCallback = (searchCondition, viewCondition) => {
        this.setState({
            value: viewCondition
        });
        var markDate=1;
        this.props.searchConditionCallback(searchCondition,markDate,this.props.columnKey);
    };

    render() {
        let {sortDir, children, columnKey, width, searchComponentData,conditionX} = this.props;
        let columnItem = searchComponentData.filter( (item) => {
            return item.name === columnKey;
        });
        const entryWidth = width - 50;
        let searchEntry;
        if(columnItem.length > 0 ){
            let entryType = columnItem[0].type;
            if(entryType === 'input'){
                searchEntry = <input type="text" onChange={this.inputChangeHandle} name={columnKey} value={this.state.value} style={{width: entryWidth, height: 28}} />
            }else if(entryType === 'date'){
                //searchEntry = <input type="text" onClick={this.showDateOption.bind(this, columnKey)} name={columnKey} value={this.state.value}  style={{width: entryWidth}} />
                searchEntry = <Input type="text"
                                     suffix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0, 0.43)'}} onClick={this.showDateOption.bind(this, columnItem[0])}/>}
                                     onClick={this.showDateOption.bind(this, columnItem[0])}
                                     name={columnKey}
                                     value={this.state.value}
                                     style={{width: entryWidth, height: 28}}
                                     onChange={this.dateChangeHandle} 
                            />
            }else if(entryType === 'number'){
                searchEntry = <input type="text" onClick={this.showNumberOption.bind(this, columnItem[0])} name={columnKey} value={this.state.value}  style={{width: entryWidth, height: 28}} />
            }else if(entryType === 'select'){
                let url = columnItem[0].url;
                if(url){//配置了url，动态去取下拉框内容
                    searchEntry = <SelectDynamic
                        url={url}
                        conditonData={ columnItem[0].condition }
                        name={columnKey}
                        valueDynamic={this.state.value}
                        selectDynamicCallback = {this.selectDynamicCallback}
                        entryWidth = {entryWidth}
                        style={{height: 28}}
                    />

                }else{//使用静态下拉内容
                    let optionList = columnItem[0].optionList;
                    const optionItem = optionList.map( (e, index) => {
                        return <option key={index} value={e.optionKey}>{e.optionShow}</option>
                    });
                    searchEntry = (
                        <select onChange={this.selectChangeHandle} name={columnKey} value={this.state.value} style={{width: entryWidth, height: 28}}>
                            {optionItem}
                        </select>
                    )
                }

            }else if(entryType === 'disabled') {
                searchEntry = <input type="text" disabled="disabled" name={columnKey} style={{width: entryWidth, height: 28}}/>
            }
        }else{
            searchEntry = <input type="text" onChange={this.inputChangeHandle} name={columnKey} value={this.state.value}  style={{width: entryWidth, height: 28}} />
        }
        return (
            <div>
                <Cell>
                    <a style={{paddingLeft: '10px'}} onClick={this._onSortChange}>
                        {children} {sortDir ? (sortDir === SortTypes.DESC ? '↑' : '↓') : ''}
                    </a>
                    <br/>
                    {searchEntry}
                </Cell>
                <NumberOption ref="NumberOption" numberCallback={this.numberCallback}  />
                <DateOption ref="DateOption" dateCallback={this.dateCallback}  />

            </div>
        );
    }
}