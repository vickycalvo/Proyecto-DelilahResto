/** DEFINICIONES*/
const controller = {}; //guardo todas las funciones a exportar en este controlador

const database = require('../database/connection'); 
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

//----muestro productos----
controller.showProducts = (req, res) => {
    database.query( 
        'SELECT * FROM products',
         {
            type: sequelize.QueryTypes.SELECT
        }
    ).then(rta => {
            res.status(200).json({
            response: {
                    message: 'Prodcuts shown succesfully',
                    products: rta
            }
            });
    }).catch(error => catchSQLError(res, error))
}


//----creo 1 producto----
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
        //valido que no exista ya un producto con ese nombre
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
                res.status(201).json({
                    response: {
                        message: 'Product created successfully:',
                    }
                });
            }).catch(err => catchSQLError(res, err))
        }
    }).catch(error => catchSQLError(res, error))
}



//----doy de baja/desactivo un producto----
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


//----modifico un producto----
controller.modifyProduct = (req, res) => {
    database.query( 
        'SELECT * FROM products where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: req.params.id
            }
        }
    ).then(response => {
        //valido que existe el producto
        if (response.length === 0){
            res.status(404).json({
                response: {
                    message: 'Product does not existes',
                }
            });
        }else{
            const product= response[0] //me guardo el id del producto a modificar
            console.log(product)
            database.query(
                'UPDATE `products` SET name = :name, description = :description, price = :price, imageSrc = :imageSrc  where id = :id',
                {
                    replacements: {
                        ...product,
                        ...req.body
                    }
                }
            ).then (rta => {
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