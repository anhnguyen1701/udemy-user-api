# Base image
FROM node:18-alpine

ENV NODE_ENV=staging \
    PORT=3000 \
    JWT_SECRET="secret" \
    MONGO_URI='mongodb://root:root@35.238.120.69:27017/udemy_internal' \
    REDIS_URI='redis://35.238.120.69:6379/' \
    SENDGRID_API_KEY='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' \
    SENDGRID_SENDER='nguyenlamanh1701@gmail.com'

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 3000
