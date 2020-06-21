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
                    order: newOrder
                }
            });
        }else{
            database.query(
                `INSERT INTO orders  (id, username, state, timeCreated, description, paymentMethod, paymentValue, updatedAt)
                VALUES (:id, :username, :state, :timeCreated, :description, :paymentMethod, :paymentValue, :updatedAt)`,
                {
                    replacements: newOrder
                }
            ).then (rta => {
                console.log(rta)
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

}

//--- ver todos los pedidos ---

controller.showAllOrders = (req, res) => {

}
//--- ver todos los pedidos de 1 solo usuario solo ese usuario ---

controller.showUserOrders = (req, res) => {

}

module.exports = controller;