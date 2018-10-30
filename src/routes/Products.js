import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
// import { createForm } from "rc-form";

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  function handleAdd(id){
    const tmp={name:"hwt",id:id+1};
    dispatch({
      type: 'products/add',
      payload: tmp,
    });
    console.log("handleAdd:",tmp);
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products.list} 
      onAdd={handleAdd}/>
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);

// const mapStateToProps = state => {
//   return {
//     videolist: Products
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// };
// const VideoListWraper = createForm()(Products);
// export default connect(mapStateToProps)(VideoListWraper);

// function mapStateTpProps({products}){
//    return {products};
// }

// export default connect(mapStateTpProps)(Products);