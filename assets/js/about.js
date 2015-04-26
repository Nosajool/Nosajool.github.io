function gamesListToggle () {
  var gamesListUl = document.getElementById("games-list"),
      gamesListUlstyle = window.getComputedStyle(gamesListUl);
  if (gamesListUlstyle.getPropertyValue("display") === "none") {
    document.getElementById("games-list").style.display = "block";
    document.getElementById("games-list-button").textContent = "Hide List";
  } else {
    document.getElementById("games-list").style.display = "none";
    document.getElementById("games-list-button").textContent = "Show List";
  }
}
