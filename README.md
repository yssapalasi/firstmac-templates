# Outfit Starter Templates

Some blank basic templates for use in the Outfit application

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

You should now have a ./build folder containing the built templates and stylesheets

You should also have a local server on port 4000


The default build env is 'development' to build for production just pass the flag
```
gulp build --type production
```

To publish to gh-pages
```
gulp publish --type production
```
