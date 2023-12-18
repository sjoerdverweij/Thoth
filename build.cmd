setlocal enableextensions
set thothbuild=.\build
if exist %thothbuild%\. goto buildFolderExists
md %thothbuild%
:buildFolderExists
if exist %thothbuild%\images\. goto imagesFolderExists
md %thothbuild%\images
:imagesFolderExists
del /y %thothbuild%\images\*.*
copy images\*.* %thothbuild%\images
del /y %thothbuild%\*.*
copy manifest.json %thothbuild%
copy license %thothbuild%
cmd /c uglifyjs content.js -m -c --toplevel -o %thothbuild%\content.js
cmd /c uglifyjs background.js -m -c --toplevel -o %thothbuild%\background.js
cmd /c uglifyjs options.js -m -c -o %thothbuild%\options.js
cmd /c uglifyjs thoth-popup.js -m -c -o %thothbuild%\thoth-popup.js
cmd /c html-minifier --collapse-inline-tag-whitespace --collapse-whitespace --remove-tag-whitespace --remove-comments --minify-css true options.html -o %thothbuild%\options.html
cmd /c cleancss -O2 thoth.css -o %thothbuild%\thoth.css
