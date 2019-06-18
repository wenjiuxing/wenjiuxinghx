import React, { Component } from 'react'
import { fetchData } from '../../../../components/AjaxConsumer'

export default class SelectDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            selectOption: []
        };
        this.columnKey = this.props.name;
    }
    componentDidMount(){
        this.getListData(this.props.conditonData);
    }
    //获取数据
    getListData(conditonData) {
        const options= {
            url: this.props.url,
            type: 'get',
            condition:{
                ...conditonData
            }
        };
        fetchData(this, options, (resData) => {
            if(resData.code == "1"){
                this.setState({
                    selectOption: resData.data,
                });
            }else{
                console.log("请求数据错误：", resData.message);
            }
        });
    }

    onChange = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        let condition = [];
        condition[inputName] = inputValue;
        this.props.selectDynamicCallback(condition);
        this.setState({
            value: inputValue
        });
    }

    componentWillReceiveProps(nextProps) {
        let valueDynamic = nextProps.valueDynamic;
        if(!valueDynamic){
            this.setState({
                value: ''
            });
        }
    }

    render() {
        let selectOption = this.state.selectOption;
        if(selectOption===null || selectOption.length<0){
            selectOption = [];
        }
        const optionItem = selectOption.map( (e, index) => {
            return <option key={index} value={e.dicCode}>{e.dicName}</option>
        });

        return(
            <select onChange={this.onChange} name={this.columnKey} value={this.state.value} style={{width: this.props.entryWidth, height: 25}}>
                <option value=""></option>
                {optionItem}
            </select>
        )
    }
}
