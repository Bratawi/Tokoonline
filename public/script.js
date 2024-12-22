// Objek untuk menyimpan item di keranjang
const cartItems = {};

// Fungsi Tambah ke Keranjang
function addToCart(productName, productPrice) {
  if (cartItems[productName]) {
    cartItems[productName].quantity += 1;
    cartItems[productName].totalPrice += productPrice;
  } else {
    cartItems[productName] = { price: productPrice, quantity: 1, totalPrice: productPrice };
  }

  localStorage.setItem('cart', JSON.stringify(cartItems)); // Simpan ke localStorage
  updateCartDisplay(); // Perbarui tampilan
}

// Fungsi untuk menghapus produk dari keranjang
function handleDeleteProduct(productName) {
  if (cartItems[productName]) {
    cartItems[productName].quantity -= 1;
    cartItems[productName].totalPrice -= cartItems[productName].price;

    if (cartItems[productName].quantity === 0) {
      delete cartItems[productName];
    }

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Simpan ke localStorage
    updateCartDisplay(); // Perbarui tampilan
  }
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
  const cart = document.getElementById('cart');
  const total = document.getElementById('total');
  const checkoutButton = document.getElementById('checkout-btn'); // Tombol Checkout

  cart.innerHTML = ''; // Kosongkan elemen keranjang

  let currentTotal = 0;

  for (const [name, data] of Object.entries(cartItems)) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${name} 
      <span class="float-right">Rp ${data.totalPrice.toLocaleString('id-ID')}</span>
      <br />
      x ${data.quantity}
      <button 
        class="text-red-500 hover:text-red-700 focus:outline-none delete-btn" 
        data-name="${name}">
        Hapus
      </button>
    `;
    cart.appendChild(listItem);
    currentTotal += data.totalPrice;
  }

  total.textContent = `Total Harga: Rp ${currentTotal.toLocaleString('id-ID')}`;
  
  // Aktifkan tombol checkout jika total harga lebih dari 0
  if (currentTotal > 0) {
    checkoutButton.disabled = false;
  } else {
    checkoutButton.disabled = true;
  }

  const deleteButtons = cart.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productName = event.target.getAttribute('data-name');
      handleDeleteProduct(productName);
    });
  });
}

// Render keranjang saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  if (storedCart) {
    Object.assign(cartItems, storedCart);
  }
  updateCartDisplay();
});

// Menambahkan event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', function () {
  // Simpan data keranjang ke localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Arahkan ke halaman pembayaran
  window.location.href = '/Pembayaran'; // Halaman pembayaran
});