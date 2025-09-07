Project Report — Dockerized DeveloperHub Web App



Repo: https://github.com/SuryanshGarg04/Dockerized\_Webapp



Image: suryanshgarg/developerhub:latest (Docker Hub)



1\) Abstract



DeveloperHub is a Node.js + Express web app (HBS views, Bootstrap UI) with MongoDB persistence.

This project containerizes the app with Docker, adds an automated CI pipeline using GitHub Actions that builds and pushes images to Docker Hub, and demonstrates two local deployment targets:



Docker Compose (fastest developer loop)



Kubernetes (Minikube) (cluster-style deployment)



The deliverables include source code, CI workflow, Docker image, Kubernetes manifests, and verification screenshots.



2\) Objectives



Package the app as a reproducible Docker image.



Add automated tests (Jest + Supertest) and run them in CI.



Build and push images to Docker Hub via GitHub Actions on every push/PR to main.



Provide working local deployments: Docker Compose and Minikube.



Document troubleshooting and verification steps.



3\) System Overview \& Architecture

Components



Web App (Node.js/Express)



Handlebars templates, Bootstrap front-end.



Exposes HTTP on port 3000.



Reads Mongo connection string from MONGO\_URL.



MongoDB



Official image mongo:6.



Cluster-internal service name mongo for K8s; container name mongo in Compose.



Logical Diagram (local)

Browser ──► App (port 3000)

&nbsp;               │

&nbsp;               ▼

&nbsp;         MongoDB (27017)





In Kubernetes:



developerhub Deployment + developerhub-svc (NodePort 3000 → 30080)



mongo Deployment + mongo ClusterIP Service (27017)



4\) Implementation

4.1 Repository Layout (key files)

.

├─ Dockerfile

├─ docker-compose.yml

├─ src/

│  ├─ app.js

│  └─ db/conn.js             # reads process.env.MONGO\_URL

├─ k8s/

│  ├─ deployment.yml         # app Deployment (container name: web)

│  ├─ service.yml            # app Service (NodePort 3000:30080)

│  ├─ mongo.yml              # Mongo Deployment

│  └─ mongo-svc.yml          # Mongo ClusterIP Service (27017)

├─ src/\_\_tests\_\_/app.test.js # GET /health smoke test

└─ .github/workflows/docker-ci.yml



4.2 Dockerfile (summary)



Base: Node 18 (alpine or slim).



Installs dependencies with npm ci.



Exposes 3000.



CMD \["node", "src/app.js"].



4.3 Docker Compose



Services: app and mongo.



Binds 3000:3000.



Sets MONGO\_URL=mongodb://mongo:27017/devhub.



Easiest way to run both services locally.



4.4 Kubernetes (Minikube)



mongo.yml + mongo-svc.yml: standalone Mongo with a ClusterIP Service mongo:27017.



deployment.yml: app deployment (web container).



service.yml: NodePort Service developerhub-svc exposing 3000 → node port 30080.



App env set to: MONGO\_URL=mongodb://mongo:27017/devhub.



5\) CI/CD Pipeline



Workflow: .github/workflows/docker-ci.yml



Stages



Checkout



Node setup (v18) + npm ci



Run tests (npm test)



Docker metadata (tags: latest on main, plus sha)



Buildx setup



Login to Docker Hub (secrets)



Build \& Push to suryanshgarg/developerhub



Secrets required



DOCKER\_USERNAME = suryanshgarg



DOCKER\_PASSWORD = Docker Hub access token



Result



Every push/PR to main runs tests and publishes a tagged image.



6\) How to Run \& Verify

6.1 Run with Docker Compose

\# from repo root

docker compose up --build

\# open http://localhost:3000





Verify



curl -s http://localhost:3000/health

\# -> {"ok":true}



6.2 Run on Minikube

\# start once

minikube start --driver=docker

kubectl config use-context minikube



\# deploy Mongo

kubectl apply -f k8s/mongo.yml

kubectl apply -f k8s/mongo-svc.yml



\# deploy app

kubectl apply -f k8s/deployment.yml

kubectl apply -f k8s/service.yml



\# watch until running

kubectl get deploy,svc,pods

kubectl get endpoints mongo      # should show <podIP>:27017

kubectl exec deploy/developerhub -- printenv | findstr MONGO\_URL

kubectl logs deploy/developerhub --tail=100





Open the app



minikube service developerhub-svc --url

\# OR

kubectl port-forward svc/developerhub-svc 3000:3000

\# then open http://localhost:3000



7\) Testing



Test framework: Jest + Supertest.



Smoke test: GET /health returns 200 and { ok: true }.



Executed locally via npm test and automatically in GitHub Actions.



8\) Results \& Evidence (Screenshots)



Place these in screenshots/ and reference in README:



What	File

GitHub Actions successful run	actions\_pass.png

Docker Hub repo \& tag	dockerhub\_image.png

K8s resources running	k8s\_resources.png

App in browser	app\_running.png



(Your attached screenshots already show all four views.)



9\) Troubleshooting \& Lessons Learned



ECONNREFUSED ::1:27017

Cause: App connected to localhost inside container/cluster.

Fix: Always use service name: MONGO\_URL=mongodb://mongo:27017/devhub.

Verified via kubectl exec ... printenv.



Port 3000 busy

Fix: netstat -ano | findstr :3000 → taskkill /PID <pid> /F, or use a different local port.



Image not updating in K8s

Fix: set imagePullPolicy: Always (container name web) or bump the tag; run

kubectl rollout restart deploy/developerhub and kubectl rollout status ....



Compose orphan containers

Fix: docker compose up --build --remove-orphans.



10\) Security \& Quality Notes



Use Docker Hub access token (not password) in Actions secrets.



Keep node\_modules out of git; rely on npm ci.



Consider adding:



Liveness/Readiness probes in K8s.



Multi-stage builds to shrink image size.



Dependabot / npm audit in CI for vulnerable deps.



Prettier/ESLint to standardize formatting.



11\) Future Work



Helm chart for parameterized K8s deploys.



Mongo PersistentVolumeClaim (PVC) for data durability.



Staging environment with branch-based tags.



Integration tests that hit Mongo with fixtures.



GitHub Release + changelog automation.



12\) Conclusion



The project meets the target: a Dockerized Node.js app with automated CI to Docker Hub and working local deployments via Docker Compose and Minikube. Tests run in CI, images are tagged and published, and the application is verifiably reachable at http://localhost:3000 (Compose) and via minikube service/port-forward (K8s).



13\) Quick Links



Repository: https://github.com/SuryanshGarg04/Dockerized\_Webapp



Docker Hub: https://hub.docker.com/r/suryanshgarg/developerhub



Actions: Actions tab in the GitHub repo (workflow docker-ci.yml)

