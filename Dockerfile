FROM node
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE $PORT_LOCAL_APP
CMD ["npm", "run", "build"]