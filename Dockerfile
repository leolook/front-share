# 基础镜像
FROM node:10.15.1-alpine

MAINTAINER hwt
LABEL front-share 1.0.0

#RUN apk update && apk add bash tzdata \
 #   && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN mkdir /app/

WORKDIR /app/
ENV TZ Asia/Shanghai

COPY .  /app/

EXPOSE 4000

CMD ["npm","start"]