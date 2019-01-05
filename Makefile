REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		./documentation/**/*.md \
		./test/**/*.js

.PHONY: test

test-browser:
	@./node_modules/.bin/serve .

.PHONY: test-browser
