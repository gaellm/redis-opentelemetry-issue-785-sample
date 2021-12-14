FROM alpine as base
RUN apk add --no-cache nodejs=16.13.1-r0 tini
WORKDIR /usr/src/app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dependencies
# Install app dependencies
COPY package*.json ./
RUN apk add --no-cache npm=8.1.3-r0
RUN npm ci --only=production

# ---- Release ----
FROM base AS release
LABEL Name="TestApp" Version="1.0"
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
CMD node -r ./tracing index.js