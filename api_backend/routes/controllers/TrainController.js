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
    
   } catch (error) {
    throw new Error(error.message)
   } 
}