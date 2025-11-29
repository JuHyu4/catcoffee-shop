let isScrolling = false;
let currentSection = 0;

// Pega TODAS as sections existentes, sem mudar classes
const sections = document.querySelectorAll("section");

function goToSection(index) {
    isScrolling = true;
    currentSection = Math.max(0, Math.min(index, sections.length - 1));

    sections[currentSection].scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 700);
}

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
        goToSection(currentSection + 1); // desce
    } else {
        goToSection(currentSection - 1); // sobe
    }
});



window.addEventListener("scroll", () => {
    const progress = document.getElementById("scrollProgress");
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let progressWidth = (window.scrollY / totalHeight) * 100;
    progress.style.width = progressWidth + "%";
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.3 });

reveals.forEach(el => observer.observe(el));



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
