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

//--- creo un pedido ---
controller.createOrder = (req, res) => {
    const newOrder = req.body



    database.query( 
        'SELECT * FROM orders where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: newOrder.id
            }
        }
    ).then(response => {
        //valido que no exista ya ese username
        if (response.length !==0){
            res.status(401).json({
                response: {
                    message: 'Order already existes',
                }
            });
        }else{
            //no incluye el updatedAt pq aca estoy creando una nueva orden de cero
            database.query(
                `INSERT INTO orders  (id, username, state, timeCreated, description, paymentMethod, paymentValue)
                VALUES (:id, :username, :state, :timeCreated, :description, :paymentMethod, :paymentValue)`,
                {
                    replacements: newOrder
                }
            ).then (rta => {
                res.status(201).json({
                    response: {
                        message: 'Order created successfully:',
                    }
                });
            }).catch(err => catchSQLError(res, err))
        }
    }).catch(error => catchSQLError(res, error))
}


//--- cambiar estado a un pedido ---

controller.modifyOrderStatus = (req, res) => {
    const id = req.params.id
    const newState = req.body.state

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
                    'UPDATE `orders` SET state = :state where id = :idOrd',
                    {
                        replacements: { state: newState, idOrd: idOrder}
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
            catch{console.log("la puta madre")}
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
        //valido que existe el producto
        if (rta.length === 0){
            res.status(404).json({
                response: {
                    message: 'There are no orders',
                }
            });
        }else{
            console.log(rta)
            res.status(200).json({
            response: {
                    message: 'Orders shown succesfully',
                    orders: rta
            }
            });
        }
    }).catch(error => catchSQLError(res, error))

}
//--- ver todos los pedidos de 1 solo usuario solo ese usuario ---

controller.showUserOrders = (req, res) => {

    

}

module.exports = controller;
