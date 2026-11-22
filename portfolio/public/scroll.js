/* Smooth, slide-aware scrolling for desktop with a fine pointer.
   - wheel / trackpad deltas are eased (exponential lerp) instead of jumping in 100px notches
   - when input goes quiet the page glides to the nearest slide (or pinned-tab step) in the direction of travel
   - PageUp/PageDown/Space/Home/End and same-page #links glide the same way
   Everything else (touch, small screens, reduced motion, open drawer, inner scrollers, pinch-zoom) stays native. */
(()=>{
  const MQ='(min-width:1101px) and (min-height:540px) and (prefers-reduced-motion: no-preference) and (pointer:fine)';
  const mq=matchMedia(MQ), root=document.documentElement;
  const TAU=125;                 // ms: lower = snappier, higher = floatier
  let on=false,cur=0,target=0,raf=0,last=0,idleT=0,gesture=null,pts=[],dirty=true;

  const hdr=()=>parseFloat(getComputedStyle(root).getPropertyValue('--hdr-h'))||56;
  const maxY=()=>Math.max(0,root.scrollHeight-innerHeight);
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

  function buildPoints(){
    const H=hdr(),vh=innerHeight,sy=scrollY,m=maxY(),set=[];
    const add=y=>set.push(Math.round(clamp(y,0,m)));
    add(0);
    document.querySelectorAll('main, main *').forEach(el=>{
      const cs=getComputedStyle(el),a=cs.scrollSnapAlign;
      if(!a||a==='none')return;
      const r=el.getBoundingClientRect();
      if(a.startsWith('start'))add(r.top+sy-(parseFloat(cs.scrollMarginTop)||0)-H);
      else if(a.startsWith('end'))add(r.bottom+sy+(parseFloat(cs.scrollMarginBottom)||0)-vh);
    });
    // pinned operating board: one stop per tab
    const op=document.getElementById('operating');
    if(op&&op.classList.contains('ops-pinned')){
      const n=op.querySelectorAll('.ops-tab').length,r=op.getBoundingClientRect();
      const total=Math.max(1,op.offsetHeight-(vh-H)),top=r.top+sy-H;
      for(let i=1;i<n;i++)add(top+((i+.5)/n)*total);
    }
    add(m);
    set.sort((a,b)=>a-b);
    pts=set.filter((v,i)=>i===0||v-set[i-1]>6);
    dirty=false;
  }
  const points=()=>{if(dirty)buildPoints();return pts};
  const nearest=y=>points().reduce((b,p)=>Math.abs(p-y)<Math.abs(b-y)?p:b,pts[0]);

  function run(){if(!raf){last=0;raf=requestAnimationFrame(tick)}}
  function tick(t){
    raf=0;
    const dt=Math.min(64,t-(last||t));last=t;
    cur+=(target-cur)*(1-Math.exp(-dt/TAU));
    if(Math.abs(target-cur)<.4)cur=target;
    scrollTo({top:cur,behavior:'instant'});
    if(cur!==target)raf=requestAnimationFrame(tick);else last=0;
  }
  function glideTo(y){if(!on){scrollTo({top:y,behavior:'smooth'});return}target=clamp(y,0,maxY());gesture=null;clearTimeout(idleT);run()}
  window.slideScrollTo=glideTo;

  function settle(){
    idleT=0;if(!on)return;
    const vh=innerHeight,p=points();
    let best=nearest(target),forced=false;
    if(gesture!=null){
      const travel=target-gesture;
      if(Math.abs(travel)>vh*.06){
        const g=nearest(gesture);
        if(best===g){const n=p[p.indexOf(g)+(travel>0?1:-1)];if(n!==undefined&&Math.abs(n-g)<vh*1.6){best=n;forced=true}}
      }
    }
    if(forced||Math.abs(best-target)<=vh*.55)target=best;     // forced = a deliberate flick to the next slide; otherwise sections taller than the screen keep free scrolling in the middle
    gesture=null;run();
  }

  function scrollableAncestor(el){
    for(;el&&el!==document.body&&el!==root;el=el.parentElement){
      const o=getComputedStyle(el).overflowY;
      if((o==='auto'||o==='scroll')&&el.scrollHeight>el.clientHeight+1)return true;
    }
    return false;
  }
  function onWheel(e){
    if(!on||e.ctrlKey||e.metaKey||e.defaultPrevented||document.body.classList.contains('lock'))return;
    if(Math.abs(e.deltaX)>Math.abs(e.deltaY)||scrollableAncestor(e.target))return;
    e.preventDefault();
    let dy=e.deltaY;
    if(e.deltaMode===1)dy*=32;else if(e.deltaMode===2)dy*=innerHeight;
    if(gesture==null)gesture=cur;
    target=clamp(target+dy,0,maxY());
    clearTimeout(idleT);idleT=setTimeout(settle,120);
    run();
  }
  function step(dir){
    const p=points(),y=cur;
    const next=dir>0?p.find(v=>v>y+8):[...p].reverse().find(v=>v<y-8);
    if(next!==undefined)glideTo(next);
  }
  function onKey(e){
    if(!on||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||document.body.classList.contains('lock'))return;
    const t=e.target;
    if(t&&t.closest&&t.closest('input,textarea,select,[contenteditable="true"]'))return;
    const k=e.key;
    if(k===' '&&t&&t.closest&&t.closest('button,a,summary,[role="button"]'))return;
    if(k==='PageDown'||(k===' '&&!e.shiftKey)){e.preventDefault();step(1)}
    else if(k==='PageUp'||(k===' '&&e.shiftKey)){e.preventDefault();step(-1)}
    else if(k==='Home'){e.preventDefault();glideTo(0)}
    else if(k==='End'){e.preventDefault();glideTo(maxY())}
  }
  function onClick(e){
    if(!on||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    const a=e.target.closest&&e.target.closest('a[href*="#"]');
    if(!a||a.target==='_blank'||a.origin!==location.origin||a.pathname!==location.pathname||!a.hash)return;
    const id=decodeURIComponent(a.hash.slice(1)),el=id?document.getElementById(id):null;
    if(!el&&id)return;
    e.preventDefault();
    history.pushState(null,'',a.hash);
    glideTo(el?el.getBoundingClientRect().top+scrollY-hdr():0);
  }
  function sync(){if(on&&!raf&&Math.abs(scrollY-cur)>2){cur=target=scrollY}}

  function update(){
    const want=mq.matches;
    if(want===on)return;
    on=want;
    root.classList.toggle('js-slide-scroll',on);
    cancelAnimationFrame(raf);raf=0;clearTimeout(idleT);idleT=0;gesture=null;
    cur=target=scrollY;dirty=true;
  }
  addEventListener('wheel',onWheel,{passive:false});
  addEventListener('keydown',onKey);
  document.addEventListener('click',onClick);
  addEventListener('scroll',sync,{passive:true});
  addEventListener('resize',()=>{dirty=true;sync()});
  addEventListener('load',()=>{dirty=true});
  if('ResizeObserver' in window)new ResizeObserver(()=>{dirty=true}).observe(document.body);
  (mq.addEventListener?mq.addEventListener('change',update):mq.addListener(update));
  update();
})();
