const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()





const createTrain = async function (nbWagons , wagons) {
   try {
    const newTrain = await prisma.train.create({
        data : {
            nbWagon : +nbWagons
        }
    })
    const id = newTrain.numTrain;
    if (wagons.length) {
        wagons.map(async wagon => {
            await prisma.wagon.update({
                where : {
                    idWagon : +wagon
                }, 
                data : {
                    numTrain : id
                }
            })
        })
    }

    return newTrain;
    
   } catch (error) {
    throw new Error(error.message)
   } 
}
/**
 * Create a new Train
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const CreateTrainController = async function (req, res, next) {
    const response  = {};
    try {
        const newTrain = await createTrain(req.body.nbWagon, req.body.wagons);
        response.data = newTrain;
        res.status(201).json(response)
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}

exports.CreateTrainController = CreateTrainController;