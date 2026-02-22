
function add(a,b){
    return a+b;
}



function sub(a,b){
    return a-b;
}


//object bna lo taki ek se  jada function ko extract kr ske
module.exports ={
    add,
    sub
}


//another easy way to export the function is
exports.add=(a,b)=> a+b;
exports.sub=(a,b)=> a-b;