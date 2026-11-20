const get = id => document.getElementById(id);
const history = [];
const starters = ['Check the demo against my preferences','Explain the ₹75 lakh funding plan','Prepare my founder questions','Review my founder call notes'];
for (const label of starters) {
  const button = document.createElement('button');
  button.textContent = label;
  button.onclick = () => {
    get('msg').value = label === starters[3] ? 'Review these fictional call notes against my questions.\nQuestions: \nNotes: ' : label;
    get('msg').focus();
  };
  get('starters').append(button);
}
function toggle(open) {
  get('panel').hidden = !open;
  get('launch').hidden = open;
  get('launch').setAttribute('aria-expanded', String(open));
  get(open ? 'msg' : 'launch').focus();
}
get('launch').onclick = () => toggle(true);
get('closeChat').onclick = () => toggle(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !get('panel').hidden) toggle(false); });
function bubble(text, role) {
  const el = document.createElement('div');
  el.className = 'bubble ' + role;
  el.textContent = text;
  get('log').append(el);
  get('flow').scrollTop = get('flow').scrollHeight;
  return el;
}
document.querySelector('form').onsubmit = async e => {
  e.preventDefault();
  const message = get('msg').value.trim();
  if (!message || get('send').disabled) return;
  get('send').disabled = true;
  bubble(message,'user');
  const pending = bubble('Reading your question…','assistant');
  try {
    const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({history:history.slice(-8),message})});
    const data = await res.json();
    if (!res.ok) throw Error(data.error);
    pending.textContent = data.answer;
    history.push({role:'user',text:message},{role:'model',text:data.answer});
    get('msg').value = '';
  } catch (error) { pending.textContent = error.message || 'Could not connect. Please retry.'; }
  finally { get('send').disabled = false; get('flow').scrollTop = get('flow').scrollHeight; }
};
