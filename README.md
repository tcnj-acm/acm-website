# ACM Website

> A static website generator for TCNJ's ACM club website.

## Setup

Clone the repository:

```sh
$ git clone https://github.com/tcnj-acm/acm-website.git
```

Install [yarn](https://yarnpkg.com) if you don't have it.

Install the dependencies:

```sh
$ cd acm-website
$ yarn install
```

## Building

Build in the `acm-website` folder:

```sh
$ yarn start
```

The generated website will be in a folder named `dist`.

Run the following command to delete the `dist` folder:

```sh
$ yarn clean
```

## Development

Automatically recompile the website when changes are made:

```sh
$ yarn watch
```

Press `CTRL+C` to kill the process.

### Layouts

The layouts are written in the [Handlebars](http://handlebarsjs.com) templating language
and each layout file in the `layout` folder starts with [YAML](http://yaml.org) [Front Matter](https://jekyllrb.com/docs/front-matter) metadata which is used by the page.

Every layout in the `layout/pages` folder is embedded in the `layout/html.hbs` layout.

The layouts in the `layout/pages` folder are automatically added to the website navigation in alphabetical order, with the exception of the home page which is always first.
This is done in the `gulpfile.js`.

The `layout/pages/gallery.hbs` layout is automatically passed an array of image basenames read from the `img/gallery` folder in the `images` metadata variable.

Add external links in the front matter metadata of `layout/html.hbs`.

### CSS and JavaScript

CSS and JavaScript files are automatically included in the HTML based on their names.

`css/all.css` and `js/all.js` are automatically included in each HTML page if they exist.

`css/<page name>.css` and `js/<page name>.js` are also included in each page name if they exist.
For example, since `css/index.css` exists it is automatically included in `layout/pages/index.hbs`.

### Images

Square PNG images of E-Board members should be placed in the `img/people` folder and named based on their position title in the
metadata of the `layout/pages/about.hbs` in dash-case. For example, the Vice Presidents image filename would be `img/people/vice-president.png`.

Images of any type can be added to the Gallery page by adding them to the `img/gallery` folder.

## Deploying

In order to deploy the website to https://tcnj.edu/~acm use [tcnj-deploy](https://github.com/TomerAberbach/tcnj-deploy).

Deploy in the `acm-website` folder:

```sh
$ ./tcnj-deploy dist
```

Enter the ACM username and password when prompted.
