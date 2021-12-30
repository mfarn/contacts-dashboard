const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')
const ContactsController = require('../controllers/ContactsController')



router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json(contacts)
    } catch (err) {
        res.status(500).json( {message: err.message })
    }
})

router.get('/:id', getContact, (req, res) => {
    res.json(res.contact)
})

router.post("/", ContactsController.store)
router.put("/:id", getContact, ContactsController.update)
router.delete("/:id", getContact, ContactsController.delete)


async function getContact(req, res, next) {
    let contact
    try {
        contact = await Contact.findById(req.params.id)
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find Contact'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.contact = contact
    next()
}

module.exports = router