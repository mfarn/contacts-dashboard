const Contact = require('../models/contacts')
const axios = require('axios');
const { hapikey } = require('../config')

class ContactsController {
    index(req, res) {
        console.log(req.body)
    }

    async store(req, res) {

        const { email, phone, dob, weight }  = req.body;
        const data = { email, phone, dob, weight }; 

        await Contact.create(data, (err) => {
            if(err){
                return res.status(400).json({ message: "Erro ao tentar inserir usuário na db" })
            
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
              console.log("Contato cadastrado com sucesso")
              console.log(response)
          }).catch((error) => {
              console.log(error)
          })
            
            return res.status(201).json({ message: "Usuário cadastrado com sucesso" })
        })
    }
}

module.exports = new ContactsController();