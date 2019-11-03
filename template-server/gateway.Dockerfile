FROM node:lts-slim

WORKDIR /usr/src/app

# Copy Package.json for install
COPY package*.json yarn.lock ./

RUN yarn install 

# Copy Source files
COPY . .

RUN yarn build

ENV NODE_PORT=4000

CMD ["yarn", "gateway"]

EXPOSE 4000

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD curl -sS http://localhost:4000/health-shallow || exit 1
