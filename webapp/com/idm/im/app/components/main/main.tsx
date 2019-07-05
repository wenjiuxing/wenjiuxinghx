import * as React from 'react';
import { Route, BrowserRouter, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import { mainService } from './mainService'
import { Row, Col, Modal } from 'antd';
// 引入 ECharts 主模块
// 引入 ECharts 主模块(这里路径引入错误参考上文文档描述)
import * as echarts from 'echarts/lib/echarts';

// 引入柱状图（这里放你需要使用的echarts类型 很重要）
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { url } from 'inspector';
const backgroudn = require('../../../static/images/004.jpg')
const backgroudntL = require('../../../static/images/005.jpg')
const backgroudntR = require('../../../static/images/006.jpg')
const cad = require('../../../static/images/010.png')
const img002 = require('../../../static/images/002.png')
export interface Props {

}

export default class Main extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }


    componentDidMount() {
        this.GetmenuDayDate()
        this.GetmenuWeekDate()
        this.GetmenuYearMonth()
        this.getNumber()
        document.getElementById('possidiv').setAttribute('style', 'display:none')
        //获取日期
        let date = new Date();
        let seperator1 = "/";
        let year = date.getFullYear();
        let month: any = date.getMonth() + 1;
        let strDate: any = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let days: any = date.getDay();

        switch (days) {
            case 1:
                days = '星期一';
                break;
            case 2:
                days = '星期二';
                break;
            case 3:
                days = '星期三';
                break;
            case 4:
                days = '星期四';
                break;
            case 5:
                days = '星期五';
                break;
            case 6:
                days = '星期六';
                break;
            case 0:
                days = '星期日';
                break;

        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        this.setState({
            time: currentdate,
            days: days
        })
        //循环时间
        setInterval(this.timeChange, 1000)

        //柱状图
        // 基于准备好的dom，初始化echarts实例
        console.log(echarts)


      

    }
    state: any = {
        visible: false,
        time: '',
        days: "",
        date: '',
        carNum: {
            waitInit: 810,
            waitRead: 0,
            initOver: 0,
            waitOut: 0,
            amount: 0,
            outHover: 0
        }
    };
    getNumber = () => {
        mainService.GetmenuBynumber().then((res: any) => {
            let data = res.data
            this.setState({
                carNum: {
                    waitInit: data.waitInStorageCount,
                    waitRead: data.prepareCarCount,
                    initOver: data.inventoryCarCount,
                    waitOut: data.waitOutStorageCount,
                    amount: data.countIn,
                    outHover: data.countOut
                }
            })
            console.log(res)
        }).then((error) => {
            console.log(error)
        })
    }
    //执行时间
    timeChange = () => {
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        let currentdate = date.getHours() + seperator2 + minute
            + seperator2 + Seconds;
        this.setState({
            date: currentdate
        })


    }
    //获取年月报表
    GetmenuYearMonth = () => {
        mainService.GetmenuYearMonth().then((res: any) => {
            console.log(res)

            let myChart: any = echarts.init(document.getElementById('main'));
            // 绘制图表

            //柱状图
            let option: any = {
                color: ['#24ACF2', '#006699', '#4cabce'],

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['库存量', '入库量', '出库量'],
                    textStyle: {
                        color: 'white'
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        // data: [{ value: '2012', textStyle: { color: 'white' } }, { value: '2013', textStyle: { color: 'white' } }, { value: '2014', textStyle: { color: 'white' } }, { value: '2015', textStyle: { color: 'white' } }, { value: '2016', textStyle: { color: 'white' } }],
                        data: res.data.time,
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '库存量',
                        type: 'bar',
                        barGap: 0,

                        data: res.data.inventory
                    },
                    {
                        name: '入库量',
                        type: 'bar',

                        data: res.data.inStorage
                    },
                    {
                        name: '出库量',
                        type: 'bar',

                        data: res.data.outStorage
                    },

                ]
            };
            myChart.setOption(option);
            window.onresize = myChart.resize
        })
    }
    GetmenuWeekDate = () => {
        mainService.GetmenuWeekDate().then((res: any) => {
            //堆叠图
            let myChartLine: any = echarts.init(document.getElementById('mainLine'));
            let optionline: any = {
                title: {

                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['库存量', '入库量', '出库量'],
                    textStyle: {
                        color: 'white'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        //  data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        data: res.data.time,
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '库存量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.data.inventory
                    },
                    {
                        name: '入库量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.data.inStorage
                    },
                    {
                        name: '出库量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: res.data.outStorage
                    }


                ]
            };
            myChartLine.setOption(optionline);
            window.onresize = myChartLine.resize
        })
    }
    GetmenuDayDate=()=>{
        mainService.GetmenuDayDate().then((res:any)=>{
  //当年每周统计图
  let myChartall: any = echarts.init(document.getElementById('mainall'));
  let optionall: any = {
      title: {

      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data: ['库存量', '入库量', '出库量'],
          textStyle: {
              color: 'white'
          }
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              data: res.data.time,
              axisLine: {
                  lineStyle: {
                      color: 'white'
                  }
              }
          }
      ],
      yAxis: [
          {
              type: 'value',
              axisLine: {
                  lineStyle: {
                      color: 'white'
                  }
              }
          }
      ],
      series: [
          {
              name: '库存量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: res.data.inventory
          },
          {
              name: '入库量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: res.data.inStorage
          },
          {
              name: '出库量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: res.data.outStorage
          },


      ]
  };
  myChartall.setOption(optionall);
  window.onresize = myChartall.resize
        })
    }
    visableT = (t) => {
        this.setState({
            visible: t
        })
    }


    render() {



        return (

            <div className="gutter-example" id="main_DIV">
                <div className='back_div'>
                    <div className='head_div' style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '88%' }}>
                            <div className='timeP' style={{ fontWeight: 'bold', fontSize: '1em', marginBottom: '-10px', marginTop: '10px' }}>{this.state.date}   </div>
                            <div className='timeP' style={{ marginLeft: '1.5em', fontSize: '0.5em' }}> {this.state.time}<br />
                                {this.state.days}
                            </div>
                        </div>
                        <h1 className='h_1' >海印库车辆库位管理</h1>
                    </div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">
                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>待入库车辆</p>
                                <p className='p_second'>{this.state.carNum.waitInit}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">
                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>待备车车辆</p>
                                <p className='p_second'>{this.state.carNum.waitRead}</p>
                            </div>
                        </Col>
                       
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">

                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>库存台数</p>
                                <p className='p_second'>{this.state.carNum.initOver}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">
                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>待出库车辆</p>
                                <p className='p_second'> {this.state.carNum.waitOut}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">
                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>累计入库台数</p>
                                <p className='p_second'>{this.state.carNum.amount}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box backGutter">
                                <img src={img002} width="100%" height='100px' alt="" />
                                <p>累计出库台数</p>
                                <p className='p_second'>{this.state.carNum.outHover}</p>
                            </div>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row main_div" span={14}>
                            <div className="gutter-box">
                                <Col className='gutter-row' span={24} style={{ border: '1px solid #144E70', minHeight: '300px' }}>
                                    <Col span={15} style={{ margin: '20px' }} >
                                        <img src={cad} onDoubleClick={() => this.visableT(true)} style={{ float: 'left' }} width='100%' alt="" />
                                    </Col>
                                    <Col span={6} style={{ marginTop: '100px' }} >
                                        <div style={{ display: 'inline-block', width: '10px', height: '10px', background: '#0340FF', borderRadius: '10px', marginRight: '10px' }}></div>
                                        <span >常规库存车</span>
                                        <br />
                                        <div style={{ display: 'inline-block', width: '10px', height: '10px', background: 'green', borderRadius: '10px', marginRight: '10px' }}></div>
                                        <span >待备车车辆</span>
                                        <br />
                                        <div style={{ display: 'inline-block', width: '10px', height: '10px', background: 'red', borderRadius: '10px', marginRight: '10px' }}></div>
                                        <span >待出库车辆</span>
                                    </Col>
                                </Col>
                                <Col className='gutter-row' span={24} style={{ marginTop: '20px', border: '1px solid #144E70', }}>
                                    <Col className='gutter-row' span={12} >
                                        <h3 style={{ textAlign: 'center', color: 'white' }}>当月作业统计</h3>
                                        <div id="main" style={{ width: '100%', height: '200px' }} ></div>
                                    </Col>
                                    <Col className='gutter-row' span={12} >
                                        <h3 style={{ textAlign: 'center', color: 'white' }}>当年作业每月统计</h3>
                                        <div id="mainLine" style={{ width: '100%', height: '200px' }} ></div>
                                    </Col>
                                    <Col className='gutter-row' span={24} >
                                        <h3 style={{ textAlign: 'center', color: 'white' }}>当年每周作业统计</h3>
                                        <div id="mainall" style={{ width: '100%', height: '200px' }} ></div>
                                    </Col>
                                </Col>
                            </div>
                        </Col>
                        <Col className="gutter-row main_div" span={10}>
                            <div className="gutter-box" style={{ minHeight: '810px', border: '1px solid #144E70' }}>
                                <h3 className='h3_see'>实时监控</h3>
                                <Col className="gutter-row  backIMG" span={24}>
                                    <img src={backgroudn} width='90%' alt="" />
                                </Col>
                                <Col className="gutter-row backIMG" span={12}>
                                    <img src={backgroudntL} width='80%' height='200px' alt="" />
                                </Col>
                                <Col className="gutter-row backIMG" span={12}>
                                    <img src={backgroudntR} width='80%' height='200px' alt="" />
                                </Col>
                                <Col className="gutter-row backIMG" span={12}>
                                    <img src={backgroudntL} width='80%' height='200px' alt="" />
                                </Col>
                                <Col className="gutter-row backIMG " span={12}>
                                    <img src={backgroudntR} width='80%' height='200px' alt="" />
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    width="500"
                    onCancel={() => this.visableT(false)}
                    visible={this.state.visible}
                    footer={null}
                >
                    <img src={cad} width="100%" alt="" />
                </Modal>
            </div >

        );
    }
}


