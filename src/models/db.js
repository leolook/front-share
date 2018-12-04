import * as DbService from "../services/db.js";

export default {
  namespace: "db",
  state: {},
  reducers: {},
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
      let res = yield call(DbService.createOrModify, { db });
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        callback(true); // 返回结果
      }
    },
    //列表
    *page({ payload: data, callback }, { call, put }) {
      console.log(data);
      let res = yield call(DbService.page, data);
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        res = res.data;
        let list = res.list;
        if (list == null) {
          callback(false);
          return;
        }
        let data = {
          list: [],
          page: res.page
        };
        for (var i = 0; i < list.length; i++) {
          data.list.push({
            key: list[i].id,
            name: list[i].name,
            ip: list[i].ip,
            port: list[i].port,
            userName: list[i].userName,
            password: list[i].password
          });
        }
        callback(data); // 返回结果
      }
    },
    //连接名
    *allName({ payload: data, callback }, { call, put }) {
      let res = yield call(DbService.allName);
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        res = res.data;
        callback(res.dbs); // 返回结果
      }
    },
    //连接
    *connect({ payload: data, callback }, { call, put }) {
      let res = yield call(DbService.connect, data);
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        res = res.data;
        let tmp = [];
        for (var i = 0; i < res.tableName.length; i++) {
          tmp.push({
            name: res.tableName[i]
          });
        }
        console.log(tmp);
        let data = {
          key: res.key,
          model: tmp
        };
        callback(data); // 返回结果
      }
    },
    //表模型
    *tableModel({ payload: data, callback }, { call, put }) {
      let res = yield call(DbService.tableModel, data);
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        res = res.data;
        callback(res.model); // 返回结果
      }
    },
    //删除
    *del({ payload: data, callback }, { call, put }) {
      let res = yield call(DbService.del, data);
      console.log(res);
      if (callback && typeof callback === "function") {
        if (res.code !== 0) {
          callback(false);
          return;
        }
        callback(true); // 返回结果
      }
    }
  }
};
