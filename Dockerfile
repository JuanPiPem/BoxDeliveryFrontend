FROM node
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install -g next
COPY . .
RUN npm run build
EXPOSE $PORT_LOCAL_APP
CMD ["npm", "run", "dev"]