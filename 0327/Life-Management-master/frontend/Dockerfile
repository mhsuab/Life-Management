FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

# RUN yarn
RUN yarn install --frozen-lockfile --ignore-optional
# RUN yarn

COPY . ./
EXPOSE 3000

CMD ["yarn", "start"]