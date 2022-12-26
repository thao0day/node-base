#!/bin/bash

docker stop api
docker stop service_user
docker stop service_doctor

docker rm api
docker rm service_user
docker rm service_doctor

docker rmi api:v1
docker rmi service_user:v1
docker rmi service_doctor:v1

docker build -t api:v1 -f api/Dockerfile .
docker build -t service_user:v1 -f services/user/Dockerfile .
docker build -t service_doctor:v1 -f services/doctor/Dockerfile .

docker run -itd --net=host -p 8080:3000 --name=api api:v1
docker run -itd --net=host --name=service_user service_user:v1
docker run -itd --net=host --name=service_doctor service_doctor:v1