# ===================================================================
# Altrp Boilerplate - Makefile
# Description: Provides simple shortcuts for common project commands.
# ===================================================================

.DEFAULT_GOAL := help

# Docker Compose Commands
up: ## Build and start all services in detached mode
	@echo "🚀 Starting all services..."
	docker compose up --build -d

down: ## Stop and remove all services, volumes, and networks
	@echo "🛑 Stopping and removing all services..."
	docker compose down -v

logs: ## Follow logs for all services
	@echo "📜 Tailing logs..."
	docker compose logs -f

# Application-specific Commands
shell: ## Open a bash shell inside the Payload CMS container
	@echo "🐚 Opening shell into Payload container..."
	docker compose exec payload bash

# Monorepo Commands
test: ## Run all tests in the monorepo
	@echo "🧪 Running tests..."
	npm run test

lint: ## Lint all code in the monorepo
	@echo "🎨 Linting code..."
	npm run lint
    
help: ## Display this help screen
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'