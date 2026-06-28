import { glowCircle, drawStar, kawaiiEye, blush } from './utils.js';

// Dibuja a Luna centrada en (cx, cy), escala 1 = tamaño normal (~120px alto)
export function drawLuna(ctx, cx, cy, scale=1, expresion='feliz') {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Sombra base
  glowCircle(ctx, 0, 110, 38, 'rgba(0,0,0,.15)', 1);

  // Capa mágica (detrás)
  ctx.fillStyle='#4a0080';
  ctx.beginPath(); ctx.moveTo(-15,30); ctx.bezierCurveTo(-50,60,-55,120,-40,145);
  ctx.lineTo(-10,140); ctx.bezierCurveTo(-20,110,-15,70,0,50); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(15,30); ctx.bezierCurveTo(50,60,55,120,40,145);
  ctx.lineTo(10,140); ctx.bezierCurveTo(20,110,15,70,0,50); ctx.closePath(); ctx.fill();

  // Piernas + zapatos
  ctx.fillStyle='#9c27b0';
  ctx.beginPath(); ctx.roundRect(-18,95,16,50,[8]); ctx.fill();
  ctx.beginPath(); ctx.roundRect(2,95,16,50,[8]); ctx.fill();
  ctx.fillStyle='#6a1b9a';
  ctx.beginPath(); ctx.roundRect(-22,140,22,12,[6]); ctx.fill();
  ctx.beginPath(); ctx.roundRect(2,140,22,12,[6]); ctx.fill();
  ctx.fillStyle='#ffd700'; ctx.fillRect(-15,144,8,5); ctx.fillRect(9,144,8,5);

  // Vestido
  const vg=ctx.createLinearGradient(-25,30,25,100);
  vg.addColorStop(0,'#9c27b0'); vg.addColorStop(1,'#6a1b9a');
  ctx.fillStyle=vg;
  ctx.beginPath(); ctx.moveTo(-22,30); ctx.bezierCurveTo(-30,60,-28,95,-20,100);
  ctx.lineTo(20,100); ctx.bezierCurveTo(28,95,30,60,22,30); ctx.closePath(); ctx.fill();
  // Lazo
  ctx.fillStyle='#f48fb1';
  ctx.beginPath(); ctx.moveTo(-8,50); ctx.bezierCurveTo(-16,44,-16,58,-8,54); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(8,50);  ctx.bezierCurveTo(16,44,16,58,8,54);  ctx.closePath(); ctx.fill();
  ctx.fillStyle='#e91e63'; ctx.beginPath(); ctx.arc(0,52,5,0,Math.PI*2); ctx.fill();
  drawStar(ctx,-10,70,5,'#fff9c4',.8);
  drawStar(ctx,12,80,4,'#f8bbd0',.7);

  // Brazos
  ctx.strokeStyle='#fce4ec'; ctx.lineWidth=10; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-22,42); ctx.bezierCurveTo(-45,50,-52,62,-48,72); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(22,42);  ctx.bezierCurveTo(48,35,62,25,72,15);    ctx.stroke();
  ctx.fillStyle='#fce4ec';
  ctx.beginPath(); ctx.arc(-48,73,8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(73,14,8,0,Math.PI*2);  ctx.fill();

  // Varita
  ctx.strokeStyle='#ce93d8'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(75,10); ctx.lineTo(100,-20); ctx.stroke();
  glowCircle(ctx,102,-22,18,'rgba(255,249,196,.6)',1);
  ctx.fillStyle='#fff9c4'; ctx.beginPath(); ctx.arc(102,-22,6,0,Math.PI*2); ctx.fill();
  drawStar(ctx,102,-22,10,'#fff9c4',1);
  [[12,-30],[25,-15],[30,-35]].forEach(([dx,dy]) => drawStar(ctx,102+dx,-22+dy,3,'#fff9c4',.7));

  // Cuello + cabeza
  ctx.fillStyle='#fce4ec'; ctx.beginPath(); ctx.ellipse(0,28,9,7,0,0,Math.PI*2); ctx.fill();
  const hg=ctx.createRadialGradient(-5,-8,3,0,0,30);
  hg.addColorStop(0,'#fce4ec'); hg.addColorStop(1,'#f8bbd0');
  ctx.fillStyle=hg; ctx.beginPath(); ctx.ellipse(0,0,32,30,0,0,Math.PI*2); ctx.fill();

  // Orejas
  [-32,32].forEach(ex=>{
    ctx.fillStyle='#fce4ec'; ctx.beginPath(); ctx.ellipse(ex,2,7,8,ex>0?.3:-.3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#f8bbd0'; ctx.beginPath(); ctx.ellipse(ex,2,4,5,ex>0?.3:-.3,0,Math.PI*2); ctx.fill();
  });

  // Pelo
  ctx.fillStyle='#e040fb'; ctx.beginPath(); ctx.ellipse(0,-5,36,34,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#ce93d8';
  ctx.beginPath(); ctx.moveTo(-28,-5); ctx.bezierCurveTo(-42,20,-44,60,-38,90);
  ctx.lineTo(-28,88); ctx.bezierCurveTo(-34,58,-32,18,-20,0); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(28,-5);  ctx.bezierCurveTo(42,20,44,60,38,90);
  ctx.lineTo(28,88);  ctx.bezierCurveTo(34,58,32,18,20,0); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#e040fb';
  ctx.beginPath(); ctx.moveTo(-30,-10); ctx.bezierCurveTo(-25,-28,-10,-22,-5,-12);
  ctx.bezierCurveTo(0,-24,5,-12,10,-22); ctx.bezierCurveTo(25,-28,30,-10,30,-5);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle='#ba68c8'; ctx.globalAlpha=.8;
  ctx.beginPath(); ctx.moveTo(-28,-5); ctx.bezierCurveTo(-22,-18,-8,-15,0,-5);
  ctx.bezierCurveTo(8,-15,22,-18,28,-5); ctx.closePath(); ctx.fill();
  ctx.globalAlpha=1;

  // Ojos
  kawaiiEye(ctx,-11,2,'#4a148c');
  kawaiiEye(ctx,11,2,'#4a148c');
  // Pestañas
  ctx.strokeStyle='#4a148c'; ctx.lineWidth=1.3; ctx.lineCap='round';
  [[-20,-9],[-11,-10],[-3,-9],[3,-9],[11,-10],[20,-9]].forEach(([dx,dy],i)=>{
    const ang=(i<3)?-.3-i*.1:.3+(i-3)*.1;
    ctx.beginPath(); ctx.moveTo(dx,dy+10); ctx.lineTo(dx+Math.sin(ang)*6,dy+10-Math.cos(ang)*6); ctx.stroke();
  });
  blush(ctx,-20,12); blush(ctx,20,12);
  ctx.fillStyle='rgba(244,143,177,.6)'; ctx.beginPath(); ctx.ellipse(0,10,3,2,0,0,Math.PI*2); ctx.fill();

  // Boca según expresión
  ctx.strokeStyle='#e91e63'; ctx.lineWidth=2; ctx.lineCap='round';
  if (expresion==='feliz') {
    ctx.beginPath(); ctx.moveTo(-10,18); ctx.bezierCurveTo(-5,24,5,24,10,18); ctx.stroke();
  } else if (expresion==='sorprendida') {
    ctx.fillStyle='#e91e63'; ctx.beginPath(); ctx.arc(0,20,5,0,Math.PI*2); ctx.fill();
  } else if (expresion==='triste') {
    ctx.beginPath(); ctx.moveTo(-10,22); ctx.bezierCurveTo(-5,16,5,16,10,22); ctx.stroke();
  }

  // Gorro
  const hbg=ctx.createLinearGradient(-22,-25,22,-80);
  hbg.addColorStop(0,'#7b1fa2'); hbg.addColorStop(1,'#4a148c');
  ctx.fillStyle=hbg;
  ctx.beginPath(); ctx.moveTo(-30,-20); ctx.lineTo(0,-88); ctx.lineTo(30,-20); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#9c27b0'; ctx.beginPath(); ctx.ellipse(0,-22,42,9,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#ffd700'; ctx.fillRect(-30,-32,60,6);
  drawStar(ctx,0,-50,8,'#fff9c4',1);
  glowCircle(ctx,0,-50,14,'rgba(255,249,196,.4)',1);
  // Luna creciente en el gorro
  ctx.fillStyle='rgba(255,249,196,.8)'; ctx.beginPath(); ctx.arc(8,-70,5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(74,20,140,.9)';   ctx.beginPath(); ctx.arc(10,-70,4,0,Math.PI*2); ctx.fill();

  ctx.restore();
}

// Stub para sirena Coral — a completar cuando se dibuje la escena del océano
export function drawCoral(ctx, cx, cy, scale=1) {
  ctx.save(); ctx.translate(cx,cy); ctx.scale(scale,scale);
  ctx.fillStyle='#4dd0e1'; ctx.beginPath(); ctx.arc(0,0,40,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='white'; ctx.font='12px Comic Sans MS'; ctx.textAlign='center';
  ctx.fillText('Coral',0,4);
  ctx.restore();
}
