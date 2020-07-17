/** DEFINICIONES*/
const controller = {}; //guardo todas las funciones a exportar en este controlador
const database = require('../database/connection'); 
const { response } = require('express');


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

//--- creo un nuevo pedido ---
controller.createOrder = (req, res) => {
    const productsArray = req.body.products; //me guarde array con id de productos a incluir en la order y la cantidad de cada uno
    const paymentMethod = req.body.paymentMethod;
    const idUser = req.locals.idUser; //guardo id del usuario que este haciendo la orden desde su token
    const products = req.locals.products; //tengo un array con los ids que guarde en req.locals en validation.ProductsIdExistCreateOrder
    
    let description = [];
    let paymentValue = 0;
    products.forEach(product => {
        const reqProduct = productsArray.find(p => p.id === product.id); //busco para cada id guardado en products ese mismo id en productsArray donde también tengo guardada la cantidad de cada prodcuto
        product.productAmount = reqProduct.productAmount;
        product.subtotal = product.price * product.productAmount;
        paymentValue += product.subtotal; //calculo el total a pagar por la orden 
        description.push(`${reqProduct.productAmount}. ${product.name}`); //armo un array description con información de cada producto
    });

    //valores a cargar en tabla Orderes de el nuevo pedido 
    const replacements = {
        idUser: idUser,
        state: 'nuevo',
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentMethod,
        paymentValue,
        description: description.join(' - ')
    };
    database.query(
        `
            INSERT INTO orders (idUser, state, createdAt, description, paymentMethod, paymentValue, updatedAt)
            VALUES (:idUser, :state, :createdAt, :description, :paymentMethod, :paymentValue, :updatedAt)
        `,
        { replacements }
    ).then (rta => {
        const idOrder = rta[0];
        const values = products.map(product => `(${product.id}, ${idOrder}, ${product.price}, ${product.productAmount}, ${product.subtotal})`);
        database
            .query(`
                INSERT INTO orders_products (idProduct, idOrder, productPrice, productAmount, subtotal)
                VALUES ${values.join(',')}
            `) //hago un bulk upload para cargar también la tabla orders_products con la información necesaria de la orden que esta siendo procesada
            .then(() => {
                res.status(201).json({
                    response: {
                        message: 'Order created successfully:',
                        rta
                    }
                });
            })
            .catch(err => catchSQLError(res, err))
    }).catch(err => catchSQLError(res, err))
}



//--- cambiar estado a un pedido ---
controller.modifyOrderStatus = (req, res) => {
    const id = req.params.id
    const newState = req.body.state
    const updatedAt = new Date()
    database.query( 
        'SELECT * FROM orders where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: id
            }
        }
    ).then(response => {
        //valido que existe la orden
        if (response.length === 0){
            res.status(404).json({
                response: {
                    message: 'Order does not existes',
                }
            });
        }else{
            const idOrder= response[0].id //me guardo el id de la orden a modificar
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


/** La siguiente función es usada para 
 * -mostrar todas las ordenes (si el usuario es admin)
 * -mostrar solo las ordenes propias de un usuario 
 * -filtrar en ambos casos para mostrar solo 1 orden si se indica su id
 * En todos los casos se obtiene toda la información relativa de los usuarios y productos que formen parte de las ordenes buscadas
 */
controller.getOrders = (req, res) => {
    const idOrder = req.params.id;
    const { idUser, isAdmin } = req.locals;
    const conditions = {};
    if (!isAdmin) {
        conditions['u.id'] = idUser;
    }
    if (idOrder) {
        conditions['o.id'] = idOrder;
    }
    const WHERE = getWhereClause(conditions); //dependiendo de si muestro solo 1 orden o varias y de si es para un usuario particular o un admin
    database
        .query(`
            SELECT 
                o.id, o.state, o.description, o.paymentMethod, o.paymentValue, o.createdAt, o.updatedAt,
                u.id as idUser, u.username, u.fullname, u.address, u.email, u.phoneNumber,
                p.id as idProduct, p.name, op.productPrice, op.productAmount, op.subtotal
            FROM 
                orders o
            INNER JOIN 
                users u ON u.id = o.idUser
            INNER JOIN
                orders_products op ON op.idOrder = o.id
            INNER JOIN 
                products p ON p.id = op.idProduct
            ${WHERE}
        `, {   
            type: sequelize.QueryTypes.SELECT
        })
        .then(rawResponse => {
            const response = [];
            rawResponse.forEach(rawItem => {
                const orderItem = response.find(item => item.id === rawItem.id);
                if (orderItem) {
                    orderItem.products.push(buildProductItem(rawItem))
                } else {
                    response.push(buildOrderItem(rawItem))
                }
            });
            res.status(200).json({
                response: idOrder ? (response[0] || null) : response
            });
        })
        .catch(error => catchSQLError(res, error))
};


//utilizo esta función para acomodar los registros que se muestran en la response
const buildOrderItem = (rawItem) => {
    return {
        id: rawItem.id,
        state: rawItem.state,
        description: rawItem.description,
        payment: {
            method: rawItem.paymentMethod,
            total: rawItem.paymentValue
        },
        //armo un objeto con toda la información relativa a el usuario
        user: {
            id: rawItem.idUser,
            username: rawItem.username,
            fullname: rawItem.fullname,
            address: rawItem.address,
            email: rawItem.email,
            phoneNumber: rawItem.phoneNumber
        },
        products: [buildProductItem(rawItem)],
        createdAt: rawItem.createdAt,
        updatedAt: rawItem.updatedAt
    };
};



//armo un objeto con toda la información relativa a cada producto
const buildProductItem = (rawItem) => {
    return {
        id: rawItem.idProduct,
        name: rawItem.name,
        price: rawItem.productPrice,
        amount: rawItem.productAmount,
        subtotal: rawItem.subtotal
    };
};


//dependiendo de el tipo y id de usuario y de si busca una orden en particular defino el where
const getWhereClause = (conditions) => {
    const keys = Object.keys(conditions);
    if (keys.length) {
        const whereClauses = keys.map(key => {
            return `${key}=${conditions[key]}`;
        });
        return `WHERE ${whereClauses.join(' AND ')}`;
    } else {
        return '';
    }
}


//borra un pedido de la tabla de pedidos
controller.deleteOrder = (req, res) => {

    const order = req.params.id

    database.query( 
        'SELECT * FROM orders where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : { id: order}
        }
    ).then(response => {
        //si existe esa order
        if (response.length !==0){
            database.query( 
                'DELETE FROM orders where id=:id',
                {
                    replacements : {
                        id: order
                    }
                })
            .then(() => res.status(200).json({
                mensaje: 'Order sucessfully deleted',
                Deleted: order
            })
            ).catch(err => catchSQLError(res, err))
        }else{
            res.status(404).json({
                mensaje: 'Order does not exist o can not be found',
            })}
})
}

module.exports = controller;