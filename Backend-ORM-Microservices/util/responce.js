const getStatus=(result)=>{
    if(result instanceof Error){
        return 500;
    }
    else{
        return 200;
    }
}

const getMessage=(result)=>{
    if(result instanceof Error){
        console.log(result);
        return "Operational Error";
    }
    else{
        return result;
    }
}

module.exports={
    getStatus,
    getMessage
}