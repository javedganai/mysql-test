var mysqlLib = require("./connectionPool");

// Should return a "rank" by max speed and tracker_uid, the API should be able to return the rank ascendant or descendant.
module.exports.getRank = async (req, res) => {
  mysqlLib.getConnection(async (err, connection) => {
    //do queries that you need
    let trackerUID = req.query.tracker_uid
      ? `where tracker_uid = ${req.query.tracker_uid}`
      : "";
    console.log("The erro is", err);
    // where Date(insert_time) = Date('${req.query.date}'
    let Query = ` SELECT event_id,event_info,speed, tracker_uid,rank from
    (
    SELECT speed, event_id, event_info,tracker_uid, @winrank := @winrank + 1 AS rank
    from tracking_202007_new ,(SELECT @winrank := 0) r 
    ORDER BY speed DESC,tracker_uid DESC
    )  tracking_202007_new ${trackerUID}
   ORDER BY rank`;
    try {
      connection.query(
        Query,

        function (error, results, fields) {
          res.status(200).json(results);
          connection.release();
        }
      );
    } catch (err) {
      res.status(400).json(err)
    }
  });
};

// Should return all events filtered by tracker_uid
module.exports.getEvents = function (req, res) {};
