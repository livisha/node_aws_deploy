FROM node:18-alpine

COPY . .

RUN npm i

EXPOSE 3000

CMD ["node","index.js"]
