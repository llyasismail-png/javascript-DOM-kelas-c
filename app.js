console.log("Praktikum Dimulai");

// Aktivitas 1: DOM Selection Seleksi DOM
// DOM Selection kita harus "Menangkap Elemen" Sebelum kita memanipulasi HTML
// Ambil Elemen -> Simpan di dalam variabel javascript

// 1. Ambil Elemen Judul Berdasarkan ID
// document.getElementById("...") -> Ambil Elemen HTML Spesifik berdasarkan ID
const judulUtama = document.getElementById("judul-utama");

// 2. querySelector("#...") mengambil ID berdasarkan atribut ID
// Tanda (#) Artinya menargetkan ID (.) Menargetkan Class 
// Ambil Elemen Sub Judul Berdasarkan ID
const subJudul = document.querySelector("#sub-judul");

// 2. Mengambil Elemen Pada Kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil Tombol" Aksi Pada Karrtu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil Elemen Pada Kartu 2 (fitur catatan dinamis / todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


// Aktivitas 2: Manipulasi Teks & Style (Pada Kartu 1)
// addEventListener("click", function() {...}) -> artinya Tolong dengarkan dan tunggu
// setelah di "click" oleh user jalankan perintah di dalam function

// A. Mengubah Teks & Warna Teks Preview
btnUbahTeks.addEventListener("click", function(){
    // .innertext = Mengisi/Menimpa tulisan teks yang ada di HTML
    teksPreview.innertext = "Hebat! Teks ini berhasil diubah melalui DOM!";

    // .style.color = Mengubah warna teks secara langsung melalui Javascript (inline)
    teksPreview.style.color = "magenta";

    // console.log = Mencetak pesan di console
    console.log("DOM Teks Preview telah diperbaharui");
})


// B. Mengubah Warna Background Box Preview
btnToggleWarna.addEventListener("click", function(){
    // .classList.toggle("nama-class") -> menambahkan class jika belum ada, menghapus class jika sudah ada
    // Jika class tersebut Belum ada pada elemen, maka class tersebut akan ditambahkan.
    // Jika class tersebut sudah ada pada elemen, maka class tersebut akan dihapus.
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Box Preview telah diperbaharui");
});

// C. Mengembalikan Teks & Warna Teks Preview ke Default (Reset)
btnReset.addEventListener("click", function(){
    // Mengembalikan Teks Preview ke Default
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

    // Kosongkan Warna agar warna kembali ke default (inherit)
    teksPreview.style.color = "";

    // Hapus class khusus menggunakan .classList.remove("nama-class")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Box Preview telah dikembalikan ke default");
});


// Aktivitas 3 & 4: Membuat Catatan Dinamis (Todolist) & Menghitung Jumlah Catatan (Pada Kartu 2)
// Dibagian ini kita belajar membuat elemen HTML Baru (<li>) secara dinamis menggunakan Javascript
// Lalu mengisi teksnya, memberi tombol hapus, lalu menempelkannya kedalam layar


// Langkah 1 : Membuat Variabel untuk menampung jumlah catatan
// 'let' digunakan karena nilainya akan berubah-ubah (mutable)
let totalCatatan = 0;


// Langkah 2 : Membuat Fungsi untuk menambahkan catatan baru
// Fungsi ini adalah kumpulan perintah yang diberi nama. Kita bisa memanggilnya kapanpun kita mau.
function perbaruiJumlah() {
    // Masukkan angka totalCatatan ke dalam elemen HTML jumlahCatatan
    jumlahCatatan.innertext = totalCatatan;

    // Percabangan Kondisi: Apakah Catatannya 0?
    if (totalCatatan === 0) {
        // Jika > 0: Tambahkan class "hidden" agar pesan "Tidak ada catatan" muncul
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: Tambahkan class "hidden" agar pesan "Todak ada catatan" hilang
        pesanKosong.classList.add("hidden");
    }
}


// langkah 3: membuat fungsi untuk menambahkan catatan baru
function tambahCatatan() {
    // 3.1 ambil teks dari input catatan
    // .trim() -> menghapus spasi kosong di awal dan akhir teks
    const isiTeks = inputCatatan.value.trim();

    // 3.2 validasi input: jika teks kosong (" "), tampilkan alert dan hentikan fungsi
    if (isiTeks === "") {
        alert("Catatan tidak boleh kosong!");
        return; // hentikan fungsi jika input kosong
    }

    // 3.3 createElement("li") -> membuat elemen <li> baru hanya di javascript
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menambahkan class pada elemen <li> baru
    
    // 3.4 mengisi teks catatan baru dengan cara innerHTML mengisi <li> dengan teks dan tombol hapus
    // tanda Backtick (`) digunakan agar bisa menulis teks multi baris dan menyisipkan variabel di dalamnya menggunakan ${variabel}
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan event listener pada tombol hapus pada item <li>
    //querySelector(".btn-hapus") -> mengambil tombol hapus pada <li> baru
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        // menghapus elemen <li> dari daftar catatan
        liBaru.remove(); // mengurangi total catatan
        totalCatatan--; // memperbarui jumlah catatan di layar
        perbaruiJumlah();
        console.log('DOM Catatan "${isiTeks}" telah dihapus!');
    })

    //  3.6 .appendChild(liBaru) -> menempelkan elemen <li> baru ke dalam <ul> daftar catatan
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan jumlah cattatan dan memperbarui jumlah catatan di layar
    inputCatatan.value = ""; // mengosongkan input catatan

    // 3.8 menambahkan total catatan dan memperbarui jumlah catatan di layar
    totalCatatan++;
    perbaruiJumlah();

    console.log('DOM Catatan baru ditambahkan : "${isiTeks}"');
}

// langkah 4: menambahkan event listener pada tombol tambah catatan
// ketika tombol tambah diklik, jalankan fungsi tambahCatatan()
btnTambah.addEventListener("click", function() {
    tambahCatatan();
});

// langkah 5: event listener untuk menambahkan catatan ketika menekan tombol "Enter" pada keyboard
inputCatatan.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        tambahCatatan();
    }
});