#!/bin/bash

# ===================================================================================
# Altrp Boilerplate - Project Updater
# Version: 1.0
# Description: This script safely fetches and merges updates from the original
#              Altrp Boilerplate repository ('upstream'). It handles clean merges
#              automatically and provides clear instructions for conflict resolution.
# ===================================================================================

# --- Configuration & Color Definitions ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# --- Main Script Logic ---
main() {
    clear
    echo -e "${BLUE}====================================================${NC}"
    echo -e "${BLUE}  🚀 Altrp Project Updater  🚀  ${NC}"
    echo -e "${BLUE}====================================================${NC}"
    echo

    # 1. Pre-flight Checks: Ensure a safe environment for updates
    echo -e "${YELLOW}Step 1: Performing pre-flight safety checks...${NC}"

    # Check 1: Are we in a Git repository?
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo -e "${RED}Error: This is not a Git repository. Update script aborted.${NC}"
        exit 1
    fi

    # Check 2: Does the 'upstream' remote exist?
    if ! git remote get-url upstream > /dev/null 2>&1; then
        echo -e "${RED}Error: 'upstream' remote not found.${NC}"
        echo "This project may not have been configured correctly. Please run the setup script or add the upstream remote manually:"
        echo -e "${YELLOW}git remote add upstream https://github.com/gtfb/altrp-boilerplate.git${NC}"
        exit 1
    fi

    # Check 3: Is the working directory clean?
    if ! git diff --quiet HEAD; then
        echo -e "${RED}Error: You have uncommitted changes.${NC}"
        echo "Please commit or stash your changes before running the update script."
        exit 1
    fi
    echo -e "${GREEN}✅ Safety checks passed.${NC}"
    echo

    # 2. Fetch Updates
    echo -e "${YELLOW}Step 2: Fetching latest updates from the Altrp Boilerplate...${NC}"
    git fetch upstream
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Failed to fetch updates from 'upstream'. Please check your internet connection.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Updates fetched successfully.${NC}"
    echo

    # 3. Attempt to Merge
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo -e "${YELLOW}Step 3: Attempting to merge updates into your current branch ('${CURRENT_BRANCH}')...${NC}"

    # The merge command itself. We capture its output and exit code.
    if git merge upstream/main; then
        # SUCCESS PATH
        echo -e "${GREEN}✅ Merge completed successfully (fast-forward or auto-merge).${NC}"
        echo

        # 4. Update Dependencies
        echo -e "${YELLOW}Step 4: Updating project dependencies...${NC}"
        npm install
        echo -e "${GREEN}✅ Dependencies updated.${NC}"
        echo

        # 5. Final Success Message
        echo -e "${GREEN}====================================================${NC}"
        echo -e "${GREEN}  🎉 Your project has been successfully updated! 🎉   ${NC}"
        echo -e "${GREEN}====================================================${NC}"
        echo
        echo "What's next?"
        echo "1. Review the changes with 'git log'."
        echo "2. Run your tests to ensure everything works as expected: 'make test'."
        echo "3. Push the updated code to your repository: 'git push'."
        echo
    else
        # CONFLICT PATH
        echo
        echo -e "${RED}====================================================${NC}"
        echo -e "${RED}  🛑 ACTION REQUIRED: Merge Conflicts Detected  🛑   ${NC}"
        echo -e "${RED}====================================================${NC}"
        echo
        echo "The script could not merge automatically because some of your local changes"
        echo "conflict with the updates from the boilerplate."
        echo
        echo -e "${YELLOW}Please follow these steps to resolve the conflicts:${NC}"
        echo "1. Open the project in your code editor (Cursor, VS Code, etc.)."
        echo "2. Look for files marked with 'C' (Conflict) in the source control panel."
        echo "3. Open these files and resolve the conflicts marked with '<<<<<', '=====', '>>>>>'."
        echo "4. After resolving all conflicts in a file, save it."
        echo "5. Once all files are resolved, stage them by running: ${YELLOW}git add .${NC}"
        echo "6. Finalize the merge by creating a commit: ${YELLOW}git commit${NC} (you can just save the default message)."
        echo "7. **IMPORTANT**: After the commit, manually update dependencies: ${YELLOW}npm install${NC}"
        echo
        echo "The update process is paused until you complete these steps."
        exit 1
    fi
}

# --- Run the main function ---
main