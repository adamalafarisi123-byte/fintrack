import { useState, useEffect, useRef } from 'react'
import { uid } from './utils/helpers.js'
import { seedAll, empty, useStore } from './data/seed.js'
import { Foot, Modal } from './components/ui.jsx'
import { TxForm, GoalForm, FundForm, InvForm } from './components/forms.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Txs } from './pages/Transactions.jsx'
import { Budgets } from './pages/Budgets.jsx'
import { Goals } from './pages/Goals.jsx'
import { Invoices } from './pages/Invoices.jsx'
import { Reports } from './pages/Reports.jsx'

const NAV=[['dash','Dashboard','📊'],['tx','Transactions','💸'],['bud','Budgets','🧮'],['goals','Goals','🎯'],['inv','Invoices','🧾'],['rep','Reports','📈']];
export default function App(){const [s,setS]=useStore(),[view,setView]=useState('dash'),[md,setMd]=useState(null),close=()=>setMd(null);
const upsert=(k,o)=>{setS(p=>({...p,[k]:o.id?p[k].map(x=>x.id===o.id?o:x):[...p[k],{...o,id:uid()}]}));close()};
const ask=(msg,fn)=>setMd({k:'ask',msg,fn}),rm=(k,id)=>setS(p=>({...p,[k]:p[k].filter(x=>x.id!==id)}));
const add={dash:['tx','+ Add transaction'],tx:['tx','+ Add transaction'],goals:['goal','+ New goal'],inv:['inv','+ New invoice']}[view];
return <div className="app"><aside className="side"><div className="logo">FIN<b>TRACK</b></div><nav className="nav">{NAV.map(([k,l,i])=><button key={k} className={'nb '+(view===k?'on':'')} onClick={()=>setView(k)}><span>{i}</span>{l}</button>)}</nav><div className="sf"><button onClick={()=>ask('Replace all your data with fresh demo data?',()=>setS(seedAll()))}>Reset demo data</button><button onClick={()=>ask('Delete all data and start empty? This cannot be undone.',()=>setS(empty))}>Clear all data</button></div></aside>
<main><div className="top"><h1>{view==='dash'?'Catatan Keuangan Adam Alfarisi':NAV.find(n=>n[0]===view)[1]}</h1>{add&&<button className="btn" onClick={()=>setMd({k:add[0]})}>{add[1]}</button>}</div>
{view==='dash'&&<Dashboard s={s} go={setView}/>}{view==='tx'&&<Txs s={s} edit={t=>setMd({k:'tx',d:t})} del={t=>ask('Delete this transaction?',()=>rm('tx',t.id))}/>}{view==='bud'&&<Budgets s={s} setS={setS}/>}
{view==='goals'&&<Goals s={s} edit={g=>setMd({k:'goal',d:g})} fund={g=>setMd({k:'fund',d:g})} del={g=>ask('Delete the goal “'+g.name+'”?',()=>rm('goals',g.id))}/>}
{view==='inv'&&<Invoices s={s} edit={i=>setMd({k:'inv',d:i})} del={i=>ask('Delete the invoice for '+i.client+'?',()=>rm('invoices',i.id))} toggle={i=>upsert('invoices',{...i,status:i.status==='Paid'?'Unpaid':'Paid'})}/>}{view==='rep'&&<Reports s={s}/>}</main>
{md&&md.k==='tx'&&<Modal title={md.d?'Edit transaction':'Add transaction'} onClose={close}><TxForm init={md.d} onSave={o=>upsert('tx',o)} onClose={close}/></Modal>}
{md&&md.k==='goal'&&<Modal title={md.d?'Edit goal':'New savings goal'} onClose={close}><GoalForm init={md.d} onSave={o=>upsert('goals',o)} onClose={close}/></Modal>}
{md&&md.k==='fund'&&<Modal title="Add funds" onClose={close}><FundForm goal={md.d} onSave={a=>upsert('goals',{...md.d,saved:md.d.saved+a})} onClose={close}/></Modal>}
{md&&md.k==='inv'&&<Modal title={md.d?'Edit invoice':'New invoice'} onClose={close}><InvForm init={md.d} onSave={o=>upsert('invoices',o)} onClose={close}/></Modal>}
{md&&md.k==='ask'&&<Modal title="Are you sure?" onClose={close}><p>{md.msg}</p><Foot label="Yes, continue" onClose={close} onOk={()=>{md.fn();close()}}/></Modal>}</div>}
