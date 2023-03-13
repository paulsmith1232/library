const myLibrary = [];
const bookForm = document.getElementById("bookForm");
const modal = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".open-modal-button");
const closeModalBtn = document.querySelector(".close-modal-button");

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
  refreshDisplay();
};

function refreshDisplay() {
  const bookDisplay = document.querySelector(".content");
  bookDisplay.innerHTML = "";
  myLibrary.forEach((book, index) => {
    // console.log(book.readToggle);
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
    <p class="book-title">${book.title}</p>
    <p class="book-author">by ${book.author}</p>
    <p class="book-date">Publication date: </p>
    <p>${book.date} </p>
    <p class="book-pages">Page count: </p>
    <p>${book.pages}</p>
    <p class="book-read-status">Read: ${book.read.toString()}</p>   
    <button class="delete-button" data-index-number=${index}>Remove</button> 
    `;
    const button = document.createElement("button");
    button.classList.add("read-status-button")
    button.innerHTML = "Read Status";
    button.onclick = function() {book.readToggle()};
    div.appendChild(button);
    bookDisplay.appendChild(div);
  });

  // add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      myLibrary.splice(button.dataset.indexNumber, 1);
      refreshDisplay();
    });
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

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);


bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookDate = document.getElementById("date").value;
  const bookPages = document.getElementById("pages").value;
  const bookRead = document.querySelector("input[name='read_status']:checked");

  const newBook = new Book(
    bookTitle,
    bookAuthor,
    bookDate,
    bookPages,
    bookRead
  );

  addBookToLibrary(newBook);
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
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

refreshDisplay();
