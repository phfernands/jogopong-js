//dimensões da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha / 2;

//posição do retangulo esquerdo
let xRetanguloE = 5;
let yRetanguloE = 150;

//posição do retangulo direito
let xRetanguloD = 585;
let yRetanguloD = 150;

//dimensões dos retangulos
let largura = 10;
let altura = 100;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//placar
let meusPontos = 0;
let oponentePontos = 0

//sons do jogo
let trilha;
let raquetada;
let ponto;

let colidiu = false;

let velocidadeRetanguloOponete;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRetangulo(xRetanguloE, yRetanguloE);
  mostraRetangulo(xRetanguloD, yRetanguloD);
  movimentaBolinha();
  movimentaRetanguloE();
  movimentaRetanguloD();
  coalizaoRaqueteBiblioteca(xRetanguloE, yRetanguloE);
  coalizaoRaqueteBiblioteca(xRetanguloD, yRetanguloD);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  fill(255)
  circle(xBolinha, yBolinha, dBolinha);
}

function mostraRetangulo(x, y) {
  fill(255);
  rect(x, y, largura, altura);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function movimentaRetanguloE() {
  if(keyIsDown(UP_ARROW)) {
    yRetanguloE -= 5;
  }
  
  if(keyIsDown(DOWN_ARROW)) {
    yRetanguloE += 5;
  }
}

function movimentaRetanguloD() {
  if(keyIsDown(87)) {
    yRetanguloD -= 5;
  }
  
  if(keyIsDown(83)) {
    yRetanguloD += 5;
  }
}

function coalizaoRaqueteE() {
  if(xBolinha - raio < xRetanguloE + largura  && yBolinha - raio < yRetanguloE + altura && yBolinha + raio > yRetanguloE) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function coalizaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, largura, altura, xBolinha, yBolinha, raio);
  
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  fill(color(255, 140, 0));
  rect(230, 5, 40, 30);
  rect(330, 5, 40, 30);
  textSize(20);
  textAlign(CENTER);
  fill(255);
  text(meusPontos, 250, 27);
  fill(255);
  text("-", 300, 25);
  fill(255);
  text(oponentePontos, 350, 27);
}

function marcaPonto() {
  if(xBolinha < 10) {
    oponentePontos += 1;
    ponto.play();
  }
  
  if(xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 4){
    xBolinha = 20;
  }
  
  if (xBolinha + raio > 596){
    xBolinha = 580;
  }
}
