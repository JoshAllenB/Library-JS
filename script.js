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

const readStatusSelectDiv = document.createElement('div');
  readStatusSelectDiv.classList.add('statusContainer');

const readStatusSelect = document.createElement('select');
const readStatusOptions = ['Yes', 'No', 'In progress'];
  readStatusSelect.innerHTML = readStatusOptions.map(option => `<option value="${option}">${option}</option>`).join('');
  readStatusSelect.value = readText;
  readStatusSelectDiv.appendChild(readStatusSelect);

// Select change handler
readStatusSelect.addEventListener('change', () => {
  book.read = readStatusSelect.value === 'Yes'; 
});

// Append card content
card.appendChild(title);
card.appendChild(author); 
card.appendChild(pages);
card.appendChild(readStatusSelectDiv);
// Add card to list
booksList.appendChild(card);

// Remove button container
const removeBtnContainer = document.createElement('div');
  removeBtnContainer.classList.add('removeContainer');

// Remove button
const index = books.indexOf(book);
const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', () => {
    // Remove book from array
    books.splice(index, 1);
    // Remove card from list
    booksList.removeChild(card);
  });
  // Append button to container
  removeBtnContainer.appendChild(removeBtn);
  // Append container to card
  card.appendChild(removeBtnContainer);

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