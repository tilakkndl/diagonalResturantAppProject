let Momo = [];
let momoButton = document.getElementById("momoButton");
let chowminButton = document.getElementById("chowminButton");
let burgerButton = document.getElementById("burgerButton");
let pizzaButton = document.getElementById("pizzaButton");
let localPizza;
let localBurger;
let localChowmin;
let localMomo;

//updating Bill for momo
if(localStorage.momo) updateBill(JSON.parse(localStorage.momo))
if (localStorage.getItem("momo")){
    const data=JSON.parse(localStorage.getItem("momo"));
    Momo.push(...data);
    }

    //updating history
    if(localStorage.history) updateHistory(JSON.parse(localStorage.history))


momoButton.addEventListener("click", function(e){
    e.preventDefault();
      let type = "Momo";
    quantity = document.getElementById("noOfMomo").value;
    price = 150;
    let momo = {
        "name" :type,
        "quantity": quantity,
        "price": price,
    }

    Momo.push(momo);


        localStorage.setItem("momo", JSON.stringify(Momo));
    localMomo = JSON.parse(localStorage.getItem("momo"))
updateBill(localMomo);
document.getElementById("noOfMomo").value = "";

})




chowminButton.addEventListener("click", function(e){
    e.preventDefault();
      let type = "Chowmin";
    quantity = document.getElementById("noOfChowmin").value;
    price = 150;
    let chowmin = {
        "name" :type,
        "quantity": quantity,
        "price": price,
    }
    Momo.push(chowmin);
    localStorage.setItem("momo", JSON.stringify(Momo));
  let localChowmin = JSON.parse(localStorage.getItem("momo"));
  updateBill(localChowmin);
  document.getElementById("noOfChowmin").value = "";
})



burgerButton.addEventListener("click", function(e){
    e.preventDefault();
      let type = "Burger";
    quantity = document.getElementById("noOfBurger").value;
    price = 300;
    let burger = {
        "name" :type,
        "quantity": quantity,
        "price": price,
    }
    Momo.push(burger);
    localStorage.setItem("momo", JSON.stringify(Momo));
   localBurger = JSON.parse(localStorage.getItem("momo"));
   updateBill(localBurger);
   document.getElementById("noOfBurger").value = "";
})



pizzaButton.addEventListener("click", function(e){
    e.preventDefault();
      let type = "Pizza";
    quantity = document.getElementById("noOfPizza").value;
    price = 400;
    let pizza = {
        "name" :type,
        "quantity": quantity,
        "price": price,
    }
    Momo.push(pizza);
    localStorage.setItem("momo", JSON.stringify(Momo));
  localPizza = JSON.parse(localStorage.getItem("momo"));
  updateBill(localPizza);
  document.getElementById("noOfPizza").value = "";
})

//function to update the bill
function updateBill(local){
    if(local && local.length!=0){
        let text = "";
    let insertBill = document.getElementById("bill-body");

    local.forEach(function(mov){
            text += ` <tr>
    <td>${mov.name}</td>
    <td>${mov.quantity}</td>
    <td>${mov.price}</td>
    <td>${mov.price*mov.quantity}</td>
</tr>`
insertBill.innerHTML=text;
})  
    }
    else{
        insertBill.innerHTML="Order Now to get Bill here.";
    }
  
}

let sum;
let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", function(){
     sum = localStorage.getItem("momo");
    sum = JSON.parse(sum);
    console.log(sum);
    let total = sum.reduce(function(acc, mov){
        console.log(mov);
        return acc+ mov.price*mov.quantity;
    }, 0) 
    console.log(total)
    let tag = ` <tr>
    <td>Total</td>
    <td></td>
    <td></td>
    <td>${total}</td>
</tr>`
    insertBill.insertAdjacentHTML("beforeend", tag
   
    )
})
let noOfMomo;
let noOfBurger;
let noOfChowmin;
let noOfPizza;
let payButton = document.getElementById("payButton")
payButton.addEventListener("click", function(){
    console.log(sum);
    let broughtMomo = sum.filter(mov => mov.name === "Momo");
    if(broughtMomo.length!= 0){
            console.log(broughtMomo);
     noOfOrderedMomo = broughtMomo.reduce(function(acc, mov) {
        return acc + (+mov.quantity);
     }, 0) 
    console.log(noOfOrderedMomo);
    }
    else{
        noOfOrderedMomo = 0;
    }



    let broughtChowmin = sum.filter(mov => mov.name === "Chowmin");
    if(broughtChowmin.length!=0){
            noOfOrderedChowmin = broughtChowmin.reduce(function(acc, mov) {
        return acc + (+mov.quantity);
     }, 0) 
    }
    else{
        noOfOrderedChowmin = 0;
    }
 
    let broughtPizza = sum.filter(mov => mov.name === "Pizza");
if(broughtPizza.length!=0){
    let broughtPizza = sum.filter(mov => mov.name === "Pizza");
 noOfOrderedPizza = broughtPizza.reduce(function(acc, mov) {
    return acc + (+mov.quantity);
 }, 0) 
}
else{
    noOfOrderedPizza = 0;
}

let broughtBurger = sum.filter(mov => mov.name === "Burger");
if(broughtBurger.length!=0){
     noOfOrderedBurger = broughtBurger.reduce(function(acc, mov) {
    return acc + (+mov.quantity);
 }, 0) 
console.log(noOfOrderedBurger);
}
else{
    noOfOrderedBurger = 0;
}

if(JSON.parse(localStorage.getItem("history"))){
    let findFood = JSON.parse(localStorage.getItem("history"));
    noOfOrderedMomo += findFood.find(mov => mov.name === "Momo").quantity;
    noOfOrderedChowmin += findFood.find(mov => mov.name === "Chowmin").quantity;
    noOfOrderedBurger += findFood.find(mov => mov.name === "Burger").quantity;
    noOfOrderedPizza += findFood.find(mov => mov.name === "Pizza").quantity;
}

let listForHistory = [];
let historyForMomo = {
    "name" : "Momo",
    "quantity" : noOfOrderedMomo,
}
listForHistory.push(historyForMomo)

let historyForChowmin = {
    "name" : "Chowmin",
    "quantity" : noOfOrderedChowmin,
}
listForHistory.push(historyForChowmin);


let historyForBurger = {
    "name" : "Burger",
    "quantity" : noOfOrderedBurger,
}
listForHistory.push(historyForBurger);


let historyForPizza = {
    "name" : "Pizza",
    "quantity" : noOfOrderedPizza,
}
listForHistory.push(historyForPizza);

localStorage.setItem("history", JSON.stringify(listForHistory));
localStorage.removeItem("momo");
Momo = [];
let momoAfterDelet = JSON.parse(localStorage.getItem("momo"));
updateBill(momoAfterDelet);
window.location.reload()
let historyFromLocal = JSON.parse(localStorage.getItem("history"));
updateHistory(historyFromLocal);
})



function updateHistory(history){
let historyHTML = document.getElementById("historyForUl");
historyHTML.innerHTML = "";
historyHTML.innerHTML = `
<ul >
<li>${history[0].name} : ${history[0].quantity}</li>
<li>${history[1].name} : ${history[1].quantity}</li>
<li>${history[2].name} : ${history[2].quantity}</li>
<li>${history[3].name} : ${history[3].quantity}</li>
</ul>
`
}