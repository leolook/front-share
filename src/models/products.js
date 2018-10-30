import * as ProductService from "../services/products"

export default {
    namespace: 'products',
    state: {
      list:[{name:'test1',id:1},
      {name:'test2',id:2}]
    },
    reducers: {
      'delete'(state, { payload: id }) {
        console.log(state);
        return state.filter(item => item.id !== id);
      },
      save (state, { payload: data }) {
        console.log("add",data);
        //  return {...state,name:'test4',id:4};
        
        let tmp=state.list;
        tmp.push(data);
        state.list=tmp; 
        return {...state,list:tmp};
      },
    },
    effects:{
      *add({payload:data},{call,put}){
          console.log("effects add:",data);
          yield call(ProductService.connect,{data});
          yield put({type:'save',payload:data});
      },
    }
  };