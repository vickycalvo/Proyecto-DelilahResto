/** DEFINICIONES*/
const controller = {}; //guardo todas las funciones a exportar en este controlador

const database = require('../database/connection'); 
var moment = require('moment')

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



let productInfo= [];
var orderDescription = "";
var totalToPay = 0
//--- creo un pedido ---
controller.createOrder = (req, res) => {

    let productsArray = req.body.products //me guarde array con id de productos a incluir en la order y la cantidad de cada uno
    
    for (let i = 0; i < productsArray.length; i++) {

        const productId = productsArray[i].id
        let product= {};
        
        database.query('SELECT * FROM products where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: productId
            }
        }).then (rta => {
            product.id = productId;
            product.name = rta[0].name;
            product.price = rta[0].price

            productInfo.push(product) //guardo en un array la info de cada producto contenida en product()

                const productName = productInfo[i].name
                const productAmount = productsArray[i].productAmount
                const nameAndAmount = productAmount + " " + productName        

                orderDescription += nameAndAmount + " - "
                totalToPay += productsArray[i].productAmount * productInfo[i].price
        })
    }

    database.query(
        `INSERT INTO orders  (id_user, state, createdAt, description, paymentMethod, paymentValue, updatedAt)
        VALUES (:id_user, :state, :createdAt, :description, :paymentMethod, :paymentValue, :updatedAt)`,
        {
            replacements:{id_user: req.body.id_user, state: req.body.state,createdAt: req.body.createdAt,description: orderDescription,paymentMethod: req.body.paymentMethod,paymentValue: totalToPay,updatedAt: req.body.updatedAt}
        }
    ).then (rta => {
        res.status(201).json({
            response: {
                message: 'Order created successfully:',
            }
        });
    }).catch(err => catchSQLError(res, err))
}


//--- cambiar estado a un pedido ---

controller.modifyOrderStatus = (req, res) => {
    const id = req.params.id
    const newState = req.body.state
    const updatedAt = moment().format('YYYY-MM-DD hh:mm:ss')

    database.query( 
        'SELECT * FROM orders where id=:id',
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
                    message: 'Order does not existes',
                }
            });
        }else{
            const idOrder= response[0].id //me guardo el id del producto a modificar
           try{
                database.query(
                    'UPDATE `orders` SET state = :state, updatedAt = :updatedAt where id = :idOrd',
                    {
                        replacements: { state: newState, updatedAt: updatedAt, idOrd: idOrder}
                    }
                ).then (rta => {
                    console.log(rta)
                    res.status(200).json({
                        response: {
                            message: 'Order state changed succesfully',
                        }
                    });
                }).catch(err => catchSQLError(res, err))
            }
            catch{console.log("not possible to update the state")}
        }
    }).catch(error => catchSQLError(res, error))
}

//--- ver todos los pedidos ---

controller.showAllOrders = (req, res) => {

    database.query( 
        'SELECT * FROM orders',
         {
            type: sequelize.QueryTypes.SELECT
        }
    ).then(rta => {
            res.status(200).json({
            response: {
                    message: 'Orders shown succesfully',
                    orders: rta
            }
            });
        }
    ).catch(error => catchSQLError(res, error))


}


//--- mostrar sus pedidos a un usuario
controller.showUserOrders = (req, res) => {
   
    database.query( 
        'SELECT * FROM orders where id_user = :idUser',
         {  
            type: sequelize.QueryTypes.SELECT,
            replacements: { idUser: req.locals.decoded.idUser}
        }
    ).then(rta => {
            res.status(200).json({
            response: {
                    message: 'Orders shown succesfully',
                    orders: rta
            }
            });
        }
    ).catch(error => catchSQLError(res, error))

}

module.exports = controller;


