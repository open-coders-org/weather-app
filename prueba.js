let lista = [1,2,3,4,5,6,7,8,9,10]

function sum (x){
    return x + 5
}

let lista3 = lista.map(sum)
console.log(lista3);
let lista4 = lista.filter(x=>{
    return x%2 === 0
})

console.log(lista4);


