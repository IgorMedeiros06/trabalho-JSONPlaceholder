const nameInput = document.querySelector("#pesquisa")
const order = document.querySelector("#order")

async function getUsers() {
    const cache = localStorage.getItem("users")
    if (cache) return JSON.parse(cache)

    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await response.json()
    localStorage.setItem("users", JSON.stringify(users))
    return users
}

async function filter() {
    const users = await getUsers()

    const option = order.value
    const search = nameInput.value
    let usersFiltrados = search.trim() == "" ? users : users.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))

    usersFiltrados = usersFiltrados.sort((a,b) => {
        if (a.name > b.name){
            return option == "AZ" ? 1 : -1
        }
        if (a.name < b.name){
            return option == "AZ" ? -1 : 1
        }
        return 0
    })

    return usersFiltrados
}

async function render() {
    const users = await filter()

    const areaUsers = document.querySelector(".users")
    const numberUsers = document.querySelector("#n-publi")

    numberUsers.textContent = `${users.length} usuários`
    
    areaUsers.innerHTML = ""

    for (const user of users){
        const names = user.name.split(" ")
        let iniciais = ""
        for (const name of names) {
            iniciais += name[0]
        }
        areaUsers.innerHTML += `<a class="user-ativo" href="../tela-user/index-user.html?id=${user.id}" aria-label="Ver perfil de ${user.nome}">
                <div class="topo-user">
                    <div class="img-style" aria-hidden="true">${iniciais}</div>
                    <div class="cabecalho">
                        <h2 class="nome">${user.name}</h2>
                        <span class="username">${user.username}</span>
                    </div>
                </div>

                <div class="corpo">
                    <p class="info">
                        <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                            <path d="m3 7 9 6 9-6"></path>
                        </svg>
                        <span>${user.email}</span>
                    </p>
                    <p class="info">
                        <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 21h18M5 21V4h10v17M15 10h4v11M8 8h1M8 12h1M8 16h1M12 8h1M12 12h1M12 16h1"></path>
                        </svg>
                        <span>${user.company.name}</span>
                    </p>
                </div>

                <span class="ver-perfil">Ver perfil
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14m-6-6 6 6-6 6"></path>
                    </svg>
                </span>
                </a>`
    }
}

nameInput.addEventListener("input", (event) => {
    event.preventDefault()
    render()
})

order.addEventListener('change', (event) => {
    event.preventDefault()
    render()
})

render()