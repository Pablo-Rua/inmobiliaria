const app = require('../../config/server');
const connection = require('../../config/dbConnection');

module.exports = app => {

	app.get('/',(req,res)=>{
		res.render('../views/index.ejs')
	})
	app.get('/vivienda',(req,res)=>{
		res.render('../views/vivienda.ejs')
	})
	app.get('/usuario',(req,res)=>{
		res.render('../views/usuario.ejs')
	})
	app.get('/edit/:idV',(req,res)=>{
		const {idV} = req.params;
		connection.query("SELECT * FROM viviendas WHERE idVivienda = ?",[idV], (err,result) => {
			res.render('../views/editarVivienda.ejs',  { 
				vivienda: result
			})
		})
	})
	app.get('/editU/:idU',(req,res)=>{
		const {idU} = req.params;
		connection.query("SELECT * FROM usuario WHERE idUsuario = ?",[idU], (err,result) => {
			res.render('../views/editarUsuario.ejs',  { 
				usuario: result
			})
		})
	})
	app.post('/edit/:idV', async (req, res)=>{
		const {idV} = req.params;
		const {houseName, houseAdress, houseConstru, houseContact} = req.body;
		const newHouse = {
			nombreVivienda: houseName,
			direVivienda: houseAdress,
			constructora: houseConstru,
			contacto: houseContact
		};
		await connection.query('UPDATE viviendas set ? WHERE idVivienda = ?', [newHouse,idV]);
		res.redirect('/listaViviendas')
	})
	app.post('/editU/:idU', async (req, res)=>{
		const {idU} = req.params;
		const {userName, eMail, telefono} = req.body;
		const newUser = {
			nombre: userName,
			correo: eMail,
			telefono: telefono
		};
		await connection.query('UPDATE usuario set ? WHERE idUsuario = ?', [newUser,idU]);
		res.redirect('/listaUsuarios')
	})
	app.get("/listaViviendas", (req,res)=>{
		connection.query("SELECT * FROM viviendas", (err,result)=>{
			res.render('../views/listaViviendas.ejs', {
				vivienda:result
			})
		})
	})
	app.get("/listaUsuarios", (req,res)=>{
		connection.query("SELECT * FROM usuario", (err,result)=>{
			res.render('../views/listaUsuarios.ejs', {
				usuario:result
			})
		})
	})
	app.get('/delete/:idV', async(req,res)=> {
		const {idV} = req.params;
		await connection.query("DELETE FROM viviendas WHERE idVivienda = ?", [idV]);
		res.redirect("/listaViviendas")
	})
	app.get('/deleteU/:idU', async(req,res)=> {
		const {idU} = req.params;
		await connection.query("DELETE FROM usuario WHERE idUsuario = ?", [idU]);
		res.redirect("/listaUsuarios")
	})		
	app.post('/usuario', async (req,res) =>{
		const {userName,eMail,birthDate,telefono} = req.body;
		console.log(req.body);
		connection.query("INSERT INTO usuario SET ?", {
			nombre:userName,
			correo:eMail,
			fechaNaci:birthDate,
			telefono:telefono
		}, async(error, results)=>{
			if (error) {
				console.log(error);
			}else{
				res.render('../views/usuario.ejs', {
					alert:true,
					alertTitle:"Exitoso",
					alertMessage:"Registro de usuario exitoso",
					alertIcon:"success",
					showConfirmButton: false,
					timer: 3000,
					ruta:''
				});
			}
		})
	})
	app.post('/vivienda', async (req,res) =>{
		const {houseId,houseName,houseAdress,houseConstru,houseContact} = req.body;
		console.log(req.body);
		connection.query("INSERT INTO viviendas SET ?", {
			idVivienda:houseId,
			nombreVivienda:houseName,
			direVivienda:houseAdress,
			constructora:houseConstru,
			contacto:houseContact
		}, async(error, results)=>{
			if (error) {
				console.log(error);
			}else{
				res.render('../views/vivienda.ejs', {
					alert:true,
					alertTitle: "Exitoso",
					alertMessage: "Registro de vivienda exitoso",
					alertIcon: "success",
					showConfirmButton: false,
					timer: 3000,
					ruta:''
				});
			}
		})
	})
}