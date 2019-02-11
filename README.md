# front-share

数据分享

#### docker 编译

1. docker build --rm -t hwtdocker/cloud:front-share .

#### docker 推送

1. docker login
2. docker push hwtdocker/cloud:front-share

#### docker 运行

1. docker run -itd -p 4000:4000/tcp --name=front-share 212d3c5930c1
