import React, { Component } from 'react'
import { Modal, Radio, Input } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;

export default class DateOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            options: [],

            columnKey: '',
            maxName: '',    //最大值， 选择小于时使用；选择范围时大值使用
            minName: '',    //最小值， 选择大于时使用；选择范围时小值使用
            radioValue: 'gt',
            gt: '',
            bt: '',
            lt: '',
            eq: ''
        };
    }
    componentDidMount(){

    }

    showModal = (searchColumnItem) => {
        this.setState({
            visible: true,
            columnKey: searchColumnItem.name,
            maxName: searchColumnItem.maxName,
            minName: searchColumnItem.minName,
        });
    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
        let radioValue = this.state.radioValue;
        let inputValue = this.state[radioValue];
        let viewCondition = radioValue + ":" + inputValue;
        let searchCondition = {};

        Date.prototype.format = function (format) {
            var args = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
        };

        searchCondition[this.state.columnKey] =viewCondition;
        searchCondition[this.state.minName] = '';
        searchCondition[this.state.maxName] = '';
        if(radioValue === 'gt'){
            //大于  当天加23:59:59 查询第二天以后的
             inputValue=new Date(inputValue);
            //   inputValue.setDate(inputValue.getDate()-1)
             inputValue=inputValue.format("yyyy-MM-dd");         
             inputValue=inputValue+" 23:59:59"
 
             searchCondition[this.state.minName] = inputValue;
         }else if(radioValue === 'bt'){
             if(inputValue!= '' && inputValue!=null && typeof inputValue != 'undefined'){
                 //之间  min减一天加23:59:59  max加一天加00:00:00 查询输入两天之间包括两天
                 let minInputValue=new Date(inputValue[0]);
                 minInputValue.setDate(minInputValue.getDate()-1)
                 minInputValue=minInputValue.format("yyyy-MM-dd");
                 minInputValue=minInputValue+" 23:59:59"
             
                 searchCondition[this.state.minName] = minInputValue;
                 // searchCondition[this.state.minName] = inputValue[0];
 
                 let maxInputValue=new Date(inputValue[1]);
                 maxInputValue.setDate(maxInputValue.getDate()+1)
                 maxInputValue=maxInputValue.format("yyyy-MM-dd");
                 maxInputValue=maxInputValue+" 00:00:00"
 
                 searchCondition[this.state.maxName] = maxInputValue;
                // searchCondition[this.state.maxName] = inputValue[1];
             }
         }else if(radioValue === 'lt'){
             //小于  当天加00:00:00 查询输入天数之前
             inputValue=new Date(inputValue);
             inputValue=inputValue.format("yyyy-MM-dd");         
             inputValue=inputValue+" 00:00:00"
 
             searchCondition[this.state.maxName] = inputValue;
         }else if(radioValue === 'eq'){
             //等于  min减一天加23:59:59  max加一天加00:00:00 查询输入当天
             let minInputValue=new Date(inputValue);
             minInputValue.setDate(minInputValue.getDate()-1)
             minInputValue=minInputValue.format("yyyy-MM-dd");
             minInputValue=minInputValue+" 23:59:59"
         
             searchCondition[this.state.minName] = minInputValue;
 
             let maxInputValue=new Date(inputValue);
             maxInputValue.setDate(maxInputValue.getDate()+1)
             maxInputValue=maxInputValue.format("yyyy-MM-dd");
             maxInputValue=maxInputValue+" 00:00:00"
 
             searchCondition[this.state.maxName] = maxInputValue;         
             // searchCondition[this.state.columnKey] = inputValue;
         }
         this.props.dateCallback(searchCondition, viewCondition);
     }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    onChange = (e) => {
        this.setState({
            radioValue: e.target.value,
        });
    }
    onDateChange = (type, date, dateString) => {
        if(type === 'gt'){
            this.setState({
                gt: dateString
            });
        }else if(type === 'bt'){
            this.setState({
                bt: dateString
            });
        }else if(type === 'lt'){
            this.setState({
                lt: dateString
            });
        }else if(type === 'eq'){
            this.setState({
                eq: dateString
            });
        }
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
        };
        //eq相等 ne、neq不相等， gt大于， lt小于 gte、ge大于等于 lte、le 小于等于 not非 mod求模 等
        return(
            <div>
                <Modal
                    title="时间查询"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <RadioGroup onChange={this.onChange} value={this.state.radioValue}>
                        <Radio style={radioStyle} value="gt">大于<DatePicker size="large" allowClear={false} format="YYYY-MM-DD" disabled={this.state.radioValue !== 'gt'} onChange={this.onDateChange.bind(this, 'gt')} style={{ marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="bt">之间<RangePicker size="large" allowClear={false} format="YYYY-MM-DD" disabled={this.state.radioValue !== 'bt'} onChange={this.onDateChange.bind(this, 'bt')} style={{ marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="lt">小于<DatePicker size="large" allowClear={false} format="YYYY-MM-DD" disabled={this.state.radioValue !== 'lt'} onChange={this.onDateChange.bind(this, 'lt')} style={{ marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="eq">等于<DatePicker size="large" allowClear={false} format="YYYY-MM-DD" disabled={this.state.radioValue !== 'eq'} onChange={this.onDateChange.bind(this, 'eq')} style={{ marginLeft: 10 }} /></Radio>
                    </RadioGroup>
                </Modal>
            </div>
        )
    }
}
