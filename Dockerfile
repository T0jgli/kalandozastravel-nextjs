# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install --production --force

# add app
COPY . ./
RUN npm run build
EXPOSE 8082

# start app
CMD ["npm", "start"]