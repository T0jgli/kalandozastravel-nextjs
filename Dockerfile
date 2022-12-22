# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#NEXT JS build args

ARG NEXT_PUBLIC_GOOGLE_MAPSKEY
ARG NEXT_PUBLIC_EMAIL_USER
ARG NEXT_PUBLIC_EMAIL_PASS
ARG NEXT_BASEURL
ARG NEXT_FIREBASE_API_KEY
ARG NEXT_FIREBASE_AUTH_DOMAIN
ARG NEXT_FIREBASE_PROJECTID
ARG NEXT_FIREBASE_STORAGEBUCKET
ARG NEXT_FIREBASE_MESSAGESENDERID
ARG NEXT_FIREBASE_APPID
ARG NEXT_FIREBASE_MEASUREMENTID
ARG NEXT_PUBLIC_GOOGLE_GAID

ENV TZ=Europe/Budapest
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