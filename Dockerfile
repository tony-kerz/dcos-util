FROM gliderlabs/herokuish

RUN mkdir -p /app
ADD . /app
RUN /build

ENTRYPOINT ["/exec", "node", "/app/dcos-util.js"]
