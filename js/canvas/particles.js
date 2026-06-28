export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this._raf = null;
  }

  confetti(n=40) {
    const W=this.canvas.width, H=this.canvas.height;
    const colors=['#e91e63','#9c27b0','#ffd700','#00bcd4','#f48fb1','#fff176'];
    for(let i=0;i<n;i++){
      this.particles.push({
        x: Math.random()*W, y: -10,
        vx: (Math.random()-.5)*4, vy: 2+Math.random()*4,
        r: 4+Math.random()*6, color: colors[Math.floor(Math.random()*colors.length)],
        rot: Math.random()*Math.PI*2, rotV: (Math.random()-.5)*.15,
        life: 1,
      });
    }
    this.start();
  }

  sparkles(cx, cy, n=12) {
    for(let i=0;i<n;i++){
      const ang=Math.random()*Math.PI*2, spd=2+Math.random()*4;
      this.particles.push({
        x:cx, y:cy, vx:Math.cos(ang)*spd, vy:Math.sin(ang)*spd,
        r:3+Math.random()*4, color:'#fff9c4', rot:0, rotV:0, life:1, type:'star',
      });
    }
    this.start();
  }

  start() {
    if(this.running) return;
    this.running=true;
    const tick=()=>{
      if(!this.particles.length){ this.running=false; return; }
      this.particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy; p.vy+=.12; p.rot+=p.rotV; p.life-=.018;
      });
      this.particles=this.particles.filter(p=>p.life>0&&p.y<this.canvas.height+20);
      this._raf=requestAnimationFrame(tick);
    };
    tick();
  }

  draw() {
    const ctx=this.ctx;
    this.particles.forEach(p=>{
      ctx.save(); ctx.globalAlpha=p.life; ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle=p.color;
      if(p.type==='star'){
        ctx.beginPath();
        for(let i=0;i<5;i++){
          const a=Math.PI/2+i*Math.PI*2/5, b=a+Math.PI/5;
          i===0?ctx.moveTo(p.r*Math.cos(a),-p.r*Math.sin(a)):ctx.lineTo(p.r*Math.cos(a),-p.r*Math.sin(a));
          ctx.lineTo(p.r*.4*Math.cos(b),-p.r*.4*Math.sin(b));
        }
        ctx.closePath(); ctx.fill();
      } else {
        ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);
      }
      ctx.restore();
    });
  }

  stop() { cancelAnimationFrame(this._raf); this.running=false; this.particles=[]; }
}
