# Outfit Starter Templates

Some blank basic templates for use in the Outfit application

[Check them out](http://net-engine.github.io/outfit-starter-templates/)

## No mess no fuss (more manual)

* Download the starter pack
* Edit as you see fit
* Host your images, css and js somewhere (dropbox, amazon simple storage, google drive)
* And you're good to go!

## Something more... automated

Use the build process we have here

You'll need node and npm

Once you've got them make sure to install gulp globally

```
npm install gulp -g
```

Then install the dependencies

```
npm install
```

Then run
```
gulp
```

You should now have a ./.tmp folder containing the built templates and stylesheets

You should also have a local server on port 4000 (http://localhost:4000/)


To build for production
```
gulp build-production
```

To publish to gh-pages
```
gulp publish
```
