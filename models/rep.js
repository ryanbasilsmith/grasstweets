// rep.js - a collection of representatives

// body can be "US House", "US Senate", "State House" or "State Senate"
// party can be "Republican", "Democrat", or "Other"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RepSchema = new Schema({
   twitterName : String,
   name: String,
   photo: String,
   state: String,
   body: String,
   party: String,
   addedBy: {
      type: ObjectId,
      ref: 'User'
   }
}, {
   collection: "reps"
});

module.exports = mongoose.model("Rep", RepSchema);