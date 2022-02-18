.PHONY: clean
clean: # remove all node_modules and .next folders in the codebase
	npx rimraf ./**/node_modules ./**/.next
