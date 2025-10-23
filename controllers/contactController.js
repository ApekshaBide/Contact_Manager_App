const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@des Get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async(req,res)=>{

  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@des Create contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async(req,res)=>{
  console.log("The Request Body is:" ,req.body);
  const {name,email,phone} = req.body;
  if(!name || !email || !phone){
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone
  })
  res.status(200).json(contact);
});

//@des GetCreate contacts
// @route GET /api/contacts/:id
// @access public
const getContacts = asyncHandler(async(req,res)=>{
  const contact = await Contact.findById(req.params.id);

  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@des Update contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async(req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContct = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true,}
  )
  res.status(200).json(updatedContct);
});

//@des Delete contacts
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async(req,res)=>{

  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  await contact.remove();
  res.status(200).json(contact);
});

module.exports = {getContact,createContact,updateContact,deleteContact,getContacts};