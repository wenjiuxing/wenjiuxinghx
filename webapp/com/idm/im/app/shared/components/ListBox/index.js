import React, {Component} from 'react'
import FlexGrow from './List'
import Actions from '../../actions';
import {Pagination, Icon, Modal, Upload, Button,message} from 'antd';
import { fetchData } from '../../components/AjaxConsumer'
import styles from  './index.scss'

export default class ListBox extends Component {

    constructor(props) {
        super(props);
        this.pageNext = this.pageNext.bind(this);
        this.getListData = this.getListData.bind(this);
        this.hiddenBox = this.hiddenBox.bind(this);
        this.state = {
            loading: true,  //loading 加载
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 20, //每页显示的条数
            totalPage: 0,//总页数
            totalCount: 0, //总记录数
            formBoxStyleMin :'', //formbox的动画移动标识
            formBoxStyleHeight : '', //formbox的动画移动宽度
            conditonData: {},  //查询条件
            currentQuantity: 0,
            overdueAmount: 0,
            expiredQuantity: 0,
            currentTime: 0,
            overdueTime:0,
            expiredTime:0

        };
        this.selectedRowsObj = [];



    }

    componentWillMount() {
        this.getListData();
    }

    rowHandles = (strHandles) => {
        if(strHandles === "export"){
            this.props.rowHandles("export", this.state.conditonData);
        }else{
            this.props.rowHandles(strHandles, this.selectedRowsObj);
        }
    };
    selectedRowsObjHandles = (rowsObj) => {
        this.selectedRowsObj = rowsObj;
    };

    //获取数据
    getListData(num, pageSize, conditonData) {
        if(typeof(num) == "undefined" || num == null || num.length==0){
            num = this.state.current;
        }
        if(typeof(pageSize) == "undefined" || pageSize == null || pageSize.length==0){
            pageSize = this.state.pageSize;
        }
        if(typeof(conditonData) == "undefined" || conditonData == null || conditonData.length==0){
            conditonData = this.state.conditonData
        }else{
            //点击搜索，有查询条件，分页要重新从第一页开始
            num = 1;
            //保存查询条件
            this.setState({
                conditonData: conditonData
            });
        }

        //let conData = { page: num, rows: pageSize, condition: conditonData };
        //$.ajax({url: this.props.url,type: 'post',contentType:'application/json; charset=utf-8', dataType: 'json', data: JSON.stringify(conData) })
        // $.ajax({url: this.props.url,type: 'post', dataType: 'json', data: { page: num, rows: pageSize, ...conditonData } })
        //     .done(function (resData, status, xhr) {
        //         //console.log("getList返回数据：\n",JSON.stringify(resData, null, 4));
        //         if(resData.code == "1"){
        //             this.setState({
        //                 loading: false,
        //                 indexList: resData.data.records, //当前页面数据
        //                 totalCount: resData.data.totalCount, //总记录数
        //                 totalPage: resData.data.totalPage,//总页数
        //                 current: num, //当前页码
        //                 pageSize: pageSize, //每页显示的条数
        //             });
        //         }else{
        //             console.log("请求数据错误：", resData.message);
        //         }
        //     }.bind(this));

        const options= {
            url: this.props.url,
            type: 'post',
            condition:{
                page: num,
                rows: pageSize,
                ...conditonData
            }
        };
        fetchData(this, options, (resData) => {
            if(resData.code === "1"){
                this.setState({
                    loading: false,
                    indexList: resData.data.list, //当前页面数据
                    totalCount: resData.data.total, //总记录数
                    totalPage: resData.data.pages,//总页数
                    current: num, //当前页码
                    pageSize: pageSize, //每页显示的条数

                });
                // if(resData.data.list.length === 0){
                    // Modal.info({
                    //     title: '提示',
                    //     content: '没有匹配的数据',
                    // });
                // }
            }else{
                console.log("请求数据错误：", resData.message);
            }
        });

        if(this.props.flag) {

            const options = {
                url: this.props.url1,
                type: 'post',
                condition: {
                    ...conditonData
                }
            };
            console.log(this.props.url1)

            fetchData(this, options, (resData) => {
                console.log(resData)
                this.setState({
                    currentQuantity: resData.data.currentQuantity,
                    overdueAmount: resData.data.overdueAmount,
                    expiredQuantity: resData.data.expiredQuantity,

                    currentTime: resData.data.currentTime,
                    overdueTime: resData.data.overdueTime,
                    expiredTime: resData.data.expiredTime

                });

            });
        }

    }

    //刷新列表
    refreshHandle = () => {
        this.selectedRowsObj = [];//清空选中的行数据
        this.pageNext();
    };

    pageNext(num, pageSize, conditonData) {
        this.setState({
            loading: true
        });
        this.getListData(num, pageSize, conditonData);
    }

    hiddenBox(){
      let formBoxStyleMin = this.state.formBoxStyleMin;
      if (formBoxStyleMin == ''){
        formBoxStyleMin = 'formBoxStyleMin';
      } else {
        formBoxStyleMin = ''
      }
      this.setState({
        formBoxStyleMin :formBoxStyleMin
      })
    }

