# syntax=docker/dockerfile:1

# Base image 
FROM python:bookworm

# setting working directory to backend
WORKDIR /backend

# upgrading pip 
RUN pip install pip --upgrade   

# copy and install requirements.txt
COPY requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt

# copy backend files
COPY . /backend

# copy entrypoint.sh and set it to executable 
COPY entrypoint.sh /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh

EXPOSE 8000


ENTRYPOINT [ "./entrypoint.sh" ]

# example 
# FROM docker.io/python:3.9.1-buster

# COPY backend/requirements /requirements
# COPY backend/requirements.txt /

# RUN pip install -r /requirements.txt

# RUN rm -rf /requirements

# COPY docker-compose/backend/entrypoint.sh /

# RUN chmod +x /entrypoint.sh

# WORKDIR /app

# ENTRYPOINT [ "/entrypoint.sh" ]