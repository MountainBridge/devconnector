const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../server');

function request(server, path) { return new Promise((resolve,reject)=>{ const req=http.get({port:server.address().port,path},res=>{let body='';res.on('data',c=>body+=c);res.on('end',()=>resolve({status:res.statusCode,body:JSON.parse(body)}));});req.on('error',reject); }); }

test('liveness endpoint is independent of database readiness', async()=>{
  const server=app.listen(0);
  try { const result=await request(server,'/health/live'); assert.equal(result.status,200); assert.equal(result.body.status,'ok'); }
  finally { server.close(); }
});

test('readiness reports database state explicitly', async()=>{
  const server=app.listen(0);
  try { const result=await request(server,'/health/ready'); assert.ok([200,503].includes(result.status)); assert.ok(['ready','not_ready'].includes(result.body.status)); }
  finally { server.close(); }
});
