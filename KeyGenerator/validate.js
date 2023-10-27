function validateUTF(key)
{
    const keystatus = /^[a-z0-9]+$/i.test(key) && key.length == 8 ;
    return keystatus;
}

function validateBin(key)
{
    const keystatus = /^[0-1]+$/i.test(key) && key.length == 64 ;
    return keystatus;
}

function validateHexa(key)
{
    const keystatus = /^[a-f0-9]+$/i.test(key) && key.length == 16 ;
    return keystatus;
}

module.exports = {validateUTF, validateBin, validateHexa};