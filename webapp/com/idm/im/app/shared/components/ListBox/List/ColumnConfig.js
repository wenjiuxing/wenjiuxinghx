import React, { Component } from 'react'
import { Modal, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const storage = window.localStorage;//本地存储

export default class ColumnConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            options: [],

            checkedList: [],
            indeterminate: false,
            checkAll: false,
        };
        //本地存储Key值
        this.storageKey = this.props.tableColumnData.storageKey;
    }
    componentDidMount(){
        let tableColumnData = this.props.tableColumnData.data;
        let options = [];
        tableColumnData.map( (e) => {
            if(!e.foreverHidden){
                options.push({label: e.showName, value: e.columnName});
            }
        });

        let tableColumnConfig = storage.getItem(this.storageKey);
        if(tableColumnConfig != null){
            let checkedArr = tableColumnConfig.split(",");
            this.setState({
                options: options,
                checkedList: checkedArr,
                indeterminate: !!checkedArr.length && (checkedArr.length < options.length),
                checkAll: checkedArr.length === options.length,
            });
        }else{
            this.setState({options: options});
        }

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
        //本地存储，保存设置的值
        //let storageKey = this.props.tableColumnData.storageKey;
        storage.setItem(this.storageKey,this.state.checkedList);

        this.props.columnConfigCallBack(this.state.checkedList);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    onChange = (checkedValues) => {
        //console.log('checkedValues ======= ', checkedValues);
        this.setState({
            checkedList: checkedValues,
            indeterminate: !!checkedValues.length && (checkedValues.length < this.state.options.length),
            checkAll: checkedValues.length === this.state.options.length,
        });
    }
    onCheckAllChange = (e) => {
        let tableColumnData = this.props.tableColumnData.data;
        let options = [];
        tableColumnData.map( (e) => {
            if(!e.foreverHidden){
                options.push(e.columnName);
            }
        });

        this.setState({
            checkedList: e.target.checked ? options : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    render() {
        return(
            <div>
                <Modal
                    title="显示列配置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <div style={{ borderBottom: '1px solid #E9E9E9',marginBottom: '10px' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全选
                        </Checkbox>
                    </div>
                    <div className="columnConfig">
                        <CheckboxGroup options={this.state.options} value={this.state.checkedList}  onChange={this.onChange} />
                    </div>
                    {/* defaultValue={[]}*/}
                </Modal>
            </div>
        )
    }
}
