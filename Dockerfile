# 基础镜像
FROM node:9.2.1-alpine

MAINTAINER hwt
LABEL font-share 1.0.0

RUN apk update && apk add bash tzdata \
    && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN mkdir /app/

WORKDIR /app/
EXPOSE 4000

CMD ["node"]