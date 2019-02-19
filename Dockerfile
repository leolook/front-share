# 基础镜像
FROM node:10.15.1-alpine

MAINTAINER hwt
LABEL front-share 1.0.0

#RUN apk update && apk add bash tzdata \
 #   && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN mkdir -p /app/dist/

WORKDIR /app/
ENV TZ Asia/Shanghai
ARG registry=https://registry.npm.taobao.org
ARG disturl=https://npm.taobao.org/dist
RUN yarn config set disturl $disturl
RUN yarn config set registry $registry

COPY config  /app/config
COPY public  /app/public
COPY src  /app/src
COPY build.js index.html package.json /app/

RUN yarn --frozen-lockfile --production
#RUN npm install
#RUN npm build

EXPOSE 4000

#CMD ["npm","start"]
CMD [ "yarn", "start:prod" ]