// script.js (versão atualizada: PDF fallback -> TXT)
// Dados iniciais (edite conforme necessidade)
const timelineData = [
  {title: 'Minutos antes de te Entregar as Alianças!', date: '10 meses atrás', text: 'O dia mais feliz que poderia ter.', img: 'assets/timeline1.jpg'},
  {title: 'Primeiro encontro após o pedido <3', date: '10 meses atrás', text: 'Risos e uma longa conversa.', img: 'assets/timeline2.jpg'},
  {title: 'Nunca vou esquecer esse dia', date: '10 meses atrás', text: 'Mesmo dodoi esse dia foi incrivel', img: 'assets/timeline3.jpg'}
];

const galleryData = [
  {caption:'Sorriso perfeito', img:'assets/g1.jpg'},
  {caption:'Passeio inesquecível', img:'assets/g2.jpg'},
  {caption:'Nosso primeiro encontro', img:'assets/g3.jpg'}
];

const lettersData = [
  {title:'Carta 1', front:'Para Julia, com amor', back:'Meu amor, cada dia ao seu lado é um presente...'},
  {title:'Promessa', front:'Minhas promessas', back:'Prometo te ouvir, te apoiar e construir um futuro juntos.'}
];

const quizData = [
  {q:'Onde foi nosso primeiro beijo?', opts:['Na frente do condomínio do seu papai','Na praia','No cinema','No restaurante'], a:0},
  {q:'Qual nossa música favorita?', opts:['Partilhar','Outra','Talvez','Nenhuma'], a:0}
];

// DOM
const timelineList = document.getElementById('timelineList');
const galleryGrid = document.getElementById('galleryGrid');
const lettersGrid = document.getElementById('lettersGrid');
const quizWrap = document.getElementById('quizWrap');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const song = document.getElementById('song');

// Render timeline
function renderTimeline(){
  timelineList.innerHTML = '';
  timelineData.forEach(item => {
    const el = document.createElement('div'); 
    el.className='time-item';

    el.innerHTML = `
      <img src="${item.img}" 
           alt="${item.title}" 
           class="tl-click"
           data-title="${item.title}"
           data-text="${item.text}"
           onerror="this.src='https://via.placeholder.com/400x240?text=sem+imagem'"/>
      <div>
        <h3>${item.title}</h3>
        <div class="meta">${item.date}</div>
        <p>${item.text}</p>
      </div>
    `;
    timelineList.appendChild(el);
  });

  attachTimelineClicks(); // <-- importante
}
renderTimeline();

function openModal(src, caption="") {
  modalImg.src = src;
  modalCaption.textContent = caption;
  modal.classList.add("open");
}

function attachTimelineClicks(){
  document.querySelectorAll('.tl-click').forEach(img => {
    img.addEventListener('click', () => {

      const src = img.src;
      const title = img.dataset.title;
      const text = img.dataset.text;

      const html = `
        <div class="polaroid-large">
          <img src="${src}" alt="${title}">
          <p><strong>${title}</strong><br>${text}</p>
        </div>
      `;

      openModal(html);
    });
  });
}

// Render gallery
function renderGallery(){
  galleryGrid.innerHTML = '';
  galleryData.forEach(g =>{
    const p = document.createElement('div'); p.className='polaroid';
    p.innerHTML = `<img src="${g.img}" alt="${g.caption}" onerror="this.src='https://via.placeholder.com/300x200?text=sem+imagem'"><p>${g.caption}</p>`;
    p.addEventListener('click', ()=> openModal(`<img src="${g.img}" style='width:100%;height:auto;border-radius:8px' onerror="this.src='https://via.placeholder.com/800x400?text=sem+imagem'"><p style='margin-top:12px'>${g.caption}</p>`));
    galleryGrid.appendChild(p);
  });
}
renderGallery();

// Render letters
function renderLetters(){
  lettersGrid.innerHTML = '';
  lettersData.forEach(l=>{
    const d = document.createElement('div'); d.className='letter';
    d.innerHTML = `<div class='front'><strong>${l.front}</strong></div><div class='back'>${l.back}</div>`;
    d.addEventListener('click', ()=> d.classList.toggle('open'));
    lettersGrid.appendChild(d);
  });
}
renderLetters();

// Render quiz
function renderQuiz(){
  quizWrap.innerHTML = '';
  let score=0;
  quizData.forEach((q,i)=>{
    const wrap = document.createElement('div'); wrap.className='q';
    let optsHtml='';
    q.opts.forEach((o,oi)=>{ optsHtml += `<div class='opt' data-i='${oi}'>${o}</div>`});
    wrap.innerHTML = `<strong>${q.q}</strong><div class='options'>${optsHtml}</div>`;
    quizWrap.appendChild(wrap);
    wrap.querySelectorAll('.opt').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        const chosen = Number(opt.dataset.i);
        if(chosen===q.a){ opt.classList.add('correct'); score++; openModal(`<p>Acertou! ❤️</p>`); }
        else{ opt.classList.add('wrong'); openModal(`<p>Quase! A resposta certa era: <strong>${q.opts[q.a]}</strong></p>`); }
        // desativar opções
        wrap.querySelectorAll('.opt').forEach(x=> x.style.pointerEvents='none');
      });
    });
  });
  // opcional: mostrar resultado final depois de todas respondidas (pode-se implementar contador)
}
renderQuiz();

// Modal
function openModal(html){ modalContent.innerHTML = html; modal.classList.add('open'); }
closeModal.addEventListener('click', ()=> modal.classList.remove('open'));
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open') });



