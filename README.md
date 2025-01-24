# Portfolio 
I needed to learn typescript for a project of ecole 42. What could be a better way than writing a little game like train you can move around? Even better, use it as my Portfolio! Currently it is hosted at fleanegan.github.io/portfolio/index.html

# Tests
The code is unit tested using the test framework jest
```
Npm run test
```

# Launch a local instance
The project uses Webpack to bundle the code. By running 
```
npx webpack --config=webpack.config.js
Npm run dev
```
you can create a local server, running on port 8080. In order to match github page's nomenclature, the index lies at localhost:8080/portfolio/

# Publishing a release
git switch <branch name configured in github pages>
git merge main
npx webpack --config=webpack.config.js
git add dist -f
git commit
git subtree push --prefix dist origin <branch name configured in github pages>
