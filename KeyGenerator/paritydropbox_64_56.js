function paritydropbox_64_56(key64)
{
   const dropbox = 
   [
    57,49,41,33,25,17,9,1,
    58,50,42,34,26,18,10,2,
    59,51,43,35,27,19,11,3,
    60,52,44,36,63,55,47,39,
    31,23,15,7,62,54,46,38,
    30,22,14,6,61,53,45,37,
    29,21,13,5,28,20,12,4
   ]

   let key56 = '';

   for(let i=0;i<dropbox.length;i++)
   {
      key56 += key64[dropbox[i]-1];
   }

   console.log(key56);
   return key56 ; 

}

module.exports = {paritydropbox_64_56};