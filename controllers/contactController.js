const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@des Get all contacts
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async(req,res)=>{

  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@des Create contacts
// @route POST /api/contacts
// @access private
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
    phone,
    user_id:req.user.id,
  })
  res.status(200).json(contact);
});

//@des GetCreate contacts
// @route GET /api/contacts/:id
// @access private
const getContacts = asyncHandler(async(req,res)=>{
  const contact = await Contact.find({user_id:req.user.id});

  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }


  res.status(200).json(contact);
});

//@des Update contacts
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User dont have permission to update other user contacts");
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
// @access private
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