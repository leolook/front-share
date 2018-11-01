import * as ProductService from '../services/products'

export default {
  namespace: 'db',
  state: {
  },
  reducers: {
    // 'delete'(state, { payload: id }) {
    //   console.log(state)
    //   return state.filter(item => item.id !== id)
    // },
    // 'create' (state, { payload: data }) {
    //   console.log("create",data,state)
    //   //  return {...state,name:'test4',id:4}

    //   // let tmp=state.list
    //   // tmp.push(data)
    //   // state.list=tmp; 
    //   // return {...state,list:tmp}

    //   return data
    // },
  },
  effects: {
    *create({payload:data, callback},{call, put}) {
      const response = yield call(ProductService.connect, {data})
      if (callback && typeof callback === 'function') {
        callback({
          name: data.title,
          ip: data.ip,
          port: data.port,
          userName: data.userName
        }
        ); // 返回结果
      }
    }
  }
}
