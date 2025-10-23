const asyncHandler = require("express-async-handler");

//@des Get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async(req,res)=>{
  res.status(200).json({message : "Hello contacts from routes"});
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
  res.status(200).json({message : "Create contacts"});
});

//@des GetCreate contacts
// @route GET /api/contacts/:id
// @access public
const getContacts = asyncHandler(async(req,res)=>{
  res.status(200).json({message : `Get contact for ${req.params.id}`});
});

//@des Update contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async(req,res)=>{
  res.status(200).json({message : `update contact for ${req.params.id}`});
});

//@des Delete contacts
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async(req,res)=>{
  res.status(200).json({message : `Delete contact for ${req.params.id}`});
});

module.exports = {getContact,createContact,updateContact,deleteContact,getContacts};