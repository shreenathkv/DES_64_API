const { default: BigNumber } = require("bignumber.js");

function utf2binaryconverter(key)
{
   let chararr = [];  
   binstr = '';

   for(let i = 0; i < key.length; i++) 
       chararr.push(key.charCodeAt(i));

   //console.log(chararr);    

   for(let i = 0; i < chararr.length; i++)
   {
      let binchar = chararr[i].toString(2);
      while(binchar.length < 8)      
      {
        binchar = '0'+binchar;
      }

      binstr+=binchar;
   }

   //console.log(binstr);
   return binstr;
       
};

function hex2binaryconverter(key)
{
   const hex2binmap = 
   {
      '0': '0000', '1': '0001', '2': '0010', '3': '0011',
      '4': '0100', '5': '0101', '6': '0110', '7': '0111',
      '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
      'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
   };

   let binstr = '';
   
   for(let i=0;i<key.length;i++)
   {
      binstr+=hex2binmap[key[i]];
   }

   return binstr ; 

}

function binary2hexconverter(bin)
{
   const hex = BigNumber(bin, 2).toString(16).toUpperCase();
   return hex;
}



module.exports = {utf2binaryconverter, hex2binaryconverter, binary2hexconverter};

