const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
    { id: 2, title: '1984', author: 'George Orwell', available: true },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
    { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', available: true }
];

let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

function login(role) {
    // Get input values
    const username = role === 'admin' ? document.getElementById('admin-username').value : document.getElementById('user-username').value;
    const password = role === 'admin' ? document.getElementById('admin-password').value : document.getElementById('user-password').value;

    if (username && password) {
        alert(`Logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}`);
        showLibrarySystem(role);
    } else {
        alert('Please enter both username and password');
    }
}

function showLibrarySystem(role) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('library-section').style.display = 'block';

    loadBooks(); 
}

function loadBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';  

    books.forEach(book => {
        if (book.available) {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <span>${book.title} by ${book.author}</span>
                <button onclick="borrowBook(${book.id})">Borrow</button>
            `;
            bookList.appendChild(bookItem);
        }
    });

    loadBorrowedBooks();
}

function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.available = false;
        borrowedBooks.push(book);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        loadBooks();
    }
}

function loadBorrowedBooks() {
    const borrowedBooksSection = document.getElementById('borrowed-books');
    borrowedBooksSection.innerHTML = '';

    if (borrowedBooks.length > 0) {
        borrowedBooks.forEach(book => {
            const borrowedItem = document.createElement('div');
            borrowedItem.className = 'borrowed-item';
            borrowedItem.innerHTML = `
                <span>${book.title} by ${book.author}</span>
                <button onclick="returnBook(${book.id})">Return</button>
            `;
            borrowedBooksSection.appendChild(borrowedItem);
        });
    } else {
        borrowedBooksSection.innerHTML = '<p>No books borrowed yet.</p>';
    }
}

function returnBook(bookId) {
    const bookIndex = borrowedBooks.findIndex(b => b.id === bookId);
    if (bookIndex > -1) {
        const returnedBook = borrowedBooks[bookIndex];
        returnedBook.available = true;
        books.find(b => b.id === returnedBook.id).available = true;

        borrowedBooks.splice(bookIndex, 1);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        loadBooks();
    }
}

window.onload = function() {
    loadBooks();
};
