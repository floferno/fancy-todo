$(document).ready(() => {

  $("#home-nav").on("click", e => {
    e.preventDefault()
    authentication()
  })

  $("#setting-nav").on("click", (e) => {
    e.preventDefault()
    $("#modal-setting").show()
  })

  $("#randomfuntodos-nav").on("click", (e) => {
        e.preventDefault()
        $("#randomfuntodos").show()
    })

$("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    authentication()
  })

})