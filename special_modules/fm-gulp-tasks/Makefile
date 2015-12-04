TESTS = test/lib/*

npm-test: lint test

lint:
	./node_modules/.bin/jshint ./ && ./node_modules/.bin/jscs ./

test:
	@echo "Running tests..."
	@NODE_ENV=test ./node_modules/.bin/mocha \
		$(TESTS) \
		--bail

.PHONY: test