import * as DbService from "../services/db.js";

export default {
  namespace: "db",
  state: {},
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
    //创建
    *createOrModify({ payload: data, callback }, { call, put }) {
      let db = {
        id: data.key,
        name: data.name,
        ip: data.ip,
        port: parseInt(data.port, 10),
        userName: data.userName,
        password: data.password
      };
      let response = yield call(DbService.createOrModify, { db });
      console.log(response);
      if (callback && typeof callback === "function") {
        if (response == null) {
          callback(false); // 返回结果
        } else {
          callback(true); // 返回结果
        }
      }
    },
    //列表
    *page({ payload: data, callback }, { call, put }) {
      console.log(data);
      let response = yield call(DbService.page, data);
      console.log(response);
      if (callback && typeof callback === "function") {
        let tmp = response.list;
        if (tmp != null) {
          let res = {
            list: [],
            page: response.page
          };
          for (var i = 0; i < tmp.length; i++) {
            res.list.push({
              key: tmp[i].id,
              name: tmp[i].name,
              ip: tmp[i].ip,
              port: tmp[i].port,
              userName: tmp[i].userName,
              password: tmp[i].password
            });
          }
          callback(res); // 返回结果
        }
      }
    },
    //连接名
    *allName({ payload: data, callback }, { call, put }) {
      let response = yield call(DbService.allName);
      console.log(response);
      if (callback && typeof callback === "function") {
        callback(response.dbs); // 返回结果
      }
    },
    //连接
    *connect({ payload: data, callback }, { call, put }) {
      let response = yield call(DbService.connect, data);
      console.log(response);
      if (callback && typeof callback === "function") {
        if (response == null) {
          callback(false); // 返回结果
          return;
        }
        let tmp = [];
        for (var i = 0; i < response.tableName.length; i++) {
          tmp.push({
            name: response.tableName[i]
          });
        }
        console.log(tmp);
        callback(tmp); // 返回结果
      }
    }
  }
};
