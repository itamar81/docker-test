FROM node
WORKDIR /usr/src/app
#ENV PORT 5000
COPY package*.json ./
RUN npm install
COPY . .
#EXPOSE 5000
 
CMD ["node","index.js"]
