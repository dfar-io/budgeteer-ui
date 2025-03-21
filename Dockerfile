FROM node:22 AS build
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run lint
RUN npm run build

FROM node:22
WORKDIR /app
COPY --from=build /app/dist/budgeteer .
COPY --from=build /app/index.js .
RUN npm install express@4.21.2 -g
EXPOSE 80

CMD [ "node", "index.js" ]
