// PopUp Input Modal
const openBtn = document.getElementById("fill")
const closeBtn = document.getElementById("add")
const popupModal = document.getElementById("inputModal")

openBtn.addEventListener("click", () => {
  popupModal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  popupModal.classList.remove("open");
});

// Adding Book Function

// Book array
const books = [];

// Get elements 
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author'); 
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const addBtn = document.getElementById('add');
const bookModal = document.getElementById('inputModal');
const booksList = document.getElementById('books');

// Add book function
function addBook() {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;
  
  const book = { 
    title, 
    author,
    pages,
    read 
  };
  
  books.push(book);
  
  bookModal.classList.remove('open');
  
  displayBooks();
}

// Display books as cards
function displayBooks() {

  booksList.innerHTML = '';

  let card;

  books.forEach(book => {

    if(book.read) {
      readText = 'Yes';
    } else {
      readText = 'No';
    }

    // Create card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create card content
    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p'); 
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement('p');
    read.textContent = `Have you read it? ${readText}`;

    // Append card content
    card.appendChild(title);
    card.appendChild(author); 
    card.appendChild(pages);
    card.appendChild(read);

    // Add card to list
    booksList.appendChild(card);

  });

  if(!card) {
    card = document.createElement('div');
  }

}

// Click handler
addBtn.addEventListener('click', addBook);

// Enter key handler
titleInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBook();
  }
});