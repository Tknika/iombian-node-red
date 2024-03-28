# IoMBian Node-RED

Custom image to deploy Node-RED very easily on IoMBian devices.


## Build the image

To build the docker image, from the cloned repository, execute the docker build command in the same level as the Dockerfile:

```
docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} .
```

For example: ```docker build -t iombian-node-red:latest .```


## Launch de container

After building the image, execute it with docker run:

```
docker run --name ${CONTAINER_NAME} --rm -d -v ./data:/data -p 1880:1880 -e AUTH_ENABLED=true -e AUTH_USER_USERNAME=iompi -e AUTH_USER_PASSWORD=iompi iombian-node-red:latest
```

- **--name** is used to define the name of the created container.
- **--rm** can be used to delete the container when it stops. This parameter is optional.
- **-d** is used to run the container detached. This way the container will run in the background. This parameter is optional.
- **-v** is used to map the 'data' folder for backup purposes.
- **-p** is used to map a port of the container on the host.
- **-e** can be used to define the environment variables:
  - LISTENER_PORT: the internal port where the ui server should listen to new connections. Default value is 1880.
  - AUTH_ENABLED: enable user authentication. Default value is true.
  - AUTH_USER_USERNAME: the username of the authentication user. Default value is iompi.
  - AUTH_USER_PASSWORD: the password of the authentication user. Default value is iompi.
  - AUTH_USER_PERMISSIONS: the permission level of the authentication user. Default value is * (all permissions)

Otherwise, a ```docker-compose.yml``` file can also be used to launch the container:

```yaml
version: '3'

services:
  iombian-node-red:
    image: iombian-node-red:latest
    container_name: iombian-node-red
    restart: unless-stopped
    ports:
      - "1880:1880"
    volumes:
      - ./data:/data
    environment:
      - "AUTH_ENABLED=true"
      - "AUTH_USER_USERNAME=iompi"
      - "AUTH_USER_PASSWORD=iompi"
```

```
docker compose up -d
```

## Author

(c) 2024 [Aitor Iturrioz Rodríguez](https://github.com/bodiroga) ([Tknika](https://tknika.eus/))
