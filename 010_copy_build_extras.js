#!/usr/bin/env node

var fs = require('fs');

var rootdir = process.argv[2];
var android_dir = `${rootdir}/platforms/android`;
var gradle_filename = 'build-extras.gradle';
var gradle_file = `${rootdir}/${gradle_filename}`;
if (fs.existsSync(android_dir) && fs.existsSync(gradle_file)) {
  fs.createReadStream(gradle_file)
    .pipe(fs.createWriteStream(`${android_dir}/${gradle_filename}`));
}
