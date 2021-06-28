"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// https://gist.github.com/Jagathishrex/f4b57d77a093b7a5614db0f95c5e5060
// util function to convert the input to string type
var parseToCamelCase = function parseToCamelCase(input) {
  var convertToString = function convertToString(input) {
    if (input) {
      if (typeof input === "string") {
        return input;
      }

      return String(input);
    }

    return '';
  };

  var toWords = function toWords(input) {
    input = convertToString(input);
    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    return input.match(regex);
  }; // convert the input array to camel case


  var toCamelCase = function toCamelCase(inputArray) {
    var result = "";

    for (var i = 0; i < inputArray.length; i++) {
      var currentStr = inputArray[i];
      var tempStr = currentStr.toLowerCase();

      if (i != 0) {
        // convert first letter to upper case (the word is in lowercase) 
        tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
      }

      result += tempStr;
    }

    return result;
  };

  var words = toWords(input);
  return toCamelCase(words);
};

var _default = parseToCamelCase;
exports["default"] = _default;