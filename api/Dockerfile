FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node
################################################################
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
ENV NODE_ENV production
RUN npm install --only=production && npm cache clean --force
USER node

# PRODUCTION
FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]