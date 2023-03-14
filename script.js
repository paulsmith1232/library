const myLibrary = [];
const bookForm = document.getElementById("bookForm");
const modal = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".open-modal-button");
const closeModalBtn = document.querySelector(".close-modal-button");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookDate = document.getElementById("date");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

function Book(title, author, date, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.date = date;
  this.pages = pages;
  this.read = Boolean(readStatus);
}

Book.prototype.info = function info() {
  console.log(
    `${this.title} by ${this.author}, published in ${this.date} and is ${this.pages} pages`
  );
};

Book.prototype.readToggle = function readToggle() {
  this.read = !this.read;
  console.log('test')
  refreshDisplay();
};

function iconToggle(icon) {
  if(icon.classList.contains('mouseover-event')){
    icon.classList.remove('mouseover-event');
  } else {
    icon.classList.add('mouseover-event');
  }
}

function refreshDisplay() {
  const bookDisplay = document.querySelector(".content");
  bookDisplay.innerHTML = "";
  myLibrary.forEach((book, index) => {
    // console.log(book.readToggle);
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
      <h2 class="book-title">${book.title}</h2>
      <p class="book-author">by ${book.author}</p>
      <p class="book-date">Publication date: ${book.date}</p>
      <p class="book-date-value"> </p>

      <button id="button-id-${index}" onmouseover="iconToggle(this)" onmouseout="iconToggle(this)" class="book-read-status-button">
        <img src="./resources/eye.svg" >
      </button>
      <button onmouseover="iconToggle(this)" onmouseout="iconToggle(this)" class="book-delete-button" data-index-number=${index}>
        <img src="./resources/trash-2.svg" class="delete-button-svg">
      </button> 
      <p class="book-pages">
        <img src="./resources/book-open.svg" class="book-pages-icon">
        ${book.pages}
      </p>
    `;
    bookDisplay.appendChild(div);
    const readButton = document.getElementById(`button-id-${index}`);

    if(book.read !== true){
      readButton.classList.add("unread");
    }
    readButton.onclick = function() {book.readToggle()};
  });
  

  // add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".book-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      myLibrary.splice(button.dataset.indexNumber, 1);
      refreshDisplay();
    })
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  refreshDisplay();
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function clearForm() {
  bookForm.reset();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);


bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookDate.value,
    bookPages.value,
    bookRead.checked
  );
  addBookToLibrary(newBook);
  closeModal();
  clearForm();
});

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "1937/09/21", 295, true);
const book2 = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  "1954/07/29",
  423,
  true
);
const book3 = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  "1960/07/11",
  281,
  false
);
const book4 = new Book("The Shining", "Stephen King", "1977/01/28", 447, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

refreshDisplay();
