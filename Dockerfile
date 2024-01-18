FROM node:20
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE $PORT_LOCAL_APP
CMD ["npm", "run", "build"]