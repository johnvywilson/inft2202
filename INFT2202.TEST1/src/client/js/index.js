import { movies } from "../data/movies.js";

// Selectors
const allMoviesTable = document.querySelector("#all-movies-container table");
const allMoviesAlert = document.querySelector("#all-movies-container .alert");
const allMoviesBody = allMoviesTable.querySelector("tbody");

const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");
const pinnedMoviesAlert = document.querySelector("#pinned-movies-container .alert");
const pinnedMoviesBody = pinnedMoviesTable.querySelector("tbody");

// Retrieve pinned movies from local storage
function getPinnedMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("pinnedMovies")) || [];
}

// Save pinned movies to local storage
function savePinnedMoviesToStorage(movies) {
    localStorage.setItem("pinnedMovies", JSON.stringify(movies));
}

// Insert movies into the specified table
function insertMoviesIntoTable(tableBody, movies, isPinnedTable = false) {
    tableBody.innerHTML = ""; // Clear existing rows
    movies.sort((a, b) => b.rating - a.rating); // Sort by rating (highest first)

    movies.forEach((movie) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${new Date(movie.datetime * 1000).toLocaleDateString()}</td>
            <td>${movie.director}</td>
            <td>${movie.rating}</td>
            <td>
                <button class="btn ${isPinnedTable ? 'btn-danger' : 'btn-primary'}" data-title="${movie.title}">
                    <i class="fa ${isPinnedTable ? 'fa-times' : 'fa-thumbtack'}"></i>
                </button>
            </td>
        `;

        // Apply row color based on rating
        if (movie.rating <= 2) row.style.backgroundColor = "red";
        else if (movie.rating <= 5) row.style.backgroundColor = "orange";
        else if (movie.rating <= 8) row.style.backgroundColor = "blue";
        else row.style.backgroundColor = "green";

        // Add event listener to pin/unpin button
        row.querySelector("button").addEventListener("click", () => togglePin(movie));
    });
}

// Toggle pin status for a movie
function togglePin(movie) {
    let pinnedMovies = getPinnedMoviesFromStorage();
    const isPinned = pinnedMovies.some((m) => m.title === movie.title);

    if (isPinned) {
        pinnedMovies = pinnedMovies.filter((m) => m.title !== movie.title);
    } else {
        pinnedMovies.push(movie);
    }

    savePinnedMoviesToStorage(pinnedMovies);
    refreshTables();
}

// Refresh tables after changes
function refreshTables() {
    const pinnedMovies = getPinnedMoviesFromStorage();

    // Update All Movies Table
    if (movies.length > 0) {
        allMoviesTable.classList.remove("d-none");
        allMoviesAlert.classList.add("d-none");
        insertMoviesIntoTable(allMoviesBody, movies);
    } else {
        allMoviesTable.classList.add("d-none");
        allMoviesAlert.classList.remove("d-none");
    }

    // Update Pinned Movies Table
    if (pinnedMovies.length > 0) {
        pinnedMoviesTable.classList.remove("d-none");
        pinnedMoviesAlert.classList.add("d-none");
        insertMoviesIntoTable(pinnedMoviesBody, pinnedMovies, true);
    } else {
        pinnedMoviesTable.classList.add("d-none");
        pinnedMoviesAlert.classList.remove("d-none");
    }
}

// Initial Load
refreshTables();