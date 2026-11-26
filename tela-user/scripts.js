async function getUser(id) {
    const cache = localStorage.getItem(`user-${id}`)
    if (cache) return JSON.parse(cache)

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!response.ok) return

    const user = await response.json()
    localStorage.setItem(`user-${id}`, JSON.stringify(user))
    return user
}

function getId(){
    const URL = window.location.search
    const searchParams = new URLSearchParams(URL)
    return searchParams.get("id")
}

async function render() {
    const id = getId()
    const user = await getUser(id)
    if (!id || !user) {
        window.location.href = "/list-users/index-list-users.html"
        return 
    }

    const names = user.name.split(" ")
    let iniciais = ""
    for(const name of names){
        iniciais += name[0]
    }

    const perfilTopo = document.querySelector(".perfil-topo.painel")
    const painelInfo = document.querySelector(".painel.informacoes")

    perfilTopo.innerHTML = `<div class="avatar" aria-hidden="true">${iniciais}</div>
            <div class="perfil-identidade">
                <h1 class="nome-user">${user.name}</h1>
                <p class="username">@${user.username}</p>
            </div>`

    painelInfo.innerHTML = `<h2 class="titulo-secao" id="titulo-informacoes">Informações do perfil</h2>
            <div class="informacoes-grid">
                <div class="info-item">
                    <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                    </svg>
                    <div class="info-texto">
                        <span class="info-rotulo">E-mail</span>
                        <span class="info-valor">${user.email}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72l.44 2.81a2 2 0 0 1-.57 1.7L8.1 11.1a16 16 0 0 0 4.8 4.8l1.87-1.86a2 2 0 0 1 1.7-.57l2.81.44A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    <div class="info-texto">
                        <span class="info-rotulo">Telefone</span>
                        <span class="info-valor">${user.phone}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 21h18M5 21V4h10v17M15 10h4v11M8 8h1M8 12h1M8 16h1M12 8h1M12 12h1M12 16h1" />
                    </svg>
                    <div class="info-texto">
                        <span class="info-rotulo">Empresa</span>
                        <span class="info-valor">${user.company.name}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <div class="info-texto">
                        <span class="info-rotulo">Cidade</span>
                        <span class="info-valor">${user.address.city}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="icone-info" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                    </svg>
                    <div class="info-texto">
                        <span class="info-rotulo">Website</span>
                        <span class="info-valor">${user.website}</span>
                    </div>
                </div>
            </div>`
}

render()