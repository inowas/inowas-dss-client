FROM node:8

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /app

COPY . .

# Build for production.
RUN yarn install
RUN yarn run build

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s dist

# Tell Docker about the port we'll run on.
EXPOSE 5000
