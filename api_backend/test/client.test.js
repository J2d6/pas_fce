const  { isValidContact, isNotEmptyValidString, isEmailExpression,  CreateClientValidation, CreateClient, testIfContactExist } = require('../routes/controllers/ClientController.js')


test("Client contact validation test ", function () {
    expect(isValidContact('0327875522')).toBeTruthy() 
    expect(isValidContact('0333478222')).toBeTruthy()
    expect(isValidContact('0388060620')).toBeTruthy()
    expect(() => isValidContact('0000000')).toThrow(Error)
    expect(() => isValidContact('031 35 434 456')).toThrow(Error)
    expect(() => isValidContact('03135434456')).toThrow(Error)
    expect(() => isValidContact('+261 031 35 434 456')).toThrow(Error)

})


test("Client name validation test", function () {
    expect(isNotEmptyValidString("Dimbiniaina Jordany")).toBeTruthy();
    expect(isNotEmptyValidString(" Jordany ")).toBeTruthy();
    expect(isNotEmptyValidString(" youbal'yn Jordania")).toBeTruthy();
    expect(isNotEmptyValidString("Francois ")).toBeTruthy();
    expect(() => isNotEmptyValidString("Francois3")).toThrow(Error);
    expect(() => isNotEmptyValidString("Dimbiniaina ha!")).toThrow();
    expect(isNotEmptyValidString("Félicie")).toBeTruthy();
    expect(() => isNotEmptyValidString("Dimbiniaina ha!")).toThrow();
    expect(isNotEmptyValidString("Dimbiniaina youhoùùù")).toBeTruthy();
    expect(() => isNotEmptyValidString("Jordany %>")).toThrow();
})


test("Client email validation", function () {
    expect(isEmailExpression("jrazakamanantsoa8@gmail.com")).toBeTruthy();
    expect(isEmailExpression("j2d6.Pro@gmail.com")).toBeTruthy();
    expect(isEmailExpression("bozikeliko@yahoo.fr")).toBeTruthy();
    expect(isEmailExpression("en@pznfizn.panepfnzei")).toBeTruthy();
    expect(isEmailExpression("e@p.0")).toBeTruthy();
    expect(() => isEmailExpression("en @pznfizn.")).toThrow();
})

test("Test if unique key alreaday exists in client table", () => {
    expect(() => testIfContactExist("0324567538")).toThrowError(/Alredy exists/)
    expect(() => testIfContactExist("0342312312")).toBeFalsy()
} )

test("Validation Integration ", () => {

    expect(() => {CreateClientValidation(BuildClientObject("Dimbiniaina","0327875522","jd@gmail.com"))}).toBeTruthy()
    expect(() => CreateClientValidation(BuildClientObject("Youbal'yne Jordania","0388060628","234.g.f"))).toBeTruthy()
    expect(() => CreateClientValidation(BuildClientObject("Louis 14","0340226374","j2d6.Pro@gmail.com"))).toThrowError(/Name must be not empty and do not contain specials characters, numbers or spaces\./)
    expect(() => CreateClientValidation(BuildClientObject("Louis 16","0313345678","JK@yahoo.fr"))).toThrowError(/Name must be not empty and do not contain specials characters, numbers or spaces\.\sThe contact syntax is 032|033|034|038 XX XXX XX./)
    expect(() => CreateClientValidation(BuildClientObject("Jesosy ", "035478547", "jgr@hotmail.com"))).toThrowError(/The contact syntax is 032|033|034|038 XX XXX XX./)
    expect(() => CreateClientValidation(BuildClientObject("Jesosy ", "035478547", "jgrhotmail.com"))).toThrowError(/The contact syntax is 032|033|034|038 XX XXX XX. Email has not valid syntax./)
    
})


    

function BuildClientObject(nomClient, contactClient, emailClient) {
    return { nomClient, contactClient, emailClient }
}