FROM node:22

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run lint
RUN npm run build

# remove node_modules
RUN rm -rf node_modules

EXPOSE 80
CMD [ "node", "index.js" ]
