qa: lint format-check typecheck tokens-check icons-check vanilla-types-check test-unit ## QA rapide : lint, format, types, générés à jour, tests unitaires

lint: ## ESLint
	$(RUN) yarn lint

lint-fix: ## ESLint avec correction automatique
	$(RUN) yarn lint:fix

format: ## Prettier (écriture)
	$(RUN) yarn format

format-check: ## Prettier (vérification)
	$(RUN) yarn format:check

typecheck: ## Vérification des types (TypeScript, Vue et JS vanilla)
	$(RUN) yarn typecheck

tokens-check: ## Échoue si les fichiers générés depuis les tokens ne sont plus à jour
	$(RUN) yarn tokens:check

vanilla-types-check: ## Échoue si packages/vanilla/types ne correspond plus aux sources JS
	$(RUN) yarn -s vanilla:types:check

icons-check: ## Échoue si le sprite ou le type des noms ne correspondent plus à icons.json
	$(RUN) yarn icons:check

test-unit: ## Tests unitaires : générateur de tokens et parité HTML React, Vue et CSS
	$(RUN) yarn test:unit

test-a11y: ## Tests axe de chaque histoire du Storybook construit, en mode standard et renforcé
	$(RUN) yarn test:a11y

.PHONY: qa lint lint-fix format format-check typecheck tokens-check icons-check vanilla-types-check test-unit test-a11y
