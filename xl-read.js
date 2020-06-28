if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx',{type:"array"});

//console.log(workbook);
var sheet_name_list = workbook.SheetNames;
var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

console.log("full data ::", data);

console.log("mydata ::",data[0].name);
