const socket = io.connect('localhost:3000');
const subtotal = document.getElementById('subtotal');
const clients = document.getElementById('clients');
const invoiceCount = document.getElementById('invoiceCount');
const loader = document.getElementById('progress');
const utc = document.getElementById('date');
const status = document.getElementById('status');

loader.style.display = 'none';
subtotal.innerText = 0;

socket.on('invoice', function(data) {
  subtotal.innerText = data;
});

socket.on('clients', function(data) {
  clients.innerText = data;
  M.toast({html: 'Client count changed!'});
});

socket.on('invoiceCount', function(data) {
  invoiceCount.innerText = data;
});

socket.on('loading', function() {
  loader.style.display = 'block';
  setTimeout(changeLoader, 3000);
});

socket.on('utc', function(data) {
  utc.innerText = data;
});

socket.on('connect', () => {
    status.innerHTML = '<i class="far fa-check-circle"></i>';
    let card = status.parentElement.parentElement;
    card.classList.remove("amber");
    card.classList.add("teal");
});

socket.on('connect_error', () => {
    status.innerHTML = '<i class="fas fa-exclamation"></i>';
    let card = status.parentElement.parentElement;
    card.classList.remove("teal");
    card.classList.add("amber");
    clients.innerText = 0;

});

function changeLoader() {
  loader.style.display = 'none';
}