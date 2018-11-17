const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const compass = require('gulp-compass');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

function plumberError( error ){
	console.log( '[' + error.plugin + ']: ' + error.message );
	this.emit( 'end' );
}

gulp.task('css', function(){
	return gulp.src([
		'./sass/*.scss'
	]).pipe(plumber( plumberError )).pipe( 
		compass({
			css: './css/',
			sass: './sass/',
			image: './images/'
		}) 
	).pipe( 
		autoprefixer({ browsers: [
			'last 2 version', 
			'safari 5',
			'ie 7', 'ie 8', 'ie 9', 
			'opera 12.1', 
			'ios 6', 'android 4'
		]})
	).pipe(
		cleanCSS()
	).pipe( 
		gulp.dest('./css/')
	);
});

function js( name, files ){
	return gulp.src( files ).pipe(plumber( plumberError )).pipe( 
		concat(name + '.min.js')
	).pipe( 
		babel({
			presets: ['es2015']
		})
	).pipe(minify({
        ext: { min: '.js' }
    })).pipe(
		uglify()
	).pipe( 
		gulp.dest('./scripts/')
	);
}

gulp.task('js-utilities', function(){
	return js('utilities', [
		'./node_modules/babel-polyfill/dist/polyfill.min.js',
		'./scripts/maximised/utilities/_core.js',
		'./scripts/maximised/utilities/*.js'
	]);
});

gulp.task('js-scripts', function(){
	return js('scripts', [
		'./scripts/maximised/*.js'
	]);
});

gulp.task('js-modules', function(){
	return js('modules', [
		'./scripts/maximised/modules/*.js'
	]);
});

gulp.task('js', function(){
	return [ 
		gulp.start('js-scripts'), 
		gulp.start('js-modules'), 
		gulp.start('js-utilities')
	];
});

gulp.task('watch', function(){ 
	gulp.start('default');
	watch('sass/*.scss', function(){ gulp.start('css') }); 
	watch('scripts/maximised/modules/*.js', function(){ gulp.start('js-modules') });
	watch('scripts/maximised/utilities/*.js', function(){ gulp.start('js-utilities') });
	watch('scripts/maximised/*.js', function(){ gulp.start('js-scripts') });
});

gulp.task('default', function(){ 
	return [ 
		gulp.start('css'), 
		gulp.start('js')
	]; 
});