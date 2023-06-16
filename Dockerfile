FROM node:lts as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn global add turbo
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build --no-cache
# Production
FROM node:lts-slim
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY package.json yarn.lock turbo.json ./
RUN yarn global add turbo
RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/api/dist ./api/dist
COPY --from=builder /usr/src/app/api/package.json ./api/package.json

COPY --from=builder /usr/src/app/services/user/dist ./services/user/dist
COPY --from=builder /usr/src/app/services/user/package.json ./services/user/package.json

# COPY --from=builder /usr/src/app/services/auth/dist ./services/auth/dist
# COPY --from=builder /usr/src/app/services/auth/package.json ./services/auth/package.json

COPY --from=builder /usr/src/app/proto ./proto

CMD ["yarn", "start:prod"]