#!/bin/bash

# ===================================================================================
# Altrp Boilerplate - Client Setup Script
# Version: 1.1 (Added MASTRA_API_KEY generation)
# Description: This script configures a cloned boilerplate for a new client project.
#              It generates the .env file and helps set up Git remotes for updates.
# ===================================================================================

# --- Color Definitions ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# --- Main Script Logic ---
main() {
    clear
    echo -e "${BLUE}====================================================${NC}"
    echo -e "${BLUE}  🚀 Welcome to the Altrp Project Setup Script  🚀   ${NC}"
    echo -e "${BLUE}====================================================${NC}"
    echo
    echo "This script will configure your cloned repository to work as a standalone project"
    echo "while keeping a link to the original template for future updates."
    echo

    # 1. Check for existing .env file
    if [ -f ".env" ]; then
        echo -e "${YELLOW}⚠️  An .env file already exists.${NC}"
        read -p "Do you want to overwrite it? This cannot be undone. (y/n): " OVERWRITE_ENV
        if [[ "$OVERWRITE_ENV" != "y" ]]; then
            echo "Setup aborted by user."
            exit 0
        fi
    fi

    # 2. Generate Secrets
    echo -e "${YELLOW}🔑 Generating unique secrets...${NC}"
    PAYLOAD_SECRET=$(openssl rand -hex 32)
    POSTGRES_PASSWORD=$(openssl rand -hex 24)
    N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)
    MASTRA_API_KEY=$(openssl rand -hex 32) # <-- ДОБАВЛЕНА ЭТА СТРОКА
    echo -e "${GREEN}✅ Secrets generated.${NC}"

    # 3. Create and Configure .env file
    echo -e "${YELLOW}📝 Creating and configuring the .env file...${NC}"
    cp .env.template .env
    sed -i.bak "s|{GENERATE_PAYLOAD_SECRET}|${PAYLOAD_SECRET}|g" .env
    sed -i.bak "s|{GENERATE_POSTGRES_PASSWORD}|${POSTGRES_PASSWORD}|g" .env
    sed -i.bak "s|{GENERATE_N8N_ENCRYPTION_KEY}|${N8N_ENCRYPTION_KEY}|g" .env
    sed -i.bak "s|{GENERATE_MASTRA_API_KEY}|${MASTRA_API_KEY}|g" .env # <-- И ДОБАВЛЕНА ЭТА СТРОКА
    rm .env.bak
    echo -e "${GREEN}✅ .env file configured successfully.${NC}"

    # 4. Configure Git Remotes
    echo
    echo -e "${YELLOW}🔗 Configuring Git remotes...${NC}"
    read -p "Enter the SSH or HTTPS URL of YOUR new empty Git repository (e.g., git@github.com:user/my-project.git): " NEW_REPO_URL
    if [[ -n "$NEW_REPO_URL" ]]; then
        git remote rename origin upstream
        git remote add origin "$NEW_REPO_URL"
        echo -e "${GREEN}✅ Git remotes have been set up.${NC}"
        echo "Your project is now linked to your repository. The original template is available as 'upstream'."
        echo "You can now run 'git push -u origin main' to push the initial code to your repository."
    else
        echo -e "${YELLOW}⚠️  No repository URL provided. Skipping Git remote configuration.${NC}"
        echo "You can set it up manually later."
    fi

    # 5. Final Success Message
    echo
    echo -e "${GREEN}====================================================${NC}"
    echo -e "${GREEN}  🎉 Your project is successfully configured! 🎉   ${NC}"
    echo -e "${GREEN}====================================================${NC}"
    echo
    echo "Next steps:"
    echo -e "1. Start all services: ${YELLOW}make up${NC} or ${YELLOW}docker compose up --build -d${NC}"
    echo "2. Push the code to your new repository: ${YELLOW}git push -u origin main${NC}"
    echo
}

# --- Run the main function ---
main