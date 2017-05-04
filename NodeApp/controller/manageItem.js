/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/manageItem                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const itemModel = require('../models/itemModel.js');
const hash = require('password-hash'); 
const manageList = require('../controller/manageList.js');

const debug = require('debug')('manageItem');							            //Modulo de mensajes de debug
//Funcion que acepta y guarda los datos del item en la bd
module.exports.addItem = function (req, res) {
    let expire = new Date();
    if (req.body.time) expire = new Date(req.body.time).toISOString();
    if (!req.body.id) {
		let date = new Date();
		if(req.body.time!="") date = Date(req.body.time); 
		module.exports.item = new itemModel.item({
			listId : manageList.list._id,    
            itemPriority: req.body.priority,                                            //Prioridad de la tarea
            itemExpireTime: expire,   														//Fecha en la que la tarea vence
			itemText: req.body.text,                                                    //Texto de la tarea
			itemArchived: false,                                                        //Tarea activa o archivada
			itemDone: false,                                                            //Tarea finalizada o incompleta
			hashedId: 'undefined'							
		});
	}
	//Edicion de item
	else {
		itemModel.item.findOne({hashedId: req.body.id}, (err, _item) =>{
			if(err) debug("ERROR en item.findOne");
			else {
                _item.update({
					itemPriority : req.body.priority,
                    itemText: req.body.text,
                    itemExpireTime: expire
				},(err)=>{
					if(err) debug("ERROR: en item.save", err.message);
					else debug("Guardado con exito:", module.exports.item)
				});
			}
			res.end("EDIT_OK");
		});
		return;
	}		
	//Guardamos el item
	module.exports.item.hashedId = hash.generate(module.exports.item._id.toString());
	module.exports.item.save((err)=> {
		if(err) debug("ERROR: en item.save", err.message);
		else {
			debug("Guardado con exito:", module.exports.item);
			//Añadimos la id del item al array de la lista
			manageList.list.listItems.push(module.exports.item._doc._id);
			//Guardamos la lista
			manageList.list.save((err)=>{
				if(err) debug("ERROR: en list.save", err.message);
				else debug("Guardado con exito:", manageList.list);
			});
			res.end("SAVE_OK");
		}
	});		
}
module.exports.deleteItem = function (req, res) {
	itemModel.item.remove({ hashedId: req.body.id }, (err) => {
		if (err) debug("ERROR: en item.remove", req.body.id);
		else res.end("DELETE_OK");
	});		
}