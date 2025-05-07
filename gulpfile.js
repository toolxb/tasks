"use strict"
const { task, src, dest, watch, series } = require("gulp");
const {ensureDir} = require("fs-extra");
const imagemin = require("gulp-imagemin");
const webp = require("webp-converter");
const tap = require("gulp-tap");

// our dirs
const root = "app";
const output_root = `${root}/output`;
const input_root = `${root}/input`

const jsonPaths = {
  images: {
    input: `${input_root}/images/`,
    output: `${output_root}/images/`
  }
}

webp.grant_permission();

/* principal task to create all 
   directories for initial projects */
const dirTask = () => {
  return ensureDir(jsonPaths.images.input)
  .then( () => ensureDir(jsonPaths.images.output) )
}

const imagesTask = () => {
  return src(`${jsonPaths.images.input}**/*`)
    .pipe(imagemin({ verbose: false }))
    .pipe(tap(function (file) {
      const fileExt = file.extname;
      const fileName = file.stem;
      if (fileExt == '.gif')
        webp.gwebp(file.path, jsonPaths.images.output + file[0] + '.webp')
      else
        webp.cwebp(file.path, jsonPaths.images.output + fileName + '.webp', '-q 80')
      
      console.log(`File has been proccessed: ${fileName}.webp`)
    }))
}

exports.default = series(dirTask, imagesTask)