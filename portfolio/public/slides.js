/* Scroll steps through the operating tabs while the board is pinned (desktop only).
   No wheel hijacking: the section is a tall track, the board is sticky, scroll progress picks the tab. */
(()=>{
  const sec=document.getElementById('operating');
  if(!sec)return;
  const tabs=[...sec.querySelectorAll('.ops-tab')];
  if(tabs.length<2)return;
  const mq=matchMedia('(min-width:1101px) and (min-height:560px) and (prefers-reduced-motion: no-preference)');
  const hdr=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h'))||56;
  const pinned=()=>sec.classList.contains('ops-pinned');
  const geom=()=>{const r=sec.getBoundingClientRect();return {top:r.top-hdr(),total:Math.max(1,sec.offsetHeight-(innerHeight-hdr()))}};
  let queued=false;
  function sync(){
    queued=false;
    if(!pinned())return;
    const {top,total}=geom();
    const p=Math.min(.999,Math.max(0,-top/total));
    const i=Math.floor(p*tabs.length);
    if(!tabs[i].classList.contains('active'))tabs[i].click();   // untrusted click: just switches the panel
  }
  const queue=()=>{if(!queued){queued=true;requestAnimationFrame(sync)}};
  function mode(){sec.classList.toggle('ops-pinned',mq.matches);queue()}
  tabs.forEach((t,i)=>t.addEventListener('click',e=>{
    if(!e.isTrusted||!pinned())return;                          // a real click moves scroll to that step
    const {top,total}=geom();
    scrollTo({top:scrollY+top+((i+.5)/tabs.length)*total,behavior:'smooth'});
  }));
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue);
  (mq.addEventListener?mq.addEventListener('change',mode):mq.addListener(mode));
  mode();
})();
