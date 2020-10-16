const dbPromise = idb.open("perpustakaan", 1, function (upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore("buku", { keyPath: "isbn" });
    case 1:
      const bukuStore = upgradeDb.transaction.objectStore("buku");
      bukuStore.createIndex("tahun", "tahun");
  }

  if (!upgradeDb.objectStoreNames.contains("buku")) {
    const peopleOS = upgradeDb.createObjectStore("buku", {
      keyPath: "isbn",
    });
    peopleOS.createIndex("judul", "judul", { unique: false });
    peopleOS.createIndex("nomorIndux", "nomorIndux", { unique: true });
  }
});

// const dbPromise = idb.open("perpustakaan", 2, function (upgradeDb) {

// });

dbPromise
  .then(function (db) {
    const tx = db.transaction("buku", "readwrite");
    const store = tx.objectStore("buku");
    const item = {
      judul: "Menjadi Android Developer Expert (MADE)",
      isbn: 123456789,
      description:
        "Belajar pemrograman Android di Dicoding dengan modul online dan buku.",
      created: new Date().getTime(),
    };
    store.add(item); //menambahkan key "buku"
    return tx.complete;
  })
  .then(function () {
    console.log("Buku berhasil disimpan.");
  })
  .catch(function () {
    console.log("Buku gagal disimpan.");
  });

dbPromise
  .then(function (db) {
    const tx = db.transaction("buku", "readonly");
    const store = tx.objectStore("buku");
    return store.getAll();
  })
  .then(function (val) {
    console.log("Data yang di ambil : ");
    console.dir(val);
  });

// dbPromise
//   .then(function (db) {
//     const tx = db.transaction("buku", "readonly");
//     const store = tx.objectStore("buku");
//     return store.openCursor();
//   })
//   .then(function ambilBuku(cursor) {
//     if (!cursor) {
//       return;
//     }
//     console.log("Posisi cursos: ", cursor.key);
//     for (const field in cursor.value) {
//       console.log(cursor.value);
//       //   console.log(cursor.value[field]);
//     }
//     return cursor.continue().then(ambilBuku);
//   })
//   .then(function () {
//     console.log("Tidak ada data lain.");
//   });

dbPromise
  .then(function (db) {
    const tx = db.transaction("buku", "readwrite");
    const store = tx.objectStore("buku");
    const item = {
      judul: "Menjadi Android Developer Expert (MADE)",
      isbn: 123456789,
      description:
        "Belajar pemrograman Android di Dicoding dengan modul online dan buku.",
      created: new Date().getTime(),
    };
    store.put(item); //menambahkan KEY
    return tx.complete;
  })
  .then(function () {
    console.log("Buku berhasil ubah/disimpan.");
  })
  .catch(function () {
    console.error("Buku gagal ubah/disimpan.");
  });

dbPromise
  .then(function (db) {
    const tx = db.transaction("store", "readwrite");
    const store = tx.objectStore("store");
    store.delete("1602883695973");
    return tx.complete;
  })
  .then(function () {
    console.log("Item deleted");
  })
  .catch(function () {
    console.log("Failed deleted");
  });
