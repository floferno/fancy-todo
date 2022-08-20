// const APIController = require("../../server/controllers/APIController")

// const { Console } = require("console")

const baseUrl = `https://fancy-wancy-todo.herokuapp.com`


$(document).ready(() => {

    authentication()
    // $("#todo-list").show()
    getTodos()

    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
        homePage()
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    $("#register-link").on("click", (e) => {
        e.preventDefault()
        registerPage()
    })

    $("#login-link").on("click", (e) => {
        e.preventDefault()
        loginPage()
    })

    $("#nav-add").on("click", (e) => {
        e.preventDefault()
        addPage()
    })

    $("#add-todo-form").on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })

    $("#btn-edit").on("click", (e) => {
        e.preventDefault()
        getEditForm(id)
    })

    $("#btn-status").on("click", (e) => {
        e.preventDefault()
        updateStatus(id)
    })

    $(".btn-danger").on("click", (e) => {
        e.preventDefault()
        homePage()
    })

    $("#btn-delete").on("click", (e) => {
        e.preventDefault()
        deleteTodo(id)
        // homePage()
    })

    $("#nav-logout").on("click", (e) => {
        e.preventDefault()
        logout()
        loginPage()
    })

    $("#btn-api").on("click", (e) => {
        e.preventDefault()
        getAPI()
    })

})

function authentication() {
    if (localStorage.getItem("access_token")) {
        $("#login-page").hide()
        $("#register-page").hide()
        $("#add-todo-page").hide()
        $('#welcome-name').text(localStorage.getItem('full_name'));
        console.log(localStorage)
        $("#home-page").show()
        // $("#todo-list").show()
        homePage()
    } else {
        loginPage()
        // console.log("gak ada akses token")
    }
}


function registerPage() {
    $("#navbar").hide()
    $("#login-page").hide()
    $("#register-page").show()
    $("#home-page").hide()
    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
}

function loginPage() {
    $("#navbar").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#home-page").hide()
    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
}

function addPage() {
    $("#navbar").show()
    $("#nav-add").hide()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#home-page").hide()
    $("#add-todo-page").show()
}

function editPage() {
    $("#navbar").show()
    $("#nav-add").hide()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#home-page").hide()
    $("#add-todo-page").hide()
    $("#edit-todo-page").show()
}



function homePage() {
    $("#card-content").empty()
    getTodos()
    $("#home-page").show()
    $("#navbar").show()
    $("#nav-add").show()
    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
    // $("#todo-list").show()
}



function login() {
    // console.log("masuk login")
    let email = $("#login-email").val()
    let password = $("#login-password").val()
    $.ajax({
        url: `${baseUrl}/users/login`,
        method: "POST",
        data: {
            email,
            password,
        },
        headers: {
            access_token: localStorage.getItem("access_token"),
            full_name: localStorage.getItem("full_name")
        }
    })
        .done((response) => {
            // console.log("masuk res login")
            localStorage.setItem("access_token", response.access_token)

            authentication()

        })
        .fail((xhr, text) => {
            swal("Try again!", xhr.responseJSON.error, "error")
            console.log(xhr.responseJSON.error)
        })
        .always(_ => {
            $("#login-form").trigger("reset")
        })
}

// function getFullName() {
//     $.ajax({
//         url: `${baseUrl}/users/login`,
//         method: "GET",
//         headers: {
//             access_token: localStorage.getItem("access_token")
//         }
//     })
//         .done((response) => {
//             console.log(response)
//         })

// }


function register() {
    // console.log("register")
    let full_name = $("#register-full-name").val()
    let email = $("#register-email").val()
    let password = $("#register-password").val()

    $.ajax({
        url: `${baseUrl}/users/register`,
        method: "POST",
        data: {
            full_name,
            email,
            password
        }
    })
        .done((response) => {
            // console.log(response)
            swal("Successfully registered!", "Yay! Now you can log in!", "success")
            authentication()
        })
        .fail((xhr, text) => {
            swal("Registration failed!", xhr.responseJSON.error[0], "error")
        })
        .always(_ => {
            $("#register-form").trigger("reset")
        })
}



