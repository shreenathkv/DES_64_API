// to make DES independant of mode
const {binary2hexconverter} = require('../KeyGenerator/binaryconverter');
const { xorstr, compression_Sbox_48_32, straight_Dbox_32_32, expansion_DBox_32_48 } = require('./mangler');

// let this be a lower layer function which takes only bit input data, and 16 generated roundkeys 
function DESencrypt(data64,roundkeys)
{
   
    const IP_data64 = IP64(data64);
    console.log('IP_Data64 :',IP_data64);
    let input = IP_data64;

    for(let i=0;i<16;i++)
    {
        console.log(`In round ${i+1}`);
        input = round(input,roundkeys[i]);
        console.log(`ouput of round ${i+1} is ${binary2hexconverter(input)}`);
    }
 
    const precipher64 = swapper(input);
    console.log('precipher64 :',binary2hexconverter(precipher64));
    const cipher64 = FP64(precipher64);

    console.log(binary2hexconverter(cipher64));
    console.log('cipher64 :', cipher64);
    return cipher64;

}

function DESdecrypt(cipher64,roundkeys)
{
   
    const IP_cipher64 = IP64(cipher64);
    console.log('Decryption : IP_cipher64 :',IP_cipher64);
    let input = IP_cipher64;

    for(let i=0;i<16;i++)
    {
        console.log(`In round ${i+1}`);
        input = round(input,roundkeys[15-i]);
        console.log(`ouput of round ${i+1} is ${binary2hexconverter(input)}`);
    }
 
    const predata64 = swapper(input);
    console.log('predata64 :',binary2hexconverter(predata64));
    const data64 = FP64(predata64);

    console.log(binary2hexconverter(data64));
    console.log('cipher64 :', data64);
    return data64;

}

function round(input64,roundkey)
{
    let left = input64.slice(0,input64.length/2);
    let right = input64.slice(input64.length/2,input64.length);

    console.log(left, right);

    let data48 = expansion_DBox_32_48(right);

    console.log('expansion 32 to 48',data48);

    data48 = xorstr(data48,roundkey);

    let data32 = compression_Sbox_48_32(data48);

    console.log('compression from 48 to 32',data32);

    data32 = straight_Dbox_32_32(data32);

    data32 = xorstr(data32,left);

    return swapper(data32+right);

}

function swapper(input)
{
    left = input.slice(0,input.length/2);
    right = input.slice(input.length/2,input.length);

    return right+left;
}

function IP64(data64)
{

   const IPbox = [58,50,42,34,26,18,10,2,
                  60,52,44,36,28,20,12,4,
                  62,54,46,38,30,22,14,6,
                  64,56,48,40,32,24,16,8,
                  57,49,41,33,25,17,9,1,
                  59,51,43,35,27,19,11,3,
                  61,53,45,37,29,21,13,5,
                  63,55,47,39,31,23,15,7]

    let IP_data64 = '';

    for(let i=0;i<IPbox.length;i++)
    {
        IP_data64 += data64[IPbox[i]-1]
    }


    return IP_data64;

}

function FP64(data64)
{
    const FPbox = [
        40, 8, 48, 16, 56, 24, 64, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25
      ];

let FP_data64 = '';

for(let i=0;i<FPbox.length;i++)
{
    FP_data64 += String(data64[FPbox[i]-1])
}


return FP_data64;

}



module.exports = {DESencrypt,DESdecrypt};