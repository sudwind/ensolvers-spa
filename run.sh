#!/usr/bin/env bash

sudo -u postgres psql -c "CREATE USER todoapp PASSWORD '1234' CREATEDB"
PGPASSWORD=1234 psql -U todoapp -h localhost -d postgres -c "CREATE DATABASE todolist;"

CURRENTDIR=$(pwd)
echo "${CURRENTDIR}"/backend
cd "${CURRENTDIR}"/backend && mvn spring-boot:run &> "${CURRENTDIR}"/spring.log & cd "${CURRENTDIR}"/frontend/shikoku && npm install && npm start &&> "${CURRENTDIR}"/node.log