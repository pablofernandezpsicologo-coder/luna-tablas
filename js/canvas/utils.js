export function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

export function glowCircle(ctx,cx,cy,r,color,alpha=.5){
  const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
  g.addColorStop(0,color); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill(); ctx.restore();
}

export function drawStar(ctx,cx,cy,r,color='#fff9c4',alpha=1){
  ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle=color;
  ctx.beginPath();
  for(let i=0;i<5;i++){
    const a=Math.PI/2+i*Math.PI*2/5, b=a+Math.PI/5;
    i===0?ctx.moveTo(cx+r*Math.cos(a),cy-r*Math.sin(a)):ctx.lineTo(cx+r*Math.cos(a),cy-r*Math.sin(a));
    ctx.lineTo(cx+(r*.4)*Math.cos(b),cy-(r*.4)*Math.sin(b));
  }
  ctx.closePath(); ctx.fill(); ctx.restore();
}

export function kawaiiEye(ctx,cx,cy,irisColor='#4a148c'){
  ctx.save();
  ctx.fillStyle='white'; ctx.beginPath(); ctx.ellipse(cx,cy,10,12,0,0,Math.PI*2); ctx.fill();
  const ig=ctx.createRadialGradient(cx,cy+1,1,cx,cy+1,8);
  ig.addColorStop(0,'#b39ddb'); ig.addColorStop(1,irisColor);
  ctx.fillStyle=ig; ctx.beginPath(); ctx.ellipse(cx,cy+1,7,8,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0d001a'; ctx.beginPath(); ctx.ellipse(cx,cy+1,4,5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='white'; ctx.beginPath(); ctx.ellipse(cx+3,cy-2,2.5,3,-.3,0,Math.PI*2); ctx.fill();
  ctx.save(); ctx.fillStyle='white'; ctx.globalAlpha=.6;
  ctx.beginPath(); ctx.arc(cx-2,cy+3,1.2,0,Math.PI*2); ctx.fill(); ctx.restore();
  ctx.restore();
}

export function blush(ctx,cx,cy,color='#f48fb1'){
  ctx.save(); ctx.globalAlpha=.45;
  const g=ctx.createRadialGradient(cx,cy,0,cx,cy,12);
  g.addColorStop(0,color); g.addColorStop(1,'rgba(244,143,177,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(cx,cy,12,7,0,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

export function roundRect(ctx,x,y,w,h,r,fill,stroke,sw=2){
  ctx.beginPath(); ctx.roundRect(x,y,w,h,r);
  if(fill){ctx.fillStyle=fill;ctx.fill();}
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();}
}
