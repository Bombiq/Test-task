FROM node:latest
WORKDIR /opt/Test-task
COPY . .
RUN mkdir -p /opt/Test-task/data
COPY names.csv /opt/Test-task/data
VOLUME /opt/Test-task/data
ENV APP_TOKEN=5a4caf940d3e9b2b13fb17778028c438e16e1478a6dd7163b713c7e9e531a591d92eafc32d1c17fa701f07c183ceafe62e431b0fe42e4b8341e4e8fb1938efc5
ENV APP_PORT=4000
EXPOSE $APP_PORT
CMD ["node", "script.js"]