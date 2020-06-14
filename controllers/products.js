/** DEFINICIONES*/
const controller = {}; //guardo todas las funciones a exportar en este controlador


/** MIDDLWARES */

//-----Generales-----
const catchSQLError = (res, err) => {
    res.status(500).json({
        mensaje : "Ocurrio un error",
        error: err
   });
};


/** FUNCIONES */

//---creo un producto---

controller.showProducts = (req, res) => {

}

controller.showProductById = (req, res) => {
    const productId = req.params

}

controller.createProduct = (req, res) => {
    const newProduct = req.body

    //algo q lo agregue a base de datos
    .then(product => { res.status(201).json({ 
        response: {
            message: 'Product created successfully', 
            product: newProduct 
        } });
    })
    .catch(err => catchSQLError(res, err))

}

controller.deleteProduct = (req, res) => {
    const id = req.params

    // algo con base de datos que lo borre   
    .then(() => res.status(200).json('Product deleted successfully'))
    .catch(err => catchSQLError(res, err))

}

controller.modifyProduct = (req, res) => {
    const idProduct = req.params
    const changesInProduct = req.body

    //algo con base de datos
    //then y catch
}



module.exports = controller;