import { glowCircle, drawStar } from './utils.js';

export function drawFondoOceano(ctx, W, H) {
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#e0f7fa'); bg.addColorStop(.3,'#4dd0e1'); bg.addColorStop(.7,'#0288d1'); bg.addColorStop(1,'#01579b');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  // rayos de sol
  ctx.save(); ctx.globalAlpha=.06;
  [.25,.5,.75].forEach(rx=>{
    const g=ctx.createLinearGradient(W*rx,0,W*rx+30,H);
    g.addColorStop(0,'#fff9c4'); g.addColorStop(1,'rgba(255,249,196,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(W*rx-5,0); ctx.lineTo(W*rx+50,H); ctx.lineTo(W*rx-50,H); ctx.closePath(); ctx.fill();
  });
  ctx.restore();
  // arena
  const sand=ctx.createLinearGradient(0,H-55,0,H);
  sand.addColorStop(0,'#f9a825'); sand.addColorStop(1,'#f57f17');
  ctx.fillStyle=sand;
  ctx.beginPath(); ctx.moveTo(0,H-40); ctx.bezierCurveTo(W*.2,H-55,W*.5,H-48,W*.8,H-52); ctx.lineTo(W,H-38); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
}

export function drawFondoUnicornios(ctx, W, H) {
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#fff9c4'); bg.addColorStop(.4,'#f8bbd0'); bg.addColorStop(1,'#c8e6c9');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  // colinas
  ctx.fillStyle='#a5d6a7';
  ctx.beginPath(); ctx.ellipse(W*.2,H*.9,W*.35,H*.3,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(W*.8,H*.85,W*.3,H*.25,0,0,Math.PI*2); ctx.fill();
  // flores
  for(let i=0;i<20;i++){
    const fx=Math.random()*W, fy=H*.7+Math.random()*H*.3;
    ctx.fillStyle=['#f48fb1','#ce93d8','#fff176','#80cbc4'][Math.floor(Math.random()*4)];
    ctx.beginPath(); ctx.arc(fx,fy,4,0,Math.PI*2); ctx.fill();
  }
}

export function drawFondoBosque(ctx, W, H) {
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#1b5e20'); bg.addColorStop(.5,'#388e3c'); bg.addColorStop(1,'#81c784');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  [[.1,.9],[.2,.85],[.8,.88],[.9,.9]].forEach(([rx,ry])=>{
    ctx.fillStyle='#2e7d32';
    ctx.beginPath(); ctx.moveTo(W*rx,H*ry-.6*H*.3); ctx.lineTo(W*rx-W*.06,H*ry); ctx.lineTo(W*rx+W*.06,H*ry); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#4e342e'; ctx.fillRect(W*rx-6,H*ry,12,H*.1);
  });
}

export function drawFondoGalaxia(ctx, W, H) {
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#0d001a'); bg.addColorStop(.5,'#1a0042'); bg.addColorStop(1,'#4a148c');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  ctx.save();
  for(let i=0;i<80;i++){
    const x=Math.random()*W, y=Math.random()*H*.7, r=Math.random()*2;
    ctx.fillStyle='white'; ctx.globalAlpha=.5+Math.random()*.5;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();
  glowCircle(ctx,W*.6,H*.3,120,'rgba(156,39,176,.25)',1);
  glowCircle(ctx,W*.3,H*.5,90,'rgba(0,188,212,.2)',1);
}

export function drawFondoReino(ctx, W, H) {
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#fff9c4'); bg.addColorStop(.4,'#fff3e0'); bg.addColorStop(1,'#fce4ec');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  const cx=W*.5, cy=H*.4;
  ctx.fillStyle='#f48fb1';
  [[cx-50,cy+30,22,100],[cx-20,cy,26,120],[cx+20,cy+20,22,105],[cx+50,cy+35,20,95]].forEach(([x,y,w,h])=>{
    ctx.fillRect(x-w/2,y,w,h);
    for(let i=0;i<3;i++) ctx.fillRect(x-w/2+i*(w/3),y-12,w/3-2,12);
  });
  ctx.fillStyle='#ffd700';
  for(let i=0;i<3;i++) drawStar(ctx,cx-50+i*50,cy-10,8,'#ffd700',1);
}

const FONDOS = {
  1: drawFondoOceano,
  2: drawFondoUnicornios,
  3: drawFondoBosque,
  4: drawFondoGalaxia,
  5: drawFondoReino,
};

export function drawFondo(ctx, W, H, nivel) {
  (FONDOS[nivel] || drawFondoOceano)(ctx, W, H);
}
