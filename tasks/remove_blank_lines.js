/*
 * grunt-remove-blank-lines
 * https://github.com/paipeng/grunt-remove-blank-lines
 *
 * Copyright (c) 2015 Pai Peng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var multilineTrim = function (htmlString) {
        // split the string into an array by line separator
        var arr = htmlString.split("\n");
        // call $.trim on each line
        arr = arr.map(function (val) {
            if (val.trim() === "") {
                return val.trim();
            } else {
                return val;
            }
        });
        // filter out the empty lines
        arr = arr.filter(function (line) {
                return line != ""
            }
        );
        // join the array of lines back into a string
        return arr.join("\n");
    }
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('remove_blank_lines', 'Remove blank lines', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: '\n'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));


      // Write the destination file.
      grunt.file.write(f.dest, multilineTrim(src));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
