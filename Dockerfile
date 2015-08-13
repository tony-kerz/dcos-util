FROM gliderlabs/herokuish
RUN mkdir -p /app
ADD . /app
RUN /build
ENTRYPOINT ["/exec","/app/dcos-util.js"]
