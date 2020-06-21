/** DEFINICIONES*/
const controller = {}; //guardo todas las funciones a exportar en este controlador

const database = require('../database/connection'); 
const auth = require('../controllers/authorizations'); 
/** MIDDLWARES */


//-----Generales-----
const catchSQLError = (res, err) => {
    console.log(err)
    res.status(500).json({
        mensaje : "Ocurrio un error",
        error: err
   });
};


/** FUNCIONES */

//---creo un producto---

controller.showProducts = (req, res) => {

}



controller.createProduct = (req, res) => {
    const newProduct = req.body

    database.query( 
        'SELECT * FROM products where name=:name',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                name: newProduct.name
            }
        }
    ).then(response => {
        //valido que no exista ya ese username
        if (response.length !==0){
            res.status(401).json({
                response: {
                    message: 'Product already existes',
                    user: newProduct
                }
            });
        }else{
            database.query(
                `INSERT INTO products (name,description,price,imageSrc)
                VALUES (:name, :description, :price, :imageSrc)`,
                {
                    replacements: newProduct
                }
            ).then (rta => {
                console.log(rta)
                res.status(201).json({
                    response: {
                        message: 'Product created successfully:',
                    }
                });
            }).catch(err => catchSQLError(res, err))
        }
    }).catch(error => catchSQLError(res, error))
}




controller.deactivateProduct = (req, res) => {
    const id = req.params.id

    database.query( 
        'SELECT * FROM products where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: id
            }
        }
    ).then(response => {
        //valido que existe el producto
        if (response.length === 0){
            res.status(404).json({
                response: {
                    message: 'Product does not existes',
                    user: newProduct
                }
            });
        }else{
            const idProduct= response[0].id //me guardo el id del producto a modificar
            const isDesactivatd = response[0].isActive

            //valido que no haya sido dado de baja previamente
            if (isDesactivatd === 0) {
                res.status(209).json({
                    response: {
                        message: 'This product is already desactivated',
                    }
                });
            }else {
                database.query(
                    'UPDATE `products` SET isActive = :isActive where id = :idProd',
                    {
                        replacements: { isActive: 0, idProd: idProduct}
                    }
                ).then (rta => {
                    console.log(rta)
                    res.status(209).json({
                        response: {
                            message: 'Product desactivated',
                        }
                    });
                }).catch(err => catchSQLError(res, err))
            }
        }
    }).catch(error => catchSQLError(res, error))
}



controller.modifyProduct = (req, res) => {
    const id = req.params.id
    const changesInProduct = req.body


    database.query( 
        'SELECT * FROM products where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: id
            }
        }
    ).then(response => {
        //valido que existe el producto
        if (response.length === 0){
            res.status(404).json({
                response: {
                    message: 'Product does not existes',
                    user: newProduct
                }
            });
        }else{
            const idProduct= response[0].id //me guardo el id del producto a modificar
            database.query(
                'UPDATE `products` SET name = :name, description =:description, price=:price, imageSrc=:imageSrc where id = :idProd',
                {
                    replacements: { ...req.body, idProd: idProduct}
                }
            ).then (rta => {
                console.log(rta)
                res.status(200).json({
                    response: {
                        message: 'Product succesfully modified',
                    }
                });
            }).catch(err => catchSQLError(res, err))
        }
    })

}


module.exports = controller;