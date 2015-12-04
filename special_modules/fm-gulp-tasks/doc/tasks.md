# Csstime Gulp tasks

Here is available tasks which you can see after `gulp --tasks`:

High level tasks:

| Name						| Dependencies																												|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `csstime-mode-release`	| `csstime-process-static`,<br>`csstime-process-assets`,<br>`csstime-minify-css`,<br>`csstime-remove-tmp`					|
| `csstime-mode-debug`		| `csstime-process-static`,<br>`csstime-process-assets`																		|
| `csstime-mode-watch`		| `csstime-process-static`,<br>`csstime-process-assets`																		|
| `csstime-exec-csscomb`    | -

Combining tasks:

| Name						| Dependencies																															|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `csstime-process-all` 	| `csstime-process-static`,<br>`csstime-process-assets`																													|
| `csstime-process-static`	| `csstime-copy-static`																													|
| `csstime-process-assets`	| `csstime-handle-css`,<br>`csstime-collect-images`,<br>`csstime-collect-fonts`,<br>`csstime-collect-svg`,<br>`csstime-combine-svg`,<br>`csstime-collect-other`	|

Low level tasks:

| Name						| Direction and description																				| Result																|
|---------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `csstime-copy-static`		| `/static` => `/build`<br>Copy static files without any changes								                    | same files															|
| `csstime-collect-sprites`	| `/src/components/**/assets/sprites` => `/public`<br>Build and optimize sprites									| `__csstime-tmp/sprites.less`,<br>`build/assets/sprites.png`			|
| `csstime-collect-images`	| `/src/components/**/assets/images` => `/build/assets/*/images`<br>Copy and optimize images				        | optimized images														|
| `csstime-collect-fonts`	| `/src/components/**/assets/fonts` => `/build/assets/*/fonts`<br>Copy fonts								        | same fonts															|
| `csstime-collect-svg`	    | `/src/components/**/assets/svg` => `/build/assets/*/svg`<br>Copy svg, optimise and rasterize them		            | optimised svg, png fallbacks											|
| `csstime-combine-svg`	    | `/src/components/**/assets/symbols` => `/build/assets/symbols.svg`<br>Combine svg             		            | optimised and combined svg											|
| `csstime-collect-other`	| `/src/components/**/assets/other` => `/build/assets/*/other`<br>Copy files								        | same files															|
| `csstime-concat-less`		| `/src/components/**/assets/less` => `/build/__csstime-tmp`<br>Create main less file with import references	    | `styles.less`															|
| `csstime-compile-less`	| `/build/__csstime-tmp` => `/build`<br>Compile less											                    | compiled `styles.css`													|
| `csstime-handle-css`		| `/src/components/**/assets/css` => `/build`<br>Collect styles.css<br>`/build` => `/build`<br>Handle css (postcss processes), add Normalize.css	| append styles from `src/components/**/assets/css`<br>and processed `styles.css`	|
| `csstime-minify-css`		| `/build` => `/build`<br>Minify css (csso)												                            | minified `styles.css`													|
| `csstime-minify-js`		| `/build` => `/build`<br>Minify js (uglify)											                            | minified `*.js`														|
| `csstime-publish-tmp`		| `/build/__csstime-tmp/build`<br>Build all assets to temporary directory and move to destination directory         | 																		|
| `csstime-remove-tmp`		| `/build/__csstime-tmp`<br>Remove temporary files														            | 																		|
| `csstime-remove-tmp-styles`| `/build/__csstime-tmp/styles.less`<br>Remove tmp styles files			                                        | 																		|
| `csstime-remove-tmp-sprites`| `/build/__csstime-tmp/sprites.less`<br>Remove tmp sprites files	                                                | 																		|
| `csstime-clean`			| `/build/__csstime-tmp`,<br>`/build`<br>Remove created directories							                        | 																		|
| `csstime-clean-tmp`		| `/build/__csstime-tmp`<br>Remove temporary directory          							                        | 																		|
| `csstime-exec-csscomb`	| `/src/components`<br>Refactor styles							    									            | updated styles														|
