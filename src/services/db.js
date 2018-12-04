import request from "../utils/request";

export async function createOrModify(req) {
  return request("/tool/db/createOrModify", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

export async function page(req) {
  return request("/tool/db/page", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

//连接名
export async function allName() {
  return request("/tool/db/allName", {
    method: "get"
  });
}

//连接
export async function connect(req) {
  return request("/tool/db/connect", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

//表模型
export async function tableModel(req) {
  return request("/tool/db/tableModel", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

//删除
export async function del(req) {
  return request("/tool/db/del", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}
