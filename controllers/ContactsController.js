const Contact = require('../models/contacts')
const axios = require('axios');
const { hapikey } = require('../config')
const yup = require('yup')
const moment = require('moment')

class ContactsController {
    
    index(req, res) {
        console.log(req.body)
    }

    async store(req, res) {

      let schema = yup.object().shape({
        email: yup.string().email().required(),
        phone: yup.string().required(),
        dob: yup.date().required(),
        weight: yup.number().required()
      })

      if(!(await schema.isValid(req.body))) {
        return res.status(400).json({
          message: "Dados Inválidos"
        })
      }

      let contactExists = await Contact.findOne({ email: req.body.email })
      if (contactExists) {
        return res.status(400).json({
          message: "Contato ja existe!"
        })
      }

      const { email, phone, dob, weight }  = req.body;
      const data = { email, phone, dob, weight };

    
      Contact.create(data, (err) => {
      if (err) {
        return res.status(400).json({ message: "Erro ao tentar inserir usuário na db" });

      }
        axios({
          method: "POST",
          url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${hapikey}`,
          data: {
            "properties": [
              {
                "property": "email",
                "value": email
              },
              {
                "property": "mobilephone",
                "value": phone
              },
              {
                "property": "date_of_birth",
                "value": dob
              },
              {
                "property": "weight",
                "value": weight
              }
            ]
          }
        }).then((response) => {
          console.log("Contato cadastrado com sucesso");
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
      })
    }

    async update(req, res) {

      let schema = yup.object().shape({
        email: yup.string().email().required(),
        phone: yup.string().required(),
        dob: yup.date().required(),
        weight: yup.number().required()
      })

      if(!(await schema.isValid(req.body))) {
        return res.status(400).json({
          message: "Dados Inválidos"
        })
      }

      const { email, phone, dob, weight }  = req.body;
      const data = { email, phone, dob, weight }; 

    if (req.body.email != null) {
        res.contact.email = req.body.email
    }
    if (req.body.phone != null) {
        res.contact.phone = req.body.phone
    }
    if (req.body.dob != null) {
        res.contact.dob = req.body.dob
    }
    if (req.body.weight != null) {
        res.contact.weight = req.body.weight
    }

    try {
      const updatedContact = await res.contact.save()
      res.json(updatedContact)
      axios({
        method: "POST",
        url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${hapikey}`,
        data: {
          "properties": [
            {
              "property": "email",
              "value": email
            },
            {
              "property": "mobilephone",
              "value": phone
            },
            {
              "property": "date_of_birth",
              "value": dob
            },
            {
              "property": "weight",
              "value": weight
            }
          ]
        }
      }).then((response) => {
        console.log("Contato atualizado com sucesso");
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  } catch (err) {
      res.status(400).json({ message: err.message })
  }

      return res.status(201).json({ message: "Usuário atualizado com sucesso" });
    }

    async delete(req, res) {

      try {
          await res.contact.remove()
          res.json({ message: "Deleted Contact"})
          res.status(200)
          /*axios({
            method: "DELETE",
            url: `https://api.hubapi.com/contacts/v1/vid/${data.vid}/?hapikey=${hapikey}` 
          }).then((response) => {
              console.log("Contato removido com sucesso");
              console.log(response);
            }).catch((error) => {
              console.log(error);
            });  */
      } catch (err) {
          res.status(500).json( { message: err.message })
      }
  
  
  }

  }


module.exports = new ContactsController();