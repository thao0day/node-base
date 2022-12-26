#!/bin/bash

docker stop api
docker stop user-svc
docker stop doctor-svc

docker rm api
docker rm user-svc
docker rm doctor-svc

docker rmi api:v1
docker rmi user-svc:v1
docker rmi doctor-svc:v1

docker build -t api:v1 -f api/Dockerfile .
docker build -t user-svc:v1 -f services/user-svc/Dockerfile .
docker build -t doctor-svc:v1 -f services/doctor-svc/Dockerfile .

docker run -itd --net=host -p 8080:3000 --name=api api:v1
docker run -itd --net=host --name=user-svc user-svc:v1
docker run -itd --net=host --name=doctor-svc doctor-svc:v1