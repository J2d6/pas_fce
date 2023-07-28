const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()



const createNewWagonController = async function (req, res, next) {
    const response = {};
    try {
        const newWagon = await createNewWagon(+req.body.idCategorie);
        response.data = newWagon;
        res.status(201).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }
}
exports.createNewWagonController = createNewWagonController;
const createNewWagon = async function createNewWagon(idCategorie) {
    if (!idCategorie) {
        throw new Error("idCategorie invalid")
    }
    try {
        const categorieToLink = await prisma.categorie.findUnique({
            where : {
                idCategorie : +idCategorie
            }
        })
    
        if (categorieToLink) {
            const newWagon = await prisma.wagon.create({
                data: {
                    idCategorie : idCategorie
                }
            });
            return newWagon
        } else {
            throw new Error("Categorie not found")
        }
    } catch (error) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect()
    }
    
  }
  exports.createNewWagon = createNewWagon;


  const DeleteWagon = async function (idWagon) {
    if (!(+idWagon)) {
        throw new Error("idWagon invalid")
    }
    try {
        const deletedWagon = await prisma.wagon.delete({
            where : {
                idWagon : +idWagon
            }
        })

        if (deletedWagon) {
            return deletedWagon;
        } else {
            throw new Error("Wagon not found")
        }
    } catch (error) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect()
    }
  }
  const DeleteWagonController = async function (req, res, next) {
    const response = {};
    try {
        const deletedWagon = await DeleteWagon(req.params.id);
        response.data = deletedWagon;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    }    
  }

  exports.DeleteWagonController = DeleteWagonController;

  const GetWagonById = async function (idWagon) {
    if (!(+idWagon)) {
        throw new Error("idWagon invalid");
    }
    
    try {
        const wagon = await prisma.wagon.findUnique({
            where : {
                idWagon : +idWagon
            }
        })
        if (wagon) {
            return wagon;
        } 

        throw new Error("Wagon not found")
    } catch (error) {
        throw new Error(error.message)
    }finally {
        await prisma.$disconnect()
    }
  }
  const GetWagonByIdController = async function (req, res, next) {
    const response = {};
    try {
        const wagon = await GetWagonById(+req.params.id);
        response.data = wagon;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    } 
  }

  exports.GetWagonByIdController = GetWagonByIdController;


  const GetAllWagons = async function () {
    try {
        const allWagons = await prisma.wagon.findMany({
            include : {
                categorie : true
            }
        });
        return allWagons;
    } catch (error) {
        throw new Error(error.message); 
    } finally {
        await prisma.$disconnect()
    }
  }
  const GetAllWagonsController = async function (req, res, next) {
    const response = {};
    try {
        const allwagon = await GetAllWagons();
        response.data = allwagon;
        res.status(200).json(response);
    } catch (error) {
        response.error = error.message;
        res.status(500).json(response);
    } 
  }
  exports.GetAllWagonsController = GetAllWagonsController;