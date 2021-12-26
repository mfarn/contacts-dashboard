const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')

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

router.post('/', async (req, res) => {
    const contact = new Contact({
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            weight: req.body.weight
        }
    )
    try {
        const newContact = await contact.save()
        res.status(201).json(newContact)
    } catch(err) {
        res.status(400).json( {message: err.message })
    }
    
})

router.patch('/:id', getContact, async (req, res) => {
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
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
      
})

router.delete('/:id', getContact, async (req, res) => {
    try {
        await res.contact.remove()
        res.json({ message: "Deleted Contact"})
        res.status(200)
    } catch (err) {
        res.status(500).json( { message: err.message })
    }


})

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