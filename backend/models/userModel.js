const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//  Admin

const userSchema = new mongoose.Schema(
  {
    role: { type: String, default: "user" },

    last_name: { type: String, required: true, maxLength: 55, trim: true },
    first_name: { type: String, required: true, maxLength: 55, trim: true },

    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, max: 1024, minlength: 5 },
    telephone: { type: String, required: true, trim: true },

    langage: { type: String },
    currency: { type: String },

    logo: [
      {
        validation: { type: String },
        url: { type: String },
      },
    ],

    address: { type: String, required: true },
    address_supplement: { type: String },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    company_registration: { type: String, lowercase: true },
    vta: { type: String },
    vta_number: { type: String },

    business_sector: { type: String },
    seniority_sector: { type: String },

    project: [
      {
        name: { type: String },
        description: { type: String },
        status: { type: String }, 
        status_date_change: {type:Date},
        date_start: { type: Date },
        time_estimated_number: { type: Number },
        time_estimated_format: { type: String }, // jour / heure (?)
        time_real_number: { type: Number },
        time_real_format: { type: String },
        price_pre_tax: { type: String },
        currency: { type: String },
        client: { type: Schema.Types.ObjectID, ref: "user.client" },
        tasks: [{ type: Schema.Types.ObjectID, ref: "user.tasks" }],
      },
    ],

    tasks: [
      {
        name: { type: String },
        description: { type: String },
        priority: { type: String },
        due_date: { type: Date },
        status : {type: String},
        client: { type: Schema.Types.ObjectID, ref: "user.client" },
        project: { type: Schema.Types.ObjectID, ref: "user.project" },
      },
    ],

    client: [
      {
        company: { type: String },
        contacts:[
            {
                contact_first_name: { type: String }, 
                contact_last_name: { type: String }, 
                contact_job_position: { type: String }, 
                contact_email: { type: String }, 
                contact_tel: { type: String }, 
                favorite_contact: {type:String}
            }
        ],
        company_id_number: { type: String },
        hq_address: { type: String },
        hq_zipcode: { type: String },
        hq_city: { type: String },
        hq_country: { type: String },
        VTA: { type: String },
        status: { type: String }, // status si prospect / en contact / client / lead froid etc...
        date_changing_status:{type: Date}, // A changer à chaque changement de status par ex en Client
        date_creation : {type: Date},
        date_last_modification : {type: Date},
        note: [
          {
            description: { type: String },
            date: { type: Date, default: Date.now },
          },
        ],
        tasks: [{ type: Schema.Types.ObjectID, ref: "user.tasks" }],
        project: [{ type: Schema.Types.ObjectID, ref: "user.project" }],
        invoices: [{ type: Schema.Types.ObjectID, ref: "user.invoices" }],
      },
    ],

    invoices: [
      {
        number: { type: String },
        client: { type: Schema.Types.ObjectID, ref: "user.client" },
        items: [
          {
            wording: { type: String },
            price_unit: { type: Number },  // Prix HT
            nb_unit: { type: Number }, 
            pretax_value: { type: Number },
            tax_include_value: { type: Number },
          },
        ],

        total_pretax_value : { type: Number},
        total_tax_include_value : { type: Number},

        tva_checkbox: {type: String},
        tva_percentage: {type: Number},

        date_issue: { type: Date },
        date_assumed: { type: Date },
        date_payment: { type: Date },

        status: { type: String }, // Draft / En retard / Payée / Impayée // accepté // en attente
      },
    ],

    quote: [
      {
        number: { type: String },
        client: { type: Schema.Types.ObjectID, ref: "user.client" },
        items: [
          {
            wording: { type: String },
            price_unit: { type: Number },  // Prix HT
            nb_unit: { type: Number }, 
            pretax_value: { type: Number },
            tax_include_value: { type: Number },
          },
        ],
        date_creation: { type: Date },
        date_issue: { type: Date },
        date_limit_valid: { type: Date },
        status: { type: String }, // Accepté / Refuser / En attente
      },
    ],

    status: { type: String },

    referrer: { type: Schema.Types.ObjectID, ref: "user" },
    special_referrer: { type: Schema.Types.ObjectID, ref: "influencer" },
    referrered: [{ type: Schema.Types.ObjectID, ref: "user" }],
    referal_code: { type: String, unique: true},
    date_unsubscription: { type: Date },

    time_subscribing: {type: Number},

    // invoices 

    invoice_stripe : [{
      name : String,
      date: Date,
      status : String,
    }],

    id_stripe: {type : String},

  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema, "users");

module.exports = UserModel;
