document.addEventListener('DOMContentLoaded', function() {
    const gamesContainer = document.getElementById('gamesContainer');
    let upVotedGame = null;

    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Fetch and display existing orders
    fetchGames();

    // Fetch orders from the API
    async function fetchGames() {
        try{
            const responseFetch = await fetch(`http://localhost:3000/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!responseFetch.ok) {
                throw new Error(`Erreur HTTP : ${responseFetch.status}`);
            }
            const dataFetch = await responseFetch.json();
            dataFetch.forEach(async game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game');
                gameDiv.innerHTML = `
                    <h2>Title : ${game.title}</h2>
                    <p class="summary">Summary : ${game.summary}<p>
                    <p class="mark">mark : ${game.mark}</p>
                    <p class="image">image : ${game.image}</p>
                    <button class="upVote" id="${game._id}">Up Vote</button>
                `;
                gamesContainer.appendChild(gameDiv);
            });

            // Add event listeners to upVote buttons
            document.querySelectorAll('.upVote').forEach(button => {
                button.addEventListener('click', function () {
                    const idGame = this.id;
                    upVote(idGame, dataFetch);
                });
            });
        } catch (error) {
            console.error("Erreur fetch :", error);
        }
    }

    // Change the mark of a game when i clink on the upVote button
    async function upVote(idGame, dataFetch) {

        if (!upVotedGame) {
            putGame(idGame, 1, dataFetch);
            upVotedGame = idGame;
        } else {
            if (upVotedGame == idGame) {
                putGame(idGame, -1, dataFetch);
                upVotedGame = null;
            }
        }

        // NON FONCTIONNEL car appelle asynchrone compliquer a gerer avec base de données mongoDB gratuite
        // if (!upVotedGame) {
        //     console.log("upVotedGame is null");
        //     putGame(idGame,1, dataFetch);
        //     upVotedGame = idGame;
        //     console.log(upVotedGame);
        // } else {
        //     console.log("upVotedGame is not null");
        //     if (upVotedGame != idGame) {
        //         putGame(idGame,1, dataFetch);
        //         putGame(upVotedGame,-1, dataFetch);
        //         upVotedGame = idGame;
        //     }
        // }
    }

    async function putGame(idGame,value, dataFetch){
        game = dataFetch.find(game => game._id === idGame);
        try {
            const response = await fetch(`http://localhost:3000/games/${game._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mark: game.mark + value })
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const updatedGame = await response.json();
            console.log(updatedGame);

            // Update the mark in the DOM
            const gameElement = document.getElementById(game._id).parentElement;
            const markElement = gameElement.querySelector(".mark"); // Correctly select the mark element
            markElement.textContent = `mark : ${updatedGame.mark}`; // Update the text content
            
            // Update the mark in dataFetch
            game.mark = updatedGame.mark; // Mettre à jour la valeur dans dataFetch
        } catch (error) {
            console.error("Erreur fetch :", error);
        }
    }
});