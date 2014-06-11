# Outfit Starter Templates

Some blank basic templates for use in the Outfit application

[Check them out](http://net-engine.github.io/outfit-starter-templates/)

## Ok, how do I use these?

### No mess no fuss (more manual)

* Clone the repo and copy anything you want from the `build` directory
* Edit as you see fit
* Host your images, css and js somewhere (dropbox, amazon simple storage, google drive)
* And you're good to go!

### Something more... automated

Use the build process we have here.

[Fork](https://github.com/net-engine/outfit-starter-templates/fork) this repo. Clone it and then:

You'll need [node](http://nodejs.org/). Once you've got it make sure to install gulp globally

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
