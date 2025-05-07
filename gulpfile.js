"use strict"
const { task, src, dest, watch, series } = require("gulp");
const {ensureDir} = require("fs-extra");

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

/* principal task to create all 
   directories for initial projects */
const dirTask = () => {
  return ensureDir(jsonPaths.images.input)
  .then( () => ensureDir(jsonPaths.images.output) )
}

exports.default = series(dirTask) 