// Hearts decorativos (gera alguns elementos na hero)
function makeHearts(){
  const heartsWrap = document.querySelector('.hearts');
  if(!heartsWrap) return;
  for(let i=0;i<18;i++){
    const h = document.createElement('div'); h.className='heart';
    h.style.left = Math.random()*100 + '%';
    h.style.top = Math.random()*100 + '%';
    h.style.opacity = (0.06 + Math.random()*0.12).toFixed(2);
    heartsWrap.appendChild(h);
  }
}
makeHearts();

// Música
const playBtn = document.getElementById('playMusic');
if(playBtn){
  playBtn.addEventListener('click', ()=>{
    if(song.paused){ 
      song.play().catch(()=> {
        // reprodução automática pode ser bloqueada — abre modal com instrução
        openModal('<p>O navegador bloqueou a reprodução automática. Por favor, permita som ou clique no play novamente.</p>');
      });
      playBtn.textContent='Pausar música';
    } else { song.pause(); playBtn.textContent='Ouvir nossa música'; }
  });
}

// Start button rola para timeline
const startBtn = document.getElementById('startBtn');
if(startBtn) startBtn.addEventListener('click', ()=>{ document.getElementById('timeline').scrollIntoView({behavior:'smooth'}); });

// Download de carta (tenta gerar PDF usando jsPDF; se não, TXT como fallback)
// document.getElementById('downloadLetter').addEventListener('click', async ()=>{
//   const cartaText = `Minha Princesa,\n\n Cada dia ao seu lado é um presente.\n\n Obrigado por esses 10 meses incríveis. Eu sei que a distância às vezes pesa, que a saudade aperta e que nem sempre é fácil lidar com isso. Mas mesmo com tudo isso, eu sempre vou escolher continuar com você. Porque você vale a pena. Você vale cada minuto esperando, cada ligação, cada sorriso que eu guardo pra te mostrar quando a gente se vê.\n\n Eu agradeço todos os dias por ter trocado de escola no meio do ano, do nada, sem planejar, sem esperar. Foi uma mudança que parecia pequena, mas que mudou a minha vida inteira. Se eu soubesse, naquele dia, que aquilo ia me levar até você… eu teria feito tudo ainda mais rápido. Teria chegado antes.\n\n Eu amo o jeito que você fala, o jeito que ri, o jeitinho que você me acalma mesmo de longe.\n\n Você entrou na minha vida de um jeito tão natural, e ainda assim conseguiu transformar tudo. Você me fez querer ser alguém melhor. E eu quero crescer ao seu lado, aprender contigo, te apoiar, te ouvir, te cuidar.\n\n Eu não quero algo perfeito, eu quero algo verdadeiro. E verdadeiro é o que a gente tem.\n\n Ainda tem tanta coisa que eu quero viver com você: viagens, risadas, planos bobos, sonhos grandes… até aquelas conversas aleatórias sobre o futuro que a gente faz sem nem perceber. Eu quero tudo isso e quero com você.\n\n Obrigado por ser você.\n Por ficar.\n Por escolher ficar comigo também.\n Eu Te amo, minha princesa.\n Hoje, amanhã… e sempre que você quiser. — Seu Homi ❤️\n\nCom amor,\nGabriel`;
//   // verifica se jsPDF está disponível
//   try{
//     if(window.jspdf || window.jspdf !== undefined){
//       // nova API UMD: window.jspdf.jsPDF
//       const { jsPDF } = window.jspdf ? window.jspdf : window.jspdf || (window.jspdf = null);
//       if(jsPDF){
//         const doc = new jsPDF({unit:'pt', format:'a4'});
//         const lines = doc.splitTextToSize(cartaText, 520);
//         doc.setFont('Times','Normal');
//         doc.setFontSize(14);
//         doc.text(lines, 40, 80);
//         doc.save('carta-gabriel-julia.pdf');
//         return;
//       }
//     }
//   }catch(err){
//     console.warn('jsPDF não disponível ou falha ao gerar PDF:', err);
//   }
  // fallback: TXT
//   const blob = new Blob([cartaText], {type:'text/plain'});
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a'); a.href=url; a.download='carta-gabriel-julia.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
// });

// carta
// referências
const letterModal = document.getElementById('letterModal'); // certifique-se do id
const signatureSvg = document.getElementById('signatureSvg');

// função que reinicia a animação da assinatura
function restartSignatureAnimation() {
  if (!signatureSvg) return;
  // remove a classe para "resetar" a animação
  signatureSvg.classList.remove('animate');

  // força reflow para garantir restart
  // eslint-disable-next-line no-unused-expressions
  void signatureSvg.offsetWidth;

  // adiciona a classe que aciona as animações via CSS
  signatureSvg.classList.add('animate');
}

// exemplo: quando abrir o modal (substitua com sua lógica de abertura)
const openLetterBtn = document.getElementById('downloadLetter'); // seu botão
if (openLetterBtn) {
  openLetterBtn.addEventListener('click', () => {
    // abre modal (se a sua lógica já faz isso, mantenha-a)
    if (letterModal) letterModal.classList.add('open');

    // reinicia animação da assinatura
    // pequena espera garante que modal esteja visível e reflow aconteça
    setTimeout(restartSignatureAnimation, 80);
  });
}

// fecha modal (se já tem lógica, mantenha)
// exemplo simples:
const closeLetterBtn = document.querySelector('.closeLetter');
if (closeLetterBtn) closeLetterBtn.addEventListener('click', () => {
  if (letterModal) letterModal.classList.remove('open');
});
// Ajuda visual: se quiser posso adicionar:
// - localStorage para salvar cartas personalizadas
// - PDF com imagem de fundo (requer jsPDF e fontes embutidas)
// - animações extras e preloader de imagens

// fim do arquivo
