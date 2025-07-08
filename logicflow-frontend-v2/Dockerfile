# base image based on current nde in the my development system
FROM node:20.19.3-slim

# setting working directory to /logicflow-frontend-v2
WORKDIR /logicflow-frontend-v2

# copy content of packaage.json  to /logicflow-frontend-v2
COPY package.json /logicflow-frontend-v2/package.json
COPY package-lock.json /logicflow-frontend-v2/package-lock.json

# install dependencies
RUN npm install

# 
RUN ls

RUN mkdir  node_modules/.cache && chmod -R 777 node_modules/.cache

# copy content of logicflow-frontend-v2 folder to /logicflow-frontend-v2
COPY . /logicflow-frontend-v2

EXPOSE 3000

CMD ["npm", "start", "--", "--host", "0.0.0.0"]