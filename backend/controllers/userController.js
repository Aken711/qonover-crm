const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.find = (req, res) => {
  UserModel.find()
  .populate("client") // Population du champ "client"
  .populate("tasks") // Population du champ "tasks"
  .populate("project") // Population du champ "project"
  .populate("invoices") // Population du champ "invoices"
  .populate("quote") // Population du champ "quote"
  .populate("referrer") // Population du champ "referrer"
  .populate("special_referrer") // Population du champ "special_referrer"
  .populate("referrered") // Population du champ "referrered"
    .exec()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error Occurred while retriving user information",
      });
    });
};

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    })
    
  };


// user informations update

module.exports.updateUser = async (req,res) => {
    const { last_name, first_name, email, password, telephone, langage, currency, address, address_supplement, zipcode, city, country } = req.body;
    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set : {
                    last_name, first_name, email, password, telephone, langage, currency, address, address_supplement, zipcode, city, country
                }
            }
        );
        res.send()
    } catch (error) {
        res.status(200).send({ errors });
    }
}
 

// Projet

/// Projet Création
module.exports.createProject = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          projet: {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            date_start: req.body.date_start,
            time_estimated_number: req.body.time_estimated_number,
            time_estimated_format: req.body.time_estimated_format, // jour / heure (?)
            price_pre_tax: req.body.price_pre_tax,
            currency: req.body.currency,
            client: req.body.client,
          },
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
/// Projet Update

module.exports.updateProjectName = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].name": req.params.name } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectDescription = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].description": req.params.description } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectStatus = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].status": req.params.status } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectDateDebut = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].date_debut": req.params.date_debut } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectTempsEstimee = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "projet.$[el]": {
            temps_estimee_nombre: req.body.temps_estimee_nombre,
            temps_estimee_format: req.body.temps_estimee_format,
          },
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectTarifHT = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].tarif_ht": req.params.tarif_ht } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectTarifHT = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].tarif_ht": req.params.tarif_ht } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectDevise = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].devise": req.params.devise } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.updateProjectClient = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "projet.$[el].client": req.params.client } },
      {
        arrayFilters: [{ "el._id": req.params.projetid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/// Projet Delete

module.exports.deleteProject = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          projet: req.params.projetid,
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

// Tâches

/// Tâches Création
module.exports.createTaches = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          taches: {
            name: req.body.name,
            description: req.body.description,
            priorite: req.body.priorite,
            status: req.body.status,
            client: req.body.client,
            projet: req.body.projet,
          },
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/// Tâches Update
module.exports.updateTaches = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "taches.$[el].name": req.params.name,
          "taches.$[el].description": req.params.description,
          "taches.$[el].priorite": req.params.priorite,
          "taches.$[el].status": req.params.status,
          "taches.$[el].client": req.params.client,
          "taches.$[el].projet": req.params.projet,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.tachesid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/// Tâches Delete
module.exports.deleteTaches = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          taches: req.params.tacheid,
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

// Client

/// Client Création
module.exports.createClient = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          taches: {
            entreprise: req.body.entreprise,
            contact_prenom_priviligee: req.body.contact_prenom_priviligee,
            contact_nom_priviligee: req.body.contact_nom_priviligee,
            contact_poste: req.body.contact_poste,
            contact_email: req.body.contact_email,
            contact_tel: req.body.contact_tel,
            siren: req.body.siren,
            hq_address: req.body.hq_address,
            hq_zipcode: req.body.hq_zipcode,
            hq_city: req.body.hq_city,
            hq_country: req.body.hq_country,
            tva: req.body.tva,
            status: req.body.status,
          },
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
/// Client Update
/// Update Status
module.exports.updateClientStatus = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "client.$[el].status": req.body.status,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.clientid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
/// Update Info Client
module.exports.updateClientInfos = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "client.$[el].entreprise": req.body.entreprise,
          "client.$[el].contact_prenom_priviligee": req.body.contact_prenom_priviligee,
          "client.$[el].contact_nom_priviligee": req.body.contact_nom_priviligee,
          "client.$[el].contact_poste": req.body.contact_poste,
          "client.$[el].contact_email": req.body.contact_email,
          "client.$[el].contact_tel": req.body.contact_tel,
          "client.$[el].siren": req.body.siren,
          "client.$[el].hq_address": req.body.hq_address,
          "client.$[el].hq_zipcode": req.body.hq_zipcode,
          "client.$[el].hq_city": req.body.hq_city,
          "client.$[el].hq_country": req.body.hq_country,
          "client.$[el].tva": req.body.tva,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.clientid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
/// Add Notes
module.exports.addClientNotes = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          "client.$[el].note": {
            description : req.body.description,
          },
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.clientid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
/// Update Notes
module.exports.updateClientNotes = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "client.$[el].note.$[elem].description":  req.body.description,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.clientid }, {"elem._id":req.params.noteid}],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
/// delete Notes
module.exports.deleteClientNotes = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          "client.$[el].note":  req.params.noteid,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.clientid }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
/// Client Delete
module.exports.deleteClient = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          client: req.params.clientid,
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};
// Factures

/// Factures Création
module.exports.createInvoices = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          facture: {
            numero: req.body.numero,
            client: req.body.client,

            items: [req.body.items],
            tva_checkbox : req.body.tva_checkbox,
            tva_pourcentage : req.body.tva_pourcentage,

            date_emission : Date.now(), 
            date_suppose : req.body.date_suppose,
            date_paiement : req.body.date_paiement,
            
            status: req.body.status
          },
        },
      },
      (err, docs) => {
        if(!err) return res.send(docs)
        if (err) return res.status(500).send({ message: err });
      }
    );
    
  } catch (error) {
    console.log(error);
  }
};
/// Factures Update
module.exports.updateInvoices = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "facture.$[el]":  req.body.facture,
        },
      },
      {
        arrayFilters: [{ "el._id": req.params.facture }],
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


/// Factures Delete
module.exports.deleteInvoices = async (req, res) => {
  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          facture: req.params.facture,
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

// Devis

/// Devis Création

/// Devis Update

/// Devis Delete

// Profil

/// Profil Création

/// Profil Update

/// Profil Delete
