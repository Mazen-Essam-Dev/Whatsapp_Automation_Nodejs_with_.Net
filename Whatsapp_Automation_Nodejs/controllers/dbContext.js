
//const mysql = require('mysql');
const mssql = require('mssql');

var connection = mssql.createConnection({
    host: "localhost",
    //user: "bnanwhats",
    //password: "Maz@123456en",
    database: "whats_db"
    
  });
  
  function connect(){
  connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    });
  }
  
    function insert_source(source_id){
      connection.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          //var sql = "INSERT INTO source (source_id) VALUES ('4004', 'Highway 37')";
          var sql = "INSERT INTO source (source_id) VALUES ('"+ source_id +"')";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
    }
    //insert_source("4005");
    function insert_source_user_mob(source_id,source_name,source_mobile){
      connection.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          //var sql = "INSERT INTO source (source_id) VALUES ('4004', 'Highway 37')";
          var sql = "INSERT INTO source (source_id,source_name,source_mobile) VALUES ('"+ source_id +"','"+ source_name +"','"+ source_mobile +"')";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
    }
    //insert_source_user_mob('4006','mazen مازن عصام','201112847004');
    
    function update_source_user_mob(source_id,source_name,source_mobile){
      connection.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "UPDATE source SET source_name = '"+source_name+"' , source_mobile = '"+source_mobile+"' WHERE source_id = '"+source_id+"'";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
          });
        });
    }
    //update_source_user_mob('4006','maze','201104');
  // // //     function get_source_Data(source_id) {
  // // //     connection.connect(function(err) {
  // // //         if (err) throw err;
  // // //         console.log("Connected!");
  // // //         var sql = "SELECT * FROM source  WHERE source_id = '"+source_id+"'";
  // // //         connection.query(sql, function (err, result,fields) {
  // // //           if (err) throw err;
  // // //           console.log(result[0].source_name);
  // // //           return [result[0].source_name,result[0].source_mobile];
  // // //         });
  // // //       });
  // // //   }
  // // //   get_source_Data('4006').then(results=>
  // // //     console.log(results)
  // // //   );
  
    function getListOfStringsFromDB() {
      return new Promise((resolve, reject) => {
          const query = 'SELECT source_name FROM source'; 
  
          connection.query(query, (error, results) => {
              if (error) {
                  return reject(error); 
              }
  
              // تحويل النتائج إلى قائمة من السلاسل النصية
              const names = results.map(row => row.source_name);
              resolve(names); // إرجاع قائمة السلاسل النصية
          });
      });
  }
  
  // استخدام الدالة مع then()
  getListOfStringsFromDB()
      .then((names) => {
          console.log('Product names:', names); // طباعة قائمة أسماء المنتجات
      })
      .catch((error) => {
          console.log('Error:', error);
      });
  
  function get_source_Data(source_id) {
      return new Promise((resolve, reject) => {
          const query = 'SELECT source_name,source_mobile FROM source where source_id='+"'"+source_id+"' AND source_status ='A' "
  
          connection.query(query, (error, results) => {
              if (error) {
                  return reject(error); 
              }
  
              // تحويل النتائج إلى قائمة من السلاسل النصية
              //const names = results.map(row => row.source_name);
              //resolve(names); // إرجاع قائمة السلاسل النصية
              resolve(results); // إرجاع قائمة السلاسل النصية
          });
      });
  }
  
  // استخدام الدالة مع then()
  get_source_Data('4006')
      .then((nresult) => {
          console.log('Product names:', nresult); // طباعة قائمة أسماء المنتجات
          console.log(nresult[0].source_name); // طباعة قائمة أسماء المنتجات
          console.log(nresult[0].source_mobile); // طباعة قائمة أسماء المنتجات
      })
      .catch((error) => {
          console.log('Error:', error);
          console.log('No Data as : its not connected'); // طباعة قائمة أسماء المنتجات
      });



module.exports ={connection ,get_source_Data , update_source_user_mob ,insert_source_user_mob ,insert_source };