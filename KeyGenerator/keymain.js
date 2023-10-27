const binary2hexconverter = require('./binaryconverter').binary2hexconverter;

const paritydropbox_64_56 = require('./paritydropbox_64_56').paritydropbox_64_56;
const shift_left = require('./shift_left').shift_left;
const compressionDBox_56_48 = require('./compressionDBox_56_48').compressionDBox_56_48;

// key gen takes a 8 byte long key input, and format (bin,hex,utf) and returns a 16 round key array

function keygen(key64)
{

   let roundkeys = [];

   // 64 --> 56 bit key permutation 

   const key56 = paritydropbox_64_56(key64);
   console.log("key56 : ",key56); 

   // split 56 --> 28, 28
   
   let left_half_bits = key56.slice(0,key56.length/2);
   let right_half_bits = key56.slice(key56.length/2,key56.length);

   console.log('left_half_bits : ',left_half_bits,' length :',`${left_half_bits.length}`);
   console.log('right_half_bits : ',right_half_bits,' length :',`${right_half_bits.length}`);   

   // repatedly shift and compress the bits to get round keys

   for(let i=0;i<16;i++)
 {  

   const left_input = shift_left(left_half_bits, i+1);
   //console.log('left_input : ',left_input,'length :',`${left_input.length}`);

   const right_input = shift_left(right_half_bits, i+1);   
   //console.log('right_input : ',right_input,'length :',`${right_input.length}`); 
   
   left_half_bits = left_input;
   right_half_bits = right_input;
   
   roundkeys.push(compressionDBox_56_48(left_input, right_input));
   
   const rkhex =  binary2hexconverter(roundkeys[i]);

   console.log(`roundkey${i+1}` ,rkhex);
   //console.log(`roundkey${i+1}` ,roundkeys[i]);
 }

 return roundkeys ;

};

module.exports = {keygen}








