"use strict";

/**
 * json 파일을 읽어서 value 값과 동일한 부분을 소스 전체에서 변경한다.
 */

const _ = require("lodash");
const replace = require("replace-in-file");
const fs = require("fs");

/**
 * rootPath 사용자마다 수정 필요
 */

let rootPath = "C:\\projects\\secudium-frontend";
let jsonPath = rootPath + "\\src\\lngProvider\\locales\\ko_KR.json";

let jsonP;
fs.readFile(jsonPath, "utf8", function(err, data) {
  if (err) throw err;

  jsonP = JSON.parse(data);
  let obj = eval(jsonP);
  console.log(_.values(obj));

  _.forEach(obj, function(value, key) {
    console.log(key);
    console.log(value);

    const regex = new RegExp(value, "g");
    const options = {
      files: [rootPath + "\\src\\components\\Rule\\RuleHistory.js"],
      from: regex,
      to: '<IntlMessages id="' + key + '" />'
    };

    try {
      const results = replace.sync(options);
      console.log("Replacement results:", results);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });
});
