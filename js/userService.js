function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Users List</h4>'
    fetch('https://fakestoreapi.com/users',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        body: data
                    }
                }
            )

        })
        .then(data => {
            if (data.status === 200) {
                let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                `
                data.body.forEach((user, index) => {
                    listUsers += `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${user.name.firstname}</td>
                            <td>${user.name.lastname}</td>
                            <td><button class="btn btn-primary" onclick="getUser('${user.id}')">View</button></td>
                        </tr>
                    `
                })
                document.getElementById('info').innerHTML = listUsers
            } else {
                document.getElementById('info').innerHTML = '<h3>Usuarios no encontrados</h3>'
            }
        });
}

function getUser(id) {
    document.getElementById('cardHeader').innerHTML = '<h4>Users List</h4>'
    fetch(`https://fakestoreapi.com/users/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        body: data
                    }
                }
            )

        })
        .then((data) => {
            if (data.status === 200) {
                showUserInfo(data.body)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>Usuario no encontrado</h3>'
            }
        })
}

function showUserInfo(user) {
        const modalUser = `
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Info</h5>
                    <p class="card-text"><strong>ID : </strong>${user.id}</p>
                    <p class="card-text"><strong>Name : </strong>${user.name.firstname} ${user.name.lastname}</p>
                    <p class="card-text"><strong>Username : </strong>${user.username}</p>
                    <p class="card-text"><strong>Password : </strong>${user.password}</p>
                    <p class="card-text"><strong>Email : </strong>${user.email}</p>
                    <p class="card-text"><strong>Phone : </strong>${user.phone}</p>
                    <p class="card-text"><strong>Address : </strong>${user.address.city}, ${user.address.street}, ${user.address.number}</p>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}