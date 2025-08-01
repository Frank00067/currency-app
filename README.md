💱 Currency App
The Currency App is a simple, containerized web application that allows users to:

🌍 View current exchange rates

🔄 Choose base currencies

📈 Get updated conversion information in real time

It uses the ExchangeRate API for currency data and is deployed using Docker and HAProxy for load balancing.

📺 Demo
🔗 Local App: http://localhost:4000

🎥 Demo Video: [Insert your video link here]
The demo showcases:

App running locally

Load-balanced access through HAProxy (lb-01)

🐳 Docker Hub Repo
URL: Docker Hub - franknkurunziza/currency-app

Image Name: franknkurunziza/currency-app

Tags Used: v1, latest

🧱 Build & Run Instructions
🔧 Build the Docker image locally
bash
Copy
Edit
docker build -t franknkurunziza/currency-app:v1 .

▶️ Run & test locally
bash
Copy
Edit
docker run -p 4000:8080 franknkurunziza/currency-app:v1
curl http://localhost:4000

🚀 Push to Docker Hub
bash
Copy
Edit
docker login
docker push franknkurunziza/currency-app:v1

🏢 Deployment on Lab Machines

Since Docker is not installed inside lab containers, use Docker Compose on the host system:
docker-compose.yml
yaml
Copy
Edit
version: '3'
services:
  web-01:
    image: franknkurunziza/currency-app:v1
    ports:
      - "4000:8080"
    networks:
      mynet:
        ipv4_address: 172.20.0.11

  web-02:
    image: franknkurunziza/currency-app:v1
    ports:
      - "4000:8080"
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
⚖️ HAProxy Configuration (haproxy.cfg)
cfg
Copy
Edit
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
🔁 Apply HAProxy Config Changes
bash
Copy
Edit
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /usr/local/etc/haproxy/haproxy.cfg'
🧪 Load Balancer Test
Run the following multiple times to confirm round-robin behavior:

bash
Copy
Edit
curl http://localhost
✅ You should see alternating responses from web-01 and web-02.

🌐 External API - ExchangeRate API
Example URL:
https://v6.exchangerate-api.com/v6/676f546c4731b409be5eb0df/latest/USD

Features:

Supports 160+ currencies

Requires API Key

Rate limits based on plan

Docs: ExchangeRate API Docs

✅ Features
Currency conversion with base/target currency selection

Real-time exchange rates using API

Clean and responsive UI

Containerized using Docker

Load-balanced using HAProxy and Docker Compose

🛠️ Challenges Faced
✅ Solved using Docker Compose on the host with HAProxy for load balancing

🛡️ Security Notes
⚠️ This README contains a test API key. For production:

Use .env to store secrets

Do not hard-code keys in source files

Use ENV or ARG in your Dockerfile to pass secrets securely

👤 Author
Frank Nkurunziza
Built, containerized, and deployed the Currency App for a CS project using:

Docker

Docker Hub

HAProxy

ExchangeRate API

📘 Disclaimer
This app is built for educational purposes. Currency data is sourced via ExchangeRate API.
