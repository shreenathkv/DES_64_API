function shift_left(bits28, roundnumber)
{ 
   let left1or2;
   let rest ;  
   let shift = 2;

   if(roundnumber == 1 || roundnumber == 2 || roundnumber == 9 || roundnumber == 16)
   {
       shift = 1;
   }

   // cyclical left shift for which preparation is going on

   left1or2 = bits28.slice(0,shift);
   rest = bits28.slice(shift, bits28.length);

   return rest+left1or2; // to send the cyclically shifted bits shifted 

}

module.exports = {shift_left};