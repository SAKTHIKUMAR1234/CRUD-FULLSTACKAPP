const format=(data)=>{
    for(index=0;index<data.length;index++){
        const date=new Date(data[index].dob);
        const dd=((date.getDate()+"").padStart(2,'0'));
        const mm=((date.getMonth()+1)+"").padStart(2,'0');
        const yyyy=date.getFullYear();
        data[index].dob=dd+"-"+mm+"-"+yyyy;
    }
    return data;
}

module.exports={
    format
}