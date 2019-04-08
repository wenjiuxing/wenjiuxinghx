import React from 'react';



class ContactsChild extends React.Component { 
    constructor(props) {
        super(props);
        this.state={
        
        }
      }

      render(){
        console.log(this.props)
        const {test}=this.props
        return(
          
          <div>{test.name}</div>
        )

        
      }
          
       
       
}
export default ContactsChild