const songs = [
  {
    title: "I Will Survive",
    artist: "Gloria Gaynor",
    lyrics:
      "At first I was afraid, I was ______. Kept thinking I could never live without you by my side...",
    answer: "petrified"
  },
  {
    title: "Don't Stop Believin'",
    artist: "Journey",
    lyrics:
      "Just a small town girl, livin' in a ______ world. She took the midnight train goin' anywhere...",
    answer: "lonely"
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    lyrics:
      "Is this the real life? Is this just ______? Caught in a landslide, no escape from reality...",
    answer: "fantasy"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    lyrics:
      "I'm in love with the shape of you, we push and pull like a ______ do...",
    answer: "magnet"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    lyrics:
      "I said, ooh, I'm blinded by the ______, No, I can't sleep until I feel your touch...",
    answer: "lights"
  },
  {
    title: "Memories",
    artist: "Maroon 5",
    lyrics:
      "Here's to the ones that we got, Cheers to the wish you were here, but you're not, 'Cause the drinks bring back all the ______...",
    answer: "memories"
  }
  // Add more songs as needed
];

let currentSongIndex = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
document.getElementById("next-round").addEventListener("click", nextRound);
document.getElementById("restart-game").addEventListener("click", restartGame);

function startGame() {
  score = 0;
  currentSongIndex = 0;
  document.getElementById("game-setup").style.display = "none";
  document.getElementById("game-play").style.display = "block";
  loadNextSong();
}

function loadNextSong() {
  if (currentSongIndex >= songs.length) {
    endGame();
    return;
  }
  const currentSong = songs[currentSongIndex];
  document.getElementById("song-title").textContent = ""; // Clear the previous title
  document.getElementById("lyric-display").textContent = currentSong.lyrics;
  document.getElementById("user-answer").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-round").style.display = "none";
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("user-answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer = songs[currentSongIndex].answer.toLowerCase();
  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").textContent =
      "Correct! You get a point!";
    score += 1;
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `Incorrect! The correct answer was "${songs[currentSongIndex].answer}".`;
  }
  revealAnswer();
  document.getElementById("next-round").style.display = "block";
}

function revealAnswer() {
  const currentSong = songs[currentSongIndex];
  document.getElementById(
    "song-title"
  ).textContent = `The song was "${currentSong.title}" by ${currentSong.artist}.`;
}

function nextRound() {
  currentSongIndex++;
  loadNextSong();
}

function endGame() {
  saveScore();
  document.getElementById("game-play").style.display = "none";
  document.getElementById("game-end").style.display = "block";
  document.getElementById("final-score").textContent = score;
  displayLeaderboard();
}

function saveScore() {
  const playerName = prompt("Enter your name for the leaderboard:");
  leaderboard.push({ name: playerName, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  if (leaderboard.length > 5) leaderboard.pop(); // Keep only top 5 scores
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
  const leaderboardElement = document.createElement("div");
  leaderboardElement.innerHTML = "<h3>Leaderboard</h3>";
  leaderboard.forEach((entry) => {
    const entryElement = document.createElement("p");
    entryElement.textContent = `${entry.name}: ${entry.score}`;
    leaderboardElement.appendChild(entryElement);
  });
  document.getElementById("game-end").appendChild(leaderboardElement);
}

function restartGame() {
  document.getElementById("game-end").style.display = "none";
  document.getElementById("game-setup").style.display = "block";
}
