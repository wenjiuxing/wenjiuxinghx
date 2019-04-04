
import React from 'react';
import FooterView from '@/layouts/Footer';
import { connect } from 'dva';


@connect(({test,loading})=>({
  test,
  loading: loading.models.test}
))



class Contacts extends React.Component { 
    constructor(props) {
        super(props);
        this.state={
        
        }
      }

    componentDidMount(){
      
    }
    
      stateChange=()=>{
        const { dispatch} = this.props;
       
        dispatch({
          type:'test/name',
        })
     
      }
        

    render() {
      console.log(this.props)
      
     
      const {test}=this.props
      return (
       
        <div onClick={this.stateChange}>{test.name}

          <FooterView />

        </div>

      );
    }
}
export default Contacts;
