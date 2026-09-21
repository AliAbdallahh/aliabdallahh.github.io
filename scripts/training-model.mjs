// Independent teaching model. No P6 import, reschedule or contractual assessment.
export function calculateTraining(input) {
  const p=input.progress,t=input.tia;
  for(const value of Object.values(p).filter(v=>typeof v==='number'))if(value<0)throw Error('Negative quantity');
  if(!p.scope||p.verified>p.reported||Math.max(p.reported,p.planned)>p.scope)throw Error('Invalid progress scope');
  for(const name of ['eventDays','installationDays','testingDays','documentationDays'])if(!Number.isInteger(t[name])||t[name]<0)throw Error('Expected whole working days');
  const start=new Date(t.dataDate+'T00:00:00Z');
  if(!Number.isFinite(+start)||[0,6].includes(start.getUTCDay()))throw Error('Data date must be a weekday');
  const workingDate=index=>{
    const d=new Date(start);let n=0;
    while(n<index){d.setUTCDate(d.getUTCDate()+1);if(![0,6].includes(d.getUTCDay()))n++;}
    return d.toISOString().slice(0,10);
  };
  const schedule=event=>{
    const installEnd=event+t.installationDays,testEnd=installEnd+t.testingDays;
    const duration=Math.max(testEnd,t.documentationDays);
    return {duration,installStart:workingDate(event),installFinish:workingDate(installEnd-1),
      testStart:workingDate(installEnd),testFinish:workingDate(testEnd-1),handover:workingDate(duration-1),
      documentationFinish:workingDate(t.documentationDays-1),documentationFloat:duration-t.documentationDays};
  };
  const before=schedule(0),after=schedule(t.eventDays);
  return {progress:{planned:p.planned/p.scope*100,reported:p.reported/p.scope*100,verified:p.verified/p.scope*100,
    variancePoints:(p.verified-p.planned)/p.scope*100,shortfall:p.planned-p.verified,unverified:p.reported-p.verified},
    before,after,workingImpact:after.duration-before.duration,calendarImpact:(Date.parse(after.handover)-Date.parse(before.handover))/86400000};
}
