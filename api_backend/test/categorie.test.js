const {testIfCategorieNameExist, CreateCategorie} = require('../routes/controllers/CategorieController')


test("Test if a categorie name already exist", async () => {
    const test1 = await testIfCategorieNameExist("VIP");
    expect(test1).toBeTruthy();
    const test2 = await testIfCategorieNameExist("VIIP");
    expect(test2).toBeFalsy();
    // expect(async () => await testIfCategorieNameExist("VIIP")).toBeFalsy();
})

test("Test creating categorie", async () => {
    const data1 = {
        data : {
            idCategorie : 2,
            nomCategorie : "PREMIUM",
            prixCategorie : 35000,
            nbPlace : 50
        }
    }
    const test1 = await CreateCategorie("PREMIUM",35000,50);
    expect(test1).toEqual(data1);
})