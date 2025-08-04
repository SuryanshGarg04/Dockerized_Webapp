# 🚀 Dockerized Developerhub Web App

A full-stack Node.js application built using Express, MongoDB, Handlebars (HBS), and Bootstrap — fully containerized with Docker and deployed to the cloud via Render.

---

## 🌐 Live Demo

🟢 [Visit the Live App](https://dockerized-webapp-bgic.onrender.com)

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js  
- **Templating Engine:** HBS (Handlebars)  
- **Database:** MongoDB with Mongoose  
- **Frontend:** Bootstrap, jQuery  
- **Containerization:** Docker  
- **Deployment:** Render (Docker Runtime)  
- **CI/CD:** GitHub Actions, DockerHub

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

This project uses **GitHub Actions** to automate the Docker build and push process.

### ✅ What it does
- Automatically builds and pushes Docker images to DockerHub on every push to `main`
- Uses GitHub Actions Secrets to securely manage credentials

### 📄 Workflow File: `.github/workflows/docker-ci.yml`

```yaml
name: Docker CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: your-dockerhub-username/developerhub:latest



## 🐳 Docker Usage

### ✅ Build the Docker image
```bash
docker build -t developerhub .

markdown
### ▶️ Run the container

```bash
docker run -p 3000:3000 developerhub

