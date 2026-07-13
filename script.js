const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const loader=$('#loader'), app=$('#app'), progressBar=$('#progressBar'), progressText=$('#progressText');
let progress=0;
const loading=setInterval(()=>{progress+=Math.ceil(Math.random()*7); if(progress>=100){progress=100;clearInterval(loading);setTimeout(()=>{loader.classList.add('is-hidden');app.classList.remove('is-hidden')},450)} progressBar.style.width=progress+'%';progressText.textContent=progress},90);

const screens=$$('.screen');
function showScreen(id){screens.forEach(s=>s.classList.remove('active'));const el=$('#'+id);if(el){el.classList.add('active');window.scrollTo({top:0,behavior:'instant'})}}

const music=$('#bgMusic'), musicBtn=$('#musicBtn');
function tryMusic(){music.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{});musicBtn.classList.remove('is-hidden')}
$('#beginBtn').addEventListener('click',()=>{tryMusic();showScreen('countdown');let n=3;const num=$('#countNumber');num.textContent=n;const timer=setInterval(()=>{n--;if(n===0){clearInterval(timer);showScreen('hero')}else num.textContent=n},900)});

musicBtn.addEventListener('click',()=>{if(music.paused){music.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{})}else{music.pause();musicBtn.classList.remove('playing')}});

$$('[data-next]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.next;const target=$('#'+id);screens.forEach(s=>s.classList.remove('active'));target.scrollIntoView({behavior:'smooth'});if(id==='ending')startConfetti()}));

const slides=$$('.message-slide'), dots=$('#sliderDots');let current=0;
slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Buka pesan ${i+1}`);b.addEventListener('click',()=>showSlide(i));dots.appendChild(b)});
function showSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));$$('button',dots).forEach((d,n)=>d.classList.toggle('active',n===current))}
$('#prevMessage').addEventListener('click',()=>showSlide(current-1));$('#nextMessage').addEventListener('click',()=>showSlide(current+1));showSlide(0);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});$$('.reveal-on-scroll').forEach(el=>observer.observe(el));

$('#replayBtn').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});showScreen('intro')});

function startConfetti(){const c=$('#confetti'),ctx=c.getContext('2d');let pieces=[];function resize(){c.width=innerWidth;c.height=innerHeight}resize();addEventListener('resize',resize,{once:true});for(let i=0;i<110;i++)pieces.push({x:Math.random()*c.width,y:-Math.random()*c.height,w:2+Math.random()*5,h:6+Math.random()*9,v:1+Math.random()*3,drift:-1+Math.random()*2,r:Math.random()*Math.PI});let frames=0;(function draw(){ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='rgba(207,178,112,.9)';pieces.forEach(p=>{p.y+=p.v;p.x+=p.drift;p.r+=.03;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();if(p.y>c.height){p.y=-20;p.x=Math.random()*c.width}});if(frames++<520)requestAnimationFrame(draw)})()}
