# ---- 1️⃣ build stage ---------------------------------------------------------
FROM node:14-bullseye AS builder
#   ▸ Node 14 is the last LTS fully supported by Expo SDK 42
#   ▸ We pin Expo CLI 4.x (latest that still works with SDK 42)
ENV  EXPO_CLI_VERSION=4.13.0 \
     EXPO_NO_ANONYMOUS_UPLOAD=1 \
     EXPO_NO_TELEMETRY=1 \
     CI=1

RUN npm i -g expo-cli@${EXPO_CLI_VERSION}

WORKDIR /app

# -- install deps first (enables Docker layer caching) --
COPY package*.json yarn.lock* ./
RUN npm install --production

# -- copy source and build --
COPY . .
#    *package.json* already defines "build-web": "expo build:web"  :contentReference[oaicite:1]{index=1}

# RUN ls -alhR assets resources

RUN npm run build-web 

# ---- 2️⃣  export stage -------------------------------------------------------
# Use a tiny final image that just holds the artefacts;
# this keeps the layers we copy from predictable.
FROM busybox:1.36-uclibc
WORKDIR /export
COPY --from=builder /app/web-build ./web-build
# Container stays alive long enough to be "docker cp"-ed from.
CMD ["sh", "-c", "echo '🟢  Build ready in /export/web-build'; sleep infinity"]
