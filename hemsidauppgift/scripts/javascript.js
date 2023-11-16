function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, value) //funktion som vi använder senare för att lägga till item i  localStorage
}

function getItemFromLocalStorage(key) {
  localStorage.getItem(key) //funktion som vi använder senare för att hämta från localStorage
}

function localStorageSave(objectKey, data) {
  //detta funktionen ser till att vi sparar all ny data i en array som vi lägger i en objectKey som vi senare kan söka genom
  const SparadData = JSON.parse(localStorage.getItem(objectKey)) || []
  SparadData.push(data)
  localStorage.setItem(objectKey, JSON.stringify(SparadData))
}

function localStorageSet() {
  //vi anväder detta för att se vad användaren har mattat in som vi sparar i en localstorage genom att använda oss av functionen localStorageShow()
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-box form")

    form.addEventListener("submit", (event) => {
      event.preventDefault()

      const inmatning = form.querySelectorAll("input")
      const nyData = {}

      inmatning.forEach((input) => {
        const label = input.getAttribute("label")
        const value = input.value

        nyData[label] = value
      })
      localStorageSave("programData", nyData)
      form.reset()
      localStorageShow()
    })
    localStorageShow()
  })
}
function localStorageShow() {
  //hämtar ut datan från localStorage
  const sparadData = JSON.parse(localStorage.getItem("programData"))
  searchDisplayer(sparadData)
}

function searchDisplayer(data) {
  //detta visar resultatet i html koden genom sökning till ordet exempel = breaking bad så visar den resultatet som har breaking i sig
  searchInmatning = document.querySelector(".box input")
  const searchResultat = document.querySelector(".search-results")

  searchInmatning.addEventListener("input", () => {
    const searchT = searchInmatning.value.toLowerCase()
    searchResultat.innerHTML = ""
    if (searchT.trim() === "") {
      return
    }
    data.forEach((item) => {
      const title = item["Tv-Titel"].toLowerCase()

      if (title.startsWith(searchT)) {
        const resultObject = document.createElement("div")
        resultObject.innerHTML = `
          <h3 class="resultat-titel">${item["Tv-Titel"]}</h3>
          <p class="resultat-text">Åldersrekommendation: ${item["Åldersrekommendation"]}</p>
          <p class="resultat-text">Beskrivning: ${item["Beskrivning"]}</p>
           `
        searchResultat.appendChild(resultObject)
      }
    })
  })
}
localStorageSet()

