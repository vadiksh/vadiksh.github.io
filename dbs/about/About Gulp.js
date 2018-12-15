# About our Gulp

Gulp is used to compile our CSS and Javascript in ways that are compatible with most browsers, as well as compress the files.

## Set up Gulp

After installing node.js, Compass and the Gulp CLI on your system, you can install the local setup by using:

	npm install

This will create a `node_modules` folder which you can move around to other repositories if you want to save some space (instead of installing the same things multiple times).

## Javascript

Javascript will be transpiled from ES6 to ES2015, as well as minified and compressed. All the folder listed by default will also be compressed separately, and finally they will be combined into one humongous file called `all.min.js`, which is the best one to include with your site. Use the following command to compile javascript once:

	gulp js

## CSS

CSS will be compiled from SASS files into one big, compressed `style.css` file to be included with your site. Use the following command to compile css once:

	gulp css

## Watch

You can ask gulp to keep an eye out for changes to any of the source files and perform a compilation when changes occur by using the following command:

	gulp watch

To stop watching, cancel the command by using `Cmnd+C` or `Ctrl+C` to end the current process in your terminal.

## Manual

To read the manual on how you can use our gulp commands, use:

	gulp man