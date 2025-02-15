const mssql = require('mssql')
const bcrypt = require('bcrypt');
const { mailSender} = require('../mailSender')
require('dotenv').config()


const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'mymssql', //Server to connect to. You can use 'localhost\instance' to connect to named instance.
    port: 1433, //Port to connect to (default: 1433). Don't set when connecting to named instance.
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure use true
        trustServerCertificate: true // use true for local dev / self-signed certs
    }
}
const appPool = new mssql.ConnectionPool(sqlConfig)

const getAllProductsFromDB = async () => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .execute('getAllProducts')

            let products = results.recordset
            return products
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getProductsById = async (id) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .input('id',id)
            .execute('getProductByProductId')

            let product = results.recordset[0]
            return product
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getServiceById = async (id) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .input('id',parseInt(id) )
            .execute('getServiceByServiceId')

            let service = results.recordset[0]
            return service
       
        }
        catch (err) {
    
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getUserPhoneByEmailAddress = async (emailAddr) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            let results = await myConnectionPoolToDB.request()
            .input('emailAddress',emailAddr)
            .execute('getPhoneNumByEmail')
            
            let phoneNum = results.recordset[0];
            return phoneNum;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getAllServicesFromDB = async () => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            let results = await myConnectionPoolToDB.request()
            .execute('getAllservices')

            let products = results.recordset
            return products
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getRoleByEmail = async (emailAddr) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
          
            let results = await myConnectionPoolToDB.request()
            .input('emailAddr', emailAddr)
            .execute('getRoleByEmail')
            
            let phoneNum = results.recordset;
            return phoneNum;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getUserByEmail = async (emailAddr) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
     
            let results = await myConnectionPoolToDB.request()
            .input('emailAddr', emailAddr)
            .execute('getUserByEmail')
            
            let user = results.recordset;
            return user;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const setUserToDB = async (userJson) => {
   
    let resulltMessage = {
         mType:"",
         body:""

    };
    let hashedPassword = " ";

    try{
        let user = await getUserByEmail(userJson.emailAddress);
        
        if(user.length > 0 )
        {
            resulltMessage.mType = "error"
            resulltMessage.body = "Email already exist try another mail";
            return resulltMessage;
        }
    }
    catch(err)
    {

    }
    try{

        hashedPassword = await bcrypt.hash(userJson.password, 10);
     }
     catch (err)
     {   
          console.log(err);
          console.log("Failed to encrypt password can't insert new user");
          return  
     }

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {

            await myConnectionPoolToDB.request()
            .input('firstName',userJson.firstName)
            .input('lastName',userJson.lastName)
            .input('pass', hashedPassword)
            .input('emailAddr',userJson.emailAddress)
            .input('phone',userJson.phone)
            .input('roleName', 'User')
            .execute('insertUserToDB')
            
            // mailSender(userJson.emailAddress,"Your registration to Cosmetic website", "Thanks for join us!")
            
            resulltMessage.mType = "success"
            resulltMessage.body = "User added successfuly";
            return resulltMessage;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const insertServiceHistoryToDB = async (serviceJson,email) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            await myConnectionPoolToDB.request()
            .input('employeeId',serviceJson.employeeId)
            .input('userEmail',email)
            .input('serviceName',serviceJson.serviceName)
            .input('serviceDate',new Date(serviceJson.serviceDate))
            .input('fromHour',serviceJson.fromHour)
            .input('toHour',serviceJson.toHour)
            .execute('insertServiceHistory')
            console.log("I am in ");
            let message = {success:"Service history added successfuly to DB"} ;
            return message;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getServicesHistory = async (fromDate,toDate) => {
   
    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            let results = await myConnectionPoolToDB.request()
            .input('fromDate',new Date(fromDate))
            .input('toDate',new Date(toDate))
            .execute('getServicesHistory')
            
           
            let services = results.recordset
            return services
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getFutureServices = async () => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
    
            let results = await myConnectionPoolToDB.request()
            .execute('getFutureServices')

            let services = results.recordset
            return services
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}
const getUserByEmailAddress = async (emailAddr) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            let results = await myConnectionPoolToDB.request()
            .input('emailAddr',emailAddr)
            .execute('getUserByEmailAddrress')
            
            let user = results.recordset;
            console.log(user);
            return user;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const checkUserNameAndPassword = async (emailAddr,password) => {

    try{ 
        let user = await getUserByEmailAddress(emailAddr)
         if(user.length != 0)
         {
          
            try {
                let myConnectionPoolToDB = await appPool.connect()
                try {
                    
            
                    let results = await myConnectionPoolToDB.request()
                    .input('emailAddr',emailAddr)
                    .execute('getPasswordByEmailAddress')

                    let userRoles = await getRoleByEmail(emailAddr);
                    let rolesNames = [];
                    for (const curr of userRoles) {
                        rolesNames.push(curr["role_Name"])
                    }
                

                    let encPassword = results.recordset[0]['UserPass'];
                    return {isAuth: await bcrypt.compare(password, encPassword), name: user[0].firstName + " " + user[0].lastName, roles: rolesNames};
                    
               
                }
                catch (err) {
                    console.log("there was an error while sending query to DB ", err);
                  
                }
            }
            catch (err) {
                console.error('ERROR CONNECTION TO DB: ', err);
               
            }
         }
         else
         {
               return { isAuth: false }
         }

    }
    catch(err)
    {
        console.log("There was an error while sending query to DB");
    }

}


const insertNewOrder = async (userEmail,products) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            console.log(products);
            let order = await myConnectionPoolToDB.request()
            .input('userEmail',userEmail)
            .execute('insertOrder')
            
            let orderId = order.recordset[0]["order_ID"]
            
           for (const curr of products) {
            console.log(curr['product_ID']);
            console.log(orderId);
            try{
                await myConnectionPoolToDB.request()
                .input('orderID',orderId)
                .input('productID', curr['product_ID'])
                .execute('insertItemsToOrder')
            }
            catch(err)
            {
                console.log("there was an error while sending query to DB ", err);
          
            }
           }
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const insertMessage = async (messageDetails) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            console.log(messageDetails);
            let result = await myConnectionPoolToDB.request()
            .input('email',messageDetails.email)
            .input('name',messageDetails.name)
            .input('message',messageDetails.message)
            .execute('insertMessageToContact')
            
            return result;
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }


    
}

const getCustomersMessages = async (fromDate,toDate) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
            
            let results = await myConnectionPoolToDB.request()
            .input('fromDate', new Date(fromDate))
            .input('toDate', new Date(toDate))
            .execute('getMessagesFromCustomers')

            let messages = results.recordset
            return messages
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getOrders = async (fromDate, toDate) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .input('fromDate',new Date(fromDate))
            .input('toDate',new Date(toDate))
            .execute('getOrders')

            let products = results.recordset
            return products
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getUsers = async () => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .execute('getAllUsers')

            let products = results.recordset
            return products
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}

const getOrderById = async (orderId) => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .input('orderId', orderId)
            .execute('getOrderByID')

            let products = results.recordset
            return products
       
        }
        catch (err) {
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}


const getActivitiesDay = async () => {

    try {
        let myConnectionPoolToDB = await appPool.connect()
        try {
         
            let results = await myConnectionPoolToDB.request()
            .execute('getActivitiesDays')

            let acivitiesDays = results.recordset
         
            return acivitiesDays;
       
        }
        catch (err) {
            
            console.log("there was an error while sending query to DB ", err);
          
        }
    }
    catch (err) {
        console.error('ERROR CONNECTION TO DB: ', err);
       
    }

}
module.exports = 
{
    getServicesHistory,
    insertServiceHistoryToDB,
    setUserToDB,
    getUserByEmail,
    getRoleByEmail,
    getAllServicesFromDB,
    getUserPhoneByEmailAddress,
    getAllProductsFromDB,
    checkUserNameAndPassword,
    getProductsById,
    getServiceById,
    insertNewOrder,
    insertMessage,
    getCustomersMessages,
    getUsers,
    getOrders,
    getOrderById,
    getActivitiesDay,
    getFutureServices

}

