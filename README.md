🚀 Dockerized DeveloperHub Web App

![CI](https://github.com/SuryanshGarg04/Dockerized_Webapp/actions/workflows/docker-ci.yml/badge.svg)


A Node.js + Express + MongoDB + Handlebars app, fully containerized with Docker and delivered via a local CI/CD flow:

CI/CD: GitHub Actions → Docker Hub

Deploy: Local (Docker Compose or Minikube), no cloud required ✅

🌐 Live (Local) Demo Options

Docker Compose (fastest): http://localhost:3000

Minikube (Kubernetes): minikube service developerhub-svc --url → open the printed URL

🧱 Tech Stack

Backend: Node.js, Express

Templating: Handlebars (HBS)

DB: MongoDB (Mongoose)

UI: Bootstrap, jQuery

Containers: Docker

CI/CD: GitHub Actions → Docker Hub (suryanshgarg/developerhub)

⚙️ CI/CD (GitHub Actions → Docker Hub)

This pipeline installs deps, runs tests, builds the image, and pushes to Docker Hub on each push/PR to main.

Secrets to set in GitHub → Settings → Secrets and variables → Actions

DOCKER_USERNAME = suryanshgarg

DOCKER_PASSWORD = your Docker Hub Access Token

Workflow: .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

env:
  IMAGE_NAME: ${{ secrets.DOCKER_USERNAME }}/developerhub
  APP_DIR: .

jobs:
  test-build-push:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ${{ env.APP_DIR }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: ${{ env.APP_DIR }}/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Docker metadata (tags & labels)
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.IMAGE_NAME }}
          tags: |
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
            type=sha

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build & Push
        uses: docker/build-push-action@v6
        with:
          context: ${{ env.APP_DIR }}
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}


Docker Hub image: https://hub.docker.com/r/suryanshgarg/developerhub

🐳 Run with Docker (no Kubernetes)
1) Build
docker build -t developerhub .

2) Run (you need Mongo too)

Easiest: Docker Compose (creates both app + Mongo)

docker-compose.yml:

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/devhub
    depends_on:
      - mongo
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"


Run:

docker compose up --build
# open http://localhost:3000

☸️ Run on Minikube (Kubernetes, local)
Files (in k8s/)

mongo.yml – Mongo Deployment

mongo-svc.yml – Mongo ClusterIP Service

deployment.yml – App Deployment

service.yml – App NodePort Service

Apply
# start minikube (once)
minikube start --driver=docker
kubectl config use-context minikube

# deploy Mongo
kubectl apply -f k8s/mongo.yml
kubectl apply -f k8s/mongo-svc.yml

# deploy the app
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml

# check everything
kubectl get deploy,svc,pods
kubectl get endpoints mongo      # should show IP:27017
kubectl exec deploy/developerhub -- printenv | findstr MONGO_URL
kubectl logs deploy/developerhub --tail=100

Open the app
# easiest:
minikube service developerhub-svc --url

# or port-forward if you prefer:
kubectl port-forward svc/developerhub-svc 3000:3000
# then open http://localhost:3000

🧪 Tests

A minimal Jest + Supertest smoke test is included.

Run locally:

npm ci
npm test

📸 Screenshots to include (in screenshots/)

actions_pass.png – Green GitHub Actions run details

dockerhub_image.png – Your Docker Hub repo page for suryanshgarg/developerhub

k8s_resources.png – kubectl get deploy,svc,pods showing Running

app_running.png – Browser showing the app (Compose or Minikube URL)

Reference these inside the README with short captions.

🛠 Troubleshooting

ECONNREFUSED ::1:27017 in logs
Your app is trying to talk to localhost.

In Docker Compose, ensure MONGO_URL=mongodb://mongo:27017/devhub

In Kubernetes, ensure:

mongo Service exists: kubectl get svc mongo

App has env: kubectl exec deploy/developerhub -- printenv | findstr MONGO_URL

Pods are Running and kubectl get endpoints mongo shows an IP:27017

Port 3000 busy on port-forward
Free the port:

netstat -ano | findstr :3000
taskkill /PID <PID> /F

📄 License

ISC (see package.json)

✅ Deliverables checklist (what reviewers look for)

 Dockerfile, docker-compose.yml

 .github/workflows/ci-cd.yml (tests + build + push)

 Kubernetes manifests in k8s/ (app + service + mongo + mongo-svc)

 README.md (this file) with steps + Docker Hub link

 screenshots/ folder with 3–4 proof images
