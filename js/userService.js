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
                            <td><button class="btn btn-primary" onclick="getUser(${user.id})">View</button></td>
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
}
