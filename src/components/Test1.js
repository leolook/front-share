import React from 'react';
import { connect } from "react-redux";
import Test from './main';

class Test1 extends React.Component{
   
    render(){
        return (
            // <Test
            // >
               <h2>Test1</h2>
            // </Test>
            
        );
    };
}

const mapStateToProps = (state) => {
    return {
      count: state.count
    }
  }
//   const Test1Wrapper = createForm()(Test1);
export default Test1;