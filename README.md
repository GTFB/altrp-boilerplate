# 🏭 Altrp Boilerplate: The Digital Asset Factory

![Status](https://img.shields.io/badge/status-production_ready-green.svg)
[![License](https://img.shields.io/badge/license-Dual%20(MIT%20%2B%20Commercial)-lightgrey.svg)](LICENSE.md)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen.svg)

---

This is not just another starter kit. This is a **production-ready factory** for creating, deploying, and managing isolated, modular web applications. We don't just write software; we build the machines that produce it.

## 💡 The Big Idea: Why This Exists

The digital world offers a false choice for growing businesses:

1.  **⛓️ The SaaS Prison:** Start on a simple platform (Wix, Tilda, Shopify). It's fast and cheap, but you're just a tenant. Your growth will inevitably hit their ceiling. To escape, you must burn everything down and start over.
2.  **💸 The Custom-Dev Abyss:** Hire an agency. Spend tens of thousands and wait for months. You get total flexibility, but at the cost of crippling dependency and financial risk.

**💥 Altrp destroys this false choice.**

We believe in **🔑 Total Ownership**. We don't rent you a storefront; we give you the keys to the entire factory. This boilerplate is the blueprint for that factory. It produces a complete, isolated, and scalable digital asset that *you own*—code, data, and infrastructure.

## ✨ Core Features

-   **🏰 Isolated Instances:** Each project is a self-contained fortress running on its own VPS. No "noisy neighbors," no shared databases. Paranoid-level security is the default.
-   **🧱 Radical Modularity:** The system is built from independent, battle-tested open-source components (Payload, Next.js, n8n). Add features like E-commerce or CRM by activating modules, not by rewriting your core.
-   **📜 Dual Licensing for Trust & Value:** A transparent model with a permissive MIT-licensed core engine and commercially licensed premium modules. You own the foundation, you subscribe to the power-ups.
-   **🛠️ Production-Ready Stack:** Forget weeks of setup. Docker, Traefik, CI/CD, databases, and observability tools are all pre-configured and work in harmony.
-   **❤️ Obsessed with Developer Experience:** We designed this for `vibe-coding`. Monorepo with Turborepo, strict TypeScript, and Architecture-as-Code principles create an environment for deep focus and high velocity.
-   **🤖 AI-Native Architecture:** Built with a dedicated, decoupled microservice layer for AI agents and an AI-first development workflow. This isn't a feature; it's in the DNA.

## 📜 Licensing Model: Own the Core, Subscribe to Power

Our licensing model is designed for transparency and trust. It gives you full ownership of the core platform while protecting the intellectual property of our advanced, premium features.

-   #### 🔵 **Core Engine (MIT License)**
    The foundational boilerplate, including the project structure, build scripts, and all non-premium application code, is licensed under the **MIT License**.
    -   **What this means:** You have complete freedom. You can modify, distribute, and use this core code for any purpose. You truly own your factory.
    -   See the `LICENSE.md` file in the root directory for full details.

-   #### 💎 **Premium Modules (Commercial License)**
    Advanced functionalities (e.g., E-commerce, CRM, advanced analytics) are located in the `apps/payload/src/collections/premium/` directory. This code is proprietary and governed by a **Commercial License**.
    -   **What this means:** You are granted a license to use this code on your instance as part of an active subscription. You may not copy, modify, or redistribute this code.
    -   See the `apps/payload/src/collections/premium/LICENSE.commercial.md` file for details.

## 🚀 Getting Started

### 1. Development Environment Setup

This project is standardized on an AI-first workflow.

-   **Required Editor:** [**Cursor**](https://cursor.sh/). This AI-native editor is mandatory for all contributors.
-   **System Tools:**
    -   [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose
    -   [Node.js](https://nodejs.org/en/) (v18+ recommended)
    -   `make` (On Windows, this is available through Git Bash, which is our recommended terminal).

### 2. Clone and Configure

```bash
# Clone the repository
git clone https://github.com/gtfb/altrp-boilerplate.git
cd altrp-boilerplate

# This is a critical step. Copy the template and fill in your secrets.
cp .env.template .env
```

Now, open the `.env` file and provide values for all variables. Use `openssl rand -hex 32` to generate secure secrets.

### 3. Launch The Factory

We use a `Makefile` to simplify common commands.

```bash
# Build and launch all services in detached mode.
make up
```

This single command reads the `docker-compose.yml` file and starts all services.

### 4. Accessing Services

Once the containers are up, Traefik will route traffic to your services.

| Service               | URL                       | Description                      |
| :-------------------- | :------------------------ | :------------------------------- |
| **Traefik Dashboard** | `http://localhost:8080`   | The source of truth for routing. |
| **Website (Next.js)** | `http://frontend.localhost` | Your public-facing website.      |
| **Admin Panel (Payload)**| `http://payload.localhost`  | Headless CMS and admin UI.       |
| **Automation (n8n)**  | `http://n8n.localhost`      | Workflow automation engine.      |
| **Analytics (Metabase)**| `http://metabase.localhost` | Business intelligence and dashboards. |

### Useful Commands

| Command         | Description                                     |
| :-------------- | :---------------------------------------------- |
| `make up`       | Starts all services.                            |
| `make down`     | Stops and removes all services and volumes.     |
| `make logs`     | Tails the logs for all running services.        |
| `make test`     | Runs all unit and integration tests in the monorepo. |
| `make shell`    | Opens a bash shell inside the Payload CMS container. |

## 🏗️ Project Structure Overview

This repository is a [Turborepo](https://turborepo.org/) monorepo. Here is a map of the key directories:

```.
├── .github/        # CI/CD workflows for GitHub Actions
├── .vscode/        # Recommended VS Code/Cursor settings
├── apps/           # Individual applications (Frontend, Payload, AI-Service)
│   ├── frontend/
│   └── payload/
├── database/       # Database state, migrations, and seed scripts
├── docs/           # High-level architectural documentation (ADRs)
├── packages/       # Shared code (crypto, UI components)
├── prompts/        # Library of vetted prompts for Cursor
├── scripts/        # Automation scripts (init-project.sh, update.sh)
├── Makefile        # Shortcuts for common development commands
└── ...
```

## 🤝 How to Contribute

We operate on a clear set of principles. Adherence is not optional.

### Our Engineering Philosophy

-   **🏍️ Build Motorcycles, Don't Reinvent Wheels:** 90% of our work is integrating the best open-source tools. 10% is the "glue" that makes them a cohesive system.
-   **🤖 AI is Your Mandatory Copilot:** Mastery of Cursor is required. You are the architect; AI is your junior engineer. Use our `/prompts` library.
-   **🎯 DoD is Sacred:** Our Definition of Done is **Working Code + Automated Tests + Continuous Documentation**. No exceptions.
-   **🏗️ Architecture > Elegant Code:** A simple, working function in a brilliant architecture is infinitely more valuable than a complex function that solves a local problem.
-   **🛡️ Respect the Boundaries:** Code within the `apps/payload/src/collections/premium/` directory is proprietary and must not be modified in public pull requests without explicit permission.
-   **💬 Async Communication, Clean Commits:** Formulate your thoughts fully in writing. Your git commits must be clean and descriptive (`feat(payload): ...`).
-   **🔥 Radical Ownership:** "It worked on my machine" is not an excuse. You are responsible for your code from your editor to production.

### Your First Pull Request

1.  **Fork** the repository.
2.  **Find an issue** to work on (we recommend one tagged `good first issue`). Announce that you are taking it.
3.  **Create a new branch:** `git checkout -b feat/my-awesome-feature`.
4.  **Write your code**, add tests, and update documentation.
5.  **Ensure all checks pass** locally: `make test` and `make lint`.
6.  **Submit a Pull Request (PR)** to our `main` branch, linking the issue you're solving.

We will review it based on these principles.

---

## ©️ Licenses

This project utilizes a dual-license model. The core framework is licensed under the **MIT License**, while premium modules are under a separate **Commercial License**. See the [Licensing Model](#-licensing-model-own-the-core-subscribe-to-power) section above for details.
```
