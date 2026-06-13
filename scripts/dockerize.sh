#!/bin/bash

set -eu

# Check if artifacts.zip exists
if [ -f "artifacts.zip" ]; then
    echo "artifacts.zip found. Attempting to unzip..."
    unzip artifacts.zip || {
        echo "Warning: Failed to unzip artifacts.zip. Continuing anyway..."
    }
else
    echo "Warning: artifacts.zip not found. Skipping unzip step..."
fi

# Add Kaniko authentication
cp "$REGISTRY_AUTH" /kaniko/.docker/config.json

# Determine Dockerfile path and .env destination
DOCKERFILE_PATH="$CI_PROJECT_DIR/Dockerfile"
ENV_DEST="$CI_PROJECT_DIR/.env"

if [ -n "${DOCKERFILE_DIR:-}" ] && [ -f "$CI_PROJECT_DIR/$DOCKERFILE_DIR/Dockerfile" ]; then
    DOCKERFILE_PATH="$CI_PROJECT_DIR/$DOCKERFILE_DIR/Dockerfile"
    echo "Using Dockerfile at: $DOCKERFILE_PATH"
fi

# Check if ENV_FILE exists and copy
if [ -n "${ENV_FILE:-}" ] && [ -f "${ENV_FILE:-}" ]; then
    echo "Copying env file to: $ENV_DEST"
    cp "$ENV_FILE" "$ENV_DEST"
else
    echo "Warning: ENV file not found. Skipping copy..."
fi

# Use Kaniko to build image
/kaniko/executor \
    --context "$CI_PROJECT_DIR" \
    --dockerfile "$DOCKERFILE_PATH" \
    --destination "$REGISTRY:$CI_COMMIT_SHORT_SHA"
