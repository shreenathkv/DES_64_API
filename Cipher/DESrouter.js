const express = require('express');
const router = express.Router() ;
const Joi = require('joi');

const { DESencrypt, DESdecrypt} = require('./DESfull');
const { binary2hexconverter, hex2binaryconverter, utf2binaryconverter} = require('../KeyGenerator/binaryconverter');
const { keygen } = require('../KeyGenerator/keymain');

// enforcing some formats on the input data
// key or data : utf-8, hex or binary
// length : 8,16,64

const schema = Joi.object({

   Type: Joi.string().valid('binary', 'hexa', 'utf-8'),

   function: Joi.string().valid('encrypt','decrypt'),

   data: Joi.string().custom((value, helpers) => 
   {
     
     const dataType = helpers.state.ancestors[0].Type;
     const validLength = {
       'binary': 64,
       'hexa': 16,
       'utf-8': 8,
     };
     if (value.length !== validLength[dataType]) 
     {
       console.log(dataType,value.length);
       return helpers.error('custom.invalidLength');
     }
     return value;
   }).messages({
      'custom.invalidLength': 'The data must be of the specified length for the selected "type".',
    }),

   key: Joi.string().custom(async (value, helpers) => 
   {
     const keyType = await helpers.Type;
     const validLength = {
       binary: 64,
       hexa: 16,
       'utf-8': 8,
     };
     if (value.length !== validLength[keyType]) {
       return helpers.error('custom.invalidLength');
     }
     return value;
   }).messages({
      'custom.invalidLength': 'The key must be of the specified length for the selected type.',
    }),

 });
 
 function validate(req, res, next) 
 {
   console.log('In middleware validate')
   const { error } = schema.validate(req.query);
   

   if (error) {
     return res.status(400).json({ error: error.details[0].message });
   }
 
   next();
 }

router.post('/api/DES', validate , async (req,res) => 
{
   const queryparams = req.query;
   console.log('Query Params in Post',queryparams);

   const type = queryparams.Type;
   let key = queryparams.key;
   let data = queryparams.data ;
   const func = queryparams.function;

   let roundkeys;
   let output64 ;

try   
{
   if(type=='hexa')
   {
      key = hex2binaryconverter(key);
      data = hex2binaryconverter(data);
   }
   else if(type=='utf-8')
   {
      key = utf2binaryconverter(key);
      data = utf2binaryconverter(data);
   }

   roundkeys = keygen(key);

   let hexrk = [];
   for(let i=0; i<roundkeys.length; i++)
   {
      hexrk.push(binary2hexconverter(roundkeys[i]));
   }

   if(func=='encrypt')
   {
      output64 = DESencrypt(data,roundkeys);
   }
   else
   {
      output64 = DESdecrypt(data,roundkeys);
   }

   const hexop = binary2hexconverter(output64);
   
   return res.json({"message":`${func}ion went fine`,
                    "Binaryoutput":output64,
                    "hexop":hexop,
                    "binroundkeys":roundkeys,
                    "hexroundkeys":hexrk}).status(200);

}

catch(error)
{
   return res.json({"message":"Some internal server error"}).status(500);
}

finally
{
   console.log('Finally');
}
   
});

module.exports = router;