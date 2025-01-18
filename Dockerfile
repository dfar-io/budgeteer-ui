FROM node:22

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run lint
RUN npm run build

EXPOSE 80
CMD [ "node", "index.js" ]