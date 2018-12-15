# Template

This repository contains an empty single page with the CNN template, CSS and Javascript already set up. Please refer to source files for more information about the specifics of Javascript, CSS and HTML in this template. The following files are also available and contain useful information about the setup and style used by our development team:

	- About Continuous Integration
	- About Gulp
	- About Javascript
	- About Standards and Practices
	- About Tracking
	- Style Guide

## Tools

There are helpful tools available to create an exact replicae of our development environment using Gulp, Vagrant, ... You can find these and more info on this in the `/tools` folder. **The tools folder should never be copied to a live site.**

## Structure

	| - index.html
	| - css
	| | - sass
	| - scripts
	| | - maximised
	| - images
	| - resources
	| - Gulpfile.js
	| - package.json

Use the `resources` folder for storing page-specific resources (preferably in a page-specific foler nested in `resources`). Use the `images` folder for storing shared images between pages (like logos, etc...). When making sites with multiply pages, it might be best to either nest them in seperate folder (so there are no ugly `.html` extensions required) or import them using AJAX and Javascript (be aware of tracking requirement on these, see `About Tracking`).

## Gulp

### Requirements:

#### Compass Framework

Requires Ruby to be installed. Use the following commands:

	$ gem update --system
	$ gem install compass

For more information on compass, see: http://compass-style.org/install/

#### NodeJS

Either install node using an installer from https://nodejs.org/, or install NVM (Node Version Manager) for easier future control. Instruction can be found at: https://github.com/creationix/nvm

#### Gulp CLI

You will need the Gulp Command Line Interface installed to make use of gulp. Use the following command:

	$ npm install --global gulp-cli
	
### Running Gulp

The following gulp commands are available using our Gulpfile:

	$ gulp watch
	$ gulp css
	$ gulp js
	$ gulp compile
	$ gulp man

Use the `$ gulp man` command for more information. For more information, see `About Gulp`.

## Javascript

Javascript will be compiled to be compatible with older browsers. Some features (like `Promise` and `classList`) are already polyfilled, while others might still need to be added (add them in `__polyfill.js`). There are some basic functions available for scrolling and animating and other small useful features. For more information, see `About Javascript` and `Style Guide`.

## CSS

CSS will be compiled to use prefixes for older browsers where available, so you don't have to worry about them (so use only `transform` and not `-webkit-transform`, `-moz-transform`, ...). For more information, see `Style Guide`.

## CNN Basics

The CNN Header is required for every advertisement feature page on CNN. It should not be modified apart from amending the Sponsor name and URL. If these are not edited, this page it set up to not be tracked, and it will throw a warning to the console to remind you. For more information, see `About Standards and Practises`, as well as `About Tracking` for info on how to properly set up your page.