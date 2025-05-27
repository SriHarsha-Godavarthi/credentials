# Pull the node image from Public AWS ECR repository

FROM public.ecr.aws/docker/library/node:latest AS build-stage
RUN useradd -m -s /bin/bash appuser
USER appuser
WORKDIR /app

# copy package.json and yarn.lock file
COPY package.json yarn.lock ./
# install all dependencies

RUN yarn install
#copy sources code
COPY . .
RUN yarn build
EXPOSE 8080

ENTRYPOINT ["yarn", "build"]



#Pull lighter / slimer image from AWS ECR
FROM public.ecr.aws/docker/library/node:current-slim AS final-stage
RUN useradd -m -s /bin/bash appuser
WORKDIR /app
COPY --from=build-stage ./app .
COPY --from=build-stage ./app/.env .
USER root
RUN yarn install --production
USER appuser
EXPOSE 8080
ENTRYPOINT ["yarn","start"]




