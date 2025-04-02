FROM node:22 AS build
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run lint
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/budgeteer/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
