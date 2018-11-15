import request from "../utils/request";

export function createOrModify(req) {
  return request("/tool/db/createOrModify", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

export function page(req) {
  return request("/tool/db/page", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}

//连接名
export function allName() {
  return request("/tool/db/allName", {
    method: "get"
  });
}

//连接
export function connect(req) {
  return request("/tool/db/connect", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(req)
  });
}
