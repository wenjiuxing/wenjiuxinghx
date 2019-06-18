import React, { Component } from 'react'
import {  ButtonComponent, SearchInputComponent, SearchSelectComponent } from '../../../components'
import {Treebeard} from 'react-treebeard';

export default class Page3 extends Component {
  constructor(props){
        super(props);
        this.state = {
          searchDataCondition: []
        };
        this.changeSidVal = this.changeSidVal.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    changeSidVal(e){
      let conditionName = e.target.name;
      let conditionValue = e.target.value;
      let conditonData = this.state.conditonData;
      conditonData[conditionName] = conditionValue;
      this.setState({
        searchDataCondition: conditonData
      })
    }
    handleClick(){
      let conditonData = this.state.conditonData;
      this.props.pageNext(null,null,conditonData)
    }

    componentDidMount(){
      // window.removeEventListener('resize', this.onWindowResize)
      let searchComponentData = this.props.searchComponentData;
      let conditonData = {};
      searchComponentData.map((e,index)=>{
        conditonData[e.name]=''
      })
      this.setState({
        conditonData:conditonData
      })
    }
    render() {

        let sId = this.state.sId;
        let searchComponentData = this.props.searchComponentData;

        return(
            <div>
                {
                    searchComponentData.map((e, index) => {
                        {
                            if (e.type == 'input') {
                                return (
                                    <SearchInputComponent key={index}
                                                            name={e.name}
                                                            labelName={e.decName + ':'}
                                                            changeVal={this.changeSidVal.bind(this)}
                                    />
                                )
                            } else if (e.type == 'select') {
                                //有url去请求url中的下拉选项进行动态渲染
                                if (e.url) {
                                    return (
                                        <SearchSelectComponent key={index}
                                                               url={e.url}
                                                               name={e.name}
                                                               labelName={e.decName + ':'}
                                                               changeVal={this.changeSidVal.bind(this)}
                                        />
                                    )
                                } else {
                                    //渲染固定下拉选项
                                    return (
                                        <SearchSelectComponent key={index}
                                                               labelName={e.decName + ':'}
                                                               optionData={e.content}
                                                               changeVal={this.changeSidVal.bind(this)}
                                        />
                                    )
                                }
                            }
                        }
                    })
                }
                <ButtonComponent txt='搜索' buttonClick={this.handleClick}/>
            </div>
        )
    }
}
