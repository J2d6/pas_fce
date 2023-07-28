const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const DeleteClient = async function (req, res, next) {
    const response = {}
    try {
        const deletedClient = await prisma.client.delete({
            where : {
                idClient : +req.params.id
            }
        });

        if (deletedClient) {
            response.data = deletedClient
            res.status(200).json(response);
        } else {
            response.error = "Client not found"
            res.status(404).json(response);
        }
    } catch (error) {
        response.error = error.message
        res.status(500).json(response);
    }
}

exports.DeleteClient = DeleteClient;


const Readclient = async function (req, res, next) {
    const response = {}
    try {
        const client = await prisma.client.findUnique({
            where : {
                idClient : +req.params.id
            }
        })
        if (client) {
            console.log("ATO");
            response.data = client;
            res.status(200).json(response); 
            res.end()
        } else {          
            response.error = "Client not found"
            res.status(404).json(response);  
        }


    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.Readclient = Readclient;

const GetAllClientsController = async function (req, res, next) {
    const response = {}
    try {
        const allClients = await prisma.client.findMany();
        response.data = allClients;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.GetAllClientsController = GetAllClientsController
const GetLatestsClientController = async function (req, res, next) {
    const response = {}
    try {
        const latestClients = await prisma.client.findMany({
            take : 20,
            orderBy : {
                idClient : "desc"
            }
        });

        response.data = latestClients;
        res.status(200).json(response);

    } catch (error) {
        response.error = error.message;
        res.status(500).json(response)
    }
}
exports.GetLatestsClientController = GetLatestsClientController;

const CreateClientController = async function (req, res) {
    try {
        const client =  await CreateClient(req.body)
        const Response = client ; //has data or error
        if (Response.error) {
            // erreur provenant du client
            res.status(400).json(Response);    
        } else {
                  // created sinon
            res.status(201).json(Response);  
        }


    } catch (error) {
        // erreur provenant du serveur
        // DOIT ETRE DAS UN LOG ERROR
        //
        res.status(500).json({ error : {message : "Error was occured, please reload . If persists, please contact the company"}})
    }
}
exports.CreateClientController = CreateClientController;
/**
 * Create Client in the database.
 * Returns the newly created client or an error object 
 * @param {String} params
 * @returns {response} with data or error from client
 * @throws {Error} if an error has occured on the serverside
 */
const CreateClient = async ({nomClient, contactClient, emailClient, passwordClient}) => {
    const client = {nomClient, contactClient, emailClient, passwordClient}
    const errors = {};
    const response = {};

    try {
        CreateClientValidation(client);
    } catch (error) {
        errors.validation = error.message;
        response.error = errors ;
        return response; // pour immédiatement retourner si la validation a échoué et ne pas evaluer la suite
    }
    try {
        await testIfEmailExist(client.emailClient);
    } catch (error) {
        errors.email = error.message
    }
    try {
        await testIfContactExist(client.contactClient)
    } catch (error) {
        errors.contact = error.message;
    }

    if (Object.keys(errors).length) {
        response.error = errors
        console.log(response);
        return response
    }

    //on insère sinon
    try {
        const newClient = await prisma.client.create({
            data : client
        })

        response.data = newClient ;
        prisma.$disconnect;
        console.log(response);
        return response ;
    } catch (error) {
        throw new Error(error.message);
    }

}
exports.CreateClient = CreateClient ;


const testIfEmailExist = async function (email) {

    const emailExistTest = await prisma.client.findFirst({
        where : {
            emailClient : email
        }
    })

    if (emailExistTest) {
        throw new Error('Already exists')
    }
    return false
}
exports.testIfEmailExist = testIfEmailExist ;
const testIfContactExist = async (contact) => {

    const contactExistTest = await prisma.client.findFirst({
        where : {
            contactClient : contact
        }
    })

    if (contactExistTest) {
        throw new Error("Already exists")
    }
    return false
}

exports.testIfContactExist = testIfContactExist ; 
/**
 * validate if String argument is not Empty and is valid String. 
 * Wrap tthe function within try-catch block
 * @param {String} param - String to validate 
 * @returns {Boolean} true if valid 
 * @throws  {Error} if not valid (check the message prperty)
 */
const isNotEmptyValidString = function  (param) {
    const nomregex = /^[a-zA-Z'çÇàÀâÂäÄéÉèÈêÊëËîÎïÏôÔöÖùÙûÛüÜ\s]+$/
    if (nomregex.test(param.trim().toString())) {
        return true;
    }
    throw new Error("Name must be not empty and do not contain specials characters, numbers or spaces.");
}
exports.isNotEmptyValidString = isNotEmptyValidString
/**
 * Validate a client object 
 * 
 * @param {Client} client -  {nomClient : String, emailClient : String , contactClient : String}
 * @throws {Error} if the cient has field not valid (check the message for listing the validation errors)
 *@returns {Boolean} true if validation succed
*/
const CreateClientValidation = (client) => {
    let errors = [];
    try {
        isNotEmptyValidString(client.nomClient);
    } catch (error) {
        errors.push(error.message);
    }

    try {
        isEmailExpression(client.emailClient);
    } catch (error) {
        errors.push(error.message);
    }

    try {
        isValidContact(client.contactClient);
    } catch (error) {
        errors.push(error.message);
    }

    if (errors.length > 0) {
        const error = errors.join("\s");
        console.log(error);
        throw new Error(error);
        
    }
    return true;


}

exports.CreateClientValidation = CreateClientValidation ;

/**
 * Validate email syntax. 
 * email syntax must be /^[^\s@]+@[^\s@]+\.[^\s@]+$/ .
 * Wrap tthe function within try-catch block
 * @param {String} email - email to validate
 * @returns {Boolean} true if valid
 * @throws {Error} if not vaid (check the message property)
 */
const isEmailExpression = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    
    if (emailRegex.test(email)) {
        return true;
    }

    throw new Error("Email has not valid syntax.");
}

exports.isEmailExpression = isEmailExpression ;
/**
 * Validate if a Contact is a Malagasy Phone Number valid (+261 XX XXX XX or XXX XX XXX XX)
 * Wrap the function within try-catch block
 * @param {String} contact - the contact to validate
 * @returns {Boolean} true if valid
 * @throws {Error} if not valid (check the message property)
 */
const isValidContact =  function (contact) {
    const contactRegex = /^(032|034|038|033)\d{7}$/;
    if (contactRegex.test(contact.trim().toString())) {
        return true ;
    }
    throw new Error(" The contact syntax is 032|033|034|038 XX XXX XX.")
}
exports.isValidContact = isValidContact ;



const authClient = async function (contact) {
    try {
        const client = await prisma.client.findUnique({
            where : {
                contactClient : contact
            }
        })

        if (client) {
            return true
        } 
        throw new Error("Incorrect password")
    } catch (error) {
        throw new Error(error.message);
    }
}
const authClientController = async function (req, res, next) {
    const response = {} ;
    try {
        const auth =  await authClient(req.body.contact);
        if (auth) {
            response.access = true
            res.status(200).json(response)
        } 
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}

exports.authClientController = authClientController;