FROM node:19-alpine
WORKDIR /user-lists-api
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 5000
CMD [ "npm","start" ]
# test deployment 9