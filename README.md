# 💱 Currency App

The **Currency App** is a simple web application that allows users to:

- View current exchange rates
- Choose base currencies
- Get updated conversion information in real time  
It uses an external API (ExchangeRate API) and is containerized for deployment with Docker and HAProxy-based load balancing.

---

## 📂 Docker Hub Repo

- **URL**: https://hub.docker.com/repository/docker/franknkurunziza/currency-app/general
- **Image Name**: `franknkurunziza/currency-app`
- **Tags Used**: `v1`, `latest`

---

## 🤺 Build Instructions

To build the image locally:

```bash
docker build -t franknkurunziza/currency-app:v1 .
```

To run and test the container locally:

```bash
docker run -p 8080:8080 franknkurunziza/currency-app:v1
curl http://localhost:8080
```

---

## 🚀 Push to Docker Hub

```bash
docker login
docker push franknkurunziza/currency-app:v1
```

---

## 🏢 Deployment on Lab Machines

Since Docker is not installed inside `web-01` and `web-02` containers, use Docker Compose from the host system:

### `docker-compose.yml`

```yaml
version: '3'
services:
  web-01:
    image: franknkurunziza/currency-app:v1
    ports:
      - "8081:8080"
    networks:
      mynet:
        ipv4_address: 172.20.0.11

  web-02:
    image: franknkurunziza/currency-app:v1
    ports:
      - "8082:8080"
    networks:
      mynet:
        ipv4_address: 172.20.0.12

  lb-01:
    image: haproxy:latest
    volumes:
      - ./haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg
    ports:
      - "80:80"
    networks:
      mynet:
        ipv4_address: 172.20.0.10

networks:
  mynet:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

---

## ⚖️ HAProxy Config (`haproxy.cfg`)

```haproxy
defaults
  mode http
  timeout connect 5000ms
  timeout client 50000ms
  timeout server 50000ms

frontend http_front
  bind *:80
  default_backend webapps

backend webapps
  balance roundrobin
  server web01 172.20.0.11:8080 check
  server web02 172.20.0.12:8080 check
```

Apply HAProxy config updates with:

```bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /usr/local/etc/haproxy/haproxy.cfg'
```

---

## 🔧 Load Balancer Testing

Run the following several times:

```bash
curl http://localhost
```

✅ You should see alternating responses from `web-01` and `web-02`.

---

## 🌍 External API Used

- **ExchangeRate API**
  - **API Key Used**: `676f546c4731b409be5eb0df`
  - **Base URL Example**: `https://v6.exchangerate-api.com/v6/676f546c4731b409be5eb0df/latest/USD`
  - **Features**: Get exchange rates for 160+ currencies
  - **Authentication**: API key required
  - **Rate Limit**: Based on your free or paid plan tier
  - **Docs**: [https://www.exchangerate-api.com/docs](https://www.exchangerate-api.com/docs)

---

## ✅ Features

- Currency conversion with base/target selection
- Real-time exchange rates
- Clean, responsive UI
- Dockerized deployment with HAProxy load balancing

---

## 🎥 Demo Video

🎬 *[Include your video demo link here]*  
It should show:
- App use locally
- Load-balanced access via `lb-01`

---

## 📄 Challenges Faced

- Cannot install Docker inside lab containers.
- Solved by using host-based Docker Compose and HAProxy setup.

---

## 🛡️ Security Notes

- ⚠️ This README contains a test API key. In real deployments, store your key in `.env` and never hard-code it.
- Use `ENV` or `ARG` in Dockerfiles to pass secrets securely.

---

## 📅 Author

**Frank Nkurunziza**  
Built, containerized, and deployed the Currency App using Docker, Docker Hub, and HAProxy for CS Project.

---

📘 *This app is for educational purposes. Currency data sourced via ExchangeRate API.*
