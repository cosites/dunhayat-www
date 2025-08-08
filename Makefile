.PHONY: help install dev build preview audit lint format clean purge

help:
	@echo "Available commands:"
	@echo "  install           - Install dependencies with Bun"
	@echo "  dev               - Start Astro development server"
	@echo "  build             - Build Astro project for production"
	@echo "  preview           - Preview Astro production build"
	@echo "  audit             - Check for outdated dependencies"
	@echo "  lint              - Run linter (if configured)"
	@echo "  format            - Format code (if configured)"
	@echo "  clean             - Clean build artefacts"
	@echo "  purge             - Purge all dependencies and build artefacts"

install:
	@echo "Installing dependencies with Bun..."
	@bun install

dev:
	@echo "Starting Astro development server..."
	@bun run dev

build:
	@echo "Building Astro project for production..."
	@bun run build

preview:
	@echo "Starting Astro preview server..."
	@bun run preview

audit:
	@if [ ! -f "bun.lock" ]; then \
		echo "No lockfile found. Installing dependencies first..."; \
		bun install; \
	fi
	@echo "Checking for outdated dependencies..."
	@if bun outdated | grep -qi "latest"; then \
		echo; \
		echo "To update dependencies, run: bun update --latest"; \
	else \
		echo "No outdated dependencies found"; \
	fi
	@echo
	@echo "Running audit..."
	@bun audit

lint:
	@echo "Running linting..."
	@if [ -f "package.json" ] && grep -q "\"lint\"" package.json; then \
		bun run lint; \
		echo "For auto-fixing issues, run: bun run lint:fix"; \
	else \
		echo "No lint script found in package.json"; \
		echo "Consider adding ESLint or similar linting tool"; \
	fi

format:
	@echo "Formatting code..."
	@if [ -f "package.json" ] && grep -q "\"format\"" package.json; then \
		bun run format; \
	else \
		echo "No format script found in package.json"; \
		echo "Consider adding Prettier or similar formatting tool"; \
	fi

clean:
	@echo "Cleaning build artefacts..."
	rm -rf dist/
	rm -rf .astro/
	rm -rf node_modules/.vite/

purge:
	@echo "Purging all dependencies and build artefacts..."
	rm -rf dist/
	rm -rf .astro/
	rm -rf node_modules/
	rm -f bun.lock
