FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

# RUN yarn
RUN yarn install --frozen-lockfile

COPY . ./
EXPOSE 4000

CMD ["yarn", "start"]