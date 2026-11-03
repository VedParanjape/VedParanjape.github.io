const projects = {
  agrichain: {title:'AgriChain',category:'Software / Smart India Hackathon 2026',intro:'An agricultural supply chain transparency prototype integrating blockchain ledgers and dynamic transaction verification.',points:['Built a full-stack decentralized supply chain tracking prototype.','Engineered backend APIs for order state transitions, real-time GST calculations, and dynamic UPI QR code generation.','Designed a lightweight, responsive single-page frontend with React and Tailwind CSS for farmers and vendors.'],tags:['Node.js','REST APIs','React','Tailwind CSS','Blockchain']},
  nitivahan: {title:'Nitivahan',category:'Robotics / e-Yantra 2026–27',intro:'An autonomous robotics and navigation project built around ROS and simulation in Gazebo.',points:['Programmed autonomous path planning and obstacle clearance algorithms in Python using ROS.','Set up Gazebo simulation pipelines to validate sensor feedback loops, odometry processing, and maze navigation.','Debugged Linux hardware/software bridges and environment dependencies for real-time control stability.'],tags:['Python','ROS','Gazebo','Linux']},
  quadrotor: {title:'Quadrotor flight stability',category:'Control systems / Academic engineering project',intro:'Continuous-time control systems modeling for multirotor dynamics and attitude stabilization.',points:['Modeled multirotor dynamics and attitude stabilization loops using continuous-time state-space representations and transfer functions.','Analyzed step responses, damping ratios, and pole-zero placements to tune feedback control stability.','Documented methodology and experimental verification in a 20-page technical investigation report.'],tags:['State-space modeling','Transfer functions','Feedback control']},
  bjt: {title:'BJT buffer amplifier',category:'Electronics / Circuit simulation & hardware analysis',intro:'Common collector BJT amplifier design and SPICE characterization for impedance matching.',points:['Designed and simulated an amplifier stage targeting unity voltage gain, high input impedance, and low output impedance.','Executed AC frequency sweeps, DC bias point evaluations, and transient distortion analysis to validate impedance matching.'],tags:['Analog circuit design','SPICE','AC / DC analysis']}
};
const filters = document.querySelectorAll('[data-filter]');
function filterProjects(value) {
  filters.forEach(button => { const active = button.dataset.filter === value; button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active)); });
  let count=0;
  document.querySelectorAll('[data-category]').forEach(card => {card.hidden=value!=='all' && card.dataset.category!==value;if(!card.hidden)count++;});
  const status=document.querySelector('#filter-status');if(status)status.textContent=`Showing ${count} ${count===1?'project':'projects'}`;
}
filters.forEach(button => button.addEventListener('click',()=>filterProjects(button.dataset.filter)));
if(filters.length){const value=new URLSearchParams(location.search).get('filter');filterProjects(['software','robotics','electronics'].includes(value)?value:'all');}
const dialog = document.querySelector('#project-dialog');
if(dialog){
  document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
    const project=projects[button.dataset.project];
    document.querySelector('#dialog-title').textContent=project.title;
    document.querySelector('#dialog-category').textContent=project.category;
    document.querySelector('#dialog-intro').textContent=project.intro;
    document.querySelector('#dialog-points').replaceChildren(...project.points.map(text=>{const el=document.createElement('li');el.textContent=text;return el;}));
    document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(text=>{const el=document.createElement('span');el.textContent=text;return el;}));
    dialog.showModal();document.body.classList.add('modal-open');
  }));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
document.querySelector('.copy-email')?.addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  try{await navigator.clipboard.writeText('vedparanjape16@gmail.com');status.textContent='Email copied!';}
  catch{status.textContent='Select the email address above to copy it.';}
});
document.querySelector('#year').textContent=new Date().getFullYear();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled=!reducedMotion.matches;
try{const saved=localStorage.getItem('ved-motion');if(saved!==null)motionEnabled=saved==='on'&&!reducedMotion.matches;}catch{}
const motionButton=document.createElement('button');motionButton.className='motion-toggle';motionButton.type='button';
document.querySelector('footer').insertBefore(motionButton,document.querySelector('footer > a:last-child'));
function updateMotion(){document.body.classList.toggle('motion-off',!motionEnabled);motionButton.textContent=motionEnabled?'◉ Motion on':'○ Motion off';motionButton.setAttribute('aria-pressed',String(motionEnabled));motionButton.setAttribute('aria-label','Enable decorative animation');}
motionButton.addEventListener('click',()=>{motionEnabled=!motionEnabled;updateMotion();try{localStorage.setItem('ved-motion',motionEnabled?'on':'off');}catch{}});
reducedMotion.addEventListener('change',event=>{motionEnabled=!event.matches;updateMotion();});updateMotion();
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.project,.domain-card,.principle-grid article,.section-heading,.about-grid > div').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});}
const header=document.querySelector('.header');let pending=false;
function syncScroll(){const max=document.documentElement.scrollHeight-innerHeight;header.style.setProperty('--scroll',`${max>0?scrollY/max*100:0}%`);pending=false;}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(syncScroll);}},{passive:true});addEventListener('resize',syncScroll);syncScroll();
