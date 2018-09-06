# ACM Website

> A static website generator for TCNJ's ACM club website.

## Setup

Clone the repository:

```sh
$ git clone https://github.com/tcnj-acm/acm-website.git
```

Install [npm](https://www.npmjs.com/get-npm) if you don't have it.

Install the dependencies:

```sh
$ cd acm-website
$ npm install
$ sudo npm i gulp@4.0.0 -g
```

## Building

Build in the `acm-website` folder:

```sh
$ gulp
```

The generated website will be in a folder named `dist`.

Run the following command to delete the `dist` folder:

```sh
$ gulp clean
```

## Development

Automatically recompile the website when changes are made:

```sh
$ gulp watch
```

Press `CTRL+C` to kill the process.

### Layouts

The layouts are written in the [Handlebars](http://handlebarsjs.com) templating language
and each layout file in the `layout` folder starts with [YAML](http://yaml.org) [Front Matter](https://jekyllrb.com/docs/front-matter) metadata which is used by the page.

Every layout in the `layout/pages` folder is embedded in the `layout/html.hbs` layout.

The layouts in the `layout/pages` folder are automatically added to the website navigation in alphabetical order, with the exception of the home page which is always first.
This is done in the `gulpfile.js`.

Add external links in the front matter metadata of `layout/html.hbs`.

### CSS and JavaScript

CSS and JavaScript files are automatically included in the HTML based on their names.

`css/all.css` and `js/all.js` are automatically included in each HTML page if they exist.

`css/<page name>.css` and `js/<page name>.js` are also included in each page name if they exist.
For example, since `css/index.css` exists it is automatically included in `layout/pages/index.hbs`.

### Images

Square PNG images of E-Board members should be placed in the `img/people` folder and named based on their position title in the
metadata of the `layout/pages/about.hbs` in dash-case. For example, the Vice Presidents image filename would be `img/people/vice-president.png`.

## Deploying

In order to deploy the website to https://tcnj.edu/~acm use [tcnj-deploy](https://github.com/TomerAberbach/tcnj-deploy).

Deploy in the `acm-website` folder:

```sh
$ ./tcnj-deploy dist
```

Enter the ACM username and password when prompted.