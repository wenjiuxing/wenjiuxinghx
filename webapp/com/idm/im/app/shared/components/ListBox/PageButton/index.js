import React, {Component} from 'react'
import styles from  './index.scss'

export default class PageButton extends Component {

    constructor(props) {
        super(props);
        this.setNext = this.setNext.bind(this);
        this.setUp = this.setUp.bind(this);
        this.setPageNum = this.setPageNum.bind(this);
        this.goFirst = this.goFirst.bind(this);
        this.goLast = this.goLast.bind(this);
        this.selectPageSize = this.selectPageSize.bind(this);
        this.state = {
            pageSize: this.props.pageSize, //一页显示多少条
            goPageNum: this.props.current //要去的页码
        }
    }

    //下一页
    setNext() {
        if (this.state.goPageNum < this.props.totalPage) {
            this.setState({
                goPageNum: this.props.current + 1
            }, function () {
                this.props.pageNext(this.state.goPageNum, this.state.pageSize)  //要去页码,跳转到第几页
            })
        }
    }

    //上一页
    setUp() {
        if (this.state.goPageNum > 1) {
            this.setState({
                goPageNum: this.props.current - 1
            }, function () {
                this.props.pageNext(this.state.goPageNum, this.state.pageSize)
            })
        }
    }

    //跳转到第一页
    goFirst() {
        this.setState({goPageNum: 1});
        this.props.pageNext(1, this.state.pageSize);
    }

    //跳转到最后一页
    goLast() {
        this.setState({goPageNum: this.props.totalPage});
        this.props.pageNext(this.props.totalPage, this.state.pageSize);
    }

    //输入页数跳转
    setPageNum(event) {
        this.setState({goPageNum: event.target.value});
        this.props.pageNext(event.target.value, this.state.pageSize);
    }

    //选择一页显示多少条
    selectPageSize(event) {
        this.setState({goPageNum: 1, pageSize: event.target.value});
        this.props.pageNext(1, event.target.value);
    }

    render() {
        //当前页开始条数
        let currentStartNum = (this.state.goPageNum - 1) * this.props.pageSize + 1;
        //当前页结束条数
        let currentEndNum = this.state.goPageNum * this.props.pageSize;
        //总记录数
        let totalCount = this.props.totalCount;
        return (
            <div className={styles.page}>
                <ul className={styles.pageDomain}>
                    <li className={styles.pageFirst} onClick={ this.goFirst }></li>
                    <li className={styles.pagePre} onClick={ this.setUp }></li>
                    <li className={styles.pageNum}>
                        <input type="text" className={styles.pageCurrent} onChange={this.setPageNum} value={this.props.current} />
                        <span>共{ this.props.totalPage }页</span></li>
                    <li className={styles.pageNext} onClick={ this.setNext }></li>
                    <li className={styles.pageLast} onClick={ this.goLast }></li>
                    <li className={styles.pageSetSize}>
                        <select defaultValue={this.state.pageSize} onChange={this.selectPageSize}  className={styles.pageSelectSize}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </li>
                </ul>
                <div className={styles.pageInfo}>{currentStartNum} - {currentEndNum} 共 {totalCount} 条</div>
            </div>
        );
    }
}