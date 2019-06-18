import React, { Component } from 'react'
import { Modal, Radio, Input } from 'antd';
const RadioGroup = Radio.Group;

export default class NumberOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            columnKey: '',
            maxName: '',    //最大值， 选择小于时使用；选择范围时大值使用
            minName: '',    //最小值， 选择大于时使用；选择范围时小值使用
            radioValue: 'gt',
            gt: '',
            eq: '',
            lt: '',
            bt1: '',
            bt2: ''
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
        let columnKey = this.state.columnKey;
        let radioValue = this.state.radioValue;
        let viewCondition;
        let searchCondition = {};
        searchCondition[this.state.columnKey] = '';
        searchCondition[this.state.minName] = '';
        searchCondition[this.state.maxName] = '';
        if(radioValue === 'gt'){
            let inputValue = this.state[radioValue];
            viewCondition = radioValue + ":" + inputValue;
            searchCondition[this.state.minName] = inputValue;
        }else if(radioValue === 'bt'){
            let bt1 = this.state.bt1;
            let bt2 = this.state.bt2;
            if( bt1 !=='' && bt2 !==''){
                viewCondition = radioValue + ":" + bt1 + "," +bt2;
                searchCondition[this.state.minName] = bt1;
                searchCondition[this.state.maxName] = bt2;
            }
        }else if(radioValue === 'lt'){
            let inputValue = this.state[radioValue];
            viewCondition = radioValue + ":" + inputValue;
            searchCondition[this.state.maxName] = inputValue;
        }else if(radioValue === 'eq'){
            let inputValue = this.state[radioValue];
            viewCondition = radioValue + ":" + inputValue;
            searchCondition[this.state.columnKey] = inputValue;
        }
        this.props.numberCallback(searchCondition, viewCondition);

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
    inputChangeHandle = (e) => {
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            let inputValue = e.target.value;
            let inputName = e.target.name;
            if(inputName === 'gt'){
                this.setState({
                    gt: inputValue
                });
            }else if(inputName === 'eq'){
                this.setState({
                    eq: inputValue
                });
            }else if(inputName === 'lt'){
                this.setState({
                    lt: inputValue
                });
            }else if(inputName === 'bt1'){
                this.setState({
                    bt1: inputValue
                });
            }else if(inputName === 'bt2'){
                this.setState({
                    bt2: inputValue
                });
            }
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
                    title="数字查询"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <RadioGroup onChange={this.onChange} value={this.state.radioValue}>
                        <Radio style={radioStyle} value="gt">大于<Input disabled={this.state.radioValue !== 'gt'} onChange={this.inputChangeHandle} name="gt" value={this.state.gt} placeholder="请输入数字" style={{ width: 200, marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="eq">等于<Input disabled={this.state.radioValue !== 'eq'} onChange={this.inputChangeHandle} name="eq" value={this.state.eq} placeholder="请输入数字" style={{ width: 200, marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="lt">小于<Input disabled={this.state.radioValue !== 'lt'} onChange={this.inputChangeHandle} name="lt" value={this.state.lt} placeholder="请输入数字" style={{ width: 200, marginLeft: 10 }} /></Radio>
                        <Radio style={radioStyle} value="bt">范围
                            <Input disabled={this.state.radioValue !== 'bt'}
                                   onChange={this.inputChangeHandle}
                                   name="bt1"
                                   value={this.state.bt1}
                                   placeholder="请输入数字"
                                   style={{ width: 200, marginLeft: 10 }} />
                            至
                            <Input disabled={this.state.radioValue !== 'bt'}
                                   onChange={this.inputChangeHandle}
                                   name="bt2"
                                   value={this.state.bt2}
                                   placeholder="请输入数字"
                                   style={{ width: 200, marginLeft: 10 }} />
                        </Radio>
                    </RadioGroup>
                </Modal>
            </div>
        )
    }
}
