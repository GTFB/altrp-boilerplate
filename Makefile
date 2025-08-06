# ===================================================================
# Altrp Boilerplate - Makefile
# Description: Provides simple shortcuts for common project commands.
# ===================================================================

.DEFAULT_GOAL := help

# Docker Compose Commands
up: ## Build and start all services in detached mode (DOMAIN=altrp.localhost by default)
	@echo "🔧 Checking .env file..."
	@if [ ! -f .env ]; then \
		echo "📝 .env file not found, generating with domain: $(if $(DOMAIN),$(DOMAIN),altrp.localhost)"; \
		cd scripts && ./setup.sh -d $(if $(DOMAIN),$(DOMAIN),altrp.localhost); \
		cd ..; \
	else \
		echo "✅ .env file already exists"; \
	fi
	@echo "🚀 Starting all services..."
	docker compose up --build -d

down: ## Stop and remove all services, volumes, and networks
	@echo "🛑 Stopping and removing all services..."
	docker compose down -v

setup: ## Generate .env file from template (DOMAIN=altrp.localhost by default)
	@echo "📝 Generating .env file with domain: $(if $(DOMAIN),$(DOMAIN),altrp.localhost)"
	@cd scripts && ./setup.sh -d $(if $(DOMAIN),$(DOMAIN),altrp.localhost)

reset-env: ## Remove existing .env file and regenerate it
	@echo "🗑️ Removing existing .env file..."
	@rm -f .env
	@$(MAKE) setup DOMAIN=$(if $(DOMAIN),$(DOMAIN),altrp.localhost)

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