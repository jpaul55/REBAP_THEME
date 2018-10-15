const mongoose = require("mongoose");
const Schema = mongoo.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  sex: {
    type: String,
    required: true
  },
  civil_status: {
    type: String,
    required: true
  },
  blood_type: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  mobile_num: {
    type: String
  },
  tin: {
    type: String,
    required: true
  },
  tax_type: {
    type: String
  },
  prime_add1: {
    type: String
  },
  prime_add2: {
    type: String
  },
  primeres_brgy: {
    type: String
  },
  primeres_rescity: {
    type: String
  },
  contact: [
    {
      name: {
        type: String
      },
      mobile: {
        type: String
      },
      relationship: {
        type: String
      },
      add1: {
        type: String
      },
      add2: {
        type: String
      },
      person_brgy: {
        type: String
      },
      person_city: {
        type: String
      }
    }
  ],
  education: [
    {
      undergrad_school: {
        type: String
      },
      undergrad_schooladd: {
        type: String
      },
      undergrad_course: {
        type: String
      },
      undergrad_yrcompleted: {
        type: String
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
