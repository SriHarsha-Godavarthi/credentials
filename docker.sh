#!/bin/bash

IMAGE_NAME=$1
VERSION=$2
DOCKER_FILE_PATH=$3
PORT=$4

echo "Building Docker image: $IMAGE_NAME:$VERSION"

docker build -t $IMAGE_NAME:$VERSION $DOCKER_FILE_PATH

echo "view all available images"

docker image ls

echo "Running Docker container: $IMAGE_NAME:$VERSION on port $PORT"
docker run -d --name ${IMAGE_NAME} -p $PORT:80 $IMAGE_NAME:$VERSION

echo "List all running containers"
docker ps -a

