import "./style.css";
import dayjs from "dayjs";

let formInput = document.getElementById("form-input");
let note = document.getElementById("note");
let notesContainer = document.getElementById("parent");

function createData(event) {
  event.preventDefault();

  let noteContent = event.target.note.value;

  console.log(noteContent);

  // kita dapatkan dulu data dari storage
  let dataStorage = localStorage.getItem("dataStorage");

  // jika datanya kosong di dalam storage,maka kita upload array kosong
  if (dataStorage == null) {
    localStorage.setItem("dataStorage", "[]");
  }

  // kita dapatkan lagi data dari local storage
  dataStorage = localStorage.getItem("dataStorage");
  // pada code diatas kita mendapatkan data "[]"

  // kemudian kita uraikan "[]" => []
  let dataStorageJSON = JSON.parse(dataStorage);

  dataStorageJSON.push({
    id: dayjs().format(),
    note: noteContent,
    date: dayjs().format(),
  });
  // data storage JSON ini mengandung value [{id : , note : , date :}]

  // data diatas dalam bentuk [{}] => "[{}]"
  localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));

  console.log("Updated dataStorage:", JSON.stringify(dataStorageJSON));

  // untuk menghapus catatan/note yang sudah di submit
  event.target.note.value = "";
  alert("Note berhasil ditambahkan");

  renderToHtml();
}

// buat component noteCard
function noteCard(id, content, date) {
  // console.log("Creating note card:", id, content, date);

  // buat element div
  let div = document.createElement("div");
  div.setAttribute("id", id);
  div.setAttribute(
    "class",
    "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative"
  );

  // buat element p
  let p = document.createElement("p");
  p.setAttribute("class", "font-light");
  p.textContent = content;

  // buat element small
  let small = document.createElement("small");
  small.setAttribute("class", "italic text-slate-500 text-xs mt-auto");
  small.textContent = date;

  // buat element button
  let buttonClose = document.createElement("button");
  buttonClose.setAttribute(
    "class",
    "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 top-2 text-white"
  );
  buttonClose.textContent = "X";
  buttonClose.addEventListener("click", () => {
    deleteCard(id);
  });

  div.appendChild(p);
  div.appendChild(small);
  div.appendChild(buttonClose);

  return div;
}

// function untuk merender data dari local storage ke HTML
function renderToHtml() {
  // console.log("Rendering notes to HTML");

  notesContainer.textContent = "";

  // kita ambil data dari local storage
  let storageData = localStorage.getItem("dataStorage");

  // jika tidak ada data di local storage,maka abaikan statement
  if (storageData == null) {
    console.log("Tidak Ada Data");
    return;
  }

  // ubah data string dari local storage data menjadi object
  let storageDataJson = JSON.parse(storageData);

  console.log("Data dari localStorage:", storageDataJson);

  // maping data dari dataStorageJson ke HTML (bisa menggunakan forEach/map)
  storageDataJson.reverse().forEach((e) => {
    notesContainer.appendChild(noteCard(e.id, e.note, e.date));
  });
}

function deleteCard(id) {
  console.log("Menghapus noteCard:", id);
  let dataStorage = localStorage.getItem("dataStorage");

  if (dataStorage != null) {

    let dataStorageJSON = JSON.parse(dataStorage);

    // filter data array
    dataStorageJSON = dataStorageJSON.filter((note) => note.id !== id);

    localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));

    renderToHtml();
  }
}

formInput.addEventListener("submit", createData);
document.addEventListener("DOMContentLoaded", renderToHtml);

// import "./style.css";
// import dayjs from "dayjs";

// let formInput = document.getElementById("form-input");
// let note = document.getElementById("note");

// function createData(e) {
//   e.preventDefault();

//   let note = e.target.note.value;

//   console.log(note);

//   // kita dapatkan dulu data dari storage
//   let dataStorage = localStorage.getItem("dataStorage");

//   // jika datanya kosong di dalam storage maka kita upload array kosong
//   if (dataStorage == null) {
//     localStorage.setItem("dataStorage", "[]");
//   }

//   // kita dapatkan lagi data dari local storage
//   dataStorage = localStorage.getItem("dataStorage");
//   // pada code diatas kita mendapatkan data "[]"

//   // kemudian kita uraikan "[]" => []
//   let dataStorageJSON = JSON.parse(dataStorage);

//   dataStorageJSON.push({
//     id: dayjs().format(),
//     note: note,
//     date: dayjs().format(),
//   });
//   // data storage JSON ini sudah mengandung value [{ id : , note : , date :}]

//   // data diatas dalam bentuk [{}] => "[{}]"
//   localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));

//   // untuk menghapus catatan/note yang sudah di submit
//   e.target.note.value = "";
//   alert("Data Berhasil Ditambahkan");
// }

// // component noteCard
// function noteCard(id, content, date) {
//   //buat elemen div di javascript
//   let div = document.createElement("div");
//   div.setAttribute("id", id);
//   div.setAttribute(
//     "class",
//     "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative"
//   );

//   // buat element p
//   let p = document.createElement("p");
//   p.setAttribute("class", "font-light");
//   p.textContent = content;

//   // buat element small
//   let small = document.createElement("small");
//   small.setAttribute("class", "italic text-slate-500 text-xs mt-auto");
//   small.textContent = date;

//   // buat element button
//   let btnClose = document.createElement("button");
//   btnClose.setAttribute(
//     "class",
//     "w-10 h-10 bg-red-500 flex justify-center rounded-md absolute right-2 top-2 text-white"
//   );
//   btnClose.textContent = "X";
//   btnClose.addEventListener("click", () => {
//     deleteCard(id);
//   });

//   // masukkan element p,small dan button ke dalam element div
//   div.appendChild(p);
//   div.appendChild(small);
//   div.appendChild(btnClose);

//   return div;
// }

// // function untuk merender data dari local storage ke HTML
// function renderToHtml() {
//   // kita ambil data dari local storage
//   let dataStorage = localStorage.getItem("dataStorage");

//   // jika tidak ada data di local storage,maka abaikan statement nya
//   if (dataStorage == null) {
//     return;
//   }

//   // ubah data string dari storage data menjadi object
//   let dataStorageJson = JSON.parse(dataStorage);

//   // maping data dari dataStorageJson ke HTML
//   dataStorageJson.reverse().map((e) => {
//     parent.appendChild(noteCard(e.id, e.note, e.date));
//   });
// }

// renderToHtml();

// formInput.addEventListener("submit", createData);
