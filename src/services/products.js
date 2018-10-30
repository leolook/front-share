import request from '../utils/request';

export function connect(id) {

 console.log(id);

   return request("/tool/connectDb",{
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      code:1,
    })
  })

  
}