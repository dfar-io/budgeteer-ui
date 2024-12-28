# This is set up for mono-repo, but can be simplified once I move to micro-repo
FROM node:22-slim
# set up git for sha injection
RUN apt-get -y update
RUN apt-get -y install git

WORKDIR /app
COPY ./ui/ /app
# sha injection - once we move to micro-repo I think I can remove this line
COPY ./.git/ /app/.git

RUN npm ci
RUN npm run lint
RUN npm run build

EXPOSE 80
CMD [ "node", "index.js" ]