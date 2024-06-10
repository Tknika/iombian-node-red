FROM nodered/node-red:3.1.9-18

ENV LISTENER_PORT=1880
ENV AUTH_ENABLED=true
ENV AUTH_USER_USERNAME=iompi
ENV AUTH_USER_PASSWORD=iompi
ENV AUTH_USER_PERMISSIONS="*"

RUN npm install node-red-node-random node-red-node-ping node-red-contrib-play-audio node-red-node-smooth
RUN npm install node-red-contrib-iiot-opcua@4.1.2

COPY env-vars-entrypoint.sh /env-vars-entrypoint.sh
COPY env-vars-entrypoint.js /env-vars-entrypoint.js

USER root

ENTRYPOINT [ "bash", "/env-vars-entrypoint.sh" ]

CMD ["./entrypoint.sh"]