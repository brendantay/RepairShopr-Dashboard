setInterval(clock, 1000);
console.log("Gemaakt door: Remco de Wilde");

function clock() {
    let d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}