// PopUp Input Modal
class PopUpModal {
  constructor(openBtnId, closeBtnId, modalId) {
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.modal = document.getElementById(modalId);
    
    this.openBtn.addEventListener("click", () => {
      this.modal.classList.add("open");
    });

    this.closeBtn.addEventListener("click", () => {
      this.modal.classList.remove("open");
    });
  }
}

class BookManager {
  constructor() {
    this.books = [];
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.pagesInput = document.getElementById('pages');
    this.readInput = document.getElementById('read');
    this.addBtn = document.getElementById('add');
    this.bookModal = document.getElementById('inputModal');
    this.booksList = document.getElementById('books');

    this.addBtn.addEventListener('click', () => this.addBook());
    this.titleInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addBook();
      }
    });
  }

  addBook() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    const pages = this.pagesInput.value;
    const read = this.readInput.checked;

    const book = {
      title,
      author,
      pages,
      read,
    };

    this.books.push(book);

    this.bookModal.classList.remove('open');

    this.displayBooks();
  }

  displayBooks() {
    this.booksList.innerHTML = '';

    this.books.forEach((book, index) => {
      const card = this.createCard(book, index);
      this.booksList.appendChild(card);
    });
  }

  createCard(book, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    // Create select element for read status
    const readStatusSelectDiv = document.createElement('div');
    readStatusSelectDiv.classList.add('statusContainer');

    const readStatusSelect = document.createElement('select');
    const readStatusOptions = ['Yes', 'No', 'In progress'];
    readStatusSelect.innerHTML = readStatusOptions.map(option => `<option value="${option}">${option}</option>`).join('');
    readStatusSelect.value = book.read ? 'Yes' : 'No';
    readStatusSelectDiv.appendChild(readStatusSelect);

    readStatusSelect.addEventListener('change', () => {
      book.read = readStatusSelect.value === 'Yes';
    });

    // Create remove button
    const removeBtnContainer = document.createElement('div');
    removeBtnContainer.classList.add('removeContainer');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', () => {
      this.books.splice(index, 1);
      this.displayBooks();
    });

    removeBtnContainer.appendChild(removeBtn);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readStatusSelectDiv);
    card.appendChild(removeBtnContainer);

    return card;
  }
}

// Instantiate the PopUpModal class
const popUpModal = new PopUpModal("fill", "add", "inputModal");

// Instantiate the BookManager class
const bookManager = new BookManager();