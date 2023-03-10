FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 9229
CMD [ "npm", "start" ]
