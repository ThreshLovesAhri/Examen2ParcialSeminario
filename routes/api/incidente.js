var express= require('express');
var router = express.Router();

function initIncidente(db){
  var incidenteColl= db.collection('incidentes');
  router.get('/', (req,res,next)=>{
    incidenteColl.find().toArray{(err,incidentes)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraer los incidendtes de la base de datos"});
      }
      return res.status(200).json(incidentes);
    }};
    res.status(200).json({"api":"1"});
  });
});
router.get('/:id', (req, res, next)=>{
  var id = new ObjectID(req.params.id);
  incidenteColl.findOne({"_id": id} , (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"No se Puede Obtener los Incidenttes, Porfa Intente de Nuevo"});
    }
    return res.status(200).json(doc);
  });
});
router.post('/', (req, res, next)=>{
  var newIncidente = Object.assign(
    {},
    {
      "descripcion":"",
      "fechaYHora":new Date().getDate(), new Date().getTime(),
      "tipo":"",
      "estado":"",
      "UsuarioRegistra":"",
      "UsuarioAsignado":"",
      "FechaYHoraAsignado":new Date().getDate(), new Date().getTime(),
      "FechaYHoraCerrado":new Date().getDate(), new Date().getTime()
    },
    req.body
  );
  incidenteColl.insertOne(newIncidente, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"No se pudo agregar nuevo Incidente"});
    }
    if(rslt.ops.length===0){
      console.log(rslt);
      return res.status(404).json({ "error": "No se pudo agregar nuevo Incidente" });
    }
    return res.status(200).json(rslt.ops[0]);
  });
});//post

  });
  return router;
}

module.exports = initIncidente;