function addTodo() {
    let title = $("#add-title").val()
    let description = $("#add-description").val()
    let due_date = $("#add-due-date").val()

    $.ajax({
        url: `${baseUrl}/todos`,
        method: "POST",
        data: {
            title,
            description,
            due_date
        },
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done((response) => {
            location.reload()
            swal("Yay!", "Task successfully added!", "success")
            // $("#card-content").empty()
            homePage()
        })
        .fail((xhr, text) => {
            swal(
                "Oops!", xhr.responseJSON.error[0], "error")
            // console.log(xhr.responseJSON.error[0])
            addPage()
        })
        .always(_ => {
            $("#add-todo-form").trigger("reset")
        })
}


function getTodos() {

    $.ajax({
        url: `${baseUrl}/todos`,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done((todos) => {
            $("#card-content").empty()
            todos.forEach(el => {
                if (!el.status) {
                    $("#card-content").append(`
                <div class="col-sm-6" id="todo-${el.id}">
                    <div class="card mt-3 mx-1 shadow" style="width:auto">
                        <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${el.description}</h6>
                        <p class="card-text">Due date: ${el.due_date}</p>
                        <span>
                        <button type="button" class="btn btn-secondary btn-block d-inline mt-2" id="btn-status-${el.id}" style="width:auto;"  onclick="updateStatus(${el.id})"><i class="bi bi-x-square"></i>  Not Done</button>
                        <button type="button" class="btn btn-warning btn-block d-inline" id="btn-edit-${el.id}" style="width:auto;" onclick="getEditForm(${el.id})"><i class="bi bi-pencil" ></i>  Update</button>
                        <button type="button" class="btn btn-danger btn-block d-inline" id="btn-delete-${el.id}" style="width:auto; " onclick="deleteTodo(${el.id})"><i class="bi bi-trash"></i>  Delete</button>
                        </span>
                        </div>
                    </div>
                </div>
            `)
                } else {
                    $("#card-content").append(`
                <div class="col-sm-6" id="todo-${el.id}">
                    <div class="card mt-3 mx-1 shadow" style="width:auto">
                        <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${el.description}</h6>
                        <p class="card-text">Due date: ${el.due_date}</p>
                        <span>
                        <button type="button" class="btn btn-success btn-block d-inline mt-2" id="btn-status-${el.id}" style="width:auto;"  onclick="updateStatus(${el.id})"><i class="bi bi-check-square"></i>  Done</button>
                        <button type="button" class="btn btn-warning btn-block d-inline" id="btn-edit-${el.id}" style="width:auto;" onclick="getEditForm(${el.id})"><i class="bi bi-pencil"></i>  Update</button>
                        <button type="button" class="btn btn-danger btn-block d-inline" id="btn-delete-${el.id}" style="width:auto;" onclick="deleteTodo(${el.id})"><i class="bi bi-trash"></i>  Delete</button>
                        </span>
                        </div>
                    </div>
                </div>
            `)
                }

            })
        })
        .fail((xhr, status) => {
            console.log(xhr, status)
        })
}

function getEditForm(id) {
    // console.log("masuk editform")
    editPage()

    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(todos => {
            $("#edit-title").val(`${todos.title}`)
            $("#edit-description").val(`${todos.description}`)
            $("#edit-due-date").val(`${(todos.due_date)}`)
            $("#edit-todo-button").on("click", (e) => {
                e.preventDefault()
                editTodo(id)
            })
        })
        .fail((xhr, text) => {
            swal(
                "Oops!", xhr.responseJSON.error[0], "error")
            console.log(xhr.responseJSON.error[0]
            )
        })
}



function editTodo(id) {
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const due_date = $("#edit-due-date").val()

    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "PUT",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(response => {
            // location.reload()
            authentication()
            homePage()
            swal("Yay!", "Task successfully changed!", "success")
        })
        .fail((xhr, text) => {
            swal(
                "Oops!", xhr.responseJSON.error[0], "error")
            console.log(xhr.responseJSON.error[0])
        })
        .always(() => {
            authentication()
        })
}


function updateStatus(id) {
    console.log(id)
    let status
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })

        .done(response => {
            console.log(response.status)
            if (!response.status) {
                status = true
            } else {
                status = false
            }

            $.ajax({
                url: `${baseUrl}/todos/${id}`,
                method: 'PATCH',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    status
                }
            })
                .done((response) => {
                    console.log(response);
                    homePage()
                })
                .fail((error) => {
                    console.log(error)
                })
        })
        .fail((xhr, text) => {
            swal(
                "Oops!", xhr.responseJSON.error[0], "error")
            console.log(xhr.responseJSON.error[0])
        })
}

function deleteTodo(id) {
    console.log(id, "masuppp delete ")
    swal({
        title: "Are you sure you want to permanently delete this?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: `${baseUrl}/todos/${id}`,
                    method: "DELETE",
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                    .done(response => {
                        $(`#todo-${id}`).remove()
                        swal("Task deleted!", { icon: "success" })
                        homePage()
                    })
                    .fail((xhr, text) => {
                        console.log(xhr, text)
                        homePage()
                    })
            }
        })
}

function getAPI() {
    // console.log("masuppp getapi")
    $("#api-data").empty()
    $.ajax({
        url: `${baseUrl}/api`,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            // console.log(response.setupJoke, "<<< setup")
            // console.log(response.punchline, "<<< punchline")
            console.log(response.status)
            $("#api-data").append(`
            <div style="border-style: solid; border-color: #0d6efd; border-width:0.5px;" class="pt-2 pb-2 px-2">
            <p>${response.setupJoke}</p>
            <p>${response.punchline}</p>
            </div>
        `)
        })
        .fail((xhr, text) => {
            swal(
                "Oops!", xhr.responseJSON.error, "error")
            console.log(xhr.responseJSON.error)
        })

}


// function onSignIn(googleUser) {
//         // Useful data for your client-side scripts:
//         var profile = googleUser.getBasicProfile();
//         console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//         console.log('Full Name: ' + profile.getName());
//         console.log('Given Name: ' + profile.getGivenName());
//         console.log('Family Name: ' + profile.getFamilyName());
//         console.log("Image URL: " + profile.getImageUrl());
//         console.log("Email: " + profile.getEmail());

//         // The ID token you need to pass to your backend:
//         var id_token = googleUser.getAuthResponse().id_token;
//         console.log("ID Token: " + id_token);
//       }

// function onSignIn(googleUser) {
//     console.log("masuk client oauth")
//     $.ajax({
//         method: "POST",
//         url: `${baseUrl}/users/google-login`,
//         data: {
//             id_token: googleUser.getAuthResponse().id_token
//         }
//     })
//         .done((response) => {
//             console.log(response, "client response")
//             localStorage.setItem("access_token", response.access_token)
//             checkLocalStorage();
//         })
//         .fail((err) => {
//             console.log(err, "error client");
//         })
//         .always(() => {
//             authentication()
//         })
// }

function logout() {
    localStorage.clear()
    authentication()
}