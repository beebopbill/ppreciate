// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASUiM8JcuQTcaEfsou2FMEYszHj9QZvAE",
    authDomain: "city-web-app-587d9.firebaseapp.com",
    databaseURL: "https://city-web-app-587d9-default-rtdb.firebaseio.com",
    projectId: "city-web-app-587d9",
    storageBucket: "city-web-app-587d9.appspot.com",
    messagingSenderId: "1043876965787",
    appId: "1:1043876965787:web:a9a7036a0ab8300511053e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    const memoryForm = document.getElementById('memoryForm');
    const memoriesList = document.getElementById('memoriesList');
    

    memoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const memory = document.getElementById('memoryText').value;
    
        // Store the memory in Firebase
        const newMemoryRef = db.ref('memories').push();
        newMemoryRef.set({
            memory: memory,
            upvotes: 0,
            downvotes: 0
        });

        // Clear the form
        memoryForm.reset();
    });

    db.ref('memories').on('value', (snapshot) => {
        const data = snapshot.val();
        const sortedMemories = Object.keys(data)
            .map(key => ({ ...data[key], id: key }))
            .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    
        memoriesList.innerHTML = ''; // Clear the list
    
        sortedMemories.forEach(memory => {
            const li = document.createElement('li');
            li.setAttribute('data-id', memory.id);
            li.setAttribute('data-votes', memory.upvotes - memory.downvotes);
            li.innerHTML = `
                ${memory.memory}
                <span class="vote-count">${memory.upvotes - memory.downvotes}</span>
                <span class="emoji-actions">
                    <span class="emoji upvote" title="Upvote">👍</span>
                    <span class="emoji downvote" title="Downvote">👎</span>
                </span>
            `;
            memoriesList.appendChild(li);
            addVoteListeners(li, memory.id);
        });
    });
    

    function addVoteListeners(li, key) {
        const upvoteBtn = li.querySelector('.upvote');
        const downvoteBtn = li.querySelector('.downvote');
        const voteCountEl = li.querySelector('.vote-count');

        upvoteBtn.addEventListener('click', function() {

            console.log("Upvote button clicked!");

            li.classList.add('glow');
        
            setTimeout(() => {
                li.classList.remove('glow');
            }, 2000);
        

            const memoryRef = db.ref('memories/' + key);
            memoryRef.transaction(memory => {
                if (memory) {
                    memory.upvotes = (memory.upvotes || 0) + 1;
                }
                return memory;
            });

 li.classList.add('glow');

 setTimeout(() => {
     li.classList.remove('glow');
 }, 1500);
                
        
        });

        downvoteBtn.addEventListener('click', function() {
            const memoryRef = db.ref('memories/' + key);
            memoryRef.transaction(memory => {
                if (memory) {
                    memory.downvotes = (memory.downvotes || 0) + 1;
                }
                return memory;
            });
        });
    }

    function addDeleteListener(li, key) {
        const deleteBtn = li.querySelector('.delete');
        deleteBtn.addEventListener('click', function() {
            const memoryRef = db.ref('memories/' + key);
            memoryRef.remove();
            li.remove();
        });
    }

    function addFlagListener(li) {
        const flagBtn = li.querySelector('.flag');
        flagBtn.addEventListener('click', function() {
            alert("AHOY! There be a problem here? We'll send minions to invade its space, and discern with sound mind how best to move fo-ward. Kindly!");
        });
    }

    
});

// ... Your existing JS code ...

// Update progress bar based on total submissions
db.ref('memories').on('value', (snapshot) => {
    const data = snapshot.val();
    const totalSubmissions = Object.keys(data).length;
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = (totalSubmissions / 10000) * 100;

    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${totalSubmissions}/10,000`;
});




const modal = document.getElementById('customModal');
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

function showAlert() {
    modal.style.display = 'block';
}

// When the flag emoji is clicked, show the custom modal
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('flag-emoji')) {
        showAlert();
    }
});

// ... Your existing JS code ...

// Search functionality
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const allMemories = memoriesList.getElementsByTagName('li');
    Array.from(allMemories).forEach((memory) => {
        const memoryText = memory.textContent.toLowerCase();
        if (memoryText.includes(searchString)) {
            memory.style.display = 'block';
        } else {
            memory.style.display = 'none';
        }
    });

    // ... Your existing JS code ...

document.getElementById('filterMostUpvoted').addEventListener('click', function() {
    sortMemories('upvotes');
});

document.getElementById('filterMostDownvoted').addEventListener('click', function() {
    sortMemories('downvotes');
});

document.getElementById('filterReset').addEventListener('click', function() {
    displayMemories(); // This will just display memories without any sorting.
});

// ... Your existing JS initialization ...

const filterMostUpvoted = document.getElementById('filterMostUpvoted');
const filterMostDownvoted = document.getElementById('filterMostDownvoted');
const filterReset = document.getElementById('filterReset');

filterMostUpvoted.addEventListener('click', function() {
    fetchAndSortMemories('upvotes');
});

filterMostDownvoted.addEventListener('click', function() {
    fetchAndSortMemories('downvotes');
});

filterReset.addEventListener('click', displayMemories);


function sortMemories(criteria) {
    db.ref('memories').once('value', (snapshot) => {
        const data = snapshot.val();
        const sortedMemories = Object.keys(data).map(key => ({ ...data[key], id: key }))
            .sort((a, b) => {
                if (criteria === 'upvotes') {
                    return b.upvotes - a.upvotes;
                } else if (criteria === 'downvotes') {
                    return b.downvotes - a.downvotes;
                }
            });

        memoriesList.innerHTML = ''; // Clear the list

        sortedMemories.forEach(memoryObj => {
            const li = createMemoryElement(memoryObj);
            memoriesList.appendChild(li);
        });
    });
}


});

