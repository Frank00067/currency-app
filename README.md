# 💱 Currency App

The **Currency App** is a simple, containerized web application that allows users to:

🌍 View current exchange rates  
🔄 Choose base currencies  
📈 Get updated conversion information in real time  

It uses the [ExchangeRate API](https://www.exchangerate-api.com/docs) for currency data and is deployed using Docker and HAProxy for load balancing.

---

## 📺 Demo

🔗 **Local App:** [http://localhost:4000](http://localhost:4000)  
🎥 **Demo Video:** [https://youtu.be/Qe81EzwlD_o](https://youtu.be/Qe81EzwlD_o)

The demo showcases:

- App running locally  
- Load-balanced access through HAProxy (`lb-01`)

---

## 🐳 Docker Hub Repo

- **URL:** [Docker Hub - franknkurunziza/currency-app](https://hub.docker.com/repository/docker/franknkurunziza/currency-app/general)  
- **Image Name:** `franknkurunziza/currency-app`  
- **Tags Used:** `v1`, `latest`

---

## 🧱 Build & Run Instructions

🔧 **Build the Docker image locally**
```bash
docker build -t franknkurunziza/currency-app:v1 .
```

▶️ **Run & test locally**
```bash
docker run -p 4000:8080 franknkurunziza/currency-app:v1
curl http://localhost:4000
```

---

## 🚀 Push to Docker Hub
```bash
docker login
docker push franknkurunziza/currency-app:v1
```

---

## 🏢 Deployment on Lab Machines

Use Docker Compose on the host system:

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
      - "4000:80"
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

## ⚖️ HAProxy Configuration (`haproxy.cfg`)
```cfg
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

---

## 🔁 Apply HAProxy Config Changes
```bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /usr/local/etc/haproxy/haproxy.cfg'
```

---

## 🧪 Load Balancer Test
Run the following multiple times to confirm round-robin behavior:

```bash
curl http://localhost:4000
```

✅ You should see alternating responses from `web-01` and `web-02`.

---

## 🌐 External API - ExchangeRate API

- **Example URL:**  
  [https://v6.exchangerate-api.com/v6/676f546c4731b409be5eb0df/latest/USD](https://v6.exchangerate-api.com/v6/676f546c4731b409be5eb0df/latest/USD)
  
- **Features:**
  - Supports 160+ currencies
  - Requires API Key
  - Rate limits depend on plan
  - JSON-based response

- **Docs:**  
  [ExchangeRate API Documentation](https://www.exchangerate-api.com/docs)

---

## ✅ Features

- Currency conversion with base/target currency selection  
- Real-time exchange rates using the API  
- Clean and responsive UI  
- Containerized using Docker  
- Load-balanced using HAProxy and Docker Compose

---

## 🛠️ Challenges Faced

✅ Solved using host-based Docker Compose with HAProxy for load balancing

---

## 👤 Author

**Frank Nkurunziza**  
Built, containerized, and deployed the Currency App for a CS project using:

- Docker  
- Docker Hub  
- HAProxy  
- ExchangeRate API

---

## 📘 Disclaimer

This app is for educational purposes only. Currency data is sourced via the [ExchangeRate API](https://www.exchangerate-api.com).