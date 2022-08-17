const cards = document.querySelectorAll('.card');
let cardVirado = false;
let jogoBloqueado = false;
let primeiraCarta, segundaCarta;

//funcao para virar a carta
function virarCarta() {
    if(jogoBloqueado) return;
    if(this === primeiraCarta) return;

    this.classLista.add('flip');
    
    if (!cardVirado) {
        cardVirado = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    cardVirado = false;

    verSeCombina();
}

//verifica se as cartas sao iguais
function verSeCombina() {
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desabilirarCarta();
        return;
    }

    desvirarCarta();

}

//desabilita as cartas
function desvirarCarta() {
    jogoBloqueado = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetboard();

    },1500);
}

//reseta o tabuleiro
function resetboard() {
    [cardVirado, jogoBloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//embaralha as cartas
(function shuffler() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
        
    })
})();

//adiciona evento de click na carta
cards.forEach((card) => {
    card.addEventListener('click', virarCarta);

});