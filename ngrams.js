/**
 * Created by tan50 on 24/10/2016.
 */
var _ = require('lodash');
function ngrams(sequence, n, startSymbol, endSymbol) {
  var result = [];

  if (!_(sequence).isArray()) {
    sequence = tokenize(sequence);
  }

  var count = _.max([0, sequence.length - n + 1]);

  // Check for left padding
  if (typeof startSymbol !== "undefined" && startSymbol !== null) {
    // Create an array of (n) start symbols
    var blanks = [];
    for (var i = 0; i < n; i++) {
      blanks.push(startSymbol);
    }

    // Create the left padding
    for (var p = n - 1; p > 0; p--) {
      // Create a tuple of (p) start symbols and (n - p) words
      result.push(blanks.slice(0, p).concat(sequence.slice(0, n - p)));
    }
  }

  // Build the complete ngrams
  for (var i = 0; i < count; i++) {
    result.push(sequence.slice(i, i + n));
  }

  // Check for right padding
  if (typeof endSymbol !== "undefined" && endSymbol !== null) {
    // Create an array of (n) end symbols
    var blanks = [];
    for (var i = 0; i < n; i++) {
      blanks.push(endSymbol);
    }

    // create the right padding
    for (var p = n - 1; p > 0; p--) {
      // Create a tuple of (p) start symbols and (n - p) words
      result.push(sequence.slice(sequence.length - p, sequence.length).concat(blanks.slice(0, n - p)));
    }
  }

  return result;
}

function tokenize(s) {
  var results;
  results = s.split(/[^A-Za-zА-Яа-я0-9_,&']+/);
  return _.without(results, '', ' ');
};

module.exports = ngrams;
