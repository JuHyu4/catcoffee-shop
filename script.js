
// Som ao abrir menu
function abrirMenu() {
    const som = document.getElementById("somMenu");
    som.currentTime = 0;
    som.play();
}

// Criar páginas internas automaticamente
const paginas = [
    { nome: "frontend", titulo: "Front-End" },
    { nome: "backend", titulo: "Back-End" },
    { nome: "habilidades", titulo: "Habilidades" }
];

paginas.forEach(p => {
    const conteudo = `
        <html>
        <head><title>${p.titulo}</title></head>
        <body>
            <h1>${p.titulo}</h1>
            <p>Página gerada automaticamente.</p>
        </body>
        </html>
    `;

    const blob = new Blob([conteudo], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    console.log("Página criada:", p.nome, "→", url);
});

// ===================
// CARRINHO
// ===================
const btnCarrinho = document.getElementById("btnCarrinho");  
const painelCarrinho = document.getElementById("carrinhoPainel");
const overlayCarrinho = document.getElementById("carrinhoOverlay");
const fecharCarrinho = document.querySelector(".fechar-carrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalCat = document.querySelector(".catcoin-total");

let carrinho = {};  
/* EXEMPLO:
carrinho = {
   "Café Latte": { qtd: 2, preco: 10 }
};
*/

// ➤ ABRIR POPUP
btnCarrinho.addEventListener("click", () => {
    overlayCarrinho.style.display = "block";
    painelCarrinho.style.display = "block";
});

// ➤ FECHAR POPUP
fecharCarrinho.addEventListener("click", () => {
    overlayCarrinho.style.display = "none";
    painelCarrinho.style.display = "none";
});

// ➤ ADICIONAR ITEM AO CARRINHO
function adicionarItem(nome, preco) {
    if (!carrinho[nome]) {
        carrinho[nome] = { qtd: 1, preco: preco };
    } else {
        carrinho[nome].qtd++;
    }
    atualizarCarrinho();
}

// ➤ ATUALIZAR LISTA DO CARRINHO
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;

    for (let item in carrinho) {
        let qtd = carrinho[item].qtd;
        let preco = carrinho[item].preco;
        let subtotal = qtd * preco;
        total += subtotal;

        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item} x${qtd}</span>
            <span>${subtotal} 🐾</span>
        `;
        listaCarrinho.appendChild(li);
    }

    totalCat.textContent = `Total: ${total} 🐾 catmoedas`;
}


// ===================
// POPUP QRCODE
// ===================
const popupQR = document.getElementById("popupQR");
const closeQR = document.getElementById("closeQR");

document.getElementById("btnQRCode").addEventListener("click", () => {
    popupQR.style.display = "flex";

    // GERAR QR REAL
    new QRCode(document.getElementById("qrArea"), {
        text: "Pedido confirmado! Total: " + total + " CatMoedas",
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff"
    });
});

closeQR.addEventListener("click", () => {
    popupQR.style.display = "none";
    document.getElementById("qrArea").innerHTML = "";
});


// ===================
// POPUP MINIGAME
// ===================
const popupGame = document.getElementById("popupGame");
const closeGame = document.getElementById("closeGame");
const btnGame = document.getElementById("btnMinigame");

btnGame.addEventListener("click", () => {
    popupGame.style.display = "flex";
    iniciarGatTetris();
});

closeGame.addEventListener("click", () => {
    popupGame.style.display = "none";
});


// ===================
// MINI GAME TETRIS
// ===================
function iniciarGatTetris() {
    const ctx = document.getElementById("gameCanvas").getContext("2d");

    ctx.fillStyle = "pink";
    ctx.fillRect(20, 20, 50, 50);
    ctx.fillStyle = "black";
    ctx.fillText("🐱", 35, 55);
}
