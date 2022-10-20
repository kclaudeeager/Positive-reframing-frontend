const searchPeople=(ev: any) =>{
    // set val to the value of the searchbar
    let val = ev.target.value;
    let firstchar = val.charAt(0);

    if (firstchar = "@") {
        console.log("search people");
    }
    else if (firstchar = "#") {
        console.log("hash tag");
    } else {
        console.log("error");
    }
}
export default searchPeople;
