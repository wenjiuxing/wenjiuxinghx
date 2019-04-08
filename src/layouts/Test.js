
import React from 'react';
// import FooterView from '@/layouts/Footer';
import { connect } from 'dva';
import ContactsChild from '@/components/Test/testChild'

@connect(({test,user,loading})=>({
  test,
  user:user.list,
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
       console.log(dispatch)
        dispatch({
          type:'test/name',
        })
     
      }
        

    render() {
    
      console.log(this.props)
      
     
      const {test,match}=this.props
      return (
       
        
        // eslint-disable-next-line no-undef
        <div style={{cursor:"pointer"}} onClick={this.stateChange}>
          {test.name}{match.params.page}

          <ContactsChild {...this.props} />

        </div>

      );
    }
}
export default Contacts;
