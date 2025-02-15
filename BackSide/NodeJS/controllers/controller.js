const { DateTime } = require('mssql');
const myRepository = require('../repos/repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {signOut} = require('./auth')


const getAllProducts = async (req,res) => {
  let results = await myRepository.getAllProductsFromDB();
  res.send(results)  
}

const getProductByProductId = async (req,res) => {
  let results = await myRepository.getProductsById(req.params.id);
  res.send(results)  
}

const getServiceByServiceId = async (req,res) => {
  let results = await myRepository.getServiceById(req.params.id);
  res.send(results)  
}

const getPhoneByEmailAddr = async (req,res) => {
  let phoneAddr = await myRepository.getUserPhoneByEmailAddress(req.params.emailAddr);
  res.send(phoneAddr);
}

const getAllservices = async (req,res) => {
    let results = await myRepository.getAllServicesFromDB();
    res.send(results);
    
}

const getRoleByUserEmail = async (req,res) => {
    let RoleJson  = await myRepository.getRoleByEmail(req.params.emailAddr);
    res.send(RoleJson);
}

const isUserExist = async (req,res) =>
{
    let user = await myRepository.getUserByEmail(req.params.emailAddr);
    
    res.send( user.length > 0) 
}

const insertUsertoDB = async (req,res) => {
  let result = await myRepository.setUserToDB(req.body);
  res.send(result);

}

const inserstServiceHistory = async (req,res) => {
  let payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  let result = await myRepository.insertServiceHistoryToDB(req.body,payload.email);
  res.send(result);

}

const getServicesHisroryFromDB = async (req,res) => {
  let results = await myRepository.getServicesHistory(req.query.fromdate,req.query.todate);
  res.send(results)
}

const createNewOrder = async (req,res) => {

  let payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  let result = await myRepository.insertNewOrder(payload.email,req.body);
   res.send(result);


}

const insertMessageFromContact = async (req,res) => {
  let results = await myRepository.insertMessage(req.body);
  res.send(results)
}

const getMessages = async (req,res) => {
  console.log(req.query.fromdate,req.query.todate);
  let results = await myRepository.getCustomersMessages(req.query.fromdate,req.query.todate);
  res.send(results)  
}

const getAllUsers = async (req,res) => {
  let results = await myRepository.getUsers();
  res.send(results)  
}

const getOrdersHistory = async (req,res) => {
  let results = await myRepository.getOrders(req.query.fromdate,req.query.todate);
  res.send(results)  
}

const getOrder = async (req,res) => {
  let results = await myRepository.getOrderById(req.params.orderId);
  res.send(results)  
}

const getServicesActivitesDays = async (req,res) =>
{
   let results = await myRepository.getActivitiesDay();
   res.send(results) ;
}

const getFutureServicesFromDB = async (req,res) =>
{
   let results = await myRepository.getFutureServices();
   res.send(results) ;
}
const signOutUser = async(req,res) =>
{
  signOut;
}

module.exports = 
{
  getServicesHisroryFromDB,
  inserstServiceHistory,
  insertUsertoDB,
  isUserExist,
  getRoleByUserEmail,
  getAllservices,
  getAllProducts,
  getPhoneByEmailAddr,
  getProductByProductId,
  getServiceByServiceId,
  createNewOrder,
  insertMessageFromContact,
  getMessages,
  getAllUsers,
  getOrdersHistory,
  signOutUser,
  getOrder,
  getServicesActivitesDays,
  getFutureServicesFromDB
}