    componentDidMount() { //formbox高度
        // let height = window.getComputedStyle(this.refs.formBoxRef).height;
        // this.setState({
        //   formBoxStyleHeight:height
        // })

    }
    onPageChange = (pageNumber) => {
        this.pageNext(pageNumber);
        Actions.pageElementChange(); //创建监听，用来解决点击分页时把默认选中的数据去掉
        this.selectedRowsObj = [];//点击了分页，把当前选中的行数据清空
    };
    onShowSizeChange = (current, pageSize) => {
        this.pageNext(current, pageSize);
        Actions.pageElementChange();    //创建监听，用来解决点击分页时把默认选中的数据去掉
        this.selectedRowsObj = [];//点击了分页，把当前选中的行数据清空
    };

    postParam =()=>{
       this.refs.flexGrow.searchHandle

    }


    render() {
        //当左侧隐藏时，列表宽度加上左侧的宽度，
        //1、当前this.props.isHideLeft 是从父组件listComponent传过来
        //2、this.props.isHideLeft 最顶级赋值是在页面 containers/Main/main.js
        let isHideLeft = this.props.isHideLeft;

        let formBoxStyleHeight = this.state.formBoxStyleHeight;
        let formBoxStyleMin = this.state.formBoxStyleMin;
        let divStyle = {};
        if (formBoxStyleMin){
          divStyle = {
              //height: '33px',
              height: '0px',
              transition: 'all 0.5s linear',
              overflowY: 'auto',
              overflowX: 'hidden'
          };
        } else {
          divStyle = {
              //height: formBoxStyleHeight,
              height: '90px',
              transition: 'all 0.5s linear',
              overflowY: 'auto',
              overflowX: 'hidden'
          };
        }
        let headerOperation = this.props.headerOperation;
        let spandiv;
        if(this.props.flag){
            spandiv=

            <span>&emsp;
                <a name="currentTime" >应排订单数量：{this.state.currentQuantity}条</a>
                &emsp; &emsp;
                <a name="overdueTime" onClick={this.postParam}>延期订单数量：{this.state.overdueAmount}条</a>
                &emsp; &emsp;
                <a name="expiredTime" onClick={this.postParam}>过期订单数量：{this.state.expiredQuantity}条</a>
            </span>
        }

        return (
            <div className="wrap" style={{fontSize:'12px'}}>
              {/*<div className={'formBoxStyle '+formBoxStyleMin} ref='formBoxRef'  >*/}
                {/*<div className='formTitle'>*/}
                  {/*<span className='left'>查询条件</span>*/}
                  {/*<span className='right'>*/}
                    {/*<i className="slidUp" onClick={this.hiddenBox}></i>*/}
                    {/*/!*<i className="slidDown"></i>*!/*/}
                  {/*</span>*/}
                {/*</div>*/}
                  {/*<div className="listSearch"  style={divStyle}>*/}
                    {/*<WrappedAdvancedSearchForm*/}
                        {/*formAlerSize='big'*/}
                        {/*formUrl=""*/}
                        {/*getFormData={this.props.searchComponentData}*/}
                        {/*pageNext={this.pageNext}*/}
                    {/*/>*/}
                  {/*</div>*/}
              {/*</div>*/}
              <div className='formBoxStyle'>
                  <div className='formTitle'>
                      <span className='left'>{this.props.title? this.props.title : "数据列表"}:</span>
                      <span className='right'>
                          {
                              headerOperation.map( (e, index) => {
                                  if(e.handleName === 'imports'){
                                      const props = {
                                          name: 'file',
                                          action: e.action,
                                          onChange(info) {
                                              if (info.file.status !== 'uploading') {
                                                  console.log(info.file, info.fileList);
                                              }
                                              if (info.file.status === 'done') {
                                                  message.success(`${info.file.name} 上传成功`);
                                              } else if (info.file.status === 'error') {
                                                  message.error(`${info.file.name} 上传失败`);
                                              }
                                          },
                                      };
                                      return(
                                          <Upload {...props}>
                                              <Button>
                                                  <Icon type="upload" />{e.showName}
                                              </Button>
                                          </Upload>
                                      )
                                  }
                                  else{
                                      let exOrImStyle;
                                      // if (e.handleName == 'export' || e.handleName == 'import') {
                                      //     exOrImStyle = "exOrIm";
                                      // }
                                      return(
                                          <a
                                              key={index}
                                              className={'mr-10 changeWordStyle tableAction ' + exOrImStyle}
                                              onClick={this.rowHandles.bind(this, e.handleName)}
                                          >
                                              <Icon style={{marginRight: '5px'}}
                                                    type={e.iconClass ? e.iconClass : 'tags-o'}/>
                                              {e.showName}
                                          </a>
                                      )
                                  }


                              })
                          }

                      </span>
                  </div>
                  <div>
                      {
                          spandiv
                      }

                  </div>
                  <FlexGrow
                        {...this.props}
                        ref = 'flexGrow'
                        loading = {this.state.loading}
                        indexList={this.state.indexList}
                        pageNext={this.pageNext}
                        selectedRowsObjHandles={this.selectedRowsObjHandles}
                        pageSize = {this.state.indexList.length}

                  />

                  {/*<PageButton { ...this.state } pageNext={this.pageNext}/>*/}

                  <div className={styles.page}>
                      <Pagination
                          showSizeChanger
                          onShowSizeChange={this.onShowSizeChange}
                          showQuickJumper
                          defaultCurrent={1}
                          defaultPageSize={20}
                          pageSizeOptions={["50","100","1000","2000","3000"]}
                          total={this.state.totalCount}
                          onChange={this.onPageChange}
                          current = {this.state.current}
                      />
                      <span className={styles.totalCount}>共 {this.state.totalCount} 条</span>
                  </div>
              </div>
            </div>
        );
    }
}
