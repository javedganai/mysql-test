var mysql = require("mysql");
var pool  = mysql.createPool({
    host     : 'database-cluster.cluster-cae7t0gajtw9.eu-west-1.rds.amazonaws.com',
    user     : 'testuser',
    password : 'jkwp457r#YD2NKk6F!L!',
    database: 'fleetwise_prd'
  });


exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};