# 🏭 Altrp Boilerplate: The Digital Asset Factory

![Status](https://img.shields.io/badge/status-work_in_progress-yellow.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

This is not just another starter-kit. This is a **production-ready factory** for creating, deploying, and managing isolated, modular web applications. We don't just write software; we build the machines that produce it.

## 💡 The Big Idea: Why This Exists

The digital world offers a false choice for growing businesses:
1.  **⛓️ The SaaS Prison:** Start on a simple platform (Wix, Tilda, Shopify). It's fast and cheap, but you're just a tenant. Your growth will inevitably hit their ceiling. To escape, you must burn everything down and start over.
2.  **💸 The Custom-Dev Abyss:** Hire an agency. Spend tens of thousands and wait for months. You get total flexibility, but at the cost of crippling dependency and financial risk.

**💥 Altrp destroys this false choice.**

We believe in **🔑 Total Ownership**. We don't rent you a storefront; we give you the keys to the entire factory. This boilerplate is the blueprint for that factory. It produces a complete, isolated, and scalable digital asset that *you own*—code, data, and infrastructure.

## ✨ Core Features

-   🏰 **Isolated Instances:** Each project is a self-contained fortress running on its own VPS. No "noisy neighbors," no shared databases. Paranoid-level security is the default.
-   🧱 **Radical Modularity:** The system is built from independent, battle-tested open-source components (Payload, Next.js, n8n). Add features like E-commerce or CRM by activating modules, not by rewriting your core.
-   🛠️ **Production-Ready Stack:** Forget weeks of setup. Docker, Traefik, CI/CD, databases, and observability tools are all pre-configured and work in harmony.
-   ❤️ **Obsessed with Developer Experience:** We designed this for `vibe-coding`. Monorepo with Turborepo, strict TypeScript, and Architecture-as-Code principles create an environment for deep focus and high velocity.
-   🤖 **AI-Native Architecture:** Built with a dedicated, decoupled microservice layer for AI agents. This isn't a feature; it's in the DNA.

## 🚀 Tech Stack

| Category        | Technology                                   |
| --------------- | -------------------------------------------- |
| **Infrastructure**  | Docker, Traefik, Coolify (Deployment)        |
| **Backend / CMS**   | Payload CMS (TypeScript, Node.js)            |
| **Frontend**      | Next.js (React, TypeScript)                  |
| **Database**      | PostgreSQL, KeyDB (Cache/Queues)             |
| **Automation**    | n8n                                          |
| **Observability** | Metabase (Analytics), Uptime Kuma (Monitoring), GlitchTip (Error Tracking) |
| **Secrets**       | Doppler                                      |

## ⚡ Getting Started

### 📋 Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose
-   [Node.js](https://nodejs.org/en/) (v18+ recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/gtfb/altrp-boilerplate.git
cd altrp-boilerplate
```

### 2. ⚠️ Set Up Environment Variables

This is a critical step. Copy the template and fill in your secrets.

```bash
cp .env.template .env
```
Now, open the `.env` file and provide values for all variables. Use `openssl rand -hex 32` to generate secure secrets.

### 3. Launch The Factory

```bash
docker-compose up --build -d
```
The `--build` flag is only needed the first time or after changing a `Dockerfile`. The `-d` flag runs the containers in detached mode.

### 4. ✅ Verify

Once the containers are up, your services should be available at the local domains configured in Traefik:

-   **Website (Next.js):** `http://frontend.localhost`
-   **Admin Panel (Payload):** `http://payload.localhost:3000`
-   **Automation (n8n):** `http://n8n.localhost:5678`
-   **Analytics (Metabase):** `http://metabase.localhost:3001`
-   **Monitoring (Uptime Kuma):** `http://kuma.localhost:3002`

## 🤝 How to Contribute

We are building this in the open and welcome all contributions. To maintain quality and velocity, we operate on a clear set of principles.

### Our Engineering Philosophy

1.  🏍️ **Build Motorcycles, Don't Reinvent Wheels:** 90% of our work is integrating the best open-source tools. 10% is the "glue" that makes them a cohesive system.
2.  🛠️ **One Toolchain:** We standardize on VS Code. Use the recommended extensions and settings in the `.vscode/` directory to ensure consistency.
3.  🤖 **AI is Your Copilot:** Mastery of AI-assistants (GitHub Copilot, Cursor) is required. You are the architect; AI is your junior engineer.
4.  🎯 **Code is Trash Without Tests & Docs:** Our **Definition of Done** is sacred: **Working Code + Automated Tests + Continuous Documentation**.
5.  🏗️ **Architecture > Elegant Code:** A simple, working piece of code in a brilliant architecture is infinitely more valuable than a complex, elegant function that solves a local problem.
6.  💬 **Async Communication, Clean Commits:** We protect our state of flow. Formulate your thoughts fully in writing. Your git commits must be clean and descriptive (`feat(payload): ...`).
7.  🛡️ **Radical Ownership:** "It worked on my machine" is not an excuse. You are responsible for your code from your editor to production.

### Your First Pull Request

1.  **Fork** the repository.
2.  Find an issue to work on (we recommend one tagged `good first issue`). Announce in the issue comments that you are taking it.
3.  Create a new branch for your feature: `git checkout -b feat/my-awesome-feature`.
4.  Write your code, following the philosophy above. Add tests and update documentation as you go.
5.  Ensure all tests and linting checks pass locally.
6.  Submit a **Pull Request (PR)** to our `main` branch. Link the issue you're solving in the PR description (e.g., "Closes #123").

If your PR adheres to our principles, it will be merged. If not, we'll provide feedback. No hard feelings.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
