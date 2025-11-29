# 🎮 Sistem Manajemen Pustaka Game Favorit

Aplikasi ini berfungsi untuk mengelola daftar game favorit menggunakan konsep **CRUD (Create, Read, Update, Delete)** dan **modularisasi JavaScript**. 

## 📁 Struktur File
FInal_project/
│── node_modules/
│── controller/
│     └── gameController.js
│── routes/
│     └── gameRoutes.js
│── .gitignore
│── data.js
|── index.js
│── package.json
|── package-lock.json
|── readme.md

## 📘 Cara menjalankan server

buka terminal lalu ketik:
- npm init -y

lalu install express dan depedensis 
- npm install express
- npm install -D nodemon

karena aplikasi ini menggunakan metode export dan import di tambahkan file package json:
- "type": "module",

lalu jalankan server 
- node index.js / npm start

lalu url server akan keluar seperti:
- http://localhost:3000 

## 📘 penjelasan endpoint 

1. Menambahkan game baru (create)
Menggunakan Metode: POST
endpoint: http://localhost:3000/games
- menggunakan Body Request (JSON):

{
  "judul": "Mobile legend",
  "genre": "Moba",
  "platform": "Mobile",
  "status": "Belum Dimainkan"
}
- Respon Sukses: 201 Created dengan data game yang baru dibuat (termasuk ID barunya), jika gagal status code yang muncul 404 bad request 

2. Menampilkan semua game dan filter game berdasarkan platform 
Metode: GET
endpoint: http://localhost:3000/games 
 {
    id: 1,
    judul: "The Witcher 3: Wild Hunt",
    genre: "Action RPG",
    platform: "PC",
    status: "Sudah Tamat" 
  },
  {
    id: 2,
    judul: "Stardew Valley",
    genre: "Simulation",
    platform: "PC",
    status: "Sedang Dimainkan"
  },
  {
    id: 3,
    judul: "Red Dead Redemption 2",
    genre: "Action-Adventure",
    platform: "Mobile",
    status: "Belum Dimainkan"
  }
};  
Respon Sukses: 200 OK dengan array data game.

filter game memakai metode dynamic routing  query parameter untuk menyaring platform sesuai yang diinput oleh user:
- endpoint: http://localhost:3000/games?platform=PC (Mengganti PC dengan platform yang diinginkan)

3. mencari game by ID
- metode: GET 
- endpoint: http://localhost:3000/games/2 (Mengganti 2 dengan ID game yang dicari)
- Respon: kalau sukses status code yang muncul yaitu 200 ok, sedangkan jika gagal status code yang muncul yaitu 404 Not Found jika ID tidak ada.

4. mengupadte status game
- metode: PATCH
- endpoint:  http://localhost:3000/games/1 (Mengganti 1 dengan ID game yang ingin diupdate) 
- tipe dynamic routing yang digunakan yaitu pathparameter 
- menggunakan Body Request (JSON Wajib):
{
  "status": "Sedang Dimainkan"
}

- respon: kalau sukses status code yang muncul yaitu 200 ok, sedangkan jika gagal status code yang muncul yaitu 404 Not Found jika id tidak ada

5. menghapus game
- metode: DELETE 
- endpoint: http://localhost:3000/games/3 (Mengganti 3 dengan ID game yang ingin dihapus)
- tipe dynamic routing yang digunakan yaitu pathparameter 
- respon: alau sukses status code yang muncul yaitu 200 ok dengan konfirmasi dan data game yang telah dihapus, sedangkan jika gagal status code yang muncul yaitu 404 Not Found jika id tidak ada