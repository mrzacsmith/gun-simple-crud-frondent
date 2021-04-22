const getDate = (date) => {
    let res = date==null||date==undefined?'1900-01-01':date.toString().substr(0, 10);
    return res;
}

export default getDate;
