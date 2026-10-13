UID := $(shell id -u)
GID := $(shell id -g)
PLAYWRIGHT_VERSION := $(shell sed -n 's/.*"@playwright\/test": "\([0-9.]*\)".*/\1/p' package.json)
export UID GID PLAYWRIGHT_VERSION
RUN := docker compose run --rm node

include Makefile.qa.mk

help: ## Affiche cette aide
	@grep -hE '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Construit l'image de dev, installe les dépendances dans son volume et branche le hook git
	docker compose build node
	$(RUN) yarn install --frozen-lockfile
	git config core.hooksPath .githooks

up: ## Lance le Storybook en développement (http://localhost:6006)
	docker compose run --rm --service-ports node yarn storybook --host 0.0.0.0 --no-open

storybook-build: ## Construit le Storybook statique dans apps/storybook/storybook-static
	$(RUN) yarn storybook:build

tokens: ## Génère les variables CSS et les adaptateurs MUI, Vuetify et Tailwind depuis les tokens
	$(RUN) yarn tokens

icons: ## Génère le sprite et le type des noms d'icônes depuis packages/css/icons/icons.json
	$(RUN) yarn icons

lint-staged: ## Vérifie les fichiers indexés (appelé par le hook pre-commit)
	$(RUN) yarn lint-staged

down: ## Arrête les conteneurs
	docker compose down --remove-orphans

.PHONY: help install up storybook-build tokens icons lint-staged down
