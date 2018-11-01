import {routerRedux} from 'dva/router'

export default {
    namespace: 'main',
    state: {
    },
    reducers: {
     
    },
    effects:{
      *to({payload:data},{call,put}){
          yield put(routerRedux.push(data));
      },
    }
  };