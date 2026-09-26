(()=>{var Xp=0,sf=1,qp=2;var Do=1,Yp=2,ca=3,Fr=0,pn=1,mi=2,qi=0,ha=1,af=2,of=3,lf=4,Zp=5;var cs=100,Jp=101,$p=102,Kp=103,Qp=104,jp=200,tm=201,em=202,nm=203,cf=204,hf=205,im=206,rm=207,sm=208,am=209,om=210,lm=211,cm=212,hm=213,um=214,Kl=0,Ql=1,jl=2,Ks=3,tc=4,ec=5,nc=6,ic=7,Nc=0,fm=1,dm=2,Pi=0,uf=1,ff=2,df=3,No=4,pf=5,mf=6,gf=7;var _f=300,Or=301,hs=302,Uc=303,Fc=304,Uo=306,rc=1e3,Bi=1001,sc=1002,ln=1003,pm=1004;var Fo=1005;var dn=1006,Oc=1007;var Br=1008;var Yn=1009,xf=1010,vf=1011,ua=1012,Bc=1013,Ii=1014,gi=1015,Li=1016,zc=1017,kc=1018,fa=1020,yf=35902,Sf=35899,Mf=1021,bf=1022,_i=1023,ki=1026,zr=1027,Vc=1028,Gc=1029,kr=1030,Hc=1031;var Wc=1033,Oo=33776,Bo=33777,zo=33778,ko=33779,Xc=35840,qc=35841,Yc=35842,Zc=35843,Jc=36196,$c=37492,Kc=37496,Qc=37488,jc=37489,Vo=37490,th=37491,eh=37808,nh=37809,ih=37810,rh=37811,sh=37812,ah=37813,oh=37814,lh=37815,ch=37816,hh=37817,uh=37818,fh=37819,dh=37820,ph=37821,mh=36492,gh=36494,_h=36495,xh=36283,vh=36284,Go=36285,yh=36286;var Qa=2300,ac=2301,Jl=2302,Xu=2303,qu=2400,Yu=2401,Zu=2402;var mm=3200;var Ho=0,gm=1,cr="",Nn="srgb",ja="srgb-linear",to="linear",_e="srgb";var $l=7680;var _m=519,xm=512,vm=513,ym=514,Sh=515,Sm=516,Mm=517,Mh=518,bm=519,Tm=35044;var Tf="300 es",Ri=2e3,Qs=2001;function o0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function l0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function eo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function wm(){let r=eo("canvas");return r.style.display="block",r}var pp={},js=null;function wf(...r){let t="THREE."+r.shift();js?js("log",t,...r):console.log(t,...r)}function Em(r){let t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Kt(...r){r=Em(r);let t="THREE."+r.shift();if(js)js("warn",t,...r);else{let e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function Qt(...r){r=Em(r);let t="THREE."+r.shift();if(js)js("error",t,...r);else{let e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function rs(...r){let t=r.join(" ");t in pp||(pp[t]=!0,Kt(...r))}function Am(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var Cm={[Kl]:Ql,[jl]:nc,[tc]:ic,[Ks]:ec,[Ql]:Kl,[nc]:jl,[ic]:tc,[ec]:Ks},Vi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}},yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var vu=Math.PI/180,oc=180/Math.PI;function da(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[r&255]+yn[r>>8&255]+yn[r>>16&255]+yn[r>>24&255]+"-"+yn[t&255]+yn[t>>8&255]+"-"+yn[t>>16&15|64]+yn[t>>24&255]+"-"+yn[e&63|128]+yn[e>>8&255]+"-"+yn[e>>16&255]+yn[e>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function ce(r,t,e){return Math.max(t,Math.min(e,r))}function c0(r,t){return(r%t+t)%t}function yu(r,t,e){return(1-e)*r+e*t}function Ga(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var If=class If{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};If.prototype.isVector2=!0;var bt=If,Gi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(d!==_||l!==u||c!==f||h!==m){let p=l*u+c*f+h*m+d*_;p<0&&(u=-u,f=-f,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){let b=Math.acos(p),A=Math.sin(b);g=Math.sin(g*b)/A,o=Math.sin(o*b)/A,l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+_*o}else{l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+_*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],m=s[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(s/2),u=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Lf=class Lf{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(mp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(mp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),d=2*(s*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=i+l*d+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Su.copy(this).projectOnVector(t),this.sub(Su)}reflect(t){return this.sub(Su.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Lf.prototype.isVector3=!0;var V=Lf,Su=new V,mp=new Gi,Df=class Df{constructor(t,e,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],_=i[0],p=i[3],g=i[6],b=i[1],A=i[4],v=i[7],S=i[2],w=i[5],E=i[8];return s[0]=a*_+o*b+l*S,s[3]=a*p+o*A+l*w,s[6]=a*g+o*v+l*E,s[1]=c*_+h*b+d*S,s[4]=c*p+h*A+d*w,s[7]=c*g+h*v+d*E,s[2]=u*_+f*b+m*S,s[5]=u*p+f*A+m*w,s[8]=u*g+f*v+m*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,m=e*d+n*u+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return rs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mu.makeScale(t,e)),this}rotate(t){return rs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mu.makeRotation(-t)),this}translate(t,e){return rs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Df.prototype.isMatrix3=!0;var te=Df,Mu=new te,gp=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_p=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function h0(){let r={enabled:!0,workingColorSpace:ja,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===_e&&(i.r=ar(i.r),i.g=ar(i.g),i.b=ar(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(i.r=$s(i.r),i.g=$s(i.g),i.b=$s(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===cr?to:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return rs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return rs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ja]:{primaries:t,whitePoint:n,transfer:to,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Nn},outputColorSpaceConfig:{drawingBufferColorSpace:Nn}},[Nn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Nn}}}),r}var fe=h0();function ar(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function $s(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Fs,lc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Fs===void 0&&(Fs=eo("canvas")),Fs.width=t.width,Fs.height=t.height;let i=Fs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Fs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=eo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ar(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ar(e[n]/255)*255):e[n]=ar(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},u0=0,ta=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=da(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(bu(i[a].image)):s.push(bu(i[a]))}else s=bu(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function bu(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?lc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}var f0=0,Tu=new V,Fn=class r extends Vi{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=Bi,i=Bi,s=dn,a=Br,o=_i,l=Yn,c=r.DEFAULT_ANISOTROPY,h=cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=da(),this.name="",this.source=new ta(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Tu).x}get height(){return this.source.getSize(Tu).y}get depth(){return this.source.getSize(Tu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_f)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case rc:t.x=t.x-Math.floor(t.x);break;case Bi:t.x=t.x<0?0:1;break;case sc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case rc:t.y=t.y-Math.floor(t.y);break;case Bi:t.y=t.y<0?0:1;break;case sc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=_f;Fn.DEFAULT_ANISOTROPY=1;var Nf=class Nf{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(c+1)/2,v=(f+1)/2,S=(g+1)/2,w=(h+u)/4,E=(d+_)/4,x=(m+p)/4;return A>v&&A>S?A<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(A),i=w/n,s=E/n):v>S?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=x/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=E/s,i=x/s),this.set(n,i,s,e),this}let b=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(p-m)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Nf.prototype.isVector4=!0;var De=Nf,cc=class extends Vi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},s=new Fn(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new ta(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qn=class extends cc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},no=class extends Fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ln,this.minFilter=ln,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var hc=class extends Fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ln,this.minFilter=ln,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Dc=class Dc{constructor(t,e,n,i,s,a,o,l,c,h,d,u,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,d,u,f,m,_,p)}set(t,e,n,i,s,a,o,l,c,h,d,u,f,m,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Os.setFromMatrixColumn(t,0).length(),s=1/Os.setFromMatrixColumn(t,1).length(),a=1/Os.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=a*h,f=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u+_*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,m=o*h,_=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(d0,t,p0)}lookAt(t,e,n){let i=this.elements;return jn.subVectors(t,e),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),wr.crossVectors(n,jn),wr.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),wr.crossVectors(n,jn)),wr.normalize(),wl.crossVectors(jn,wr),i[0]=wr.x,i[4]=wl.x,i[8]=jn.x,i[1]=wr.y,i[5]=wl.y,i[9]=jn.y,i[2]=wr.z,i[6]=wl.z,i[10]=jn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],b=n[3],A=n[7],v=n[11],S=n[15],w=i[0],E=i[4],x=i[8],T=i[12],C=i[1],D=i[5],L=i[9],F=i[13],I=i[2],z=i[6],H=i[10],k=i[14],Q=i[3],Y=i[7],P=i[11],$=i[15];return s[0]=a*w+o*C+l*I+c*Q,s[4]=a*E+o*D+l*z+c*Y,s[8]=a*x+o*L+l*H+c*P,s[12]=a*T+o*F+l*k+c*$,s[1]=h*w+d*C+u*I+f*Q,s[5]=h*E+d*D+u*z+f*Y,s[9]=h*x+d*L+u*H+f*P,s[13]=h*T+d*F+u*k+f*$,s[2]=m*w+_*C+p*I+g*Q,s[6]=m*E+_*D+p*z+g*Y,s[10]=m*x+_*L+p*H+g*P,s[14]=m*T+_*F+p*k+g*$,s[3]=b*w+A*C+v*I+S*Q,s[7]=b*E+A*D+v*z+S*Y,s[11]=b*x+A*L+v*H+S*P,s[15]=b*T+A*F+v*k+S*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],_=t[7],p=t[11],g=t[15],b=l*f-c*u,A=o*f-c*d,v=o*u-l*d,S=a*f-c*h,w=a*u-l*h,E=a*d-o*h;return e*(_*b-p*A+g*v)-n*(m*b-p*S+g*w)+i*(m*A-_*S+g*E)-s*(m*v-_*w+p*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(s*h-o*l)+i*(s*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],_=t[13],p=t[14],g=t[15],b=e*o-n*a,A=e*l-i*a,v=e*c-s*a,S=n*l-i*o,w=n*c-s*o,E=i*c-s*l,x=h*_-d*m,T=h*p-u*m,C=h*g-f*m,D=d*p-u*_,L=d*g-f*_,F=u*g-f*p,I=b*F-A*L+v*D+S*C-w*T+E*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(o*F-l*L+c*D)*z,t[1]=(i*L-n*F-s*D)*z,t[2]=(_*E-p*w+g*S)*z,t[3]=(u*w-d*E-f*S)*z,t[4]=(l*C-a*F-c*T)*z,t[5]=(e*F-i*C+s*T)*z,t[6]=(p*v-m*E-g*A)*z,t[7]=(h*E-u*v+f*A)*z,t[8]=(a*L-o*C+c*x)*z,t[9]=(n*C-e*L-s*x)*z,t[10]=(m*w-_*v+g*b)*z,t[11]=(d*v-h*w-f*b)*z,t[12]=(o*T-a*D-l*x)*z,t[13]=(e*D-n*T+i*x)*z,t[14]=(_*A-m*S-p*b)*z,t[15]=(h*S-d*A+u*b)*z,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,m=s*d,_=a*h,p=a*d,g=o*d,b=l*c,A=l*h,v=l*d,S=n.x,w=n.y,E=n.z;return i[0]=(1-(_+g))*S,i[1]=(f+v)*S,i[2]=(m-A)*S,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(u+g))*w,i[6]=(p+b)*w,i[7]=0,i[8]=(m+A)*E,i[9]=(p-b)*E,i[10]=(1-(u+_))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=Os.set(i[0],i[1],i[2]).length(),o=Os.set(i[4],i[5],i[6]).length(),l=Os.set(i[8],i[9],i[10]).length();s<0&&(a=-a),wi.copy(this);let c=1/a,h=1/o,d=1/l;return wi.elements[0]*=c,wi.elements[1]*=c,wi.elements[2]*=c,wi.elements[4]*=h,wi.elements[5]*=h,wi.elements[6]*=h,wi.elements[8]*=d,wi.elements[9]*=d,wi.elements[10]*=d,e.setFromRotationMatrix(wi),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,s,a,o=Ri,l=!1){let c=this.elements,h=2*s/(e-t),d=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===Ri)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Qs)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Ri,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===Ri)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===Qs)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Dc.prototype.isMatrix4=!0;var Se=Dc,Os=new V,wi=new Se,d0=new V(0,0,0),p0=new V(1,1,1),wr=new V,wl=new V,jn=new V,xp=new Se,vp=new Gi,Hi=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vp.setFromEuler(this),this.setFromQuaternion(vp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hi.DEFAULT_ORDER="XYZ";var io=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},m0=0,yp=new V,Bs=new Gi,er=new Se,El=new V,Ha=new V,g0=new V,_0=new Gi,Sp=new V(1,0,0),Mp=new V(0,1,0),bp=new V(0,0,1),Tp={type:"added"},x0={type:"removed"},zs={type:"childadded",child:null},wu={type:"childremoved",child:null},cn=class r extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=da(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new V,e=new Hi,n=new Gi,i=new V(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Se},normalMatrix:{value:new te}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bs.setFromAxisAngle(t,e),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(t,e){return Bs.setFromAxisAngle(t,e),this.quaternion.premultiply(Bs),this}rotateX(t){return this.rotateOnAxis(Sp,t)}rotateY(t){return this.rotateOnAxis(Mp,t)}rotateZ(t){return this.rotateOnAxis(bp,t)}translateOnAxis(t,e){return yp.copy(t).applyQuaternion(this.quaternion),this.position.add(yp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sp,t)}translateY(t){return this.translateOnAxis(Mp,t)}translateZ(t){return this.translateOnAxis(bp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(er.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?El.copy(t):El.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?er.lookAt(Ha,El,this.up):er.lookAt(El,Ha,this.up),this.quaternion.setFromRotationMatrix(er),i&&(er.extractRotation(i.matrixWorld),Bs.setFromRotationMatrix(er),this.quaternion.premultiply(Bs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tp),zs.child=t,this.dispatchEvent(zs),zs.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(x0),wu.child=t,this.dispatchEvent(wu),wu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),er.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),er.multiply(t.parent.matrixWorld)),t.applyMatrix4(er),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tp),zs.child=t,this.dispatchEvent(zs),zs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,t,g0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,_0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};cn.DEFAULT_UP=new V(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var zi=class extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}},v0={type:"move"},ea=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(v0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new zi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Er={h:0,s:0,l:0},Al={h:0,s:0,l:0};function Eu(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var ne=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=fe.workingColorSpace){if(t=c0(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Eu(a,s,t+1/3),this.g=Eu(a,s,t),this.b=Eu(a,s,t-1/3)}return fe.colorSpaceToWorking(this,i),this}setStyle(t,e=Nn){function n(s){s!==void 0&&parseFloat(s)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Nn){let n=Rm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}copyLinearToSRGB(t){return this.r=$s(t.r),this.g=$s(t.g),this.b=$s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Nn){return fe.workingToColorSpace(Sn.copy(this),t),Math.round(ce(Sn.r*255,0,255))*65536+Math.round(ce(Sn.g*255,0,255))*256+Math.round(ce(Sn.b*255,0,255))}getHexString(t=Nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.workingToColorSpace(Sn.copy(this),e);let n=Sn.r,i=Sn.g,s=Sn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=Nn){fe.workingToColorSpace(Sn.copy(this),t);let e=Sn.r,n=Sn.g,i=Sn.b;return t!==Nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Er),this.setHSL(Er.h+t,Er.s+e,Er.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Er),t.getHSL(Al);let n=yu(Er.h,Al.h,e),i=yu(Er.s,Al.s,e),s=yu(Er.l,Al.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Sn=new ne;ne.NAMES=Rm;var ss=class extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ei=new V,nr=new V,Au=new V,ir=new V,ks=new V,Vs=new V,wp=new V,Cu=new V,Ru=new V,Pu=new V,Iu=new De,Lu=new De,Du=new De,Pr=class r{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ei.subVectors(t,e),i.cross(Ei);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ei.subVectors(i,e),nr.subVectors(n,e),Au.subVectors(t,e);let a=Ei.dot(Ei),o=Ei.dot(nr),l=Ei.dot(Au),c=nr.dot(nr),h=nr.dot(Au),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ir)===null?!1:ir.x>=0&&ir.y>=0&&ir.x+ir.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,ir)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ir.x),l.addScaledVector(a,ir.y),l.addScaledVector(o,ir.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return Iu.setScalar(0),Lu.setScalar(0),Du.setScalar(0),Iu.fromBufferAttribute(t,e),Lu.fromBufferAttribute(t,n),Du.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Iu,s.x),a.addScaledVector(Lu,s.y),a.addScaledVector(Du,s.z),a}static isFrontFacing(t,e,n,i){return Ei.subVectors(n,e),nr.subVectors(t,e),Ei.cross(nr).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ei.subVectors(this.c,this.b),nr.subVectors(this.a,this.b),Ei.cross(nr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,a,o;ks.subVectors(i,n),Vs.subVectors(s,n),Cu.subVectors(t,n);let l=ks.dot(Cu),c=Vs.dot(Cu);if(l<=0&&c<=0)return e.copy(n);Ru.subVectors(t,i);let h=ks.dot(Ru),d=Vs.dot(Ru);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ks,a);Pu.subVectors(t,s);let f=ks.dot(Pu),m=Vs.dot(Pu);if(m>=0&&f<=m)return e.copy(s);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Vs,o);let p=h*m-f*d;if(p<=0&&d-h>=0&&f-m>=0)return wp.subVectors(s,i),o=(d-h)/(d-h+(f-m)),e.copy(i).addScaledVector(wp,o);let g=1/(p+_+u);return a=_*g,o=u*g,e.copy(n).addScaledVector(ks,a).addScaledVector(Vs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Wi=class{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ai.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ai.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ai.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ai):Ai.fromBufferAttribute(s,a),Ai.applyMatrix4(t.matrixWorld),this.expandByPoint(Ai);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cl.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cl.copy(n.boundingBox)),Cl.applyMatrix4(t.matrixWorld),this.union(Cl)}let i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ai),Ai.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wa),Rl.subVectors(this.max,Wa),Gs.subVectors(t.a,Wa),Hs.subVectors(t.b,Wa),Ws.subVectors(t.c,Wa),Ar.subVectors(Hs,Gs),Cr.subVectors(Ws,Hs),jr.subVectors(Gs,Ws);let e=[0,-Ar.z,Ar.y,0,-Cr.z,Cr.y,0,-jr.z,jr.y,Ar.z,0,-Ar.x,Cr.z,0,-Cr.x,jr.z,0,-jr.x,-Ar.y,Ar.x,0,-Cr.y,Cr.x,0,-jr.y,jr.x,0];return!Nu(e,Gs,Hs,Ws,Rl)||(e=[1,0,0,0,1,0,0,0,1],!Nu(e,Gs,Hs,Ws,Rl))?!1:(Pl.crossVectors(Ar,Cr),e=[Pl.x,Pl.y,Pl.z],Nu(e,Gs,Hs,Ws,Rl))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ai).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ai).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},rr=[new V,new V,new V,new V,new V,new V,new V,new V],Ai=new V,Cl=new Wi,Gs=new V,Hs=new V,Ws=new V,Ar=new V,Cr=new V,jr=new V,Wa=new V,Rl=new V,Pl=new V,ts=new V;function Nu(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ts.fromArray(r,s);let o=i.x*Math.abs(ts.x)+i.y*Math.abs(ts.y)+i.z*Math.abs(ts.z),l=t.dot(ts),c=e.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Je=new V,Il=new bt,y0=0,Un=class extends Vi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:y0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tm,this.updateRanges=[],this.gpuType=gi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Il.fromBufferAttribute(this,e),Il.applyMatrix3(t),this.setXY(e,Il.x,Il.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix3(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ga(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ga(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ga(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ga(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ga(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array),i=Xn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xn(e,this.array),n=Xn(n,this.array),i=Xn(i,this.array),s=Xn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ro=class extends Un{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var so=class extends Un{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var $e=class extends Un{constructor(t,e,n){super(new Float32Array(t),e,n)}},S0=new Wi,Xa=new V,Uu=new V,or=class{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):S0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xa.subVectors(t,this.center);let e=Xa.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Xa,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xa.copy(t.center).add(Uu)),this.expandByPoint(Xa.copy(t.center).sub(Uu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},M0=0,pi=new Se,Fu=new cn,Xs=new V,ti=new Wi,qa=new Wi,on=new V,Mn=class r extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=da(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(o0(t)?so:ro)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new te().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return pi.makeRotationFromQuaternion(t),this.applyMatrix4(pi),this}rotateX(t){return pi.makeRotationX(t),this.applyMatrix4(pi),this}rotateY(t){return pi.makeRotationY(t),this.applyMatrix4(pi),this}rotateZ(t){return pi.makeRotationZ(t),this.applyMatrix4(pi),this}translate(t,e,n){return pi.makeTranslation(t,e,n),this.applyMatrix4(pi),this}scale(t,e,n){return pi.makeScale(t,e,n),this.applyMatrix4(pi),this}lookAt(t){return Fu.lookAt(t),Fu.updateMatrix(),this.applyMatrix4(Fu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $e(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];ti.setFromBufferAttribute(s),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new or);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){let n=this.boundingSphere.center;if(ti.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];qa.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(ti.min,qa.min),ti.expandByPoint(on),on.addVectors(ti.max,qa.max),ti.expandByPoint(on)):(ti.expandByPoint(qa.min),ti.expandByPoint(qa.max))}ti.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)on.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(on));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)on.fromBufferAttribute(o,c),l&&(Xs.fromBufferAttribute(t,c),on.add(Xs)),i=Math.max(i,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new V,l[x]=new V;let c=new V,h=new V,d=new V,u=new bt,f=new bt,m=new bt,_=new V,p=new V;function g(x,T,C){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,C),u.fromBufferAttribute(s,x),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,C),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(D),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(D),o[x].add(_),o[T].add(_),o[C].add(_),l[x].add(p),l[T].add(p),l[C].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,T=b.length;x<T;++x){let C=b[x],D=C.start,L=C.count;for(let F=D,I=D+L;F<I;F+=3)g(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let A=new V,v=new V,S=new V,w=new V;function E(x){S.fromBufferAttribute(i,x),w.copy(S);let T=o[x];A.copy(T),A.sub(S.multiplyScalar(S.dot(T))).normalize(),v.crossVectors(w,T);let D=v.dot(l[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,D)}for(let x=0,T=b.length;x<T;++x){let C=b[x],D=C.start,L=C.count;for(let F=D,I=D+L;F<I;F+=3)E(t.getX(F+0)),E(t.getX(F+1)),E(t.getX(F+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new V,s=new V,a=new V,o=new V,l=new V,c=new V,h=new V,d=new V;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)on.fromBufferAttribute(t,e),on.normalize(),t.setXYZ(e,on.x,on.y,on.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let g=0;g<h;g++)u[m++]=c[f++]}return new Un(u,h,d)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ou=new V,b0=new V,T0=new te,Ci=class{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Ou.subVectors(n,e).cross(b0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(Ou),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||T0.getNormalMatrix(t),i=this.coplanarPoint(Ou).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},w0=0,Xi=class extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=da(),this.name="",this.type="Material",this.blending=ha,this.side=Fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cf,this.blendDst=hf,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_m,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$l,this.stencilZFail=$l,this.stencilZPass=$l,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ne().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ci().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new bt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var sr=new V,Bu=new V,Ll=new V,Dl=new V,ao=class{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=sr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sr.copy(this.origin).addScaledVector(this.direction,e),sr.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Bu.copy(t).add(e).multiplyScalar(.5),Ll.copy(e).sub(t).normalize(),Dl.copy(this.origin).sub(Bu);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Ll),o=Dl.dot(this.direction),l=-Dl.dot(Ll),c=Dl.lengthSq(),h=Math.abs(1-a*a),d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=s*h,d>=0)if(u>=-m)if(u<=m){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Bu).addScaledVector(Ll,u),f}intersectSphere(t,e){if(t.radius<0)return null;sr.subVectors(t.center,this.origin);let n=sr.dot(this.direction),i=sr.dot(sr)-n*n,s=t.radius*t.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,sr)!==null}intersectTriangle(t,e,n,i,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,m=e.x-a.x,_=e.y-a.y,p=e.z-a.z,g=n.x-a.x,b=n.y-a.y,A=n.z-a.z,v=Math.abs(l),S=Math.abs(c),w=Math.abs(h),E,x,T,C,D,L,F,I,z,H,k,Q;if(v>=S&&v>=w?(T=l,L=d,z=m,Q=g,l>=0?(E=c,x=h,C=u,D=f,F=_,I=p,H=b,k=A):(E=h,x=c,C=f,D=u,F=p,I=_,H=A,k=b)):S>=w?(T=c,L=u,z=_,Q=b,c>=0?(E=h,x=l,C=f,D=d,F=p,I=m,H=A,k=g):(E=l,x=h,C=d,D=f,F=m,I=p,H=g,k=A)):(T=h,L=f,z=p,Q=A,h>=0?(E=l,x=c,C=d,D=u,F=m,I=_,H=g,k=b):(E=c,x=l,C=u,D=d,F=_,I=m,H=b,k=g)),T===0)return null;let Y=E/T,P=x/T,$=1/T,wt=C-Y*L,Tt=D-P*L,Wt=F-Y*z,qt=I-P*z,$t=H-Y*Q,J=k-P*Q,et=$t*qt-J*Wt,pt=wt*J-Tt*$t,Gt=Wt*Tt-qt*wt;if(i){if(et<0||pt<0||Gt<0)return null}else if((et<0||pt<0||Gt<0)&&(et>0||pt>0||Gt>0))return null;let _t=et+pt+Gt;if(_t===0)return null;let Lt=$*(et*L+pt*z+Gt*Q);return(_t>0?Lt<0:Lt>0)?null:this.at(Lt/_t,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},oo=class extends Xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=Nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ep=new Se,es=new ao,Nl=new or,Ap=new V,Ul=new V,Fl=new V,Ol=new V,zu=new V,Bl=new V,Cp=new V,zl=new V,Ce=class extends cn{constructor(t=new Mn,e=new oo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){Bl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(zu.fromBufferAttribute(d,t),a?Bl.addScaledVector(zu,h):Bl.addScaledVector(zu.sub(e),h))}e.add(Bl)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nl.copy(n.boundingSphere),Nl.applyMatrix4(s),es.copy(t.ray).recast(t.near),!(Nl.containsPoint(es.origin)===!1&&(es.intersectSphere(Nl,Ap)===null||es.origin.distanceToSquared(Ap)>(t.far-t.near)**2))&&(Ep.copy(s).invert(),es.copy(t.ray).applyMatrix4(Ep),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,es)))}_computeIntersections(t,e,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],b=Math.max(p.start,f.start),A=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,S=A;v<S;v+=3){let w=o.getX(v),E=o.getX(v+1),x=o.getX(v+2);i=kl(this,g,t,n,c,h,d,w,E,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=o.getX(p),A=o.getX(p+1),v=o.getX(p+2);i=kl(this,a,t,n,c,h,d,b,A,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){let p=u[m],g=a[p.materialIndex],b=Math.max(p.start,f.start),A=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,S=A;v<S;v+=3){let w=v,E=v+1,x=v+2;i=kl(this,g,t,n,c,h,d,w,E,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=p,A=p+1,v=p+2;i=kl(this,a,t,n,c,h,d,b,A,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function E0(r,t,e,n,i,s,a,o){let l;if(t.side===pn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===Fr,o),l===null)return null;zl.copy(o),zl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(zl);return c<e.near||c>e.far?null:{distance:c,point:zl.clone(),object:r}}function kl(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Ul),r.getVertexPosition(l,Fl),r.getVertexPosition(c,Ol);let h=E0(r,t,e,n,Ul,Fl,Ol,Cp);if(h){let d=new V;Pr.getBarycoord(Cp,Ul,Fl,Ol,d),i&&(h.uv=Pr.getInterpolatedAttribute(i,o,l,c,d,new bt)),s&&(h.uv1=Pr.getInterpolatedAttribute(s,o,l,c,d,new bt)),a&&(h.normal=Pr.getInterpolatedAttribute(a,o,l,c,d,new V),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new V,materialIndex:0};Pr.getNormal(Ul,Fl,Ol,u.normal),h.face=u,h.barycoord=d}return h}var lo=class extends Fn{constructor(t=null,e=1,n=1,i,s,a,o,l,c=ln,h=ln,d,u){super(null,a,o,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var co=class extends Un{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},qs=new Se,Rp=new Se,Vl=[],Pp=new Wi,A0=new Se,Ya=new Ce,Za=new or,ho=class extends Ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new co(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,A0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qs),Pp.copy(t.boundingBox).applyMatrix4(qs),this.boundingBox.union(Pp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new or),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qs),Za.copy(t.boundingSphere).applyMatrix4(qs),this.boundingSphere.union(Za)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Ya.geometry=this.geometry,Ya.material=this.material,Ya.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Za.copy(this.boundingSphere),Za.applyMatrix4(n),t.ray.intersectsSphere(Za)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,qs),Rp.multiplyMatrices(n,qs),Ya.matrixWorld=Rp,Ya.raycast(t,Vl);for(let a=0,o=Vl.length;a<o;a++){let l=Vl[a];l.instanceId=s,l.object=this,e.push(l)}Vl.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new co(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new lo(new Float32Array(i*this.count),i,this.count,Vc,gi));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ns=new or,C0=new bt(.5,.5),Gl=new V,na=class{constructor(t=new Ci,e=new Ci,n=new Ci,i=new Ci,s=new Ci,a=new Ci){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ri,n=!1){let i=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],m=s[8],_=s[9],p=s[10],g=s[11],b=s[12],A=s[13],v=s[14],S=s[15];if(i[0].setComponents(c-a,f-h,g-m,S-b).normalize(),i[1].setComponents(c+a,f+h,g+m,S+b).normalize(),i[2].setComponents(c+o,f+d,g+_,S+A).normalize(),i[3].setComponents(c-o,f-d,g-_,S-A).normalize(),n)i[4].setComponents(l,u,p,v).normalize(),i[5].setComponents(c-l,f-u,g-p,S-v).normalize();else if(i[4].setComponents(c-l,f-u,g-p,S-v).normalize(),e===Ri)i[5].setComponents(c+l,f+u,g+p,S+v).normalize();else if(e===Qs)i[5].setComponents(l,u,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(t){ns.center.set(0,0,0);let e=C0.distanceTo(t.center);return ns.radius=.7071067811865476+e,ns.applyMatrix4(t.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Gl.x=i.normal.x>0?t.max.x:t.min.x,Gl.y=i.normal.y>0?t.max.y:t.min.y,Gl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Gl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ia=class extends Xi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ip=new Se,Ju=new ao,Hl=new or,Wl=new V,uo=class extends cn{constructor(t=new Mn,e=new ia){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(i),Hl.radius+=s,t.ray.intersectsSphere(Hl)===!1)return;Ip.copy(i).invert(),Ju.copy(t.ray).applyMatrix4(Ip);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,_=f;m<_;m++){let p=c.getX(m);Wl.fromBufferAttribute(d,p),Lp(Wl,p,l,i,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,_=f;m<_;m++)Wl.fromBufferAttribute(d,m),Lp(Wl,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Lp(r,t,e,n,i,s,a){let o=Ju.distanceSqToPoint(r);if(o<e){let l=new V;Ju.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var fo=class extends Fn{constructor(t=[],e=Or,n,i,s,a,o,l,c,h){super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},po=class extends Fn{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ir=class extends Fn{constructor(t,e,n=Ii,i,s,a,o=ln,l=ln,c,h=ki,d=1){if(h!==ki&&h!==zr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ta(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},uc=class extends Ir{constructor(t,e=Ii,n=Or,i,s,a=ln,o=ln,l,c=ki){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},mo=class extends Fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Lr=class r extends Mn{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,s,0),m("z","y","x",1,-1,n,e,-t,a,s,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(d,2));function m(_,p,g,b,A,v,S,w,E,x,T){let C=v/E,D=S/x,L=v/2,F=S/2,I=w/2,z=E+1,H=x+1,k=0,Q=0,Y=new V;for(let P=0;P<H;P++){let $=P*D-F;for(let wt=0;wt<z;wt++){let Tt=wt*C-L;Y[_]=Tt*b,Y[p]=$*A,Y[g]=I,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[p]=0,Y[g]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(wt/E),d.push(1-P/x),k+=1}}for(let P=0;P<x;P++)for(let $=0;$<E;$++){let wt=u+$+z*P,Tt=u+$+z*(P+1),Wt=u+($+1)+z*(P+1),qt=u+($+1)+z*P;l.push(wt,Tt,qt),l.push(Tt,Wt,qt),Q+=6}o.addGroup(f,Q,T),f+=Q,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var go=class r extends Mn{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let s=[],a=[],o=[],l=[],c=new V,h=new bt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new $e(a,3)),this.setAttribute("normal",new $e(o,3)),this.setAttribute("uv",new $e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.segments,t.thetaStart,t.thetaLength)}},_o=class r extends Mn{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],d=[],u=[],f=[],m=0,_=[],p=n/2,g=0;b(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new $e(d,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(f,2));function b(){let v=new V,S=new V,w=0,E=(e-t)/n;for(let x=0;x<=s;x++){let T=[],C=x/s,D=C*(e-t)+t;for(let L=0;L<=i;L++){let F=L/i,I=F*l+o,z=Math.sin(I),H=Math.cos(I);S.x=D*z,S.y=-C*n+p,S.z=D*H,d.push(S.x,S.y,S.z),v.set(z,E,H).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-C),T.push(m++)}_.push(T)}for(let x=0;x<i;x++)for(let T=0;T<s;T++){let C=_[T][x],D=_[T+1][x],L=_[T+1][x+1],F=_[T][x+1];(t>0||T!==0)&&(h.push(C,D,F),w+=3),(e>0||T!==s-1)&&(h.push(D,L,F),w+=3)}c.addGroup(g,w,0),g+=w}function A(v){let S=m,w=new bt,E=new V,x=0,T=v===!0?t:e,C=v===!0?1:-1;for(let L=1;L<=i;L++)d.push(0,p*C,0),u.push(0,C,0),f.push(.5,.5),m++;let D=m;for(let L=0;L<=i;L++){let I=L/i*l+o,z=Math.cos(I),H=Math.sin(I);E.x=T*H,E.y=p*C,E.z=T*z,d.push(E.x,E.y,E.z),u.push(0,C,0),w.x=z*.5+.5,w.y=H*.5*C+.5,f.push(w.x,w.y),m++}for(let L=0;L<i;L++){let F=S+L,I=D+L;v===!0?h.push(I,I+1,F):h.push(I+1,I,F),x+=3}c.addGroup(g,x,v===!0?1:2),g+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ei=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,s=n.length,a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new bt:new V);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new V,i=[],s=[],a=[],o=new V,l=new Se;for(let f=0;f<=t;f++){let m=f/t;i[f]=this.getTangentAt(m,new V)}s[0]=new V,a[0]=new V;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(ce(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(ce(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ra=class extends ei{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new bt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},fc=class extends ra{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ef(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(s){let a=s*s,o=a*s;return r+t*s+e*a+n*o}}}var Dp=new V,Np=new V,ku=new Ef,Vu=new Ef,Gu=new Ef,dc=class extends ei{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new V){let n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(Np.subVectors(i[0],i[1]).add(i[0]),c=Np);let d=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Dp.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Dp),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),ku.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,_,p),Vu.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,_,p),Gu.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(ku.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Vu.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Gu.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ku.calc(l),Vu.calc(l),Gu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new V().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Up(r,t,e,n,i){let s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function R0(r,t){let e=1-r;return e*e*t}function P0(r,t){return 2*(1-r)*r*t}function I0(r,t){return r*r*t}function $a(r,t,e,n){return R0(r,t)+P0(r,e)+I0(r,n)}function L0(r,t){let e=1-r;return e*e*e*t}function D0(r,t){let e=1-r;return 3*e*e*r*t}function N0(r,t){return 3*(1-r)*r*r*t}function U0(r,t){return r*r*r*t}function Ka(r,t,e,n,i){return L0(r,t)+D0(r,e)+N0(r,n)+U0(r,i)}var xo=class extends ei{constructor(t=new bt,e=new bt,n=new bt,i=new bt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new bt){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ka(t,i.x,s.x,a.x,o.x),Ka(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pc=class extends ei{constructor(t=new V,e=new V,n=new V,i=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new V){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ka(t,i.x,s.x,a.x,o.x),Ka(t,i.y,s.y,a.y,o.y),Ka(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},vo=class extends ei{constructor(t=new bt,e=new bt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mc=class extends ei{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yo=class extends ei{constructor(t=new bt,e=new bt,n=new bt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new bt){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set($a(t,i.x,s.x,a.x),$a(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gc=class extends ei{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set($a(t,i.x,s.x,a.x),$a(t,i.y,s.y,a.y),$a(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},So=class extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bt){let n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Up(o,l.x,c.x,h.x,d.x),Up(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new bt().fromArray(i))}return this}},$u=Object.freeze({__proto__:null,ArcCurve:fc,CatmullRomCurve3:dc,CubicBezierCurve:xo,CubicBezierCurve3:pc,EllipseCurve:ra,LineCurve:vo,LineCurve3:mc,QuadraticBezierCurve:yo,QuadraticBezierCurve3:gc,SplineCurve:So}),_c=class extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $u[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new $u[i.type]().fromJSON(i))}return this}},as=class extends _c{constructor(t){super(),this.type="Path",this.currentPoint=new bt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new vo(this.currentPoint.clone(),new bt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new yo(this.currentPoint.clone(),new bt(t,e),new bt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){let o=new xo(this.currentPoint.clone(),new bt(t,e),new bt(n,i),new bt(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new So(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,a,o,l),this}absellipse(t,e,n,i,s,a,o,l){let c=new ra(t,e,n,i,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sa=class extends as{constructor(t){super(t),this.uuid=da(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new as().fromJSON(i))}return this}};function F0(r,t,e=2){let n=t&&t.length,i=n?t[0]*e:r.length,s=Pm(r,0,i,e,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=V0(r,t,s,e)),r.length>80*e){o=r[0],l=r[1];let h=o,d=l;for(let u=e;u<i;u+=e){let f=r[u],m=r[u+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Mo(s,a,e,o,l,c,0),a}function Pm(r,t,e,n,i){let s;if(i===Q0(r,t,e,n)>0)for(let a=t;a<e;a+=n)s=Fp(a/n|0,r[a],r[a+1],s);else for(let a=e-n;a>=t;a-=n)s=Fp(a/n|0,r[a],r[a+1],s);return s&&aa(s,s.next)&&(To(s),s=s.next),s}function os(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(aa(e,e.next)||Ue(e.prev,e,e.next)===0)){if(To(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Mo(r,t,e,n,i,s,a){if(!r)return;!a&&s&&q0(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?B0(r,n,i,s):O0(r)){t.push(l.i,r.i,c.i),To(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=z0(os(r),t),Mo(r,t,e,n,i,s,2)):a===2&&k0(r,t,e,n,i,s):Mo(os(r),t,e,n,i,s,1);break}}}function O0(r){let t=r.prev,e=r,n=r.next;if(Ue(t,e,n)>=0)return!1;let i=t.x,s=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,s,a),d=Math.min(o,l,c),u=Math.max(i,s,a),f=Math.max(o,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Ja(i,o,s,l,a,c,m.x,m.y)&&Ue(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function B0(r,t,e,n){let i=r.prev,s=r,a=r.next;if(Ue(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,d=s.y,u=a.y,f=Math.min(o,l,c),m=Math.min(h,d,u),_=Math.max(o,l,c),p=Math.max(h,d,u),g=Ku(f,m,t,e,n),b=Ku(_,p,t,e,n),A=r.prevZ,v=r.nextZ;for(;A&&A.z>=g&&v&&v.z<=b;){if(A.x>=f&&A.x<=_&&A.y>=m&&A.y<=p&&A!==i&&A!==a&&Ja(o,h,l,d,c,u,A.x,A.y)&&Ue(A.prev,A,A.next)>=0||(A=A.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==i&&v!==a&&Ja(o,h,l,d,c,u,v.x,v.y)&&Ue(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;A&&A.z>=g;){if(A.x>=f&&A.x<=_&&A.y>=m&&A.y<=p&&A!==i&&A!==a&&Ja(o,h,l,d,c,u,A.x,A.y)&&Ue(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==i&&v!==a&&Ja(o,h,l,d,c,u,v.x,v.y)&&Ue(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function z0(r,t){let e=r;do{let n=e.prev,i=e.next.next;!aa(n,i)&&Lm(n,e,e.next,i)&&bo(n,i)&&bo(i,n)&&(t.push(n.i,e.i,i.i),To(e),To(e.next),e=r=i),e=e.next}while(e!==r);return os(e)}function k0(r,t,e,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&J0(a,o)){let l=Dm(a,o);a=os(a,a.next),l=os(l,l.next),Mo(a,t,e,n,i,s,0),Mo(l,t,e,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function V0(r,t,e,n){let i=[];for(let s=0,a=t.length;s<a;s++){let o=t[s]*n,l=s<a-1?t[s+1]*n:r.length,c=Pm(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Z0(c))}i.sort(G0);for(let s=0;s<i.length;s++)e=H0(i[s],e);return e}function G0(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){let n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function H0(r,t){let e=W0(r,t);if(!e)return t;let n=Dm(e,r);return os(n,n.next),os(e,e.next)}function W0(r,t){let e=t,n=r.x,i=r.y,s=-1/0,a;if(aa(r,e))return e;do{if(aa(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>s&&(s=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Im(i<c?n:s,i,l,c,i<c?s:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);bo(e,r)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&X0(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function X0(r,t){return Ue(r.prev,r,t.prev)<0&&Ue(t.next,r,r.next)<0}function q0(r,t,e,n){let i=r;do i.z===0&&(i.z=Ku(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Y0(i)}function Y0(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,e*=2}while(t>1);return r}function Ku(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function Z0(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Im(r,t,e,n,i,s,a,o){return(i-a)*(t-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(i-a)*(n-o)}function Ja(r,t,e,n,i,s,a,o){return!(r===a&&t===o)&&Im(r,t,e,n,i,s,a,o)}function J0(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!$0(r,t)&&(bo(r,t)&&bo(t,r)&&K0(r,t)&&(Ue(r.prev,r,t.prev)||Ue(r,t.prev,t))||aa(r,t)&&Ue(r.prev,r,r.next)>0&&Ue(t.prev,t,t.next)>0)}function Ue(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function aa(r,t){return r.x===t.x&&r.y===t.y}function Lm(r,t,e,n){let i=ql(Ue(r,t,e)),s=ql(Ue(r,t,n)),a=ql(Ue(e,n,r)),o=ql(Ue(e,n,t));return!!(i!==s&&a!==o||i===0&&Xl(r,e,t)||s===0&&Xl(r,n,t)||a===0&&Xl(e,r,n)||o===0&&Xl(e,t,n))}function Xl(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function ql(r){return r>0?1:r<0?-1:0}function $0(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Lm(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function bo(r,t){return Ue(r.prev,r,r.next)<0?Ue(r,t,r.next)>=0&&Ue(r,r.prev,t)>=0:Ue(r,t,r.prev)<0||Ue(r,r.next,t)<0}function K0(r,t){let e=r,n=!1,i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Dm(r,t){let e=Qu(r.i,r.x,r.y),n=Qu(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Fp(r,t,e,n){let i=Qu(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function To(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Qu(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Q0(r,t,e,n){let i=0;for(let s=t,a=e-n;s<e;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var ju=class{static triangulate(t,e,n=2){return F0(t,e,n)}},is=class r{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return r.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];Op(t),Bp(n,t);let a=t.length;e.forEach(Op);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Bp(n,e[l]);let o=ju.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Op(r){let t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Bp(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}var wo=class r extends Mn{constructor(t=new sa([new bt(.5,.5),new bt(-.5,.5),new bt(-.5,-.5),new bt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],s=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new $e(i,3)),this.setAttribute("uv",new $e(s,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:j0,A,v=!1,S,w,E,x;if(g){A=g.getSpacedPoints(h),v=!0,u=!1;let j=g.isCatmullRomCurve3?g.closed:!1;S=g.computeFrenetFrames(h,j),w=new V,E=new V,x=new V}u||(p=0,f=0,m=0,_=0);let T=o.extractPoints(c),C=T.shape,D=T.holes;if(!is.isClockWise(C)){C=C.reverse();for(let j=0,rt=D.length;j<rt;j++){let ot=D[j];is.isClockWise(ot)&&(D[j]=ot.reverse())}}function F(j){let ot=10000000000000001e-36,N=j[0];for(let ft=1;ft<=j.length;ft++){let zt=ft%j.length,Ut=j[zt],Ct=Ut.x-N.x,Zt=Ut.y-N.y,U=Ct*Ct+Zt*Zt,oe=Math.max(Math.abs(Ut.x),Math.abs(Ut.y),Math.abs(N.x),Math.abs(N.y)),Xt=ot*oe*oe;if(U<=Xt){j.splice(zt,1),ft--;continue}N=Ut}}F(C),D.forEach(F);let I=D.length,z=C;for(let j=0;j<I;j++){let rt=D[j];C=C.concat(rt)}function H(j,rt,ot){return rt||Qt("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(rt,ot)}let k=C.length;function Q(j,rt,ot){let N,ft,zt,Ut=j.x-rt.x,Ct=j.y-rt.y,Zt=ot.x-j.x,U=ot.y-j.y,oe=Ut*Ut+Ct*Ct,Xt=Ut*U-Ct*Zt;if(Math.abs(Xt)>Number.EPSILON){let R=Math.sqrt(oe),y=Math.sqrt(Zt*Zt+U*U),G=rt.x-Ct/R,W=rt.y+Ut/R,K=ot.x-U/y,dt=ot.y+Zt/y,ct=((K-G)*U-(dt-W)*Zt)/(Ut*U-Ct*Zt);N=G+Ut*ct-j.x,ft=W+Ct*ct-j.y;let tt=N*N+ft*ft;if(tt<=2)return new bt(N,ft);zt=Math.sqrt(tt/2)}else{let R=!1;Ut>Number.EPSILON?Zt>Number.EPSILON&&(R=!0):Ut<-Number.EPSILON?Zt<-Number.EPSILON&&(R=!0):Math.sign(Ct)===Math.sign(U)&&(R=!0),R?(N=-Ct,ft=Ut,zt=Math.sqrt(oe)):(N=Ut,ft=Ct,zt=Math.sqrt(oe/2))}return new bt(N/zt,ft/zt)}let Y=[];for(let j=0,rt=z.length,ot=rt-1,N=j+1;j<rt;j++,ot++,N++)ot===rt&&(ot=0),N===rt&&(N=0),Y[j]=Q(z[j],z[ot],z[N]);let P=[],$,wt=Y.concat();for(let j=0,rt=I;j<rt;j++){let ot=D[j];$=[];for(let N=0,ft=ot.length,zt=ft-1,Ut=N+1;N<ft;N++,zt++,Ut++)zt===ft&&(zt=0),Ut===ft&&(Ut=0),$[N]=Q(ot[N],ot[zt],ot[Ut]);P.push($),wt=wt.concat($)}let Tt;if(p===0)Tt=is.triangulateShape(z,D);else{let j=[],rt=[];for(let ot=0;ot<p;ot++){let N=ot/p,ft=f*Math.cos(N*Math.PI/2),zt=m*Math.sin(N*Math.PI/2)+_;for(let Ut=0,Ct=z.length;Ut<Ct;Ut++){let Zt=H(z[Ut],Y[Ut],zt);pt(Zt.x,Zt.y,-ft),N===0&&j.push(Zt)}for(let Ut=0,Ct=I;Ut<Ct;Ut++){let Zt=D[Ut];$=P[Ut];let U=[];for(let oe=0,Xt=Zt.length;oe<Xt;oe++){let R=H(Zt[oe],$[oe],zt);pt(R.x,R.y,-ft),N===0&&U.push(R)}N===0&&rt.push(U)}}Tt=is.triangulateShape(j,rt)}let Wt=Tt.length,qt=m+_;for(let j=0;j<k;j++){let rt=u?H(C[j],wt[j],qt):C[j];v?(E.copy(S.normals[0]).multiplyScalar(rt.x),w.copy(S.binormals[0]).multiplyScalar(rt.y),x.copy(A[0]).add(E).add(w),pt(x.x,x.y,x.z)):pt(rt.x,rt.y,0)}for(let j=1;j<=h;j++)for(let rt=0;rt<k;rt++){let ot=u?H(C[rt],wt[rt],qt):C[rt];v?(E.copy(S.normals[j]).multiplyScalar(ot.x),w.copy(S.binormals[j]).multiplyScalar(ot.y),x.copy(A[j]).add(E).add(w),pt(x.x,x.y,x.z)):pt(ot.x,ot.y,d/h*j)}for(let j=p-1;j>=0;j--){let rt=j/p,ot=f*Math.cos(rt*Math.PI/2),N=m*Math.sin(rt*Math.PI/2)+_;for(let ft=0,zt=z.length;ft<zt;ft++){let Ut=H(z[ft],Y[ft],N);pt(Ut.x,Ut.y,d+ot)}for(let ft=0,zt=D.length;ft<zt;ft++){let Ut=D[ft];$=P[ft];for(let Ct=0,Zt=Ut.length;Ct<Zt;Ct++){let U=H(Ut[Ct],$[Ct],N);v?pt(U.x,U.y+A[h-1].y,A[h-1].x+ot):pt(U.x,U.y,d+ot)}}}$t(),J();function $t(){let j=i.length/3;if(u){let rt=0,ot=k*rt;for(let N=0;N<Wt;N++){let ft=Tt[N];Gt(ft[2]+ot,ft[1]+ot,ft[0]+ot)}rt=h+p*2,ot=k*rt;for(let N=0;N<Wt;N++){let ft=Tt[N];Gt(ft[0]+ot,ft[1]+ot,ft[2]+ot)}}else{for(let rt=0;rt<Wt;rt++){let ot=Tt[rt];Gt(ot[2],ot[1],ot[0])}for(let rt=0;rt<Wt;rt++){let ot=Tt[rt];Gt(ot[0]+k*h,ot[1]+k*h,ot[2]+k*h)}}n.addGroup(j,i.length/3-j,0)}function J(){let j=i.length/3,rt=0;et(z,rt),rt+=z.length;for(let ot=0,N=D.length;ot<N;ot++){let ft=D[ot];et(ft,rt),rt+=ft.length}n.addGroup(j,i.length/3-j,1)}function et(j,rt){let ot=j.length;for(;--ot>=0;){let N=ot,ft=ot-1;ft<0&&(ft=j.length-1);for(let zt=0,Ut=h+p*2;zt<Ut;zt++){let Ct=k*zt,Zt=k*(zt+1),U=rt+N+Ct,oe=rt+ft+Ct,Xt=rt+ft+Zt,R=rt+N+Zt;_t(U,oe,Xt,R)}}}function pt(j,rt,ot){l.push(j),l.push(rt),l.push(ot)}function Gt(j,rt,ot){Lt(j),Lt(rt),Lt(ot);let N=i.length/3,ft=b.generateTopUV(n,i,N-3,N-2,N-1);Nt(ft[0]),Nt(ft[1]),Nt(ft[2])}function _t(j,rt,ot,N){Lt(j),Lt(rt),Lt(N),Lt(rt),Lt(ot),Lt(N);let ft=i.length/3,zt=b.generateSideWallUV(n,i,ft-6,ft-3,ft-2,ft-1);Nt(zt[0]),Nt(zt[1]),Nt(zt[3]),Nt(zt[1]),Nt(zt[2]),Nt(zt[3])}function Lt(j){i.push(l[j*3+0]),i.push(l[j*3+1]),i.push(l[j*3+2])}function Nt(j){s.push(j.x),s.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return tx(e,n,t)}static fromJSON(t,e){let n=[];for(let s=0,a=t.shapes.length;s<a;s++){let o=e[t.shapes[s]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new $u[i.type]().fromJSON(i)),new r(n,t.options)}},j0={generateTopUV:function(r,t,e,n,i){let s=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new bt(s,a),new bt(o,l),new bt(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],m=t[i*3+2],_=t[s*3],p=t[s*3+1],g=t[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new bt(a,1-l),new bt(c,1-d),new bt(u,1-m),new bt(_,1-g)]:[new bt(o,1-l),new bt(h,1-d),new bt(f,1-m),new bt(p,1-g)]}};function tx(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Eo=class r extends Mn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],_=[],p=[];for(let g=0;g<h;g++){let b=g*u-a;for(let A=0;A<c;A++){let v=A*d-s;m.push(v,-b,0),_.push(0,0,1),p.push(A/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<o;b++){let A=b+c*g,v=b+c*(g+1),S=b+1+c*(g+1),w=b+1+c*g;f.push(A,v,w),f.push(v,S,w)}this.setIndex(f),this.setAttribute("position",new $e(m,3)),this.setAttribute("normal",new $e(_,3)),this.setAttribute("uv",new $e(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};function us(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];if(zp(i))i.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(zp(i[0])){let s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function bn(r){let t={};for(let e=0;e<r.length;e++){let n=us(r[e]);for(let i in n)t[i]=n[i]}return t}function zp(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ex(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Af(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}var Nm={clone:us,merge:bn},nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ni=class extends Xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nx,this.fragmentShader=ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=ex(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ne().setHex(i.value);break;case"v2":this.uniforms[n].value=new bt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new V().fromArray(i.value);break;case"v4":this.uniforms[n].value=new De().fromArray(i.value);break;case"m3":this.uniforms[n].value=new te().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Se().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},xc=class extends ni{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},lr=class extends Xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ho,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ls=class extends lr{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new bt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ce(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Ao=class extends Xi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ho,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=Nc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},vc=class extends Xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},yc=class extends Xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ys(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Hu(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Dr=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Sc=class extends Dr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qu,endingEnd:qu}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yu:s=t,o=2*e-n;break;case Zu:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Yu:a=t,l=2*n-e;break;case Zu:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-u*p+2*u*_-u*m,b=(1+u)*p+(-1.5-2*u)*_+(-.5+u)*m+1,A=(-1-f)*p+(1.5+f)*_+.5*m,v=f*p-f*_;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+b*a[c+S]+A*a[l+S]+v*a[d+S];return s}},Mc=class extends Dr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},bc=class extends Dr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Tc=class extends Dr{interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-e)/(i-e),_=1-m;for(let p=0;p!==o;++p)s[p]=a[c+p]*_+a[l+p]*m;return s}let u=o*2,f=t-1;for(let m=0;m!==o;++m){let _=a[c+m],p=a[l+m],g=f*u+m*2,b=d[g],A=d[g+1],v=t*u+m*2,S=h[v],w=h[v+1],E=sx(n,e,b,S,i);s[m]=Um(E,_,A,w,p)}return s}};function Um(r,t,e,n,i){let s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*n+r*r*r*i}function rx(r,t,e,n,i){let s=1-r;return 3*s*s*(e-t)+6*s*r*(n-e)+3*r*r*(i-n)}function sx(r,t,e,n,i){let s=(r-t)/(i-t);for(let a=0;a<8;a++){let o=Um(s,t,e,n,i)-r;if(Math.abs(o)<1e-10)break;let l=rx(s,t,e,n,i);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var ii=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ys(e,this.TimeBufferType),this.values=Ys(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ys(t.times,Array),values:Ys(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Hu(t.settings)&&(n.settings={inTangents:Ys(t.settings.inTangents,Array),outTangents:Ys(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new bc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Sc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Tc(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Qa:e=this.InterpolantFactoryMethodDiscrete;break;case ac:e=this.InterpolantFactoryMethodLinear;break;case Jl:e=this.InterpolantFactoryMethodSmooth;break;case Xu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Kt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qa;case this.InterpolantFactoryMethodLinear:return ac;case this.InterpolantFactoryMethodSmooth:return Jl;case this.InterpolantFactoryMethodBezier:return Xu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Hu(this.settings)&&(kp(this.settings.inTangents,t),kp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(Qt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Qt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Qt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&l0(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Qt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Jl,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[u+m]||_!==e[f+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Hu(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function kp(r,t){for(let e=0,n=r.length;e!==n;e+=2)r[e]*=t}ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=ac;var Nr=class extends ii{constructor(t,e,n){super(t,e,n)}};Nr.prototype.ValueTypeName="bool";Nr.prototype.ValueBufferType=Array;Nr.prototype.DefaultInterpolation=Qa;Nr.prototype.InterpolantFactoryMethodLinear=void 0;Nr.prototype.InterpolantFactoryMethodSmooth=void 0;var wc=class extends ii{constructor(t,e,n,i){super(t,e,n,i)}};wc.prototype.ValueTypeName="color";var Ec=class extends ii{constructor(t,e,n,i){super(t,e,n,i)}};Ec.prototype.ValueTypeName="number";var Ac=class extends Dr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)Gi.slerpFlat(s,0,a,c-o,a,c,l);return s}},Co=class extends ii{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Ac(this.times,this.values,this.getValueSize(),t)}};Co.prototype.ValueTypeName="quaternion";Co.prototype.InterpolantFactoryMethodSmooth=void 0;var Ur=class extends ii{constructor(t,e,n){super(t,e,n)}};Ur.prototype.ValueTypeName="string";Ur.prototype.ValueBufferType=Array;Ur.prototype.DefaultInterpolation=Qa;Ur.prototype.InterpolantFactoryMethodLinear=void 0;Ur.prototype.InterpolantFactoryMethodSmooth=void 0;var Cc=class extends ii{constructor(t,e,n,i){super(t,e,n,i)}};Cc.prototype.ValueTypeName="vector";var Rc=class{constructor(t,e,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fm=new Rc,Pc=class{constructor(t){this.manager=t!==void 0?t:Fm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Pc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ro=class extends cn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var Wu=new Se,Vp=new V,Gp=new V,Po=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new na,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Vp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vp),Gp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Wu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Wu,t.coordinateSystem,t.reversedDepth);let s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,l=i?i.x/s.x:0,c=i?i.y/s.y:0;t.coordinateSystem===Qs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Wu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Yl=new V,Zl=new Gi,Oi=new V,Io=class extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=Ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Yl,Zl,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,Zl,Oi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Yl,Zl,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,Zl,Oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Rr=new V,Hp=new bt,Wp=new bt,fn=class extends Io{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=oc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(vu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return oc*2*Math.atan(Math.tan(vu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rr.x,Rr.y).multiplyScalar(-t/Rr.z),Rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rr.x,Rr.y).multiplyScalar(-t/Rr.z)}getViewSize(t,e){return this.getViewBounds(t,Hp,Wp),e.subVectors(Wp,Hp)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(vu*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var tf=class extends Po{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0}},Lo=class extends Ro{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new tf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},oa=class extends Io{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ef=class extends Po{constructor(){super(new oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},la=class extends Ro{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new ef}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Zs=-90,Js=1,Ic=class extends cn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new fn(Zs,Js,t,e);i.layers=this.layers,this.add(i);let s=new fn(Zs,Js,t,e);s.layers=this.layers,this.add(s);let a=new fn(Zs,Js,t,e);a.layers=this.layers,this.add(a);let o=new fn(Zs,Js,t,e);o.layers=this.layers,this.add(o);let l=new fn(Zs,Js,t,e);l.layers=this.layers,this.add(l);let c=new fn(Zs,Js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Lc=class extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Cf="\\[\\]\\.:\\/",ax=new RegExp("["+Cf+"]","g"),Rf="[^"+Cf+"]",ox="[^"+Cf.replace("\\.","")+"]",lx=/((?:WC+[\/:])*)/.source.replace("WC",Rf),cx=/(WCOD+)?/.source.replace("WCOD",ox),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rf),ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rf),fx=new RegExp("^"+lx+cx+hx+ux+"$"),dx=["material","materials","bones","map"],nf=class{constructor(t,e,n){let i=n||Le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Le=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(ax,"")}static parseTrackName(t){let e=fx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);dx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Qt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Le.Composite=nf;Le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Le.prototype.GetterByBindingType=[Le.prototype._getValue_direct,Le.prototype._getValue_array,Le.prototype._getValue_arrayElement,Le.prototype._getValue_toArray];Le.prototype.SetterByBindingTypeAndVersioning=[[Le.prototype._setValue_direct,Le.prototype._setValue_direct_setNeedsUpdate,Le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_array,Le.prototype._setValue_array_setNeedsUpdate,Le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_arrayElement,Le.prototype._setValue_arrayElement_setNeedsUpdate,Le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_fromArray,Le.prototype._setValue_fromArray_setNeedsUpdate,Le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var m1=new Float32Array(1);var Uf=class Uf{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}};Uf.prototype.isMatrix2=!0;var rf=Uf;function Pf(r,t,e,n){let i=px(n);switch(e){case Mf:return r*t;case Vc:return r*t/i.components*i.byteLength;case Gc:return r*t/i.components*i.byteLength;case kr:return r*t*2/i.components*i.byteLength;case Hc:return r*t*2/i.components*i.byteLength;case bf:return r*t*3/i.components*i.byteLength;case _i:return r*t*4/i.components*i.byteLength;case Wc:return r*t*4/i.components*i.byteLength;case Oo:case Bo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case zo:case ko:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qc:case Zc:return Math.max(r,16)*Math.max(t,8)/4;case Xc:case Yc:return Math.max(r,8)*Math.max(t,8)/2;case Jc:case $c:case Qc:case jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Kc:case Vo:case th:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case eh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case nh:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ih:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case rh:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case sh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ah:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case oh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case lh:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case ch:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case hh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case uh:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case fh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case dh:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ph:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case mh:case gh:case _h:return Math.ceil(r/4)*Math.ceil(t/4)*16;case xh:case vh:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Go:case yh:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function px(r){switch(r){case Yn:case xf:return{byteLength:1,components:1};case ua:case vf:case Li:return{byteLength:2,components:1};case zc:case kc:return{byteLength:2,components:4};case Ii:case Bc:case gi:return{byteLength:4,components:1};case yf:case Sf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function rg(){let r=null,t=!1,e=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),e(s,a)}return{start:function(){t!==!0&&e!==null&&r!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function gx(r){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var _x=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Tx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ax=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Px=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ix=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,kx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ev=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,av=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ov=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,cv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,hv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_v=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,yv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ev=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Av=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,kv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Vv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Yv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$v=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ty=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ey=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ny=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,iy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ry=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ay=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,oy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ly=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,my=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_y=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,My=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,by=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ty=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ey=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ry=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ny=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,By=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ky=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$y=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:_x,alphahash_pars_fragment:xx,alphamap_fragment:vx,alphamap_pars_fragment:yx,alphatest_fragment:Sx,alphatest_pars_fragment:Mx,aomap_fragment:bx,aomap_pars_fragment:Tx,batching_pars_vertex:wx,batching_vertex:Ex,begin_vertex:Ax,beginnormal_vertex:Cx,bsdfs:Rx,iridescence_fragment:Px,bumpmap_pars_fragment:Ix,clipping_planes_fragment:Lx,clipping_planes_pars_fragment:Dx,clipping_planes_pars_vertex:Nx,clipping_planes_vertex:Ux,color_fragment:Fx,color_pars_fragment:Ox,color_pars_vertex:Bx,color_vertex:zx,common:kx,cube_uv_reflection_fragment:Vx,defaultnormal_vertex:Gx,displacementmap_pars_vertex:Hx,displacementmap_vertex:Wx,emissivemap_fragment:Xx,emissivemap_pars_fragment:qx,colorspace_fragment:Yx,colorspace_pars_fragment:Zx,envmap_fragment:Jx,envmap_common_pars_fragment:$x,envmap_pars_fragment:Kx,envmap_pars_vertex:Qx,envmap_physical_pars_fragment:cv,envmap_vertex:jx,fog_vertex:tv,fog_pars_vertex:ev,fog_fragment:nv,fog_pars_fragment:iv,gradientmap_pars_fragment:rv,lightmap_pars_fragment:sv,lights_lambert_fragment:av,lights_lambert_pars_fragment:ov,lights_pars_begin:lv,lights_toon_fragment:hv,lights_toon_pars_fragment:uv,lights_phong_fragment:fv,lights_phong_pars_fragment:dv,lights_physical_fragment:pv,lights_physical_pars_fragment:mv,lights_fragment_begin:gv,lights_fragment_maps:_v,lights_fragment_end:xv,lightprobes_pars_fragment:vv,logdepthbuf_fragment:yv,logdepthbuf_pars_fragment:Sv,logdepthbuf_pars_vertex:Mv,logdepthbuf_vertex:bv,map_fragment:Tv,map_pars_fragment:wv,map_particle_fragment:Ev,map_particle_pars_fragment:Av,metalnessmap_fragment:Cv,metalnessmap_pars_fragment:Rv,morphinstance_vertex:Pv,morphcolor_vertex:Iv,morphnormal_vertex:Lv,morphtarget_pars_vertex:Dv,morphtarget_vertex:Nv,normal_fragment_begin:Uv,normal_fragment_maps:Fv,normal_pars_fragment:Ov,normal_pars_vertex:Bv,normal_vertex:zv,normalmap_pars_fragment:kv,clearcoat_normal_fragment_begin:Vv,clearcoat_normal_fragment_maps:Gv,clearcoat_pars_fragment:Hv,iridescence_pars_fragment:Wv,opaque_fragment:Xv,packing:qv,premultiplied_alpha_fragment:Yv,project_vertex:Zv,dithering_fragment:Jv,dithering_pars_fragment:$v,roughnessmap_fragment:Kv,roughnessmap_pars_fragment:Qv,shadowmap_pars_fragment:jv,shadowmap_pars_vertex:ty,shadowmap_vertex:ey,shadowmask_pars_fragment:ny,skinbase_vertex:iy,skinning_pars_vertex:ry,skinning_vertex:sy,skinnormal_vertex:ay,specularmap_fragment:oy,specularmap_pars_fragment:ly,tonemapping_fragment:cy,tonemapping_pars_fragment:hy,transmission_fragment:uy,transmission_pars_fragment:fy,uv_pars_fragment:dy,uv_pars_vertex:py,uv_vertex:my,worldpos_vertex:gy,background_vert:_y,background_frag:xy,backgroundCube_vert:vy,backgroundCube_frag:yy,cube_vert:Sy,cube_frag:My,depth_vert:by,depth_frag:Ty,distance_vert:wy,distance_frag:Ey,equirect_vert:Ay,equirect_frag:Cy,linedashed_vert:Ry,linedashed_frag:Py,meshbasic_vert:Iy,meshbasic_frag:Ly,meshlambert_vert:Dy,meshlambert_frag:Ny,meshmatcap_vert:Uy,meshmatcap_frag:Fy,meshnormal_vert:Oy,meshnormal_frag:By,meshphong_vert:zy,meshphong_frag:ky,meshphysical_vert:Vy,meshphysical_frag:Gy,meshtoon_vert:Hy,meshtoon_frag:Wy,points_vert:Xy,points_frag:qy,shadow_vert:Yy,shadow_frag:Zy,sprite_vert:Jy,sprite_frag:$y},Et={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Zi={basic:{uniforms:bn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:bn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new ne(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:bn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:bn([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:bn([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new ne(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:bn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:bn([Et.points,Et.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:bn([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:bn([Et.common,Et.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:bn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:bn([Et.sprite,Et.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:bn([Et.common,Et.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:bn([Et.lights,Et.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};Zi.physical={uniforms:bn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var bh={r:0,b:0,g:0},Ky=new Se,sg=new te;sg.set(-1,0,0,0,1,0,0,0,1);function Qy(r,t,e,n,i,s){let a=new ne(0),o=i===!0?0:1,l,c,h=null,d=0,u=null;function f(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){let v=b.backgroundBlurriness>0;A=t.get(A,v)}return A}function m(b){let A=!1,v=f(b);v===null?p(a,o):v&&v.isColor&&(p(v,1),A=!0);let S=r.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(b,A){let v=f(A);v&&(v.isCubeTexture||v.mapping===Uo)?(c===void 0&&(c=new Ce(new Lr(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:us(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ky.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(sg),c.material.toneMapped=fe.getTransfer(v.colorSpace)!==_e,(h!==v||d!==v.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ce(new Eo(2,2),new ni({name:"BackgroundMaterial",uniforms:us(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:Fr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=fe.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,A){b.getRGB(bh,Af(r)),e.buffers.color.setClear(bh.r,bh.g,bh.b,A,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,A=1){a.set(b),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,p(a,o)},render:m,addToRenderList:_,dispose:g}}function jy(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,a=!1;function o(D,L,F,I,z){let H=!1,k=d(D,I,F,L);s!==k&&(s=k,c(s.object)),H=f(D,I,F,z),H&&m(D,I,F,z),z!==null&&t.update(z,r.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,v(D,L,F,I),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return r.createVertexArray()}function c(D){return r.bindVertexArray(D)}function h(D){return r.deleteVertexArray(D)}function d(D,L,F,I){let z=I.wireframe===!0,H=n[L.id];H===void 0&&(H={},n[L.id]=H);let k=D.isInstancedMesh===!0?D.id:0,Q=H[k];Q===void 0&&(Q={},H[k]=Q);let Y=Q[F.id];Y===void 0&&(Y={},Q[F.id]=Y);let P=Y[z];return P===void 0&&(P=u(l()),Y[z]=P),P}function u(D){let L=[],F=[],I=[];for(let z=0;z<e;z++)L[z]=0,F[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:I,object:D,attributes:{},index:null}}function f(D,L,F,I){let z=s.attributes,H=L.attributes,k=0,Q=F.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let $=z[Y],wt=H[Y];if(wt===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(wt=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(wt=D.instanceColor)),$===void 0||$.attribute!==wt||wt&&$.data!==wt.data)return!0;k++}return s.attributesNum!==k||s.index!==I}function m(D,L,F,I){let z={},H=L.attributes,k=0,Q=F.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let $=H[Y];$===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&($=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&($=D.instanceColor));let wt={};wt.attribute=$,$&&$.data&&(wt.data=$.data),z[Y]=wt,k++}s.attributes=z,s.attributesNum=k,s.index=I}function _(){let D=s.newAttributes;for(let L=0,F=D.length;L<F;L++)D[L]=0}function p(D){g(D,0)}function g(D,L){let F=s.newAttributes,I=s.enabledAttributes,z=s.attributeDivisors;F[D]=1,I[D]===0&&(r.enableVertexAttribArray(D),I[D]=1),z[D]!==L&&(r.vertexAttribDivisor(D,L),z[D]=L)}function b(){let D=s.newAttributes,L=s.enabledAttributes;for(let F=0,I=L.length;F<I;F++)L[F]!==D[F]&&(r.disableVertexAttribArray(F),L[F]=0)}function A(D,L,F,I,z,H,k){k===!0?r.vertexAttribIPointer(D,L,F,z,H):r.vertexAttribPointer(D,L,F,I,z,H)}function v(D,L,F,I){_();let z=I.attributes,H=F.getAttributes(),k=L.defaultAttributeValues;for(let Q in H){let Y=H[Q];if(Y.location>=0){let P=z[Q];if(P===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(P=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(P=D.instanceColor)),P!==void 0){let $=P.normalized,wt=P.itemSize,Tt=t.get(P);if(Tt===void 0)continue;let Wt=Tt.buffer,qt=Tt.type,$t=Tt.bytesPerElement,J=qt===r.INT||qt===r.UNSIGNED_INT||P.gpuType===Bc;if(P.isInterleavedBufferAttribute){let et=P.data,pt=et.stride,Gt=P.offset;if(et.isInstancedInterleavedBuffer){for(let _t=0;_t<Y.locationSize;_t++)g(Y.location+_t,et.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let _t=0;_t<Y.locationSize;_t++)p(Y.location+_t);r.bindBuffer(r.ARRAY_BUFFER,Wt);for(let _t=0;_t<Y.locationSize;_t++)A(Y.location+_t,wt/Y.locationSize,qt,$,pt*$t,(Gt+wt/Y.locationSize*_t)*$t,J)}else{if(P.isInstancedBufferAttribute){for(let et=0;et<Y.locationSize;et++)g(Y.location+et,P.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let et=0;et<Y.locationSize;et++)p(Y.location+et);r.bindBuffer(r.ARRAY_BUFFER,Wt);for(let et=0;et<Y.locationSize;et++)A(Y.location+et,wt/Y.locationSize,qt,$,wt*$t,wt/Y.locationSize*et*$t,J)}}else if(k!==void 0){let $=k[Q];if($!==void 0)switch($.length){case 2:r.vertexAttrib2fv(Y.location,$);break;case 3:r.vertexAttrib3fv(Y.location,$);break;case 4:r.vertexAttrib4fv(Y.location,$);break;default:r.vertexAttrib1fv(Y.location,$)}}}}b()}function S(){T();for(let D in n){let L=n[D];for(let F in L){let I=L[F];for(let z in I){let H=I[z];for(let k in H)h(H[k].object),delete H[k];delete I[z]}}delete n[D]}}function w(D){if(n[D.id]===void 0)return;let L=n[D.id];for(let F in L){let I=L[F];for(let z in I){let H=I[z];for(let k in H)h(H[k].object),delete H[k];delete I[z]}}delete n[D.id]}function E(D){for(let L in n){let F=n[L];for(let I in F){let z=F[I];if(z[D.id]===void 0)continue;let H=z[D.id];for(let k in H)h(H[k].object),delete H[k];delete z[D.id]}}}function x(D){for(let L in n){let F=n[L],I=D.isInstancedMesh===!0?D.id:0,z=F[I];if(z!==void 0){for(let H in z){let k=z[H];for(let Q in k)h(k[Q].object),delete k[Q];delete z[H]}delete F[I],Object.keys(F).length===0&&delete n[L]}}}function T(){C(),a=!0,s!==i&&(s=i,c(s.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function tS(r,t,e){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(r.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function eS(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==_i&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let x=E===Li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Yn&&E!==gi&&!x&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),A=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:v,maxSamples:S,samples:w}}function nS(r){let t=this,e=null,n=0,i=!1,s=!1,a=new Ci,o=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=r.get(d);if(!i||m===null||m.length===0||s&&!p)s?h(null):c();else{let b=s?0:n,A=b*4,v=g.clippingState||null;l.value=v,v=h(m,u,A,f);for(let S=0;S!==A;++S)v[S]=e[S];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=f+_*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<g)&&(p=new Float32Array(g));for(let A=0,v=f;A!==_;++A,v+=4)a.copy(d[A]).applyMatrix4(b,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}var ma=4,iS=6,rS=20,sS=256,Wo=new oa,Om=new ne,Ff=null,Of=0,Bf=0,zf=!1,aS=new V,fs=new V,_a=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){let{size:a=256,position:o=aS}=s;Ff=this._renderer.getRenderTarget(),Of=this._renderer.getActiveCubeFace(),Bf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=km(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ff,Of,Bf),this._renderer.xr.enabled=zf,t.scissorTest=!1,pa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Or||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ff=this._renderer.getRenderTarget(),Of=this._renderer.getActiveCubeFace(),Bf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Li,format:_i,colorSpace:ja,depthBuffer:!1},i=Bm(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bm(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=oS(s)),this._blurMaterial=cS(s,t,e),this._ggxMaterial=lS(s,t,e)}return i}_compileMaterial(t){let e=new Ce(new Mn,t);this._renderer.compile(e,Wo)}_sceneToCubeUV(t,e,n,i,s){let l=new fn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Om),d.toneMapping=Pi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ce(new Lr,new oo({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,p=_.material,g=!1,b=t.background;b?b.isColor&&(p.color.copy(b),t.background=null,g=!0):(p.color.copy(Om),g=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[A],s.y,s.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[A]));let S=this._cubeSize;pa(i,v*S,A>2?S:0,S,S),d.setRenderTarget(i),g&&d.render(_,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Or||t.mapping===hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=km()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zm());let s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;pa(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Wo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:m}=this,_=this._sizeLods[n],p=3*_*(n>m-ma?n-m+ma:0),g=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,pa(s,p,g,3*_,2*_),i.setRenderTarget(s),i.render(o,Wo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,pa(t,p,g,3*_,2*_),i.setRenderTarget(t),i.render(o,Wo)}_blur(t,e,n,i){let s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,i,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-ma?i-this._lodMax+ma:0),u=4*(this._cubeSize-h);pa(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Wo)}};function oS(r){let t=[],e=[],n=r,i=r-ma+1+iS;for(let s=0;s<i;s++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,m=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let g=0;g<d;g++){let b=g%3*2/3-1,A=g>2?0:-1,v=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];m.set(v,f*u*g);for(let S=0;S<u;S++){let w=h[S*2]*2-1,E=h[S*2+1]*2-1;g===0?fs.set(1,E,w):g===1?fs.set(-w,1,-E):g===2?fs.set(-w,E,1):g===3?fs.set(-1,E,-w):g===4?fs.set(-w,-1,E):fs.set(w,E,-1),fs.toArray(_,(g*u+S)*f)}}let p=new Mn;p.setAttribute("position",new Un(m,f)),p.setAttribute("outputDirection",new Un(_,f)),e.push(new Ce(p,null)),n>ma&&n--}return{lodMeshes:e,sizeLods:t}}function Bm(r,t,e){let n=new qn(r,t,e);return n.texture.mapping=Uo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pa(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function lS(r,t,e){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ah(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function cS(r,t,e){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:rS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ah(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function zm(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function km(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Ah(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var wh=class extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new fo(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Lr(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:pn,blending:qi});s.uniforms.tEquirect.value=e;let a=new Ce(i,s),o=e.minFilter;return e.minFilter===Br&&(e.minFilter=dn),new Ic(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}};function hS(r){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===Uc||f===Fc)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let _=new wh(m.height);return _.fromEquirectangularTexture(r,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===Uc||f===Fc,_=f===Or||f===hs;if(m||_){let p=e.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new _a(r)),p=m?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let b=u.image;return m&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new _a(r)),p=m?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===Uc?u.mapping=Or:f===Fc&&(u.mapping=hs),u}function l(u){let f=0,m=6;for(let _=0;_<m;_++)u[_]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function uS(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&rs("WebGLRenderer: "+n+" extension not supported."),i}}}function fS(r,t,e,n){let i={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete i[u.id];let f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],r.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let A=0,v=b.length;A<v;A+=3){let S=b[A+0],w=b[A+1],E=b[A+2];u.push(S,w,w,E,E,S)}}else{let b=m.array;_=m.version;for(let A=0,v=b.length/3-1;A<v;A+=3){let S=A+0,w=A+1,E=A+2;u.push(S,w,w,E,E,S)}}let p=new(m.count>=65535?so:ro)(u,1);p.version=_;let g=s.get(d);g&&t.remove(g),s.set(d,p)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function dS(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){r.drawElements(n,u,s,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(r.drawElementsInstanced(n,u,s,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let _=0;for(let p=0;p<f;p++)_+=u[p];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function pS(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function mS(r,t,e){let n=new WeakMap,i=new De;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let T=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],A=0;f===!0&&(A=1),m===!0&&(A=2),_===!0&&(A=3);let v=o.attributes.position.count*A,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*S*4*d),E=new no(w,v,S,d);E.type=gi,E.needsUpdate=!0;let x=A*4;for(let C=0;C<d;C++){let D=p[C],L=g[C],F=b[C],I=v*S*4*C;for(let z=0;z<D.count;z++){let H=z*x;f===!0&&(i.fromBufferAttribute(D,z),w[I+H+0]=i.x,w[I+H+1]=i.y,w[I+H+2]=i.z,w[I+H+3]=0),m===!0&&(i.fromBufferAttribute(L,z),w[I+H+4]=i.x,w[I+H+5]=i.y,w[I+H+6]=i.z,w[I+H+7]=0),_===!0&&(i.fromBufferAttribute(F,z),w[I+H+8]=i.x,w[I+H+9]=i.y,w[I+H+10]=i.z,w[I+H+11]=F.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new bt(v,S)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function gS(r,t,e,n,i){let s=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var _S={[uf]:"LINEAR_TONE_MAPPING",[ff]:"REINHARD_TONE_MAPPING",[df]:"CINEON_TONE_MAPPING",[No]:"ACES_FILMIC_TONE_MAPPING",[mf]:"AGX_TONE_MAPPING",[gf]:"NEUTRAL_TONE_MAPPING",[pf]:"CUSTOM_TONE_MAPPING"};function xS(r,t,e,n,i,s){let a=new qn(t,e,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Mn;c.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new $e([0,2,0,0,2,0],2));let h=new xc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ce(c,h),u=new oa(-1,1,1,-1,0,1),f=null,m=null,_=!1,p,g=null,b=[],A=!1;this.setSize=function(v,S){a.setSize(v,S),o!==null&&o.setSize(v,S),l!==null&&l.setSize(v,S);for(let w=0;w<b.length;w++){let E=b[w];E.setSize&&E.setSize(v,S)}},this.setEffects=function(v){b=v,A=b.length>0&&b[0].isRenderPass===!0;let S=a.width,w=a.height;b.length>0&&o===null&&(o=new qn(S,w,{type:Li,depthBuffer:!1,stencilBuffer:!1}),l=new qn(S,w,{type:Li,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<b.length;E++){let x=b[E];x.setSize&&x.setSize(S,w)}},this.begin=function(v,S){if(_||v.toneMapping===Pi&&b.length===0)return!1;if(g=S,S!==null){let w=S.width,E=S.height;(a.width!==w||a.height!==E)&&this.setSize(w,E)}return A===!1&&v.setRenderTarget(a),p=v.toneMapping,v.toneMapping=Pi,!0},this.hasRenderPass=function(){return A},this.end=function(v,S){v.toneMapping=p,_=!0;let w=a,E=o;for(let x=0;x<b.length;x++){let T=b[x];T.enabled!==!1&&(T.render(v,E,w,S),T.needsSwap!==!1&&(w=E,E=E===o?l:o))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,h.defines={},fe.getTransfer(f)===_e&&(h.defines.SRGB_TRANSFER="");let x=_S[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(g),v.render(d,u),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var ag=new Fn,Gf=new Ir(1,1),og=new no,lg=new hc,cg=new fo,Vm=[],Gm=[],Hm=new Float32Array(16),Wm=new Float32Array(9),Xm=new Float32Array(4);function xa(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Vm[i];if(s===void 0&&(s=new Float32Array(i),Vm[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function tn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function en(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ch(r,t){let e=Gm[t];e===void 0&&(e=new Int32Array(t),Gm[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function vS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function yS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2fv(this.addr,t),en(e,t)}}function SS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(tn(e,t))return;r.uniform3fv(this.addr,t),en(e,t)}}function MS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4fv(this.addr,t),en(e,t)}}function bS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;Xm.set(n),r.uniformMatrix2fv(this.addr,!1,Xm),en(e,n)}}function TS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;Wm.set(n),r.uniformMatrix3fv(this.addr,!1,Wm),en(e,n)}}function wS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;Hm.set(n),r.uniformMatrix4fv(this.addr,!1,Hm),en(e,n)}}function ES(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function AS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2iv(this.addr,t),en(e,t)}}function CS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3iv(this.addr,t),en(e,t)}}function RS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4iv(this.addr,t),en(e,t)}}function PS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function IS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2uiv(this.addr,t),en(e,t)}}function LS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3uiv(this.addr,t),en(e,t)}}function DS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4uiv(this.addr,t),en(e,t)}}function NS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Gf.compareFunction=e.isReversedDepthBuffer()?Mh:Sh,s=Gf):s=ag,e.setTexture2D(t||s,i)}function US(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||lg,i)}function FS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||cg,i)}function OS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||og,i)}function BS(r){switch(r){case 5126:return vS;case 35664:return yS;case 35665:return SS;case 35666:return MS;case 35674:return bS;case 35675:return TS;case 35676:return wS;case 5124:case 35670:return ES;case 35667:case 35671:return AS;case 35668:case 35672:return CS;case 35669:case 35673:return RS;case 5125:return PS;case 36294:return IS;case 36295:return LS;case 36296:return DS;case 35678:case 36198:case 36298:case 36306:case 35682:return NS;case 35679:case 36299:case 36307:return US;case 35680:case 36300:case 36308:case 36293:return FS;case 36289:case 36303:case 36311:case 36292:return OS}}function zS(r,t){r.uniform1fv(this.addr,t)}function kS(r,t){let e=xa(t,this.size,2);r.uniform2fv(this.addr,e)}function VS(r,t){let e=xa(t,this.size,3);r.uniform3fv(this.addr,e)}function GS(r,t){let e=xa(t,this.size,4);r.uniform4fv(this.addr,e)}function HS(r,t){let e=xa(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function WS(r,t){let e=xa(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function XS(r,t){let e=xa(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function qS(r,t){r.uniform1iv(this.addr,t)}function YS(r,t){r.uniform2iv(this.addr,t)}function ZS(r,t){r.uniform3iv(this.addr,t)}function JS(r,t){r.uniform4iv(this.addr,t)}function $S(r,t){r.uniform1uiv(this.addr,t)}function KS(r,t){r.uniform2uiv(this.addr,t)}function QS(r,t){r.uniform3uiv(this.addr,t)}function jS(r,t){r.uniform4uiv(this.addr,t)}function tM(r,t,e){let n=this.cache,i=t.length,s=Ch(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Gf:a=ag;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,s[o])}function eM(r,t,e){let n=this.cache,i=t.length,s=Ch(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||lg,s[a])}function nM(r,t,e){let n=this.cache,i=t.length,s=Ch(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||cg,s[a])}function iM(r,t,e){let n=this.cache,i=t.length,s=Ch(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||og,s[a])}function rM(r){switch(r){case 5126:return zS;case 35664:return kS;case 35665:return VS;case 35666:return GS;case 35674:return HS;case 35675:return WS;case 35676:return XS;case 5124:case 35670:return qS;case 35667:case 35671:return YS;case 35668:case 35672:return ZS;case 35669:case 35673:return JS;case 5125:return $S;case 36294:return KS;case 36295:return QS;case 36296:return jS;case 35678:case 36198:case 36298:case 36306:case 35682:return tM;case 35679:case 36299:case 36307:return eM;case 35680:case 36300:case 36308:case 36293:return nM;case 36289:case 36303:case 36311:case 36292:return iM}}var Hf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=BS(e.type)}},Wf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rM(e.type)}},Xf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(t,e[o.id],n)}}},kf=/(\w+)(\])?(\[|\.)?/g;function qm(r,t){r.seq.push(t),r.map[t.id]=t}function sM(r,t,e){let n=r.name,i=n.length;for(kf.lastIndex=0;;){let s=kf.exec(n),a=kf.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){qm(e,c===void 0?new Hf(o,r,t):new Wf(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new Xf(o),qm(e,d)),e=d}}}var ga=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);sM(o,l,this)}let i=[],s=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Ym(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var aM=37297,oM=0;function lM(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Zm=new te;function cM(r){fe._getMatrix(Zm,fe.workingColorSpace,r);let t=`mat3( ${Zm.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(r)){case to:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Jm(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+lM(r.getShaderSource(t),o)}else return s}function hM(r,t){let e=cM(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var uM={[uf]:"Linear",[ff]:"Reinhard",[df]:"Cineon",[No]:"ACESFilmic",[mf]:"AgX",[gf]:"Neutral",[pf]:"Custom"};function fM(r,t){let e=uM[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Th=new V;function dM(){fe.getLuminanceCoefficients(Th);let r=Th.x.toFixed(4),t=Th.y.toFixed(4),e=Th.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function mM(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function gM(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function qo(r){return r!==""}function $m(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Km(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _M=/^[ \t]*#include +<([\w\d./]+)>/gm;function qf(r){return r.replace(_M,vM)}var xM=new Map;function vM(r,t){let e=re[t];if(e===void 0){let n=xM.get(t);if(n!==void 0)e=re[n],Kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return qf(e)}var yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(r){return r.replace(yM,SM)}function SM(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jm(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var MM={[Do]:"SHADOWMAP_TYPE_PCF",[ca]:"SHADOWMAP_TYPE_VSM"};function bM(r){return MM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var TM={[Or]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[Uo]:"ENVMAP_TYPE_CUBE_UV"};function wM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":TM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var EM={[hs]:"ENVMAP_MODE_REFRACTION"};function AM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":EM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var CM={[Nc]:"ENVMAP_BLENDING_MULTIPLY",[fm]:"ENVMAP_BLENDING_MIX",[dm]:"ENVMAP_BLENDING_ADD"};function RM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":CM[r.combine]||"ENVMAP_BLENDING_NONE"}function PM(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function IM(r,t,e,n){let i=r.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=bM(e),c=wM(e),h=AM(e),d=RM(e),u=PM(e),f=pM(e),m=mM(s),_=i.createProgram(),p,g,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qo).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qo).join(`
`),g.length>0&&(g+=`
`)):(p=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),g=[jm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?re.tonemapping_pars_fragment:"",e.toneMapping!==Pi?fM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,hM("linearToOutputTexel",e.outputColorSpace),dM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qo).join(`
`)),a=qf(a),a=$m(a,e),a=Km(a,e),o=qf(o),o=$m(o,e),o=Km(o,e),a=Qm(a),o=Qm(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Tf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Tf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let A=b+p+a,v=b+g+o,S=Ym(i,i.VERTEX_SHADER,A),w=Ym(i,i.FRAGMENT_SHADER,v);i.attachShader(_,S),i.attachShader(_,w),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(D){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(_)||"",F=i.getShaderInfoLog(S)||"",I=i.getShaderInfoLog(w)||"",z=L.trim(),H=F.trim(),k=I.trim(),Q=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,S,w);else{let P=Jm(i,S,"vertex"),$=Jm(i,w,"fragment");Qt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+z+`
`+P+`
`+$)}else z!==""?Kt("WebGLProgram: Program Info Log:",z):(H===""||k==="")&&(Y=!1);Y&&(D.diagnostics={runnable:Q,programLog:z,vertexShader:{log:H,prefix:p},fragmentShader:{log:k,prefix:g}})}i.deleteShader(S),i.deleteShader(w),x=new ga(i,_),T=gM(i,_)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(_,aM)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=oM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=w,this}var LM=0,Yf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Zf(t),e.set(t,n)),n}},Zf=class{constructor(t){this.id=LM++,this.code=t,this.usedTimes=0}};function DM(r){return r===kr||r===Vo||r===Go}function NM(r,t,e,n,i,s){let a=new io,o=new Yf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,T,C,D,L,F){let I=D.fog,z=L.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=t.get(x.envMap||H,k),Y=Q&&Q.mapping===Uo?Q.image.height:null,P=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Kt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,wt=$!==void 0?$.length:0,Tt=0;z.morphAttributes.position!==void 0&&(Tt=1),z.morphAttributes.normal!==void 0&&(Tt=2),z.morphAttributes.color!==void 0&&(Tt=3);let Wt,qt,$t,J;if(P){let Ht=Zi[P];Wt=Ht.vertexShader,qt=Ht.fragmentShader}else{Wt=x.vertexShader,qt=x.fragmentShader;let Ht=o.getVertexShaderStage(x),lt=o.getFragmentShaderStage(x);o.update(x,Ht,lt),$t=Ht.id,J=lt.id}let et=r.getRenderTarget(),pt=r.state.buffers.depth.getReversed(),Gt=L.isInstancedMesh===!0,_t=L.isBatchedMesh===!0,Lt=!!x.map,Nt=!!x.matcap,j=!!Q,rt=!!x.aoMap,ot=!!x.lightMap,N=!!x.bumpMap&&x.wireframe===!1,ft=!!x.normalMap,zt=!!x.displacementMap,Ut=!!x.emissiveMap,Ct=!!x.metalnessMap,Zt=!!x.roughnessMap,U=x.anisotropy>0,oe=x.clearcoat>0,Xt=x.dispersion>0,R=x.retroreflectivity>0,y=x.iridescence>0,G=x.sheen>0,W=x.transmission>0,K=U&&!!x.anisotropyMap,dt=oe&&!!x.clearcoatMap,ct=oe&&!!x.clearcoatNormalMap,tt=oe&&!!x.clearcoatRoughnessMap,it=y&&!!x.iridescenceMap,xt=y&&!!x.iridescenceThicknessMap,Dt=G&&!!x.sheenColorMap,vt=G&&!!x.sheenRoughnessMap,gt=!!x.specularMap,ut=!!x.specularColorMap,kt=!!x.specularIntensityMap,Jt=W&&!!x.transmissionMap,O=W&&!!x.thicknessMap,mt=!!x.gradientMap,nt=!!x.alphaMap,yt=x.alphaTest>0,Mt=!!x.alphaHash,st=!!x.extensions,ht=Pi;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(ht=r.toneMapping);let at={shaderID:P,shaderType:x.type,shaderName:x.name,vertexShader:Wt,fragmentShader:qt,defines:x.defines,customVertexShaderID:$t,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:_t,batchingColor:_t&&L._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&L.instanceColor!==null,instancingMorph:Gt&&L.morphTexture!==null,outputColorSpace:et===null?r.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:fe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:Nt,envMap:j,envMapMode:j&&Q.mapping,envMapCubeUVHeight:Y,aoMap:rt,lightMap:ot,bumpMap:N,normalMap:ft,displacementMap:zt,emissiveMap:Ut,normalMapObjectSpace:ft&&x.normalMapType===gm,normalMapTangentSpace:ft&&x.normalMapType===Ho,packedNormalMap:ft&&x.normalMapType===Ho&&DM(x.normalMap.format),metalnessMap:Ct,roughnessMap:Zt,anisotropy:U,anisotropyMap:K,clearcoat:oe,clearcoatMap:dt,clearcoatNormalMap:ct,clearcoatRoughnessMap:tt,dispersion:Xt,retroreflection:R,iridescence:y,iridescenceMap:it,iridescenceThicknessMap:xt,sheen:G,sheenColorMap:Dt,sheenRoughnessMap:vt,specularMap:gt,specularColorMap:ut,specularIntensityMap:kt,transmission:W,transmissionMap:Jt,thicknessMap:O,gradientMap:mt,opaque:x.transparent===!1&&x.blending===ha&&x.alphaToCoverage===!1,alphaMap:nt,alphaTest:yt,alphaHash:Mt,combine:x.combine,mapUv:Lt&&m(x.map.channel),aoMapUv:rt&&m(x.aoMap.channel),lightMapUv:ot&&m(x.lightMap.channel),bumpMapUv:N&&m(x.bumpMap.channel),normalMapUv:ft&&m(x.normalMap.channel),displacementMapUv:zt&&m(x.displacementMap.channel),emissiveMapUv:Ut&&m(x.emissiveMap.channel),metalnessMapUv:Ct&&m(x.metalnessMap.channel),roughnessMapUv:Zt&&m(x.roughnessMap.channel),anisotropyMapUv:K&&m(x.anisotropyMap.channel),clearcoatMapUv:dt&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ct&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:vt&&m(x.sheenRoughnessMap.channel),specularMapUv:gt&&m(x.specularMap.channel),specularColorMapUv:ut&&m(x.specularColorMap.channel),specularIntensityMapUv:kt&&m(x.specularIntensityMap.channel),transmissionMapUv:Jt&&m(x.transmissionMap.channel),thicknessMapUv:O&&m(x.thicknessMap.channel),alphaMapUv:nt&&m(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ft||U),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!z.attributes.uv&&(Lt||nt),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&ft===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Tt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ht,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&fe.getTransfer(x.map.colorSpace)===_e,decodeVideoTextureEmissive:Ut&&x.emissiveMap.isVideoTexture===!0&&fe.getTransfer(x.emissiveMap.colorSpace)===_e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===mi,flipSided:x.side===pn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||_t)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return at.vertexUv1s=l.has(1),at.vertexUv2s=l.has(2),at.vertexUv3s=l.has(3),l.clear(),at}function p(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)T.push(C),T.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(g(T,x),b(T,x),T.push(r.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function g(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function b(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){let T=f[x.type],C;if(T){let D=Zi[T];C=Nm.clone(D.uniforms)}else C=x.uniforms;return C}function v(x,T){let C=h.get(T);return C!==void 0?++C.usedTimes:(C=new IM(r,T,x,i),c.push(C),h.set(T,C)),C}function S(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:A,acquireProgram:v,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:E}}function UM(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function FM(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function tg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function eg(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,_,p,g){let b=r[t];return b===void 0?(b={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:g},r[t]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=m,b.materialVariant=a(u),b.groupOrder=_,b.renderOrder=u.renderOrder,b.z=p,b.group=g),t++,b}function l(u,f,m,_,p,g,b){b.reversedDepth===!0&&(p=-p);let A=o(u,f,m,_,p,g);m.transmission>0?n.push(A):m.transparent===!0?i.push(A):e.push(A)}function c(u,f,m,_,p,g){let b=o(u,f,m,_,p,g);m.transmission>0?n.unshift(b):m.transparent===!0?i.unshift(b):e.unshift(b)}function h(u,f){e.length>1&&e.sort(u||FM),n.length>1&&n.sort(f||tg),i.length>1&&i.sort(f||tg)}function d(){for(let u=t,f=r.length;u<f;u++){let m=r[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:h}}function OM(){let r=new WeakMap;function t(n,i){let s=r.get(n),a;return s===void 0?(a=new eg,r.set(n,[a])):i>=s.length?(a=new eg,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function BM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new V,color:new ne};break;case"SpotLight":e={position:new V,direction:new V,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=e,e}}}function zM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var kM=0;function VM(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function GM(r){let t=new BM,e=zM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);let i=new V,s=new Se,a=new Se;function o(c){let h=0,d=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,b=0,A=0,v=0,S=0,w=0,E=0,x=0,T=0,C=0;c.sort(VM);for(let L=0,F=c.length;L<F;L++){let I=c[L],z=I.color,H=I.intensity,k=I.distance,Q=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===kr?Q=I.shadow.map.texture:Q=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*H,d+=z.g*H,u+=z.b*H;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],H);C++}else if(I.isSunLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let P=I.shadow,$=e.get(I);$.shadowIntensity=P.intensity,$.shadowBias=P.bias,$.shadowNormalBias=P.normalBias,$.shadowRadius=P.radius,$.shadowMapSize.copy(P.mapSize).multiply(P.getFrameExtents()),n.sunShadow[m]=$,n.sunShadowMap[m]=Q;let wt=P.getViewportCount();for(let Tt=0;Tt<wt;Tt++)n.sunShadowMatrix[_+Tt]=P.getMatrix(Tt),n.sunShadowCascade[_+Tt]=P._cascadeData[Tt];_+=wt,m++}n.sun[f]=Y,f++}else if(I.isDirectionalLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let P=I.shadow,$=e.get(I);$.shadowIntensity=P.intensity,$.shadowBias=P.bias,$.shadowNormalBias=P.normalBias,$.shadowRadius=P.radius,$.shadowMapSize=P.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=Q,n.directionalShadowMatrix[p]=I.shadow.matrix,S++}n.directional[p]=Y,p++}else if(I.isSpotLight){let Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(z).multiplyScalar(H),Y.distance=k,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[b]=Y;let P=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,P.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[b]=P.matrix,I.castShadow){let $=e.get(I);$.shadowIntensity=P.intensity,$.shadowBias=P.bias,$.shadowNormalBias=P.normalBias,$.shadowRadius=P.radius,$.shadowMapSize=P.mapSize,n.spotShadow[b]=$,n.spotShadowMap[b]=Q,E++}b++}else if(I.isRectAreaLight){let Y=t.get(I);Y.color.copy(z).multiplyScalar(H),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[A]=Y,A++}else if(I.isPointLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){let P=I.shadow,$=e.get(I);$.shadowIntensity=P.intensity,$.shadowBias=P.bias,$.shadowNormalBias=P.normalBias,$.shadowRadius=P.radius,$.shadowMapSize=P.mapSize,$.shadowCameraNear=P.camera.near,$.shadowCameraFar=P.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=I.shadow.matrix,w++}n.point[g]=Y,g++}else if(I.isHemisphereLight){let Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(H),Y.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[v]=Y,v++}}A>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let D=n.hash;(D.sunLength!==f||D.directionalLength!==p||D.pointLength!==g||D.spotLength!==b||D.rectAreaLength!==A||D.hemiLength!==v||D.numSunShadows!==m||D.numDirectionalShadows!==S||D.numPointShadows!==w||D.numSpotShadows!==E||D.numSpotMaps!==x||D.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=p,n.spot.length=b,n.rectArea.length=A,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,D.sunLength=f,D.directionalLength=p,D.pointLength=g,D.spotLength=b,D.rectAreaLength=A,D.hemiLength=v,D.numSunShadows=m,D.numDirectionalShadows=S,D.numPointShadows=w,D.numSpotShadows=E,D.numSpotMaps=x,D.numLightProbes=C,n.version=kM++)}function l(c,h){let d=0,u=0,f=0,m=0,_=0,p=0,g=h.matrixWorldInverse;for(let b=0,A=c.length;b<A;b++){let v=c[b];if(v.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),u++}else if(v.isSpotLight){let S=n.spot[m];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let S=n.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let S=n.hemi[p];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function ng(r){let t=new GM(r),e=[],n=[],i=[];function s(u){d.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function HM(r){let t=new WeakMap;function e(i,s=0){let a=t.get(i),o;return a===void 0?(o=new ng(r),t.set(i,[o])):s>=a.length?(o=new ng(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var WM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,qM=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],YM=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],ig=new Se,Xo=new V,Vf=new V;function ZM(r,t,e){let n=new na,i=new bt,s=new bt,a=new De,o=new vc,l=new yc,c={},h=e.maxTextureSize,d={[Fr]:pn,[pn]:Fr,[mi]:mi},u=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:WM,fragmentShader:XM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new Mn;m.setAttribute("position",new Un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ce(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let g=this.type;this.render=function(w,E,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===Yp&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Do);let T=r.getRenderTarget(),C=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),L=r.state;L.setBlending(qi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let F=g!==this.type;F&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=w.length;I<z;I++){let H=w[I],k=H.shadow;if(k===void 0){Kt("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);let Q=k.getFrameExtents();i.multiply(Q),s.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Q.x),i.x=s.x*Q.x,k.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Q.y),i.y=s.y*Q.y,k.mapSize.y=s.y));let Y=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=Y,k.map===null||F===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ca){if(H.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new qn(i.x,i.y,{format:kr,type:Li,minFilter:dn,magFilter:dn,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new Ir(i.x,i.y,gi),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=ki,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ln,k.map.depthTexture.magFilter=ln}else H.isPointLight?(k.map=new wh(i.x),k.map.depthTexture=new uc(i.x,Ii)):(k.map=new qn(i.x,i.y),k.map.depthTexture=new Ir(i.x,i.y,Ii)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=ki,this.type===Do?(k.map.depthTexture.compareFunction=Y?Mh:Sh,k.map.depthTexture.minFilter=dn,k.map.depthTexture.magFilter=dn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ln,k.map.depthTexture.magFilter=ln);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==i.x||k.map.height!==i.y)&&k.map.setSize(i.x,i.y);let P=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();H.isPointLight!==!0&&k.updateMatrices(H,x);for(let $=0;$<P;$++){let wt=k.getCamera($);if(H.isPointLight){let Tt=k.camera,Wt=k.matrix,qt=H.distance||Tt.far;qt!==Tt.far&&(Tt.far=qt,Tt.updateProjectionMatrix()),Xo.setFromMatrixPosition(H.matrixWorld),Tt.position.copy(Xo),Vf.copy(Tt.position),Vf.add(qM[$]),Tt.up.copy(YM[$]),Tt.lookAt(Vf),Tt.updateMatrixWorld(),Wt.makeTranslation(-Xo.x,-Xo.y,-Xo.z),ig.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(ig,Tt.coordinateSystem,Tt.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,$),r.clear();else{$===0&&(r.setRenderTarget(k.map),r.clear());let Tt=k.getViewport($);a.set(s.x*Tt.x,s.y*Tt.y,s.x*Tt.z,s.y*Tt.w),L.viewport(a)}n=k.getFrustum($),v(E,x,wt,H,this.type)}k.isPointLightShadow!==!0&&this.type===ca&&b(k,x),k.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(T,C,D)};function b(w,E){let x=t.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new qn(i.x,i.y,{format:kr,type:Li}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(E,null,x,u,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(E,null,x,f,_,null)}function A(w,E,x,T){let C=null,D=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)C=D;else if(C=x.isPointLight===!0?l:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let L=C.uuid,F=E.uuid,I=c[L];I===void 0&&(I={},c[L]=I);let z=I[F];z===void 0&&(z=C.clone(),I[F]=z,E.addEventListener("dispose",S)),C=z}if(C.visible=E.visible,C.wireframe=E.wireframe,T===ca?C.side=E.shadowSide!==null?E.shadowSide:E.side:C.side=E.shadowSide!==null?E.shadowSide:d[E.side],C.alphaMap=E.alphaMap,C.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,C.map=E.map,C.clipShadows=E.clipShadows,C.clippingPlanes=E.clippingPlanes,C.clipIntersection=E.clipIntersection,C.displacementMap=E.displacementMap,C.displacementScale=E.displacementScale,C.displacementBias=E.displacementBias,C.wireframeLinewidth=E.wireframeLinewidth,C.linewidth=E.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let L=r.properties.get(C);L.light=x}return C}function v(w,E,x,T,C){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&C===ca)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let F=t.update(w),I=w.material;if(Array.isArray(I)){let z=F.groups;for(let H=0,k=z.length;H<k;H++){let Q=z[H],Y=I[Q.materialIndex];if(Y&&Y.visible){let P=A(w,Y,T,C);w.onBeforeShadow(r,w,E,x,F,P,Q),r.renderBufferDirect(x,null,F,P,w,Q),w.onAfterShadow(r,w,E,x,F,P,Q)}}}else if(I.visible){let z=A(w,I,T,C);w.onBeforeShadow(r,w,E,x,F,z,null),r.renderBufferDirect(x,null,F,z,w,null),w.onAfterShadow(r,w,E,x,F,z,null)}}let L=w.children;for(let F=0,I=L.length;F<I;F++)v(L[F],E,x,T,C)}function S(w){w.target.removeEventListener("dispose",S);for(let x in c){let T=c[x],C=w.target.uuid;C in T&&(T[C].dispose(),delete T[C])}}}function JM(r,t){function e(){let O=!1,mt=new De,nt=null,yt=new De(0,0,0,0);return{setMask:function(Mt){nt!==Mt&&!O&&(r.colorMask(Mt,Mt,Mt,Mt),nt=Mt)},setLocked:function(Mt){O=Mt},setClear:function(Mt,st,ht,at,Ht){Ht===!0&&(Mt*=at,st*=at,ht*=at),mt.set(Mt,st,ht,at),yt.equals(mt)===!1&&(r.clearColor(Mt,st,ht,at),yt.copy(mt))},reset:function(){O=!1,nt=null,yt.set(-1,0,0,0)}}}function n(){let O=!1,mt=!1,nt=null,yt=null,Mt=null;return{setReversed:function(st){if(mt!==st){let ht=t.get("EXT_clip_control");st?ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.ZERO_TO_ONE_EXT):ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.NEGATIVE_ONE_TO_ONE_EXT),mt=st;let at=Mt;Mt=null,this.setClear(at)}},getReversed:function(){return mt},setTest:function(st){st?et(r.DEPTH_TEST):pt(r.DEPTH_TEST)},setMask:function(st){nt!==st&&!O&&(r.depthMask(st),nt=st)},setFunc:function(st){if(mt&&(st=Cm[st]),yt!==st){switch(st){case Kl:r.depthFunc(r.NEVER);break;case Ql:r.depthFunc(r.ALWAYS);break;case jl:r.depthFunc(r.LESS);break;case Ks:r.depthFunc(r.LEQUAL);break;case tc:r.depthFunc(r.EQUAL);break;case ec:r.depthFunc(r.GEQUAL);break;case nc:r.depthFunc(r.GREATER);break;case ic:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}yt=st}},setLocked:function(st){O=st},setClear:function(st){Mt!==st&&(Mt=st,mt&&(st=1-st),r.clearDepth(st))},reset:function(){O=!1,nt=null,yt=null,Mt=null,mt=!1}}}function i(){let O=!1,mt=null,nt=null,yt=null,Mt=null,st=null,ht=null,at=null,Ht=null;return{setTest:function(lt){O||(lt?et(r.STENCIL_TEST):pt(r.STENCIL_TEST))},setMask:function(lt){mt!==lt&&!O&&(r.stencilMask(lt),mt=lt)},setFunc:function(lt,Yt,Ft){(nt!==lt||yt!==Yt||Mt!==Ft)&&(r.stencilFunc(lt,Yt,Ft),nt=lt,yt=Yt,Mt=Ft)},setOp:function(lt,Yt,Ft){(st!==lt||ht!==Yt||at!==Ft)&&(r.stencilOp(lt,Yt,Ft),st=lt,ht=Yt,at=Ft)},setLocked:function(lt){O=lt},setClear:function(lt){Ht!==lt&&(r.clearStencil(lt),Ht=lt)},reset:function(){O=!1,mt=null,nt=null,yt=null,Mt=null,st=null,ht=null,at=null,Ht=null}}}let s=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,A=null,v=null,S=null,w=null,E=null,x=new ne(0,0,0),T=0,C=!1,D=null,L=null,F=null,I=null,z=null,H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,Q=0,Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),k=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),k=Q>=2);let P=null,$={},wt=r.getParameter(r.SCISSOR_BOX),Tt=r.getParameter(r.VIEWPORT),Wt=new De().fromArray(wt),qt=new De().fromArray(Tt);function $t(O,mt,nt,yt){let Mt=new Uint8Array(4),st=r.createTexture();r.bindTexture(O,st),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ht=0;ht<nt;ht++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(mt,0,r.RGBA,1,1,yt,0,r.RGBA,r.UNSIGNED_BYTE,Mt):r.texImage2D(mt+ht,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Mt);return st}let J={};J[r.TEXTURE_2D]=$t(r.TEXTURE_2D,r.TEXTURE_2D,1),J[r.TEXTURE_CUBE_MAP]=$t(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[r.TEXTURE_2D_ARRAY]=$t(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),J[r.TEXTURE_3D]=$t(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(r.DEPTH_TEST),a.setFunc(Ks),N(!1),ft(sf),et(r.CULL_FACE),rt(qi);function et(O){h[O]!==!0&&(r.enable(O),h[O]=!0)}function pt(O){h[O]!==!1&&(r.disable(O),h[O]=!1)}function Gt(O,mt){return u[O]!==mt?(r.bindFramebuffer(O,mt),u[O]=mt,O===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=mt),O===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=mt),!0):!1}function _t(O,mt){let nt=m,yt=!1;if(O){nt=f.get(mt),nt===void 0&&(nt=[],f.set(mt,nt));let Mt=O.textures;if(nt.length!==Mt.length||nt[0]!==r.COLOR_ATTACHMENT0){for(let st=0,ht=Mt.length;st<ht;st++)nt[st]=r.COLOR_ATTACHMENT0+st;nt.length=Mt.length,yt=!0}}else nt[0]!==r.BACK&&(nt[0]=r.BACK,yt=!0);yt&&r.drawBuffers(nt)}function Lt(O){return _!==O?(r.useProgram(O),_=O,!0):!1}let Nt={[cs]:r.FUNC_ADD,[Jp]:r.FUNC_SUBTRACT,[$p]:r.FUNC_REVERSE_SUBTRACT};Nt[Kp]=r.MIN,Nt[Qp]=r.MAX;let j={[jp]:r.ZERO,[tm]:r.ONE,[em]:r.SRC_COLOR,[cf]:r.SRC_ALPHA,[om]:r.SRC_ALPHA_SATURATE,[sm]:r.DST_COLOR,[im]:r.DST_ALPHA,[nm]:r.ONE_MINUS_SRC_COLOR,[hf]:r.ONE_MINUS_SRC_ALPHA,[am]:r.ONE_MINUS_DST_COLOR,[rm]:r.ONE_MINUS_DST_ALPHA,[lm]:r.CONSTANT_COLOR,[cm]:r.ONE_MINUS_CONSTANT_COLOR,[hm]:r.CONSTANT_ALPHA,[um]:r.ONE_MINUS_CONSTANT_ALPHA};function rt(O,mt,nt,yt,Mt,st,ht,at,Ht,lt){if(O===qi){p===!0&&(pt(r.BLEND),p=!1);return}if(p===!1&&(et(r.BLEND),p=!0),O!==Zp){if(O!==g||lt!==C){if((b!==cs||S!==cs)&&(r.blendEquation(r.FUNC_ADD),b=cs,S=cs),lt)switch(O){case ha:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case af:r.blendFunc(r.ONE,r.ONE);break;case of:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lf:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Qt("WebGLState: Invalid blending: ",O);break}else switch(O){case ha:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case af:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case of:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lf:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",O);break}A=null,v=null,w=null,E=null,x.set(0,0,0),T=0,g=O,C=lt}return}Mt=Mt||mt,st=st||nt,ht=ht||yt,(mt!==b||Mt!==S)&&(r.blendEquationSeparate(Nt[mt],Nt[Mt]),b=mt,S=Mt),(nt!==A||yt!==v||st!==w||ht!==E)&&(r.blendFuncSeparate(j[nt],j[yt],j[st],j[ht]),A=nt,v=yt,w=st,E=ht),(at.equals(x)===!1||Ht!==T)&&(r.blendColor(at.r,at.g,at.b,Ht),x.copy(at),T=Ht),g=O,C=!1}function ot(O,mt){O.side===mi?pt(r.CULL_FACE):et(r.CULL_FACE);let nt=O.side===pn;mt&&(nt=!nt),N(nt),O.blending===ha&&O.transparent===!1?rt(qi):rt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);let yt=O.stencilWrite;o.setTest(yt),yt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ut(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?et(r.SAMPLE_ALPHA_TO_COVERAGE):pt(r.SAMPLE_ALPHA_TO_COVERAGE)}function N(O){D!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),D=O)}function ft(O){O!==Xp?(et(r.CULL_FACE),O!==L&&(O===sf?r.cullFace(r.BACK):O===qp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pt(r.CULL_FACE),L=O}function zt(O){O!==F&&(k&&r.lineWidth(O),F=O)}function Ut(O,mt,nt){O?(et(r.POLYGON_OFFSET_FILL),(I!==mt||z!==nt)&&(I=mt,z=nt,a.getReversed()&&(mt=-mt),r.polygonOffset(mt,nt))):pt(r.POLYGON_OFFSET_FILL)}function Ct(O){O?et(r.SCISSOR_TEST):pt(r.SCISSOR_TEST)}function Zt(O){O===void 0&&(O=r.TEXTURE0+H-1),P!==O&&(r.activeTexture(O),P=O)}function U(O,mt,nt){nt===void 0&&(P===null?nt=r.TEXTURE0+H-1:nt=P);let yt=$[nt];yt===void 0&&(yt={type:void 0,texture:void 0},$[nt]=yt),(yt.type!==O||yt.texture!==mt)&&(P!==nt&&(r.activeTexture(nt),P=nt),r.bindTexture(O,mt||J[O]),yt.type=O,yt.texture=mt)}function oe(){let O=$[P];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Xt(){try{r.compressedTexImage2D(...arguments)}catch(O){Qt("WebGLState:",O)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(O){Qt("WebGLState:",O)}}function y(){try{r.texSubImage2D(...arguments)}catch(O){Qt("WebGLState:",O)}}function G(){try{r.texSubImage3D(...arguments)}catch(O){Qt("WebGLState:",O)}}function W(){try{r.compressedTexSubImage2D(...arguments)}catch(O){Qt("WebGLState:",O)}}function K(){try{r.compressedTexSubImage3D(...arguments)}catch(O){Qt("WebGLState:",O)}}function dt(){try{r.texStorage2D(...arguments)}catch(O){Qt("WebGLState:",O)}}function ct(){try{r.texStorage3D(...arguments)}catch(O){Qt("WebGLState:",O)}}function tt(){try{r.texImage2D(...arguments)}catch(O){Qt("WebGLState:",O)}}function it(){try{r.texImage3D(...arguments)}catch(O){Qt("WebGLState:",O)}}function xt(O){return d[O]!==void 0?d[O]:r.getParameter(O)}function Dt(O,mt){d[O]!==mt&&(r.pixelStorei(O,mt),d[O]=mt)}function vt(O){Wt.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),Wt.copy(O))}function gt(O){qt.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),qt.copy(O))}function ut(O,mt){let nt=c.get(mt);nt===void 0&&(nt=new WeakMap,c.set(mt,nt));let yt=nt.get(O);yt===void 0&&(yt=r.getUniformBlockIndex(mt,O.name),nt.set(O,yt))}function kt(O,mt){let yt=c.get(mt).get(O);l.get(mt)!==yt&&(r.uniformBlockBinding(mt,yt,O.__bindingPointIndex),l.set(mt,yt))}function Jt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},P=null,$={},u={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,A=null,v=null,S=null,w=null,E=null,x=new ne(0,0,0),T=0,C=!1,D=null,L=null,F=null,I=null,z=null,Wt.set(0,0,r.canvas.width,r.canvas.height),qt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:et,disable:pt,bindFramebuffer:Gt,drawBuffers:_t,useProgram:Lt,setBlending:rt,setMaterial:ot,setFlipSided:N,setCullFace:ft,setLineWidth:zt,setPolygonOffset:Ut,setScissorTest:Ct,activeTexture:Zt,bindTexture:U,unbindTexture:oe,compressedTexImage2D:Xt,compressedTexImage3D:R,texImage2D:tt,texImage3D:it,pixelStorei:Dt,getParameter:xt,updateUBOMapping:ut,uniformBlockBinding:kt,texStorage2D:dt,texStorage3D:ct,texSubImage2D:y,texSubImage3D:G,compressedTexSubImage2D:W,compressedTexSubImage3D:K,scissor:vt,viewport:gt,reset:Jt}}function $M(r,t,e,n,i,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,y){return m?new OffscreenCanvas(R,y):eo("canvas")}function p(R,y,G){let W=1,K=Xt(R);if((K.width>G||K.height>G)&&(W=G/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&R instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&R instanceof ImageBitmap||typeof VideoFrame!="undefined"&&R instanceof VideoFrame){let dt=Math.floor(W*K.width),ct=Math.floor(W*K.height);u===void 0&&(u=_(dt,ct));let tt=y?_(dt,ct):u;return tt.width=dt,tt.height=ct,tt.getContext("2d").drawImage(R,0,0,dt,ct),Kt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+dt+"x"+ct+")."),tt}else return"data"in R&&Kt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function g(R){return R.generateMipmaps}function b(R){r.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(R,y,G,W,K,dt=!1){if(R!==null){if(r[R]!==void 0)return r[R];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ct;W&&(ct=t.get("EXT_texture_norm16"),ct||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=y;if(y===r.RED&&(G===r.FLOAT&&(tt=r.R32F),G===r.HALF_FLOAT&&(tt=r.R16F),G===r.UNSIGNED_BYTE&&(tt=r.R8),G===r.UNSIGNED_SHORT&&ct&&(tt=ct.R16_EXT),G===r.SHORT&&ct&&(tt=ct.R16_SNORM_EXT)),y===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.R8UI),G===r.UNSIGNED_SHORT&&(tt=r.R16UI),G===r.UNSIGNED_INT&&(tt=r.R32UI),G===r.BYTE&&(tt=r.R8I),G===r.SHORT&&(tt=r.R16I),G===r.INT&&(tt=r.R32I)),y===r.RG&&(G===r.FLOAT&&(tt=r.RG32F),G===r.HALF_FLOAT&&(tt=r.RG16F),G===r.UNSIGNED_BYTE&&(tt=r.RG8),G===r.UNSIGNED_SHORT&&ct&&(tt=ct.RG16_EXT),G===r.SHORT&&ct&&(tt=ct.RG16_SNORM_EXT)),y===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RG8UI),G===r.UNSIGNED_SHORT&&(tt=r.RG16UI),G===r.UNSIGNED_INT&&(tt=r.RG32UI),G===r.BYTE&&(tt=r.RG8I),G===r.SHORT&&(tt=r.RG16I),G===r.INT&&(tt=r.RG32I)),y===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RGB8UI),G===r.UNSIGNED_SHORT&&(tt=r.RGB16UI),G===r.UNSIGNED_INT&&(tt=r.RGB32UI),G===r.BYTE&&(tt=r.RGB8I),G===r.SHORT&&(tt=r.RGB16I),G===r.INT&&(tt=r.RGB32I)),y===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(tt=r.RGBA16UI),G===r.UNSIGNED_INT&&(tt=r.RGBA32UI),G===r.BYTE&&(tt=r.RGBA8I),G===r.SHORT&&(tt=r.RGBA16I),G===r.INT&&(tt=r.RGBA32I)),y===r.RGB&&(G===r.UNSIGNED_SHORT&&ct&&(tt=ct.RGB16_EXT),G===r.SHORT&&ct&&(tt=ct.RGB16_SNORM_EXT),G===r.UNSIGNED_INT_5_9_9_9_REV&&(tt=r.RGB9_E5),G===r.UNSIGNED_INT_10F_11F_11F_REV&&(tt=r.R11F_G11F_B10F)),y===r.RGBA){let it=dt?to:fe.getTransfer(K);G===r.FLOAT&&(tt=r.RGBA32F),G===r.HALF_FLOAT&&(tt=r.RGBA16F),G===r.UNSIGNED_BYTE&&(tt=it===_e?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT&&ct&&(tt=ct.RGBA16_EXT),G===r.SHORT&&ct&&(tt=ct.RGBA16_SNORM_EXT),G===r.UNSIGNED_SHORT_4_4_4_4&&(tt=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(tt=r.RGB5_A1)}return(tt===r.R16F||tt===r.R32F||tt===r.RG16F||tt===r.RG32F||tt===r.RGBA16F||tt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function S(R,y){let G;return R?y===null||y===Ii||y===fa?G=r.DEPTH24_STENCIL8:y===gi?G=r.DEPTH32F_STENCIL8:y===ua&&(G=r.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ii||y===fa?G=r.DEPTH_COMPONENT24:y===gi?G=r.DEPTH_COMPONENT32F:y===ua&&(G=r.DEPTH_COMPONENT16),G}function w(R,y){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==ln&&R.minFilter!==dn?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function E(R){let y=R.target;y.removeEventListener("dispose",E),T(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function x(R){let y=R.target;y.removeEventListener("dispose",x),D(y)}function T(R){let y=n.get(R);if(y.__webglInit===void 0)return;let G=R.source,W=f.get(G);if(W){let K=W[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(R),Object.keys(W).length===0&&f.delete(G)}n.remove(R)}function C(R){let y=n.get(R);r.deleteTexture(y.__webglTexture);let G=R.source,W=f.get(G);delete W[y.__cacheKey],a.memory.textures--}function D(R){let y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(y.__webglFramebuffer[W]))for(let K=0;K<y.__webglFramebuffer[W].length;K++)r.deleteFramebuffer(y.__webglFramebuffer[W][K]);else r.deleteFramebuffer(y.__webglFramebuffer[W]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[W])}else{if(Array.isArray(y.__webglFramebuffer))for(let W=0;W<y.__webglFramebuffer.length;W++)r.deleteFramebuffer(y.__webglFramebuffer[W]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let W=0;W<y.__webglColorRenderbuffer.length;W++)y.__webglColorRenderbuffer[W]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[W]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let G=R.textures;for(let W=0,K=G.length;W<K;W++){let dt=n.get(G[W]);dt.__webglTexture&&(r.deleteTexture(dt.__webglTexture),a.memory.textures--),n.remove(G[W])}n.remove(R)}let L=0;function F(){L=0}function I(){return L}function z(R){L=R}function H(){let R=L;return R>=i.maxTextures&&Kt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),L+=1,R}function k(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function Q(R,y){let G=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){let W=R.image;if(W===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{pt(G,R,y);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+y)}function Y(R,y){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){pt(G,R,y);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+y)}function P(R,y){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){pt(G,R,y);return}e.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+y)}function $(R,y){let G=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Gt(G,R,y);return}e.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+y)}let wt={[rc]:r.REPEAT,[Bi]:r.CLAMP_TO_EDGE,[sc]:r.MIRRORED_REPEAT},Tt={[ln]:r.NEAREST,[pm]:r.NEAREST_MIPMAP_NEAREST,[Fo]:r.NEAREST_MIPMAP_LINEAR,[dn]:r.LINEAR,[Oc]:r.LINEAR_MIPMAP_NEAREST,[Br]:r.LINEAR_MIPMAP_LINEAR},Wt={[xm]:r.NEVER,[bm]:r.ALWAYS,[vm]:r.LESS,[Sh]:r.LEQUAL,[ym]:r.EQUAL,[Mh]:r.GEQUAL,[Sm]:r.GREATER,[Mm]:r.NOTEQUAL};function qt(R,y){if(y.type===gi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===dn||y.magFilter===Oc||y.magFilter===Fo||y.magFilter===Br||y.minFilter===dn||y.minFilter===Oc||y.minFilter===Fo||y.minFilter===Br)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,wt[y.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,wt[y.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,wt[y.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Tt[y.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Tt[y.minFilter]),y.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,Wt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ln||y.minFilter!==Fo&&y.minFilter!==Br||y.type===gi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function $t(R,y){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",E));let W=y.source,K=f.get(W);K===void 0&&(K={},f.set(W,K));let dt=k(y);if(dt!==R.__cacheKey){K[dt]===void 0&&(K[dt]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,G=!0),K[dt].usedTimes++;let ct=K[R.__cacheKey];ct!==void 0&&(K[R.__cacheKey].usedTimes--,ct.usedTimes===0&&C(y)),R.__cacheKey=dt,R.__webglTexture=K[dt].texture}return G}function J(R,y,G){return Math.floor(Math.floor(R/G)/y)}function et(R,y,G,W){let dt=R.updateRanges;if(dt.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,G,W,y.data);else{dt.sort((Dt,vt)=>Dt.start-vt.start);let ct=0;for(let Dt=1;Dt<dt.length;Dt++){let vt=dt[ct],gt=dt[Dt],ut=vt.start+vt.count,kt=J(gt.start,y.width,4),Jt=J(vt.start,y.width,4);gt.start<=ut+1&&kt===Jt&&J(gt.start+gt.count-1,y.width,4)===kt?vt.count=Math.max(vt.count,gt.start+gt.count-vt.start):(++ct,dt[ct]=gt)}dt.length=ct+1;let tt=e.getParameter(r.UNPACK_ROW_LENGTH),it=e.getParameter(r.UNPACK_SKIP_PIXELS),xt=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let Dt=0,vt=dt.length;Dt<vt;Dt++){let gt=dt[Dt],ut=Math.floor(gt.start/4),kt=Math.ceil(gt.count/4),Jt=ut%y.width,O=Math.floor(ut/y.width),mt=kt,nt=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Jt),e.pixelStorei(r.UNPACK_SKIP_ROWS,O),e.texSubImage2D(r.TEXTURE_2D,0,Jt,O,mt,nt,G,W,y.data)}R.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,tt),e.pixelStorei(r.UNPACK_SKIP_PIXELS,it),e.pixelStorei(r.UNPACK_SKIP_ROWS,xt)}}function pt(R,y,G){let W=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(W=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(W=r.TEXTURE_3D);let K=$t(R,y),dt=y.source;e.bindTexture(W,R.__webglTexture,r.TEXTURE0+G);let ct=n.get(dt);if(dt.version!==ct.__version||K===!0){if(e.activeTexture(r.TEXTURE0+G),(typeof ImageBitmap!="undefined"&&y.image instanceof ImageBitmap)===!1){let nt=fe.getPrimaries(fe.workingColorSpace),yt=y.colorSpace===cr?null:fe.getPrimaries(y.colorSpace),Mt=y.colorSpace===cr||nt===yt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment);let it=p(y.image,!1,i.maxTextureSize);it=oe(y,it);let xt=s.convert(y.format,y.colorSpace),Dt=s.convert(y.type),vt=v(y.internalFormat,xt,Dt,y.normalized,y.colorSpace,y.isVideoTexture);qt(W,y);let gt,ut=y.mipmaps,kt=y.isVideoTexture!==!0,Jt=ct.__version===void 0||K===!0,O=dt.dataReady,mt=w(y,it);if(y.isDepthTexture)vt=S(y.format===zr,y.type),Jt&&(kt?e.texStorage2D(r.TEXTURE_2D,1,vt,it.width,it.height):e.texImage2D(r.TEXTURE_2D,0,vt,it.width,it.height,0,xt,Dt,null));else if(y.isDataTexture)if(ut.length>0){kt&&Jt&&e.texStorage2D(r.TEXTURE_2D,mt,vt,ut[0].width,ut[0].height);for(let nt=0,yt=ut.length;nt<yt;nt++)gt=ut[nt],kt?O&&e.texSubImage2D(r.TEXTURE_2D,nt,0,0,gt.width,gt.height,xt,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,nt,vt,gt.width,gt.height,0,xt,Dt,gt.data);y.generateMipmaps=!1}else kt?(Jt&&e.texStorage2D(r.TEXTURE_2D,mt,vt,it.width,it.height),O&&et(y,it,xt,Dt)):e.texImage2D(r.TEXTURE_2D,0,vt,it.width,it.height,0,xt,Dt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){kt&&Jt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,vt,ut[0].width,ut[0].height,it.depth);for(let nt=0,yt=ut.length;nt<yt;nt++)if(gt=ut[nt],y.format!==_i)if(xt!==null)if(kt){if(O)if(y.layerUpdates.size>0){let Mt=Pf(gt.width,gt.height,y.format,y.type);for(let st of y.layerUpdates){let ht=gt.data.subarray(st*Mt/gt.data.BYTES_PER_ELEMENT,(st+1)*Mt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,nt,0,0,st,gt.width,gt.height,1,xt,ht)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,nt,0,0,0,gt.width,gt.height,it.depth,xt,gt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,nt,vt,gt.width,gt.height,it.depth,0,gt.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?O&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,nt,0,0,0,gt.width,gt.height,it.depth,xt,Dt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,nt,vt,gt.width,gt.height,it.depth,0,xt,Dt,gt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{kt&&Jt&&e.texStorage2D(r.TEXTURE_2D,mt,vt,ut[0].width,ut[0].height);for(let nt=0,yt=ut.length;nt<yt;nt++)gt=ut[nt],y.format!==_i?xt!==null?kt?O&&e.compressedTexSubImage2D(r.TEXTURE_2D,nt,0,0,gt.width,gt.height,xt,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,nt,vt,gt.width,gt.height,0,gt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?O&&e.texSubImage2D(r.TEXTURE_2D,nt,0,0,gt.width,gt.height,xt,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,nt,vt,gt.width,gt.height,0,xt,Dt,gt.data)}else if(y.isDataArrayTexture)if(kt){if(Jt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,vt,it.width,it.height,it.depth),O)if(y.layerUpdates.size>0){let nt=Pf(it.width,it.height,y.format,y.type);for(let yt of y.layerUpdates){let Mt=it.data.subarray(yt*nt/it.data.BYTES_PER_ELEMENT,(yt+1)*nt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,yt,it.width,it.height,1,xt,Dt,Mt)}y.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,xt,Dt,it.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,vt,it.width,it.height,it.depth,0,xt,Dt,it.data);else if(y.isData3DTexture)kt?(Jt&&e.texStorage3D(r.TEXTURE_3D,mt,vt,it.width,it.height,it.depth),O&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,xt,Dt,it.data)):e.texImage3D(r.TEXTURE_3D,0,vt,it.width,it.height,it.depth,0,xt,Dt,it.data);else if(y.isFramebufferTexture){if(Jt)if(kt)e.texStorage2D(r.TEXTURE_2D,mt,vt,it.width,it.height);else{let nt=it.width,yt=it.height;for(let Mt=0;Mt<mt;Mt++)e.texImage2D(r.TEXTURE_2D,Mt,vt,nt,yt,0,xt,Dt,null),nt>>=1,yt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in r){let nt=r.canvas;if(nt.hasAttribute("layoutsubtree")||nt.setAttribute("layoutsubtree","true"),it.parentNode!==nt){nt.appendChild(it),d.add(y),nt.onpaint=yt=>{let Mt=yt.changedElements;for(let st of d)Mt.includes(st.image)&&(st.needsUpdate=!0)},nt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,it);else{let Mt=r.RGBA,st=r.RGBA,ht=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Mt,st,ht,it)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ut.length>0){if(kt&&Jt){let nt=Xt(ut[0]);e.texStorage2D(r.TEXTURE_2D,mt,vt,nt.width,nt.height)}for(let nt=0,yt=ut.length;nt<yt;nt++)gt=ut[nt],kt?O&&e.texSubImage2D(r.TEXTURE_2D,nt,0,0,xt,Dt,gt):e.texImage2D(r.TEXTURE_2D,nt,vt,xt,Dt,gt);y.generateMipmaps=!1}else if(kt){if(Jt){let nt=Xt(it);e.texStorage2D(r.TEXTURE_2D,mt,vt,nt.width,nt.height)}O&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,xt,Dt,it)}else e.texImage2D(r.TEXTURE_2D,0,vt,xt,Dt,it);g(y)&&b(W),ct.__version=dt.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Gt(R,y,G){if(y.image.length!==6)return;let W=$t(R,y),K=y.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+G);let dt=n.get(K);if(K.version!==dt.__version||W===!0){e.activeTexture(r.TEXTURE0+G);let ct=fe.getPrimaries(fe.workingColorSpace),tt=y.colorSpace===cr?null:fe.getPrimaries(y.colorSpace),it=y.colorSpace===cr||ct===tt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let xt=y.isCompressedTexture||y.image[0].isCompressedTexture,Dt=y.image[0]&&y.image[0].isDataTexture,vt=[];for(let st=0;st<6;st++)!xt&&!Dt?vt[st]=p(y.image[st],!0,i.maxCubemapSize):vt[st]=Dt?y.image[st].image:y.image[st],vt[st]=oe(y,vt[st]);let gt=vt[0],ut=s.convert(y.format,y.colorSpace),kt=s.convert(y.type),Jt=v(y.internalFormat,ut,kt,y.normalized,y.colorSpace),O=y.isVideoTexture!==!0,mt=dt.__version===void 0||W===!0,nt=K.dataReady,yt=w(y,gt);qt(r.TEXTURE_CUBE_MAP,y);let Mt;if(xt){O&&mt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Jt,gt.width,gt.height);for(let st=0;st<6;st++){Mt=vt[st].mipmaps;for(let ht=0;ht<Mt.length;ht++){let at=Mt[ht];y.format!==_i?ut!==null?O?nt&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht,0,0,at.width,at.height,ut,at.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht,Jt,at.width,at.height,0,at.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?nt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht,0,0,at.width,at.height,ut,kt,at.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht,Jt,at.width,at.height,0,ut,kt,at.data)}}}else{if(Mt=y.mipmaps,O&&mt){Mt.length>0&&yt++;let st=Xt(vt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Jt,st.width,st.height)}for(let st=0;st<6;st++)if(Dt){O?nt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,vt[st].width,vt[st].height,ut,kt,vt[st].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Jt,vt[st].width,vt[st].height,0,ut,kt,vt[st].data);for(let ht=0;ht<Mt.length;ht++){let Ht=Mt[ht].image[st].image;O?nt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht+1,0,0,Ht.width,Ht.height,ut,kt,Ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht+1,Jt,Ht.width,Ht.height,0,ut,kt,Ht.data)}}else{O?nt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,ut,kt,vt[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Jt,ut,kt,vt[st]);for(let ht=0;ht<Mt.length;ht++){let at=Mt[ht];O?nt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht+1,0,0,ut,kt,at.image[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht+1,Jt,ut,kt,at.image[st])}}}g(y)&&b(r.TEXTURE_CUBE_MAP),dt.__version=K.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function _t(R,y,G,W,K,dt){let ct=s.convert(G.format,G.colorSpace),tt=s.convert(G.type),it=v(G.internalFormat,ct,tt,G.normalized,G.colorSpace),xt=n.get(y),Dt=n.get(G);if(Dt.__renderTarget=y,!xt.__hasExternalTextures){let vt=Math.max(1,y.width>>dt),gt=Math.max(1,y.height>>dt);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,dt,it,vt,gt,y.depth,0,ct,tt,null):e.texImage2D(K,dt,it,vt,gt,0,ct,tt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Zt(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,W,K,Dt.__webglTexture,0,Ct(y)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,W,K,Dt.__webglTexture,dt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Lt(R,y,G){if(r.bindRenderbuffer(r.RENDERBUFFER,R),y.depthBuffer){let W=y.depthTexture,K=W&&W.isDepthTexture?W.type:null,dt=S(y.stencilBuffer,K),ct=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Zt(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ct(y),dt,y.width,y.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct(y),dt,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,dt,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ct,r.RENDERBUFFER,R)}else{let W=y.textures;for(let K=0;K<W.length;K++){let dt=W[K],ct=s.convert(dt.format,dt.colorSpace),tt=s.convert(dt.type),it=v(dt.internalFormat,ct,tt,dt.normalized,dt.colorSpace);Zt(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ct(y),it,y.width,y.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct(y),it,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,it,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Nt(R,y,G){let W=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(y.depthTexture);if(K.__renderTarget=y,(!K.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),W){if(K.__webglInit===void 0&&(K.__webglInit=!0,y.depthTexture.addEventListener("dispose",E)),K.__webglTexture===void 0){K.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),qt(r.TEXTURE_CUBE_MAP,y.depthTexture);let xt=s.convert(y.depthTexture.format),Dt=s.convert(y.depthTexture.type),vt;y.depthTexture.format===ki?vt=r.DEPTH_COMPONENT24:y.depthTexture.format===zr&&(vt=r.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,vt,y.width,y.height,0,xt,Dt,null)}}else Q(y.depthTexture,0);let dt=K.__webglTexture,ct=Ct(y),tt=W?r.TEXTURE_CUBE_MAP_POSITIVE_X+G:r.TEXTURE_2D,it=y.depthTexture.format===zr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(y.depthTexture.format===ki)Zt(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,it,tt,dt,0,ct):r.framebufferTexture2D(r.FRAMEBUFFER,it,tt,dt,0);else if(y.depthTexture.format===zr)Zt(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,it,tt,dt,0,ct):r.framebufferTexture2D(r.FRAMEBUFFER,it,tt,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function j(R){let y=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let W=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),W){let K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),y.__depthDisposeCallback=K}y.__boundDepthTexture=W}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(G)for(let W=0;W<6;W++)Nt(y.__webglFramebuffer[W],R,W);else{let W=R.texture.mipmaps;W&&W.length>0?Nt(y.__webglFramebuffer[0],R,0):Nt(y.__webglFramebuffer,R,0)}else if(G){y.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[W]),y.__webglDepthbuffer[W]===void 0)y.__webglDepthbuffer[W]=r.createRenderbuffer(),Lt(y.__webglDepthbuffer[W],R,!1);else{let K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=y.__webglDepthbuffer[W];r.bindRenderbuffer(r.RENDERBUFFER,dt),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,dt)}}else{let W=R.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Lt(y.__webglDepthbuffer,R,!1);else{let K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,dt),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,dt)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(R,y,G){let W=n.get(R);y!==void 0&&_t(W.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&j(R)}function ot(R){let y=R.texture,G=n.get(R),W=n.get(y);R.addEventListener("dispose",x);let K=R.textures,dt=R.isWebGLCubeRenderTarget===!0,ct=K.length>1;if(ct||(W.__webglTexture===void 0&&(W.__webglTexture=r.createTexture()),W.__version=y.version,a.memory.textures++),dt){G.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer[tt]=[];for(let it=0;it<y.mipmaps.length;it++)G.__webglFramebuffer[tt][it]=r.createFramebuffer()}else G.__webglFramebuffer[tt]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer=[];for(let tt=0;tt<y.mipmaps.length;tt++)G.__webglFramebuffer[tt]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(ct)for(let tt=0,it=K.length;tt<it;tt++){let xt=n.get(K[tt]);xt.__webglTexture===void 0&&(xt.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&Zt(R)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let tt=0;tt<K.length;tt++){let it=K[tt];G.__webglColorRenderbuffer[tt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[tt]);let xt=s.convert(it.format,it.colorSpace),Dt=s.convert(it.type),vt=v(it.internalFormat,xt,Dt,it.normalized,it.colorSpace,R.isXRRenderTarget===!0),gt=Ct(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,gt,vt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+tt,r.RENDERBUFFER,G.__webglColorRenderbuffer[tt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),Lt(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(dt){e.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture),qt(r.TEXTURE_CUBE_MAP,y);for(let tt=0;tt<6;tt++)if(y.mipmaps&&y.mipmaps.length>0)for(let it=0;it<y.mipmaps.length;it++)_t(G.__webglFramebuffer[tt][it],R,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,it);else _t(G.__webglFramebuffer[tt],R,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);g(y)&&b(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let tt=0,it=K.length;tt<it;tt++){let xt=K[tt],Dt=n.get(xt),vt=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(vt,Dt.__webglTexture),qt(vt,xt),_t(G.__webglFramebuffer,R,xt,r.COLOR_ATTACHMENT0+tt,vt,0),g(xt)&&b(vt)}e.unbindTexture()}else{let tt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(tt,W.__webglTexture),qt(tt,y),y.mipmaps&&y.mipmaps.length>0)for(let it=0;it<y.mipmaps.length;it++)_t(G.__webglFramebuffer[it],R,y,r.COLOR_ATTACHMENT0,tt,it);else _t(G.__webglFramebuffer,R,y,r.COLOR_ATTACHMENT0,tt,0);g(y)&&b(tt),e.unbindTexture()}R.depthBuffer&&j(R)}function N(R){let y=R.textures;for(let G=0,W=y.length;G<W;G++){let K=y[G];if(g(K)){let dt=A(R),ct=n.get(K).__webglTexture;e.bindTexture(dt,ct),b(dt),e.unbindTexture()}}}let ft=[],zt=[];function Ut(R){if(R.samples>0){if(Zt(R)===!1){let y=R.textures,G=R.width,W=R.height,K=r.COLOR_BUFFER_BIT,dt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=n.get(R),tt=y.length>1;if(tt)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(r.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);let it=R.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),tt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ct.__webglColorRenderbuffer[xt]);let Dt=n.get(y[xt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Dt,0)}r.blitFramebuffer(0,0,G,W,0,0,G,W,K,r.NEAREST),l===!0&&(ft.length=0,zt.length=0,ft.push(r.COLOR_ATTACHMENT0+xt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ft.push(dt),zt.push(dt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,zt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ft))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),tt)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(r.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.RENDERBUFFER,ct.__webglColorRenderbuffer[xt]);let Dt=n.get(y[xt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.TEXTURE_2D,Dt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let y=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function Ct(R){return Math.min(i.maxSamples,R.samples)}function Zt(R){let y=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function U(R){let y=a.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function oe(R,y){let G=R.colorSpace,W=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==ja&&G!==cr&&(fe.getTransfer(G)===_e?(W!==_i||K!==Yn)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",G)),y}function Xt(R){return typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame!="undefined"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.getTextureUnits=I,this.setTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=P,this.setTextureCube=$,this.rebindTextures=rt,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Zt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function KM(r,t){function e(n,i=cr){let s,a=fe.getTransfer(i);if(n===Yn)return r.UNSIGNED_BYTE;if(n===zc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===kc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===yf)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Sf)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===xf)return r.BYTE;if(n===vf)return r.SHORT;if(n===ua)return r.UNSIGNED_SHORT;if(n===Bc)return r.INT;if(n===Ii)return r.UNSIGNED_INT;if(n===gi)return r.FLOAT;if(n===Li)return r.HALF_FLOAT;if(n===Mf)return r.ALPHA;if(n===bf)return r.RGB;if(n===_i)return r.RGBA;if(n===ki)return r.DEPTH_COMPONENT;if(n===zr)return r.DEPTH_STENCIL;if(n===Vc)return r.RED;if(n===Gc)return r.RED_INTEGER;if(n===kr)return r.RG;if(n===Hc)return r.RG_INTEGER;if(n===Wc)return r.RGBA_INTEGER;if(n===Oo||n===Bo||n===zo||n===ko)if(a===_e)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Oo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Oo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ko)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xc||n===qc||n===Yc||n===Zc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Xc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jc||n===$c||n===Kc||n===Qc||n===jc||n===Vo||n===th)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Jc||n===$c)return a===_e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Kc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Qc)return s.COMPRESSED_R11_EAC;if(n===jc)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Vo)return s.COMPRESSED_RG11_EAC;if(n===th)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===eh||n===nh||n===ih||n===rh||n===sh||n===ah||n===oh||n===lh||n===ch||n===hh||n===uh||n===fh||n===dh||n===ph)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===eh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ih)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ah)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===lh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ch)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dh)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ph)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mh||n===gh||n===_h)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===mh)return a===_e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_h)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xh||n===vh||n===Go||n===yh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===xh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===vh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Go)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fa?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var QM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Jf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new mo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ni({vertexShader:QM,fragmentShader:jM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ce(new Eo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$f=class extends Vi{constructor(t,e){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,_=typeof XRWebGLBinding!="undefined",p=new Jf,g={},b=e.getContextAttributes(),A=null,v=null,S=[],w=[],E=new bt,x=null,T=null,C=new fn;C.viewport=new De;let D=new fn;D.viewport=new De;let L=[C,D],F=new Lc,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=S[J];return et===void 0&&(et=new ea,S[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=S[J];return et===void 0&&(et=new ea,S[J]=et),et.getGripSpace()},this.getHand=function(J){let et=S[J];return et===void 0&&(et=new ea,S[J]=et),et.getHandSpace()};function H(J){let et=w.indexOf(J.inputSource);if(et===-1)return;let pt=S[et];pt!==void 0&&(pt.update(J.inputSource,J.frame,c||a),pt.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",Q);for(let J=0;J<S.length;J++){let et=w[J];et!==null&&(w[J]=null,S[J].disconnect(et))}I=null,z=null,p.reset();for(let J in g)delete g[J];if(t.setRenderTarget(A),f=null,u=null,d=null,i=null,v=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(E.width,E.height,!1),T!==null){let J=T.camera;J.fov=T.fov,J.zoom=T.zoom,J.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(A=t.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",k),i.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Gt=null,_t=null;b.depth&&(_t=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=b.stencil?zr:ki,Gt=b.stencil?fa:Ii);let Lt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Lt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new qn(u.textureWidth,u.textureHeight,{format:_i,type:Yn,depthTexture:new Ir(u.textureWidth,u.textureHeight,Gt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let pt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new qn(f.framebufferWidth,f.framebufferHeight,{format:_i,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$t.setContext(i),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Q(J){for(let et=0;et<J.removed.length;et++){let pt=J.removed[et],Gt=w.indexOf(pt);Gt>=0&&(w[Gt]=null,S[Gt].disconnect(pt))}for(let et=0;et<J.added.length;et++){let pt=J.added[et],Gt=w.indexOf(pt);if(Gt===-1){for(let Lt=0;Lt<S.length;Lt++)if(Lt>=w.length){w.push(pt),Gt=Lt;break}else if(w[Lt]===null){w[Lt]=pt,Gt=Lt;break}if(Gt===-1)break}let _t=S[Gt];_t&&_t.connect(pt)}}let Y=new V,P=new V;function $(J,et,pt){Y.setFromMatrixPosition(et.matrixWorld),P.setFromMatrixPosition(pt.matrixWorld);let Gt=Y.distanceTo(P),_t=et.projectionMatrix.elements,Lt=pt.projectionMatrix.elements,Nt=_t[14]/(_t[10]-1),j=_t[14]/(_t[10]+1),rt=(_t[9]+1)/_t[5],ot=(_t[9]-1)/_t[5],N=(_t[8]-1)/_t[0],ft=(Lt[8]+1)/Lt[0],zt=Nt*N,Ut=Nt*ft,Ct=Gt/(-N+ft),Zt=Ct*-N;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Zt),J.translateZ(Ct),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),_t[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let U=Nt+Ct,oe=j+Ct,Xt=zt-Zt,R=Ut+(Gt-Zt),y=rt*j/oe*U,G=ot*j/oe*U;J.projectionMatrix.makePerspective(Xt,R,y,G,U,oe),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function wt(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let et=J.near,pt=J.far;p.texture!==null&&(p.depthNear>0&&(et=p.depthNear),p.depthFar>0&&(pt=p.depthFar)),F.near=D.near=C.near=et,F.far=D.far=C.far=pt,(I!==F.near||z!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),I=F.near,z=F.far),F.layers.mask=J.layers.mask|6,C.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;let Gt=J.parent,_t=F.cameras;wt(F,Gt);for(let Lt=0;Lt<_t.length;Lt++)wt(_t[Lt],Gt);_t.length===2?$(F,C,D):F.projectionMatrix.copy(C.projectionMatrix),T===null&&J.isPerspectiveCamera&&(T={camera:J,fov:J.fov,zoom:J.zoom}),Tt(J,F,Gt)};function Tt(J,et,pt){pt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(pt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=oc*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(J){return g[J]};let Wt=null;function qt(J,et){if(h=et.getViewerPose(c||a),m=et,h!==null){let pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Gt=!1;pt.length!==F.cameras.length&&(F.cameras.length=0,Gt=!0);for(let j=0;j<pt.length;j++){let rt=pt[j],ot=null;if(f!==null)ot=f.getViewport(rt);else{let ft=d.getViewSubImage(u,rt);ot=ft.viewport,j===0&&(t.setRenderTargetTextures(v,ft.colorTexture,ft.depthStencilTexture),t.setRenderTarget(v))}let N=L[j];N===void 0&&(N=new fn,N.layers.enable(j),N.viewport=new De,L[j]=N),N.matrix.fromArray(rt.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(rt.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(ot.x,ot.y,ot.width,ot.height),j===0&&(F.matrix.copy(N.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Gt===!0&&F.cameras.push(N)}let _t=i.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let j=d.getDepthInformation(pt[0]);j&&j.isValid&&j.texture&&p.init(j,i.renderState)}if(_t&&_t.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let j=0;j<pt.length;j++){let rt=pt[j].camera;if(rt){let ot=g[rt];ot||(ot=new mo,g[rt]=ot);let N=d.getCameraImage(rt);ot.sourceTexture=N}}}}for(let pt=0;pt<S.length;pt++){let Gt=w[pt],_t=S[pt];Gt!==null&&_t!==void 0&&_t.update(Gt,et,c||a)}Wt&&Wt(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),m=null}let $t=new rg;$t.setAnimationLoop(qt),this.setAnimationLoop=function(J){Wt=J},this.dispose=function(){}}},tb=new Se,hg=new te;hg.set(-1,0,0,0,1,0,0,0,1);function eb(r,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Af(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,b,A,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),d(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,b,A):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===pn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===pn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let b=t.get(g),A=b.envMap,v=b.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(tb.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(hg),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,b,A){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*b,p.scale.value=A*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,b){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===pn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let b=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function nb(r,t,e,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let w=S.program;n.uniformBlockBinding(v,w)}function c(v,S){let w=i[v.id];w===void 0&&(p(v),w=h(v),i[v.id]=w,v.addEventListener("dispose",b));let E=S.program;n.updateUBOMapping(v,E);let x=t.render.frame;s[v.id]!==x&&(u(v),s[v.id]=x)}function h(v){let S=d();v.__bindingPointIndex=S;let w=r.createBuffer(),E=v.__size,x=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,E,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,w),w}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let S=i[v.id],w=v.uniforms,E=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let x=0,T=w.length;x<T;x++){let C=w[x];if(Array.isArray(C))for(let D=0,L=C.length;D<L;D++)f(C[D],x,D,E);else f(C,x,0,E)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,S,w,E){if(_(v,S,w,E)===!0){let x=v.__offset,T=v.value;if(Array.isArray(T)){let C=0;for(let D=0;D<T.length;D++){let L=T[D],F=g(L);m(L,v.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,v.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,x,v.__data)}}function m(v,S,w){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,w)}function _(v,S,w,E){let x=v.value,T=S+"_"+w;if(E[T]===void 0)return typeof x=="number"||typeof x=="boolean"?E[T]=x:ArrayBuffer.isView(x)?E[T]=x.slice():E[T]=x.clone(),!0;{let C=E[T];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return E[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function p(v){let S=v.uniforms,w=0,E=16;for(let T=0,C=S.length;T<C;T++){let D=Array.isArray(S[T])?S[T]:[S[T]];for(let L=0,F=D.length;L<F;L++){let I=D[L],z=Array.isArray(I.value)?I.value:[I.value];for(let H=0,k=z.length;H<k;H++){let Q=z[H],Y=g(Q),P=w%E,$=P%Y.boundary,wt=P+$;w+=$,wt!==0&&E-wt<Y.storage&&(w+=E-wt),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=Y.storage}}}let x=w%E;return x>0&&(w+=E-x),v.__size=w,v.__cache={},this}function g(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",v),S}function b(v){let S=v.target;S.removeEventListener("dispose",b);let w=a.indexOf(S.__bindingPointIndex);a.splice(w,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function A(){for(let v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:A}}var ib=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yi=null;function rb(){return Yi===null&&(Yi=new lo(ib,16,16,kr,Li),Yi.name="DFG_LUT",Yi.minFilter=dn,Yi.magFilter=dn,Yi.wrapS=Bi,Yi.wrapT=Bi,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}var Eh=class{constructor(t={}){let{canvas:e=wm(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Yn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=f,p=new Set([Wc,Hc,Gc]),g=new Set([Yn,Ii,ua,fa,zc,kc]),b=new Uint32Array(4),A=new Int32Array(4),v=new V,S=null,w=null,E=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,L=null,F=null,I=null,z=null;this._outputColorSpace=Nn;let H=0,k=0,Q=null,Y=-1,P=null,$=new De,wt=new De,Tt=null,Wt=new ne(0),qt=0,$t=e.width,J=e.height,et=1,pt=null,Gt=null,_t=new De(0,0,$t,J),Lt=new De(0,0,$t,J),Nt=!1,j=new na,rt=!1,ot=!1,N=new Se,ft=new V,zt=new De,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ct=!1;function Zt(){return Q===null?et:1}let U=n;function oe(M,B){return e.getContext(M,B)}let Xt,R,y,G,W,K,dt,ct,tt,it,xt,Dt,vt,gt,ut,kt,Jt,O,mt,nt,yt,Mt,st;try{let M={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ht,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",Yt,!1),U===null){let B="webgl2";if(U=oe(B,M),U===null)throw oe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ht()}catch(M){throw e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",Yt,!1),Qt("WebGLRenderer: "+M.message),M}function ht(){Xt=new uS(U),Xt.init(),yt=new KM(U,Xt),R=new eS(U,Xt,t,yt),y=new JM(U,Xt),R.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),F=U.createFramebuffer(),I=U.createFramebuffer(),z=U.createFramebuffer(),G=new pS(U),W=new UM,K=new $M(U,Xt,y,W,R,yt,G),dt=new hS(C),ct=new gx(U),Mt=new jy(U,ct),tt=new fS(U,ct,G,Mt),it=new gS(U,tt,ct,Mt,G),O=new mS(U,R,K),ut=new nS(W),xt=new NM(C,dt,Xt,R,Mt,ut),Dt=new eb(C,W),vt=new OM,gt=new HM(Xt),Jt=new Qy(C,dt,y,it,m,l),kt=new ZM(C,it,R),st=new nb(U,G,R,y),mt=new tS(U,Xt,G),nt=new dS(U,Xt,G),G.programs=xt.programs,C.capabilities=R,C.extensions=Xt,C.properties=W,C.renderLists=vt,C.shadowMap=kt,C.state=y,C.info=G}_!==Yn&&(T=new xS(_,e.width,e.height,o,i,s));let at=new $f(C,U);this.xr=at,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=Xt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Xt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(M){M!==void 0&&(et=M,this.setSize($t,J,!1))},this.getSize=function(M){return M.set($t,J)},this.setSize=function(M,B,Z=!0){if(at.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}$t=M,J=B,e.width=Math.floor(M*et),e.height=Math.floor(B*et),Z===!0&&(e.style.width=M+"px",e.style.height=B+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set($t*et,J*et).floor()},this.setDrawingBufferSize=function(M,B,Z){$t=M,J=B,et=Z,e.width=Math.floor(M*Z),e.height=Math.floor(B*Z),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(_===Yn){Qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy($)},this.getViewport=function(M){return M.copy(_t)},this.setViewport=function(M,B,Z,X){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,B,Z,X),y.viewport($.copy(_t).multiplyScalar(et).round())},this.getScissor=function(M){return M.copy(Lt)},this.setScissor=function(M,B,Z,X){M.isVector4?Lt.set(M.x,M.y,M.z,M.w):Lt.set(M,B,Z,X),y.scissor(wt.copy(Lt).multiplyScalar(et).round())},this.getScissorTest=function(){return Nt},this.setScissorTest=function(M){y.setScissorTest(Nt=M)},this.setOpaqueSort=function(M){pt=M},this.setTransparentSort=function(M){Gt=M},this.getClearColor=function(M){return M.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,Z=!0){let X=0;if(M){let q=!1;if(Q!==null){let St=Q.texture.format;q=p.has(St)}if(q){let St=Q.texture.type,Pt=g.has(St),At=Jt.getClearColor(),Ot=Jt.getClearAlpha(),Vt=At.r,ie=At.g,ue=At.b;Pt?(b[0]=Vt,b[1]=ie,b[2]=ue,b[3]=Ot,U.clearBufferuiv(U.COLOR,0,b)):(A[0]=Vt,A[1]=ie,A[2]=ue,A[3]=Ot,U.clearBufferiv(U.COLOR,0,A))}else X|=U.COLOR_BUFFER_BIT}B&&(X|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),L=M},this.dispose=function(){e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",Yt,!1),Jt.dispose(),vt.dispose(),gt.dispose(),W.dispose(),dt.dispose(),it.dispose(),Mt.dispose(),st.dispose(),xt.dispose(),at.dispose(),at.removeEventListener("sessionstart",Pe),at.removeEventListener("sessionend",Me),de.stop()};function Ht(M){M.preventDefault(),wf("WebGLRenderer: Context Lost."),D=!0}function lt(){wf("WebGLRenderer: Context Restored."),D=!1;let M=G.autoReset,B=kt.enabled,Z=kt.autoUpdate,X=kt.needsUpdate,q=kt.type;ht(),G.autoReset=M,kt.enabled=B,kt.autoUpdate=Z,kt.needsUpdate=X,kt.type=q}function Yt(M){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ft(M){let B=M.target;B.removeEventListener("dispose",Ft),jt(B)}function jt(M){qe(M),W.remove(M)}function qe(M){let B=W.get(M).programs;B!==void 0&&(B.forEach(function(Z){xt.releaseProgram(Z)}),M.isShaderMaterial&&xt.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,Z,X,q,St){B===null&&(B=Ut);let Pt=q.isMesh&&q.matrixWorld.determinantAffine()<0,At=an(M,B,Z,X,q);y.setMaterial(X,Pt);let Ot=Z.index,Vt=1;if(X.wireframe===!0){if(Ot=tt.getWireframeAttribute(Z),Ot===void 0)return;Vt=2}let ie=Z.drawRange,ue=Z.attributes.position,Bt=ie.start*Vt,ge=(ie.start+ie.count)*Vt;St!==null&&(Bt=Math.max(Bt,St.start*Vt),ge=Math.min(ge,(St.start+St.count)*Vt)),Ot!==null?(Bt=Math.max(Bt,0),ge=Math.min(ge,Ot.count)):ue!=null&&(Bt=Math.max(Bt,0),ge=Math.min(ge,ue.count));let Ze=ge-Bt;if(Ze<0||Ze===1/0)return;Mt.setup(q,X,At,Z,Ot);let Ie,be=mt;if(Ot!==null&&(Ie=ct.get(Ot),be=nt,be.setIndex(Ie)),q.isMesh)X.wireframe===!0?(y.setLineWidth(X.wireframeLinewidth*Zt()),be.setMode(U.LINES)):be.setMode(U.TRIANGLES);else if(q.isLine){let vn=X.linewidth;vn===void 0&&(vn=1),y.setLineWidth(vn*Zt()),q.isLineSegments?be.setMode(U.LINES):q.isLineLoop?be.setMode(U.LINE_LOOP):be.setMode(U.LINE_STRIP)}else q.isPoints?be.setMode(U.POINTS):q.isSprite&&be.setMode(U.TRIANGLES);if(q.isBatchedMesh)if(Xt.get("WEBGL_multi_draw"))be.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let vn=q._multiDrawStarts,Rt=q._multiDrawCounts,Dn=q._multiDrawCount,me=Ot?ct.get(Ot).bytesPerElement:1,di=W.get(X).currentProgram.getUniforms();for(let Fi=0;Fi<Dn;Fi++)di.setValue(U,"_gl_DrawID",Fi),be.render(vn[Fi]/me,Rt[Fi])}else if(q.isInstancedMesh)be.renderInstances(Bt,Ze,q.count);else if(Z.isInstancedBufferGeometry){let vn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Rt=Math.min(Z.instanceCount,vn);be.renderInstances(Bt,Ze,Rt)}else be.render(Bt,Ze)};function le(M,B,Z,X){L!==null&&M.isNodeMaterial&&L.setObject(X,M),rt===!0&&ut.setState(M,Z,!1),M.transparent===!0&&M.side===mi&&M.forceSinglePass===!1?(M.side=pn,M.needsUpdate=!0,ze(M,B,X),M.side=Fr,M.needsUpdate=!0,ze(M,B,X),M.side=mi):ze(M,B,X)}this.compile=function(M,B,Z=null){Z===null&&(Z=M),L!==null&&L.renderStart(M,B,Z),w=gt.get(Z),w.init(B),x.push(w),Z.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),M!==Z&&M.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),w.setupLights(),L!==null&&L.updateLights(w.state.lightsArray),ot=this.localClippingEnabled,rt=ut.init(this.clippingPlanes,ot),rt===!0&&ut.setGlobalState(this.clippingPlanes,B),L!==null&&kt.render(w.state.shadowsArray,Z,B);let X=new Set;return M.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let St=q.material;if(St)if(Array.isArray(St))for(let Pt=0;Pt<St.length;Pt++){let At=St[Pt];le(At,Z,B,q),X.add(At)}else le(St,Z,B,q),X.add(St)}),w=x.pop(),L!==null&&L.renderEnd(),X},this.compileAsync=function(M,B,Z=null){let X=this.compile(M,B,Z);return new Promise(q=>{function St(){if(X.forEach(function(Pt){let Ot=W.get(Pt).currentProgram;(Ot===void 0||Ot.isReady())&&X.delete(Pt)}),X.size===0){q(M);return}setTimeout(St,10)}Xt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Re=null;function sn(M){Re&&Re(M)}function Pe(){de.stop()}function Me(){de.start()}let de=new rg;de.setAnimationLoop(sn),typeof self!="undefined"&&de.setContext(self),this.setAnimationLoop=function(M){Re=M,at.setAnimationLoop(M),M===null?de.stop():de.start()},at.addEventListener("sessionstart",Pe),at.addEventListener("sessionend",Me),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;L!==null&&L.renderStart(M,B);let Z=at.enabled===!0&&at.isPresenting===!0,X=T!==null&&(Q===null||Z)&&T.begin(C,Q);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(B),B=at.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,B,Q),w=gt.get(M,x.length),w.init(B),w.state.textureUnits=K.getTextureUnits(),x.push(w),N.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),j.setFromProjectionMatrix(N,Ri,B.reversedDepth),ot=this.localClippingEnabled,rt=ut.init(this.clippingPlanes,ot),S=vt.get(M,E.length),S.init(),E.push(S),at.enabled===!0&&at.isPresenting===!0){let Pt=C.xr.getDepthSensingMesh();Pt!==null&&In(Pt,B,-1/0,C.sortObjects)}In(M,B,0,C.sortObjects),S.finish(),L!==null&&L.updateLights(w.state.lightsArray),C.sortObjects===!0&&S.sort(pt,Gt),Ct=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ct&&Jt.addToRenderList(S,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&ut.beginShadows();let q=w.state.shadowsArray;if(kt.render(q,M,B),rt===!0&&ut.endShadows(),(X&&T.hasRenderPass())===!1){let Pt=S.opaque,At=S.transmissive;if(w.setupLights(),B.isArrayCamera){let Ot=B.cameras;if(At.length>0)for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ue=Ot[Vt];xn(Pt,At,M,ue)}Ct&&Jt.render(M);for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ue=Ot[Vt];Ee(S,M,ue,ue.viewport)}}else At.length>0&&xn(Pt,At,M,B),Ct&&Jt.render(M),Ee(S,M,B)}Q!==null&&k===0&&(K.updateMultisampleRenderTarget(Q),K.updateRenderTargetMipmap(Q)),X&&T.end(C),M.isScene===!0&&M.onAfterRender(C,M,B),Mt.resetDefaultState(),Y=-1,P=null,x.pop(),x.length>0?(w=x[x.length-1],K.setTextureUnits(w.state.textureUnits),rt===!0&&ut.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?S=E[E.length-1]:S=null,L!==null&&L.renderEnd()};function In(M,B,Z,X){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)Z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(j)){X&&zt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(N);let Pt=it.update(M),At=M.material;At.visible&&S.push(M,Pt,At,Z,zt.z,null,B)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(j))){let Pt=it.update(M),At=M.material;if(X&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),zt.copy(M.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),zt.copy(Pt.boundingSphere.center)),zt.applyMatrix4(M.matrixWorld).applyMatrix4(N)),Array.isArray(At)){let Ot=Pt.groups;for(let Vt=0,ie=Ot.length;Vt<ie;Vt++){let ue=Ot[Vt],Bt=At[ue.materialIndex];Bt&&Bt.visible&&S.push(M,Pt,Bt,Z,zt.z,ue,B)}}else At.visible&&S.push(M,Pt,At,Z,zt.z,null,B)}}let St=M.children;for(let Pt=0,At=St.length;Pt<At;Pt++)In(St[Pt],B,Z,X)}function Ee(M,B,Z,X){let{opaque:q,transmissive:St,transparent:Pt}=M;w.setupLightsView(Z),rt===!0&&ut.setGlobalState(C.clippingPlanes,Z),X&&y.viewport($.copy(X)),q.length>0&&Ln(q,B,Z),St.length>0&&Ln(St,B,Z),Pt.length>0&&Ln(Pt,B,Z),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function xn(M,B,Z,X){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){let Bt=Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new qn(1,1,{generateMipmaps:!0,type:Bt?Li:Yn,minFilter:Br,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:fe.workingColorSpace})}let St=w.state.transmissionRenderTarget[X.id],Pt=X.viewport||$;St.setSize(Pt.z*C.transmissionResolutionScale,Pt.w*C.transmissionResolutionScale);let At=C.getRenderTarget(),Ot=C.getActiveCubeFace(),Vt=C.getActiveMipmapLevel();C.setRenderTarget(St),C.getClearColor(Wt),qt=C.getClearAlpha(),qt<1&&C.setClearColor(16777215,.5),C.clear(),Ct&&Jt.render(Z);let ie=C.toneMapping;C.toneMapping=Pi;let ue=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),rt===!0&&ut.setGlobalState(C.clippingPlanes,X),Ln(M,Z,X),K.updateMultisampleRenderTarget(St),K.updateRenderTargetMipmap(St),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let ge=0,Ze=B.length;ge<Ze;ge++){let Ie=B[ge],{object:be,geometry:vn,material:Rt,group:Dn}=Ie;if(Rt.side===mi&&be.layers.test(X.layers)){let me=Rt.side;Rt.side=pn,Rt.needsUpdate=!0,Ye(be,Z,X,vn,Rt,Dn),Rt.side=me,Rt.needsUpdate=!0,Bt=!0}}Bt===!0&&(K.updateMultisampleRenderTarget(St),K.updateRenderTargetMipmap(St))}C.setRenderTarget(At,Ot,Vt),C.setClearColor(Wt,qt),ue!==void 0&&(X.viewport=ue),C.toneMapping=ie}function Ln(M,B,Z){let X=B.isScene===!0?B.overrideMaterial:null;for(let q=0,St=M.length;q<St;q++){let Pt=M[q],{object:At,geometry:Ot,group:Vt}=Pt,ie=Pt.material;ie.allowOverride===!0&&X!==null&&(ie=X),At.layers.test(Z.layers)&&Ye(At,B,Z,Ot,ie,Vt)}}function Ye(M,B,Z,X,q,St){L!==null&&q.isNodeMaterial&&L.setObject(M,q),M.onBeforeRender(C,B,Z,X,q,St),M.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),q.onBeforeRender(C,B,Z,X,M,St),q.transparent===!0&&q.side===mi&&q.forceSinglePass===!1?(q.side=pn,q.needsUpdate=!0,C.renderBufferDirect(Z,B,X,q,M,St),q.side=Fr,q.needsUpdate=!0,C.renderBufferDirect(Z,B,X,q,M,St),q.side=mi):C.renderBufferDirect(Z,B,X,q,M,St),M.onAfterRender(C,B,Z,X,q,St)}function ze(M,B,Z){B.isScene!==!0&&(B=Ut);let X=W.get(M),q=w.state.lights,St=w.state.shadowsArray,Pt=q.state.version,At=xt.getParameters(M,q.state,St,B,Z,w.state.lightProbeGridArray),Ot=xt.getProgramCacheKey(At),Vt=X.programs;X.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,X.fog=B.fog;let ie=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;X.envMap=dt.get(M.envMap||X.environment,ie),X.envMapRotation=X.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Vt===void 0&&(M.addEventListener("dispose",Ft),Vt=new Map,X.programs=Vt);let ue=Vt.get(Ot);if(ue!==void 0){if(X.currentProgram===ue&&X.lightsStateVersion===Pt)return Ui(M,At),ue}else At.uniforms=xt.getUniforms(M),L!==null&&M.isNodeMaterial&&L.build(M,Z,At),M.onBeforeCompile(At,C),ue=xt.acquireProgram(At,Ot),Vt.set(Ot,ue),X.uniforms=At.uniforms;let Bt=X.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Bt.clippingPlanes=ut.uniform),Ui(M,At),X.needsLights=fi(M),X.lightsStateVersion=Pt,X.needsLights&&(Bt.ambientLightColor.value=q.state.ambient,Bt.lightProbe.value=q.state.probe,Bt.sunLights.value=q.state.sun,Bt.sunLightShadows.value=q.state.sunShadow,Bt.directionalLights.value=q.state.directional,Bt.directionalLightShadows.value=q.state.directionalShadow,Bt.spotLights.value=q.state.spot,Bt.spotLightShadows.value=q.state.spotShadow,Bt.rectAreaLights.value=q.state.rectArea,Bt.ltc_1.value=q.state.rectAreaLTC1,Bt.ltc_2.value=q.state.rectAreaLTC2,Bt.pointLights.value=q.state.point,Bt.pointLightShadows.value=q.state.pointShadow,Bt.hemisphereLights.value=q.state.hemi,Bt.sunShadowMatrix.value=q.state.sunShadowMatrix,Bt.sunShadowCascade.value=q.state.sunShadowCascade,Bt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Bt.spotLightMatrix.value=q.state.spotLightMatrix,Bt.spotLightMap.value=q.state.spotLightMap,Bt.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=w.state.lightProbeGridArray.length>0,X.currentProgram=ue,X.uniformsList=null,ue}function je(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=ga.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Ui(M,B){let Z=W.get(M);Z.outputColorSpace=B.outputColorSpace,Z.batching=B.batching,Z.batchingColor=B.batchingColor,Z.instancing=B.instancing,Z.instancingColor=B.instancingColor,Z.instancingMorph=B.instancingMorph,Z.skinning=B.skinning,Z.morphTargets=B.morphTargets,Z.morphNormals=B.morphNormals,Z.morphColors=B.morphColors,Z.morphTargetsCount=B.morphTargetsCount,Z.numClippingPlanes=B.numClippingPlanes,Z.numIntersection=B.numClipIntersection,Z.vertexAlphas=B.vertexAlphas,Z.vertexTangents=B.vertexTangents,Z.toneMapping=B.toneMapping}function Ls(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(B.matrixWorld);for(let Z=0,X=M.length;Z<X;Z++){let q=M[Z];if(q.texture!==null&&q.boundingBox.containsPoint(v))return q}return null}function an(M,B,Z,X,q){B.isScene!==!0&&(B=Ut),K.resetTextureUnits();let St=B.fog,Pt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?B.environment:null,At=Q===null?C.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:fe.workingColorSpace,Ot=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Vt=dt.get(X.envMap||Pt,Ot),ie=X.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ue=!!Z.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Bt=!!Z.morphAttributes.position,ge=!!Z.morphAttributes.normal,Ze=!!Z.morphAttributes.color,Ie=Pi;X.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ie=C.toneMapping);let be=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,vn=be!==void 0?be.length:0,Rt=W.get(X),Dn=w.state.lights;if(rt===!0&&(ot===!0||M!==P)){let Ae=M===P&&X.id===Y;ut.setState(X,M,Ae)}let me=!1;X.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Dn.state.version||Rt.outputColorSpace!==At||q.isBatchedMesh&&Rt.batching===!1||!q.isBatchedMesh&&Rt.batching===!0||q.isBatchedMesh&&Rt.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Rt.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Rt.instancing===!1||!q.isInstancedMesh&&Rt.instancing===!0||q.isSkinnedMesh&&Rt.skinning===!1||!q.isSkinnedMesh&&Rt.skinning===!0||q.isInstancedMesh&&Rt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Rt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Rt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Rt.instancingMorph===!1&&q.morphTexture!==null||Rt.envMap!==Vt||X.fog===!0&&Rt.fog!==St||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==ut.numPlanes||Rt.numIntersection!==ut.numIntersection)||Rt.vertexAlphas!==ie||Rt.vertexTangents!==ue||Rt.morphTargets!==Bt||Rt.morphNormals!==ge||Rt.morphColors!==Ze||Rt.toneMapping!==Ie||Rt.morphTargetsCount!==vn||!!Rt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,Rt.__version=X.version);let di=Rt.currentProgram;me===!0&&(di=ze(X,B,q),L&&X.isNodeMaterial&&L.onUpdateProgram(X,di,Rt));let Fi=!1,Mr=!1,Ns=!1,ye=di.getUniforms(),We=Rt.uniforms;if(y.useProgram(di.program)&&(Fi=!0,Mr=!0,Ns=!0),X.id!==Y&&(Y=X.id,Mr=!0),Rt.needsLights){let Ae=Ls(w.state.lightProbeGridArray,q);Rt.lightProbeGrid!==Ae&&(Rt.lightProbeGrid=Ae,Mr=!0)}if(Fi||P!==M){y.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ye.setValue(U,"projectionMatrix",M.projectionMatrix),ye.setValue(U,"viewMatrix",M.matrixWorldInverse);let Tr=ye.map.cameraPosition;Tr!==void 0&&Tr.setValue(U,ft.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&ye.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ye.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),P!==M&&(P=M,Mr=!0,Ns=!0)}if(Rt.needsLights&&(Dn.state.sunShadowMap.length>0&&ye.setValue(U,"sunShadowMap",Dn.state.sunShadowMap,K),Dn.state.directionalShadowMap.length>0&&ye.setValue(U,"directionalShadowMap",Dn.state.directionalShadowMap,K),Dn.state.spotShadowMap.length>0&&ye.setValue(U,"spotShadowMap",Dn.state.spotShadowMap,K),Dn.state.pointShadowMap.length>0&&ye.setValue(U,"pointShadowMap",Dn.state.pointShadowMap,K)),q.isSkinnedMesh){ye.setOptional(U,q,"bindMatrix"),ye.setOptional(U,q,"bindMatrixInverse");let Ae=q.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),ye.setValue(U,"boneTexture",Ae.boneTexture,K))}q.isBatchedMesh&&(ye.setOptional(U,q,"batchingTexture"),ye.setValue(U,"batchingTexture",q._matricesTexture,K),ye.setOptional(U,q,"batchingIdTexture"),ye.setValue(U,"batchingIdTexture",q._indirectTexture,K),ye.setOptional(U,q,"batchingColorTexture"),q._colorsTexture!==null&&ye.setValue(U,"batchingColorTexture",q._colorsTexture,K));let br=Z.morphAttributes;if((br.position!==void 0||br.normal!==void 0||br.color!==void 0)&&O.update(q,Z,di),(Mr||Rt.receiveShadow!==q.receiveShadow)&&(Rt.receiveShadow=q.receiveShadow,ye.setValue(U,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&B.environment!==null&&(We.envMapIntensity.value=B.environmentIntensity),We.dfgLUT!==void 0&&(We.dfgLUT.value=rb()),Mr){if(ye.setValue(U,"toneMappingExposure",C.toneMappingExposure),Rt.needsLights&&He(We,Ns),St&&X.fog===!0&&Dt.refreshFogUniforms(We,St),Dt.refreshMaterialUniforms(We,X,et,J,w.state.transmissionRenderTarget[M.id]),Rt.needsLights&&Rt.lightProbeGrid){let Ae=Rt.lightProbeGrid;We.probesSH.value=Ae.texture,We.probesMin.value.copy(Ae.boundingBox.min),We.probesMax.value.copy(Ae.boundingBox.max),We.probesResolution.value.copy(Ae.resolution)}ga.upload(U,je(Rt),We,K)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ga.upload(U,je(Rt),We,K),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ye.setValue(U,"center",q.center),ye.setValue(U,"modelViewMatrix",q.modelViewMatrix),ye.setValue(U,"normalMatrix",q.normalMatrix),ye.setValue(U,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){let Ae=X.uniformsGroups;for(let Tr=0,Us=Ae.length;Tr<Us;Tr++){let dp=Ae[Tr];st.update(dp,di),st.bind(dp,di)}}return di}function He(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function fi(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(M,B,Z){let X=W.get(M);X.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=B,W.get(M.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:Z,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let Z=W.get(M);Z.__webglFramebuffer=B,Z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,Z=0){Q=M,H=B,k=Z;let X=null,q=!1,St=!1;if(M){let At=W.get(M);if(At.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(U.FRAMEBUFFER,At.__webglFramebuffer),$.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest,y.viewport($),y.scissor(wt),y.setScissorTest(Tt),Y=-1;return}else if(At.__webglFramebuffer===void 0)K.setupRenderTarget(M);else if(At.__hasExternalTextures)K.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ie=M.depthTexture;if(At.__boundDepthTexture!==ie){if(ie!==null&&W.has(ie)&&(M.width!==ie.image.width||M.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(M)}}let Ot=M.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(St=!0);let Vt=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Vt[B])?X=Vt[B][Z]:X=Vt[B],q=!0):M.samples>0&&K.useMultisampledRTT(M)===!1?X=W.get(M).__webglMultisampledFramebuffer:Array.isArray(Vt)?X=Vt[Z]:X=Vt,$.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest}else $.copy(_t).multiplyScalar(et).floor(),wt.copy(Lt).multiplyScalar(et).floor(),Tt=Nt;if(Z!==0&&(X=F),y.bindFramebuffer(U.FRAMEBUFFER,X)&&y.drawBuffers(M,X),y.viewport($),y.scissor(wt),y.setScissorTest(Tt),q){let At=W.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,At.__webglTexture,Z)}else if(St){let At=B;for(let Ot=0;Ot<M.textures.length;Ot++){let Vt=W.get(M.textures[Ot]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ot,Vt.__webglTexture,Z,At)}}else if(M!==null&&Z!==0){let At=W.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,At.__webglTexture,Z)}Y=-1};function Ds(M){let B=W.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=R.textureFormatReadable(M.format),B.__typeReadable=R.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,Z,X,q,St,Pt,At=0){if(!(M&&M.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ot=Ot[Pt]),Ot){y.bindFramebuffer(U.FRAMEBUFFER,Ot);try{let Vt=M.textures[At],ie=Vt.format,ue=Vt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At);let Bt=Ds(Vt);if(Bt.__formatReadable===!1){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Bt.__typeReadable===!1){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-X&&Z>=0&&Z<=M.height-q&&U.readPixels(B,Z,X,q,yt.convert(ie),yt.convert(ue),St)}finally{let Vt=Q!==null?W.get(Q).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(M,B,Z,X,q,St,Pt,At=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ot=Ot[Pt]),Ot)if(B>=0&&B<=M.width-X&&Z>=0&&Z<=M.height-q){y.bindFramebuffer(U.FRAMEBUFFER,Ot);let Vt=M.textures[At],ie=Vt.format,ue=Vt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At);let Bt=Ds(Vt);if(Bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ge=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ge),U.bufferData(U.PIXEL_PACK_BUFFER,St.byteLength,U.STREAM_READ),U.readPixels(B,Z,X,q,yt.convert(ie),yt.convert(ue),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ze=Q!==null?W.get(Q).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Ze);let Ie=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Am(U,Ie,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ge),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,St),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ge),U.deleteSync(Ie),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,Z=0){let X=Math.pow(2,-Z),q=Math.floor(M.image.width*X),St=Math.floor(M.image.height*X),Pt=B!==null?B.x:0,At=B!==null?B.y:0;K.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,Pt,At,q,St),y.unbindTexture()},this.copyTextureToTexture=function(M,B,Z=null,X=null,q=0,St=0){let Pt,At,Ot,Vt,ie,ue,Bt,ge,Ze,Ie=M.isCompressedTexture?M.mipmaps[St]:M.image;if(Z!==null)Pt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Ot=Z.isBox3?Z.max.z-Z.min.z:1,Vt=Z.min.x,ie=Z.min.y,ue=Z.isBox3?Z.min.z:0;else{let We=Math.pow(2,-q);Pt=Math.floor(Ie.width*We),At=Math.floor(Ie.height*We),M.isDataArrayTexture?Ot=Ie.depth:M.isData3DTexture?Ot=Math.floor(Ie.depth*We):Ot=1,Vt=0,ie=0,ue=0}X!==null?(Bt=X.x,ge=X.y,Ze=X.z):(Bt=0,ge=0,Ze=0);let be=yt.convert(B.format),vn=yt.convert(B.type),Rt;B.isData3DTexture?(K.setTexture3D(B,0),Rt=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(K.setTexture2DArray(B,0),Rt=U.TEXTURE_2D_ARRAY):(K.setTexture2D(B,0),Rt=U.TEXTURE_2D),y.activeTexture(U.TEXTURE0),y.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),y.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),y.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);let Dn=y.getParameter(U.UNPACK_ROW_LENGTH),me=y.getParameter(U.UNPACK_IMAGE_HEIGHT),di=y.getParameter(U.UNPACK_SKIP_PIXELS),Fi=y.getParameter(U.UNPACK_SKIP_ROWS),Mr=y.getParameter(U.UNPACK_SKIP_IMAGES);y.pixelStorei(U.UNPACK_ROW_LENGTH,Ie.width),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ie.height),y.pixelStorei(U.UNPACK_SKIP_PIXELS,Vt),y.pixelStorei(U.UNPACK_SKIP_ROWS,ie),y.pixelStorei(U.UNPACK_SKIP_IMAGES,ue);let Ns=M.isDataArrayTexture||M.isData3DTexture,ye=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let We=W.get(M),br=W.get(B),Ae=W.get(We.__renderTarget),Tr=W.get(br.__renderTarget);y.bindFramebuffer(U.READ_FRAMEBUFFER,Ae.__webglFramebuffer),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,Tr.__webglFramebuffer);for(let Us=0;Us<Ot;Us++)Ns&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(M).__webglTexture,q,ue+Us),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(B).__webglTexture,St,Ze+Us)),U.blitFramebuffer(Vt,ie,Pt,At,Bt,ge,Pt,At,U.DEPTH_BUFFER_BIT,U.NEAREST);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(q!==0||M.isRenderTargetTexture||W.has(M)){let We=W.get(M),br=W.get(B);y.bindFramebuffer(U.READ_FRAMEBUFFER,I),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let Ae=0;Ae<Ot;Ae++)Ns?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,We.__webglTexture,q,ue+Ae):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,We.__webglTexture,q),ye?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,br.__webglTexture,St,Ze+Ae):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,br.__webglTexture,St),q!==0?U.blitFramebuffer(Vt,ie,Pt,At,Bt,ge,Pt,At,U.COLOR_BUFFER_BIT,U.NEAREST):ye?U.copyTexSubImage3D(Rt,St,Bt,ge,Ze+Ae,Vt,ie,Pt,At):U.copyTexSubImage2D(Rt,St,Bt,ge,Vt,ie,Pt,At);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ye?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(Rt,St,Bt,ge,Ze,Pt,At,Ot,be,vn,Ie.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(Rt,St,Bt,ge,Ze,Pt,At,Ot,be,Ie.data):U.texSubImage3D(Rt,St,Bt,ge,Ze,Pt,At,Ot,be,vn,Ie):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,St,Bt,ge,Pt,At,be,vn,Ie.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,St,Bt,ge,Ie.width,Ie.height,be,Ie.data):U.texSubImage2D(U.TEXTURE_2D,St,Bt,ge,Pt,At,be,vn,Ie);y.pixelStorei(U.UNPACK_ROW_LENGTH,Dn),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),y.pixelStorei(U.UNPACK_SKIP_PIXELS,di),y.pixelStorei(U.UNPACK_SKIP_ROWS,Fi),y.pixelStorei(U.UNPACK_SKIP_IMAGES,Mr),St===0&&B.generateMipmaps&&U.generateMipmap(Rt),y.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&K.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?K.setTextureCube(M,0):M.isData3DTexture?K.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?K.setTexture2DArray(M,0):K.setTexture2D(M,0),y.unbindTexture()},this.resetState=function(){H=0,k=0,Q=null,y.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}};var Rh=class extends ss{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new Lr;t.deleteAttribute("uv");let e=new lr({side:pn}),n=new lr,i=new Lo(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let s=new Ce(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let a=new ho(t,n,6),o=new cn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new Ce(t,va(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Ce(t,va(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Ce(t,va(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Ce(t,va(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Ce(t,va(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Ce(t,va(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function va(r){return new Ao({color:0,emissive:16777215,emissiveIntensity:r})}function hr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function vg(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}var Kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Qo={duration:.5,overwrite:!1,delay:0},pd,mn,Ne,vi=1e8,we=1/vi,rd=Math.PI*2,ab=rd/4,ob=0,yg=Math.sqrt,lb=Math.cos,cb=Math.sin,nn=function(t){return typeof t=="string"},ke=function(t){return typeof t=="function"},fr=function(t){return typeof t=="number"},zh=function(t){return typeof t=="undefined"},Ki=function(t){return typeof t=="object"},$n=function(t){return t!==!1},md=function(){return typeof window!="undefined"},Ph=function(t){return ke(t)||nn(t)},Sg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},wn=Array.isArray,hb=/random\([^)]+\)/g,ub=/,\s*/g,ug=/(?:-?\.?\d|\.)+/gi,gd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,gs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Kf=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,_d=/[+-]=-?[.\d]+/,fb=/[^,'"\[\]\s]+/gi,db=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Oe,Ji,sd,xd,si={},Nh={},Mg,bg=function(t){return(Nh=Sa(t,si))&&En},kh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},jo=function(t,e){return!e&&console.warn(t)},Tg=function(t,e){return t&&(si[t]=e)&&Nh&&(Nh[t]=e)||si},tl=function(){return 0},pb={suppressEvents:!0,isStart:!0,kill:!1},Ih={suppressEvents:!0,kill:!1},mb={suppressEvents:!0},vd={},Gr=[],ad={},wg,Zn={},Qf={},fg=30,Lh=[],yd="",Sd=function(t){var e=t[0],n,i;if(Ki(e)||ke(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Lh.length;i--&&!Lh[i].targetTest(e););n=Lh[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new wd(t[i],n)))||t.splice(i,1);return t},Hr=function(t){return t._gsap||Sd(yi(t))[0]._gsap},Md=function(t,e,n){return(n=t[e])&&ke(n)?t[e]():zh(n)&&t.getAttribute&&t.getAttribute(e)||n},On=function(t,e){return(t=t.split(",")).forEach(e)||t},Ve=function(t){return Math.round(t*1e5)/1e5||0},Fe=function(t){return Math.round(t*1e7)/1e7||0},_s=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},gb=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Uh=function(){var t=Gr.length,e=Gr.slice(0),n,i;for(ad={},Gr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},bd=function(t){return!!(t._initted||t._startAt||t.add)},Eg=function(t,e,n,i){Gr.length&&!mn&&Uh(),t.render(e,n,i||!!(mn&&e<0&&bd(t))),Gr.length&&!mn&&Uh()},Ag=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(fb).length<2?e:nn(t)?t.trim():t},Cg=function(t){return t},ai=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},_b=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Sa=function(t,e){for(var n in e)t[n]=e[n];return t},dg=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ki(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Fh=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Jo=function(t){var e=t.parent||Oe,n=t.keyframes?_b(wn(t.keyframes)):ai;if($n(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},xb=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Rg=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Vh=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Wr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},ds=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},vb=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},od=function(t,e,n,i){return t._startAt&&(mn?t._startAt.revert(Ih):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},yb=function r(t){return!t||t._ts&&r(t.parent)},pg=function(t){return t._repeat?Ma(t._tTime,t=t.duration()+t._rDelay)*t:0},Ma=function(t,e){var n=Math.floor(t=Fe(t/e));return t&&n===t?n-1:n},Oh=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Gh=function(t){return t._end=Fe(t._start+(t._tDur/Math.abs(t._ts||t._rts||we)||0))},Hh=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Fe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Gh(t),n._dirty||ds(n,t)),t},Pg=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Oh(t.rawTime(),e),(!e._dur||il(0,e.totalDuration(),n)-e._tTime>we)&&e.render(n,!0)),ds(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-we}},$i=function(t,e,n,i){return e.parent&&Wr(e),e._start=Fe((fr(n)?n:n||t!==Oe?xi(t,n,e):t._time)+e._delay),e._end=Fe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Rg(t,e,"_first","_last",t._sort?"_start":0),ld(e)||(t._recent=e),i||Pg(t,e),t._ts<0&&Hh(t,t._tTime),t},Ig=function(t,e){return(si.ScrollTrigger||kh("scrollTrigger",e))&&si.ScrollTrigger.create(e,t)},Lg=function(t,e,n,i,s){if(Cd(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!mn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&wg!==Jn.frame)return Gr.push(t),t._lazy=[s,i],1},Sb=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},ld=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Mb=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&Sb(t)&&!(!t._initted&&ld(t))||(t._ts<0||t._dp._ts<0)&&!ld(t))?0:1,o=t._rDelay,l=0,c,h,d;if(o&&t._repeat&&(l=il(0,t._tDur,e),h=Ma(l,o),t._yoyo&&h&1&&(a=1-a),h!==Ma(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||mn||i||t._zTime===we||!e&&t._zTime){if(!t._initted&&Lg(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?we:0),n||(n=e&&!d),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&od(t,e,n,!0),t._onUpdate&&!n&&ri(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&ri(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Wr(t,1),!n&&!mn&&(ri(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},bb=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},ba=function(t,e,n,i){var s=t._repeat,a=Fe(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Fe(a*(s+1)+t._rDelay*s):a,o>0&&!i&&Hh(t,t._tTime=t._tDur*o),t.parent&&Gh(t),n||ds(t.parent,t),t},mg=function(t){return t instanceof Tn?ds(t):ba(t,t._dur)},Tb={_start:0,endTime:tl,totalDuration:tl},xi=function r(t,e,n){var i=t.labels,s=t._recent||Tb,a=t.duration()>=vi?s.endTime(!1):t._dur,o,l,c;return nn(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(wn(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},$o=function(t,e,n){var i=fr(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;a.immediateRender=$n(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Xe(e[0],a,e[s+1])},Xr=function(t,e){return t||t===0?e(t):e},il=function(t,e,n){return n<t?t:n>e?e:n},gn=function(t,e){return!nn(t)||!(e=db.exec(t))?"":e[1]},wb=function(t,e,n){return Xr(n,function(i){return il(t,e,i)})},cd=[].slice,Dg=function(t,e){return t&&Ki(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ki(t[0]))&&!t.nodeType&&t!==Ji},Eb=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return nn(i)&&!e||Dg(i,1)?(s=n).push.apply(s,yi(i)):n.push(i)})||n},yi=function(t,e,n){return Ne&&!e&&Ne.selector?Ne.selector(t):nn(t)&&!n&&(sd||!Ta())?cd.call((e||xd).querySelectorAll(t),0):wn(t)?Eb(t,n):Dg(t)?cd.call(t,0):t?[t]:[]},hd=function(t){return t=yi(t)[0]||jo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return yi(e,n.querySelectorAll?n:n===t?jo("Invalid scope")||xd.createElement("div"):t)}},Ng=function(t){return t.sort(function(){return .5-Math.random()})},Ug=function(t){if(ke(t))return t;var e=Ki(t)?t:{each:t},n=ps(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,d=i;return nn(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(u,f,m){var _=(m||e).length,p=a[_],g,b,A,v,S,w,E,x,T;if(!p){if(T=e.grid==="auto"?0:(e.grid||[1,vi])[1],!T){for(E=-vi;E<(E=m[T++].getBoundingClientRect().left)&&T<_;);T<_&&T--}for(p=a[_]=[],g=l?Math.min(T,_)*h-.5:i%T,b=T===vi?0:l?_*d/T-.5:i/T|0,E=0,x=vi,w=0;w<_;w++)A=w%T-g,v=b-(w/T|0),p[w]=S=c?Math.abs(c==="y"?v:A):yg(A*A+v*v),S>E&&(E=S),S<x&&(x=S);i==="random"&&Ng(p),p.max=E-x,p.min=x,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(T>_?_-1:c?c==="y"?_/T:T:Math.max(T,_/T))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=gn(e.amount||e.each)||0,n=n&&_<0?zb(n):n}return _=(p[u]-p.min)/p.max||0,Fe(p.b+(n?n(_):_)*p.v)+p.u}},ud=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Fe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(fr(n)?0:gn(n))}},Fg=function(t,e){var n=wn(t),i,s;return!n&&Ki(t)&&(i=n=t.radius||vi,t.values?(t=yi(t.values),(s=!fr(t[0]))&&(i*=i)):t=ud(t.increment)),Xr(e,n?ke(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=vi,h=0,d=t.length,u,f;d--;)s?(u=t[d].x-o,f=t[d].y-l,u=u*u+f*f):u=Math.abs(t[d]-o),u<c&&(c=u,h=d);return h=!i||c<=i?t[h]:a,s||h===a||fr(a)?h:h+gn(a)}:ud(t))},Og=function(t,e,n,i){return Xr(wn(t)?!e:n===!0?!!(n=0):!i,function(){return wn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Ab=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},Cb=function(t,e){return function(n){return t(parseFloat(n))+(e||gn(n))}},Rb=function(t,e,n){return zg(t,e,0,1,n)},Bg=function(t,e,n){return Xr(n,function(i){return t[~~e(i)]})},Pb=function r(t,e,n){var i=e-t;return wn(t)?Bg(t,r(0,t.length),e):Xr(n,function(s){return(i+(s-t)%i)%i+t})},Ib=function r(t,e,n){var i=e-t,s=i*2;return wn(t)?Bg(t,r(0,t.length-1),e):Xr(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},wa=function(t){return t.replace(hb,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(ub);return Og(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},zg=function(t,e,n,i,s){var a=e-t,o=i-n;return Xr(s,function(l){return n+((l-t)/a*o||0)})},Lb=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var a=nn(t),o={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(wn(t)&&!wn(e)){for(h=[],d=t.length,u=d-2,c=1;c<d;c++)h.push(r(t[c-1],t[c]));d--,s=function(m){m*=d;var _=Math.min(u,~~m);return h[_](m-_)},n=e}else i||(t=Sa(wn(t)?[]:{},t));if(!h){for(l in e)Ed.call(o,t,l,"get",e[l]);s=function(m){return Id(m,o)||(a?t.p:t)}}}return Xr(n,s)},gg=function(t,e,n){var i=t.labels,s=vi,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},ri=function(t,e,n){var i=t.vars,s=i[e],a=Ne,o=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&Gr.length&&Uh(),o&&(Ne=o),h=l?s.apply(c,l):s.call(c),Ne=a,h},Yo=function(t){return Wr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!mn),t.progress()<1&&ri(t,"onInterrupt"),t},ya,kg=[],Vg=function(t){if(t)if(t=!t.name&&t.default||t,md()||t.headless){var e=t.name,n=ke(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:tl,render:Id,add:Ed,kill:Jb,modifier:Zb,rawVars:0},a={targetTest:0,get:0,getSetter:Wh,aliases:{},register:0};if(Ta(),t!==i){if(Zn[e])return;ai(i,ai(Fh(t,s),a)),Sa(i.prototype,Sa(s,Fh(t,a))),Zn[i.prop=e]=i,t.targetTest&&(Lh.push(i),vd[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Tg(e,i),t.register&&t.register(En,i,Bn)}else kg.push(t)},Te=255,Zo={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},jf=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Te+.5|0},Gg=function(t,e,n){var i=t?fr(t)?[t>>16,t>>8&Te,t&Te]:0:Zo.black,s,a,o,l,c,h,d,u,f,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Zo[t])i=Zo[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Te,i&Te,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Te,t&Te]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(ug),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=jf(l+1/3,s,a),i[1]=jf(l,s,a),i[2]=jf(l-1/3,s,a);else if(~t.indexOf("="))return i=t.match(gd),n&&i.length<4&&(i[3]=1),i}else i=t.match(ug)||Zo.transparent;i=i.map(Number)}return e&&!m&&(s=i[0]/Te,a=i[1]/Te,o=i[2]/Te,d=Math.max(s,a,o),u=Math.min(s,a,o),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===s?(a-o)/f+(a<o?6:0):d===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Hg=function(t){var e=[],n=[],i=-1;return t.split(ur).forEach(function(s){var a=s.match(gs)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},_g=function(t,e,n){var i="",s=(t+i).match(ur),a=e?"hsla(":"rgba(",o=0,l,c,h,d;if(!s)return t;if(s=s.map(function(u){return(u=Gg(u,e,1))&&a+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Hg(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(ur,"1").split(gs),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(ur),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},ur=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Zo)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),Db=/hsl[a]?\(/,Td=function(t){var e=t.join(" "),n;if(ur.lastIndex=0,ur.test(e))return n=Db.test(e),t[1]=_g(t[1],n),t[0]=_g(t[0],n,Hg(t[1])),!0},el,Jn=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,d,u,f,m=function _(p){var g=r()-i,b=p===!0,A,v,S,w;if((g>t||g<0)&&(n+=g-e),i+=g,S=i-n,A=S-a,(A>0||b)&&(w=++d.frame,u=S-d.time*1e3,d.time=S=S/1e3,a+=A+(A>=s?4:s-A),v=1),b||(l=c(_)),v)for(f=0;f<o.length;f++)o[f](S,u,w,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){Mg&&(!sd&&md()&&(Ji=sd=window,xd=Ji.document||{},si.gsap=En,(Ji.gsapVersions||(Ji.gsapVersions=[])).push(En.version),bg(Nh||Ji.GreenSockGlobals||!Ji.gsap&&Ji||{}),kg.forEach(Vg)),h=typeof requestAnimationFrame!="undefined"&&requestAnimationFrame,l&&d.sleep(),c=h||function(p){return setTimeout(p,a-d.time*1e3+1|0)},el=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),el=0,c=tl},lagSmoothing:function(p,g){t=p||1/0,e=Math.min(g||33,t)},fps:function(p){s=1e3/(p||240),a=d.time*1e3+s},add:function(p,g,b){var A=g?function(v,S,w,E){p(v,S,w,E),d.remove(A)}:p;return d.remove(p),o[b?"unshift":"push"](A),Ta(),A},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&f>=g&&f--},_listeners:o},d})(),Ta=function(){return!el&&Jn.wake()},pe={},Nb=/^[\d.\-M][\d.\-,\s]/,Ub=/["']/g,Fb=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(Ub,"").trim():+c,i=l.substr(o+1).trim();return e},Ob=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Bb=function(t){var e=(t+"").split("("),n=pe[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Fb(e[1])]:Ob(t).split(",").map(Ag)):pe._CE&&Nb.test(t)?pe._CE("",t):n},zb=function(t){return function(e){return 1-t(1-e)}},ps=function(t,e){return t&&(ke(t)?t:pe[t]||Bb(t))||e},xs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return On(t,function(o){pe[o]=si[o]=s,pe[a=o.toLowerCase()]=n;for(var l in s)pe[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=pe[o+"."+l]=s[l]}),s},Wg=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},td=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/rd*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*cb((h-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Wg(o);return s=rd/s,l.config=function(c,h){return r(t,c,h)},l},ed=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Wg(n);return i.config=function(s){return r(t,s)},i};On("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;xs(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});pe.Linear.easeNone=pe.none=pe.Linear.easeIn;xs("Elastic",td("in"),td("out"),td());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};xs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);xs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});xs("Circ",function(r){return-(yg(1-r*r)-1)});xs("Sine",function(r){return r===1?1:-lb(r*ab)+1});xs("Back",ed("in"),ed("out"),ed());pe.SteppedEase=pe.steps=si.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-we;return function(o){return((i*il(0,a,o)|0)+s)*n}}};Qo.ease=pe["quad.out"];On("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return yd+=r+","+r+"Params,"});var wd=function(t,e){this.id=ob++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Md,this.set=e?e.getSetter:Wh},nl=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ba(this,+e.duration,1,1),this.data=e.data,Ne&&(this._ctx=Ne,Ne.data.push(this)),el||Jn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ba(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Ta(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Hh(this,n),!s._dp||s.parent||Pg(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&$i(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===we||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Eg(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+pg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+pg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ma(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-we?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Oh(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-we?0:this._rts,this.totalTime(il(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Gh(this),vb(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ta(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==we&&(this._tTime-=we)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Fe(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&$i(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Oh(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=mb);var i=mn;return mn=n,bd(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),mn=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,mg(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,mg(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(xi(this,n),$n(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,$n(i)),this._dur||(this._zTime=-we),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-we:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-we,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-we)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=ke(n)?n:Cg,l=function(){var h=i.then;i.then=null,s&&s(),ke(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Yo(this)},r})();ai(nl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-we,_prom:0,_ps:!1,_rts:1});var Tn=(function(r){vg(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),Oe&&$i(n.parent||Oe,hr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ig(hr(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return $o(0,arguments,this),this},e.from=function(i,s,a){return $o(1,arguments,this),this},e.fromTo=function(i,s,a,o){return $o(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,Jo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Xe(i,s,xi(this,a),1),this},e.call=function(i,s,a){return $i(this,Xe.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Xe(i,a,xi(this,l)),this},e.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,Jo(a).immediateRender=$n(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},e.staggerFromTo=function(i,s,a,o,l,c,h,d){return o.startAt=a,Jo(o).immediateRender=$n(o.immediateRender),this.staggerTo(i,s,o,l,c,h,d)},e.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Fe(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,m,_,p,g,b,A,v,S,w,E;if(this!==Oe&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,v=this._start,A=this._ts,g=!A,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(u=Fe(h%p),h===l?(_=this._repeat,u=c):(S=Fe(h/p),_=~~S,_&&_===S&&(u=c,_--),u>c&&(u=c)),S=Ma(this._tTime,p),!o&&this._tTime&&S!==_&&this._tTime-S*p-this._dur<=0&&(S=_),w&&_&1&&(u=c-u,E=1),_!==S&&!this._lock){var x=w&&S&1,T=x===(w&&_&1);if(_<S&&(x=!x),o=x?0:h%c?c:h,this._lock=1,this.render(o||(E?0:Fe(_*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&ri(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,S=_),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,T&&(this._lock=2,o=x?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=bb(this,Fe(o),Fe(u)),b&&(h-=u-(u=b._start))),this._tTime=h,this._time=u,this._act=!!A,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!S&&(ri(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(f=this._first;f;){if(m=f._next,(f._act||u>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,s,a),u!==this._time||!this._ts&&!g){b=0,m&&(h+=this._zTime=-we);break}}f=m}else{f=this._last;for(var C=i<0?i:u;f;){if(m=f._prev,(f._act||C<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(C-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(C-f._start)*f._ts,s,a||mn&&bd(f)),u!==this._time||!this._ts&&!g){b=0,m&&(h+=this._zTime=C?-we:we);break}}f=m}}if(b&&!s&&(this.pause(),b.render(u>=o?0:-we)._zTime=u>=o?1:-1,this._ts))return this._start=v,Gh(this),this.render(i,s,a);this._onUpdate&&!s&&ri(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(v===this._start||Math.abs(A)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Wr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(ri(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(fr(s)||(s=xi(this,s,i)),!(i instanceof nl)){if(wn(i))return i.forEach(function(o){return a.add(o,s)}),this;if(nn(i))return this.addLabel(i,s);if(ke(i))i=Xe.delayedCall(0,i);else return this}return this!==i?$i(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-vi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Xe?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return nn(i)?this.removeLabel(i):ke(i)?this.killTweensOf(i):(i.parent===this&&Vh(this,i),i===this._recent&&(this._recent=this._last),ds(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Fe(Jn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=xi(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Xe.delayedCall(0,s||tl,a);return o.data="isPause",this._hasPause=1,$i(this,o,xi(this,i))},e.removePause=function(i){var s=this._first;for(i=xi(this,i);s;)s._start===i&&s.data==="isPause"&&Wr(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Vr!==o[l]&&o[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=yi(i),l=this._first,c=fr(s),h;l;)l instanceof Xe?gb(l._targets,o)&&(c?(!Vr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=xi(a,i),l=s,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,m=Xe.to(a,ai({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||we,onStart:function(){if(a.pause(),!f){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==p&&ba(m,p,0,1).render(m._time,!0,!0),f=1}h&&h.apply(m,d||[])}},s));return u?m.render(0):m},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,ai({startAt:{time:xi(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),gg(this,xi(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),gg(this,xi(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+we)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Fe(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return ds(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ds(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,l=vi,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,$i(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Fe(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;ba(a,a===Oe&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(Oe._ts&&(Eg(Oe,Oh(i,Oe)),wg=Jn.frame),Jn.frame>=fg){fg+=Kn.autoSleep||120;var s=Oe._first;if((!s||!s._ts)&&Kn.autoSleep&&Jn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Jn.sleep()}}},t})(nl);ai(Tn.prototype,{_lock:0,_hasPause:0,_forcing:0});var kb=function(t,e,n,i,s,a,o){var l=new Bn(this._pt,t,e,0,1,Pd,null,s),c=0,h=0,d,u,f,m,_,p,g,b;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=wa(i)),a&&(b=[n,i],a(b,t,e),n=b[0],i=b[1]),u=n.match(Kf)||[];d=Kf.exec(i);)m=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),m!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:m.charAt(1)==="="?_s(p,m)-p:parseFloat(m)-p,m:f&&f<4?Math.round:0},c=Kf.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(_d.test(i)||g)&&(l.e=0),this._pt=l,l},Ed=function(t,e,n,i,s,a,o,l,c,h){ke(i)&&(i=i(s||0,t,a));var d=t[e],u=n!=="get"?n:ke(d)?c?t[e.indexOf("set")||!ke(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=ke(d)?c?Xb:Yg:Rd,m;if(nn(i)&&(~i.indexOf("random(")&&(i=wa(i)),i.charAt(1)==="="&&(m=_s(u,i)+(gn(u)||0),(m||m===0)&&(i=m))),!h||u!==i||fd)return!isNaN(u*i)&&i!==""?(m=new Bn(this._pt,t,e,+u||0,i-(u||0),typeof d=="boolean"?Yb:Zg,0,f),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!d&&!(e in t)&&kh(e,i),kb.call(this,t,e,u,i,f,l||Kn.stringFilter,c))},Vb=function(t,e,n,i,s){if(ke(t)&&(t=Ko(t,s,e,n,i)),!Ki(t)||t.style&&t.nodeType||wn(t)||Sg(t))return nn(t)?Ko(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=Ko(t[o],s,e,n,i);return a},Ad=function(t,e,n,i,s,a){var o,l,c,h;if(Zn[t]&&(o=new Zn[t]).init(s,o.rawVars?e[t]:Vb(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Bn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==ya))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Vr,fd,Cd=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,m=t._dur,_=t._startAt,p=t._targets,g=t.parent,b=g&&g.data==="nested"?g.vars.targets:p,A=t._overwrite==="auto"&&!pd,v=t.timeline,S=i.easeReverse||d,w,E,x,T,C,D,L,F,I,z,H,k,Q;if(v&&(!u||!s)&&(s="none"),t._ease=ps(s,Qo.ease),t._rEase=S&&(ps(S)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||u&&!i.stagger){if(F=p[0]?Hr(p[0]).harness:0,k=F&&i[F.prop],w=Fh(i,vd),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!f?_.render(-1,!0):_.revert(h&&m?Ih:pb),_._lazy=0),a){if(Wr(t._startAt=Xe.set(p,ai({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return ri(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(mn||!o&&!f)&&t._startAt.revert(Ih),o&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!_){if(e&&(o=!1),x=ai({overwrite:!1,data:"isFromStart",lazy:o&&!_&&$n(l),immediateRender:o,stagger:0,parent:g},w),k&&(x[F.prop]=k),Wr(t._startAt=Xe.set(p,x)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(mn?t._startAt.revert(Ih):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,we,we);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&$n(l)||l&&!m,E=0;E<p.length;E++){if(C=p[E],L=C._gsap||Sd(p)[E]._gsap,t._ptLookup[E]=z={},ad[L.id]&&Gr.length&&Uh(),H=b===p?E:b.indexOf(C),F&&(I=new F).init(C,k||w,t,H,b)!==!1&&(t._pt=T=new Bn(t._pt,C,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(Y){z[Y]=T}),I.priority&&(D=1)),!F||k)for(x in w)Zn[x]&&(I=Ad(x,w,t,H,C,b))?I.priority&&(D=1):z[x]=T=Ed.call(t,C,x,"get",w[x],H,b,0,i.stringFilter);t._op&&t._op[E]&&t.kill(C,t._op[E]),A&&t._pt&&(Vr=t,Oe.killTweensOf(C,z,t.globalTime(e)),Q=!t.parent,Vr=0),t._pt&&l&&(ad[L.id]=1)}D&&Ld(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Q,u&&e<=0&&v.render(vi,!0,!0)},Gb=function(t,e,n,i,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,u,f;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,f=t._targets.length;f--;){if(h=u[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return fd=1,t.vars[e]="+=0",Cd(t,o),fd=0,l?jo(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Ve(n)+gn(d.e)),d.b&&(d.b=h.s+gn(d.b))},Hb=function(t,e){var n=t[0]?Hr(t[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return e;s=Sa({},e);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Wb=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(wn(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},Ko=function(t,e,n,i,s){return ke(t)?t.call(e,n,i,s):nn(t)&&~t.indexOf("random(")?wa(t):t},Xg=yd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",qg={};On(Xg+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return qg[r]=1});var Xe=(function(r){vg(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Jo(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,m=l.keyframes,_=l.defaults,p=l.scrollTrigger,g=i.parent||Oe,b=(wn(n)||Sg(n)?fr(n[0]):"length"in i)?[n]:yi(n),A,v,S,w,E,x,T,C;if(o._targets=b.length?Sd(b):jo("GSAP target "+n+" not found. https://gsap.com",!Kn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,m||u||Ph(c)||Ph(h)){i=o.vars;var D=i.easeReverse||i.yoyoEase;if(A=o.timeline=new Tn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:b}),A.kill(),A.parent=A._dp=hr(o),A._start=0,u||Ph(c)||Ph(h)){if(w=b.length,T=u&&Ug(u),Ki(u))for(E in u)~Xg.indexOf(E)&&(C||(C={}),C[E]=u[E]);for(v=0;v<w;v++)S=Fh(i,qg),S.stagger=0,D&&(S.easeReverse=D),C&&Sa(S,C),x=b[v],S.duration=+Ko(c,hr(o),v,x,b),S.delay=(+Ko(h,hr(o),v,x,b)||0)-o._delay,!u&&w===1&&S.delay&&(o._delay=h=S.delay,o._start+=h,S.delay=0),A.to(x,S,T?T(v,x,b):0),A._ease=pe.none;A.duration()?c=h=0:o.timeline=0}else if(m){Jo(ai(A.vars.defaults,{ease:"none"})),A._ease=ps(m.ease||i.ease||"none");var L=0,F,I,z;if(wn(m))m.forEach(function(H){return A.to(b,H,">")}),A.duration();else{S={};for(E in m)E==="ease"||E==="easeEach"||Wb(E,m[E],S,m.easeEach);for(E in S)for(F=S[E].sort(function(H,k){return H.t-k.t}),L=0,v=0;v<F.length;v++)I=F[v],z={ease:I.e,duration:(I.t-(v?F[v-1].t:0))/100*c},z[E]=I.v,A.to(b,z,L),L+=z.duration;A.duration()<c&&A.to({},{duration:c-A.duration()})}}c||o.duration(c=A.duration())}else o.timeline=0;return f===!0&&!pd&&(Vr=hr(o),Oe.killTweensOf(b),Vr=0),$i(g,hr(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!m&&o._start===Fe(g._time)&&$n(d)&&yb(hr(o))&&g.data!=="nested")&&(o._tTime=-we,o.render(Math.max(0,-h)||0)),p&&Ig(hr(o),p),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-we&&!h?l:i<we?0:i,u,f,m,_,p,g,b,A;if(!c)Mb(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,A=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(u=Fe(d%_),d===l?(m=this._repeat,u=c):(p=Fe(d/_),m=~~p,m&&m===p?(u=c,m--):u>c&&(u=c)),g=this._yoyo&&m&1,g&&(u=c-u),p=Ma(this._tTime,_),u===o&&!a&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(Fe(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(Lg(this,h?i:u,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var v=u<o;if(v!==this._inv){var S=v?o:c-o;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=S?(v?-1:1)/S:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=b=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=b=this._ease(u/c);if(this._from&&(this.ratio=b=1-b),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!p&&(ri(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;A&&A.render(i<0?i:A._dur*A._ease(u/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&od(this,i,s,a),ri(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!s&&this.parent&&ri(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&od(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Wr(this,1),!s&&!(h&&!o)&&(d||o||g)&&(ri(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,l){el||Jn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Cd(this,c),h=this._ease(c/this._dur),Gb(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(Hh(this,0),this.parent||Rg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Yo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!mn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Vr&&Vr.vars.overwrite!==!0)._first||Yo(this),this.parent&&a!==this.timeline.totalDuration()&&ba(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?yi(i):o,c=this._ptLookup,h=this._pt,d,u,f,m,_,p,g;if((!s||s==="all")&&xb(o,l))return s==="all"&&(this._pt=0),Yo(this);for(d=this._op=this._op||[],s!=="all"&&(nn(s)&&(_={},On(s,function(b){return _[b]=1}),s=_),s=Hb(o,s)),g=o.length;g--;)if(~l.indexOf(o[g])){u=c[g],s==="all"?(d[g]=s,m=u,f={}):(f=d[g]=d[g]||{},m=s);for(_ in m)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Vh(this,p,"_pt"),delete u[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Yo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return $o(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return $o(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return Oe.killTweensOf(i,s,a)},t})(nl);ai(Xe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});On("staggerTo,staggerFrom,staggerFromTo",function(r){Xe[r]=function(){var t=new Tn,e=cd.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Rd=function(t,e,n){return t[e]=n},Yg=function(t,e,n){return t[e](n)},Xb=function(t,e,n,i){return t[e](i.fp,n)},qb=function(t,e,n){return t.setAttribute(e,n)},Wh=function(t,e){return ke(t[e])?Yg:zh(t[e])&&t.setAttribute?qb:Rd},Zg=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Yb=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Pd=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Id=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Zb=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},Jb=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Vh(this,e,"_pt"):e.dep||(n=1),e=i;return!n},$b=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Ld=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},Bn=(function(){function r(e,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Zg,this.d=l||this,this.set=c||Rd,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=$b,this.m=n,this.mt=s,this.tween=i},r})();On(yd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return vd[r]=1});si.TweenMax=si.TweenLite=Xe;si.TimelineLite=si.TimelineMax=Tn;Oe=new Tn({sortChildren:!1,defaults:Qo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kn.stringFilter=Td;var ms=[],Dh={},Kb=[],xg=0,Qb=0,nd=function(t){return(Dh[t]||Kb).map(function(e){return e()})},dd=function(){var t=Date.now(),e=[];t-xg>2&&(nd("matchMediaInit"),ms.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=Ji.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),nd("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),xg=t,nd("matchMedia"))},Jg=(function(){function r(e,n){this.selector=n&&hd(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Qb++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ke(n)&&(s=i,i=n,n=ke);var a=this,o=function(){var c=Ne,h=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=hd(s)),Ne=a,d=i.apply(a,arguments),ke(d)&&a._r.push(d),Ne=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===ke?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=Ne;Ne=null,n(this),Ne=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Xe&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Tn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Xe)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=ms.length;a--;)ms[a].id===this.id&&ms.splice(a,1)},t.revert=function(n){this.kill(n||{})},r})(),jb=(function(){function r(e){this.contexts=[],this.scope=e,Ne&&Ne.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Ki(n)||(n={matches:n});var a=new Jg(0,s||this.scope),o=a.conditions={},l,c,h;Ne&&!a.selector&&(a.selector=Ne.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=Ji.matchMedia(n[c]),l&&(ms.indexOf(a)<0&&ms.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(dd):l.addEventListener("change",dd)));return h&&i(a,function(d){return a.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Bh={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Vg(i)})},timeline:function(t){return new Tn(t)},getTweensOf:function(t,e){return Oe.getTweensOf(t,e)},getProperty:function(t,e,n,i){nn(t)&&(t=yi(t)[0]);var s=Hr(t||{}).get,a=n?Cg:Ag;return n==="native"&&(n=""),t&&(e?a((Zn[e]&&Zn[e].get||s)(t,e,n,i)):function(o,l,c){return a((Zn[o]&&Zn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=yi(t),t.length>1){var i=t.map(function(h){return En.quickSetter(h,e,n)}),s=i.length;return function(h){for(var d=s;d--;)i[d](h)}}t=t[0]||{};var a=Zn[e],o=Hr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var d=new a;ya._pt=0,d.init(t,n?h+n:h,ya,0,[t]),d.render(1,d),ya._pt&&Id(1,ya)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,s=En.to(t,ai((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(e,l,c,h)};return a.tween=s,a},isTweening:function(t){return Oe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ps(t.ease,Qo.ease)),dg(Qo,t||{})},config:function(t){return dg(Kn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Zn[o]&&!si[o]&&jo(e+" effect requires "+o+" plugin.")}),Qf[e]=function(o,l,c){return n(yi(o),ai(l||{},s),c)},a&&(Tn.prototype[e]=function(o,l,c){return this.add(Qf[e](o,Ki(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){pe[t]=ps(e)},parseEase:function(t,e){return arguments.length?ps(t,e):pe},getById:function(t){return Oe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Tn(t),i,s;for(n.smoothChildTiming=$n(t.smoothChildTiming),Oe.remove(n),n._dp=0,n._time=n._tTime=Oe._time,i=Oe._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Xe&&i.vars.onComplete===i._targets[0]))&&$i(n,i,i._start-i._delay),i=s;return $i(Oe,n,0),n},context:function(t,e){return t?new Jg(t,e):Ne},matchMedia:function(t){return new jb(t)},matchMediaRefresh:function(){return ms.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||dd()},addEventListener:function(t,e){var n=Dh[t]||(Dh[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Dh[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Pb,wrapYoyo:Ib,distribute:Ug,random:Og,snap:Fg,normalize:Rb,getUnit:gn,clamp:wb,splitColor:Gg,toArray:yi,selector:hd,mapRange:zg,pipe:Ab,unitize:Cb,interpolate:Lb,shuffle:Ng},install:bg,effects:Qf,ticker:Jn,updateRoot:Tn.updateRoot,plugins:Zn,globalTimeline:Oe,core:{PropTween:Bn,globals:Tg,Tween:Xe,Timeline:Tn,Animation:nl,getCache:Hr,_removeLinkedListItem:Vh,reverting:function(){return mn},context:function(t){return t&&Ne&&(Ne.data.push(t),t._ctx=Ne),Ne},suppressOverwrites:function(t){return pd=t}}};On("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Bh[r]=Xe[r]});Jn.add(Tn.updateRoot);ya=Bh.to({},{duration:0});var tT=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},eT=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=tT(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},id=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(nn(s)&&(l={},On(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}eT(o,s)}}}},En=Bh.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)mn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},id("roundProps",ud),id("modifiers"),id("snap",Fg))||Bh;Xe.version=Tn.version=En.version="3.15.0";Mg=1;md()&&Ta();var nT=pe.Power0,iT=pe.Power1,rT=pe.Power2,sT=pe.Power3,aT=pe.Power4,oT=pe.Linear,lT=pe.Quad,cT=pe.Cubic,hT=pe.Quart,uT=pe.Quint,fT=pe.Strong,dT=pe.Elastic,pT=pe.Back,mT=pe.SteppedEase,gT=pe.Bounce,_T=pe.Sine,xT=pe.Expo,vT=pe.Circ;var $g,qr,Aa,Bd,Ms,yT,Kg,zd,ST=function(){return typeof window!="undefined"},pr={},Ss=180/Math.PI,Ca=Math.PI/180,Ea=Math.atan2,Qg=1e8,kd=/([A-Z])/g,MT=/(left|right|width|margin|padding|x)/i,bT=/[\s,\(]\S/,Qi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Nd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},TT=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},wT=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},ET=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},AT=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},a_=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},o_=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},CT=function(t,e,n){return t.style[e]=n},RT=function(t,e,n){return t.style.setProperty(e,n)},PT=function(t,e,n){return t._gsap[e]=n},IT=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},LT=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},DT=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},Be="transform",Qn=Be+"Origin",NT=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in pr&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Qi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=dr(i,o)}):this.tfm[t]=a.x?a[t]:dr(i,t),t===Qn&&(this.tfm.zOrigin=a.zOrigin);else return Qi.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(Be)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Qn,e,"")),t=Be}(s||e)&&this.props.push(t,e,s[t])},l_=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},UT=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(kd,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=zd(),(!s||!s.isStart)&&!n[Be]&&(l_(n),i.zOrigin&&n[Qn]&&(n[Qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},c_=function(t,e){var n={target:t,props:[],revert:UT,save:NT};return t._gsap||En.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},h_,Ud=function(t,e){var n=qr.createElementNS?qr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):qr.createElement(t);return n&&n.style?n:qr.createElement(t)},oi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(kd,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ra(e)||e,1)||""},jg="O,Moz,ms,Ms,Webkit".split(","),Ra=function(t,e,n){var i=e||Ms,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(jg[a]+t in s););return a<0?null:(a===3?"ms":a>=0?jg[a]:"")+t},Fd=function(){ST()&&window.document&&($g=window,qr=$g.document,Aa=qr.documentElement,Ms=Ud("div")||{style:{}},yT=Ud("div"),Be=Ra(Be),Qn=Be+"Origin",Ms.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",h_=!!Ra("perspective"),zd=En.core.reverting,Bd=1)},t_=function(t){var e=t.ownerSVGElement,n=Ud("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Aa.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Aa.removeChild(n),s},e_=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},u_=function(t){var e,n;try{e=t.getBBox()}catch{e=t_(t),n=1}return e&&(e.width||e.height)||n||(e=t_(t)),e&&!e.width&&!e.x&&!e.y?{x:+e_(t,["x","cx","x1"])||0,y:+e_(t,["y","cy","y1"])||0,width:0,height:0}:e},f_=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&u_(t))},Zr=function(t,e){if(e){var n=t.style,i;e in pr&&e!==Qn&&(e=Be),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(kd,"-$1").toLowerCase())):n.removeAttribute(e)}},Yr=function(t,e,n,i,s,a){var o=new Bn(t._pt,e,n,0,1,a?o_:a_);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},n_={deg:1,rad:1,turn:1},FT={grid:1,flex:1},Jr=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Ms.style,l=MT.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",m,_,p,g;if(i===a||!s||n_[i]||n_[a])return s;if(a!=="px"&&!u&&(s=r(t,e,n,"px")),g=t.getCTM&&f_(t),(f||a==="%")&&(pr[e]||~e.indexOf("adius")))return m=g?t.getBBox()[l?"width":"height"]:t[h],Ve(f?s/m*d:s/100*m);if(o[l?"width":"height"]=d+(u?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===qr||!_.appendChild)&&(_=qr.body),p=_._gsap,p&&f&&p.width&&l&&p.time===Jn.time&&!p.uncache)return Ve(s/p.width*d);if(f&&(e==="height"||e==="width")){var b=t.style[e];t.style[e]=d+i,m=t[h],b?t.style[e]=b:Zr(t,e)}else(f||a==="%")&&!FT[oi(_,"display")]&&(o.position=oi(t,"position")),_===t&&(o.position="static"),_.appendChild(Ms),m=Ms[h],_.removeChild(Ms),o.position="absolute";return l&&f&&(p=Hr(_),p.time=Jn.time,p.width=_[h]),Ve(u?m*s/d:m&&s?d/m*s:0)},dr=function(t,e,n,i){var s;return Bd||Fd(),e in Qi&&e!=="transform"&&(e=Qi[e],~e.indexOf(",")&&(e=e.split(",")[0])),pr[e]&&e!=="transform"?(s=al(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:qh(oi(t,Qn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Xh[e]&&Xh[e](t,e,n)||oi(t,e)||Md(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Jr(t,e,s,n)+n:s},OT=function(t,e,n,i){if(!n||n==="none"){var s=Ra(e,t,1),a=s&&oi(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=oi(t,"borderTopColor"))}var o=new Bn(this._pt,t.style,e,0,1,Pd),l=0,c=0,h,d,u,f,m,_,p,g,b,A,v,S;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=oi(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=oi(t,e)||i,_?t.style[e]=_:Zr(t,e)),h=[n,i],Td(h),n=h[0],i=h[1],u=n.match(gs)||[],S=i.match(gs)||[],S.length){for(;d=gs.exec(i);)p=d[0],b=i.substring(l,d.index),m?m=(m+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(m=1),p!==(_=u[c++]||"")&&(f=parseFloat(_)||0,v=_.substr((f+"").length),p.charAt(1)==="="&&(p=_s(f,p)+v),g=parseFloat(p),A=p.substr((g+"").length),l=gs.lastIndex-A.length,A||(A=A||Kn.units[e]||v,l===i.length&&(i+=A,o.e+=A)),v!==A&&(f=Jr(t,e,_,A)||0),o._pt={_next:o._pt,p:b||c===1?b:",",s:f,c:g-f,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?o_:a_;return _d.test(i)&&(o.e=0),this._pt=o,o},i_={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},BT=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=i_[n]||n,e[1]=i_[i]||i,e.join(" ")},zT=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],pr[o]&&(l=1,o=o==="transformOrigin"?Qn:Be),Zr(n,o);l&&(Zr(n,Be),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",al(n,1),a.uncache=1,l_(i)))}},Xh={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new Bn(t._pt,e,n,0,0,zT);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},sl=[1,0,0,1,0,0],d_={},p_=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},r_=function(t){var e=oi(t,Be);return p_(e)?sl:e.substr(7).match(gd).map(Ve)},Vd=function(t,e){var n=t._gsap||Hr(t),i=t.style,s=r_(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?sl:s):(s===sl&&!t.offsetParent&&t!==Aa&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,Aa.appendChild(t)),s=r_(t),l?i.display=l:Zr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):Aa.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Od=function(t,e,n,i,s,a){var o=t._gsap,l=s||Vd(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,u=o.yOffset||0,f=l[0],m=l[1],_=l[2],p=l[3],g=l[4],b=l[5],A=e.split(" "),v=parseFloat(A[0])||0,S=parseFloat(A[1])||0,w,E,x,T;n?l!==sl&&(E=f*p-m*_)&&(x=v*(p/E)+S*(-_/E)+(_*b-p*g)/E,T=v*(-m/E)+S*(f/E)-(f*b-m*g)/E,v=x,S=T):(w=u_(t),v=w.x+(~A[0].indexOf("%")?v/100*w.width:v),S=w.y+(~(A[1]||A[0]).indexOf("%")?S/100*w.height:S)),i||i!==!1&&o.smooth?(g=v-c,b=S-h,o.xOffset=d+(g*f+b*_)-g,o.yOffset=u+(g*m+b*p)-b):o.xOffset=o.yOffset=0,o.xOrigin=v,o.yOrigin=S,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[Qn]="0px 0px",a&&(Yr(a,o,"xOrigin",c,v),Yr(a,o,"yOrigin",h,S),Yr(a,o,"xOffset",d,o.xOffset),Yr(a,o,"yOffset",u,o.yOffset)),t.setAttribute("data-svg-origin",v+" "+S)},al=function(t,e){var n=t._gsap||new wd(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=oi(t,Qn)||"0",h,d,u,f,m,_,p,g,b,A,v,S,w,E,x,T,C,D,L,F,I,z,H,k,Q,Y,P,$,wt,Tt,Wt,qt;return h=d=u=_=p=g=b=A=v=0,f=m=1,n.svg=!!(t.getCTM&&f_(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Be]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Be]!=="none"?l[Be]:"")),i.scale=i.rotate=i.translate="none"),E=Vd(t,n.svg),n.svg&&(n.uncache?(Q=t.getBBox(),c=n.xOrigin-Q.x+"px "+(n.yOrigin-Q.y)+"px",k=""):k=!e&&t.getAttribute("data-svg-origin"),Od(t,k||c,!!k||n.originIsAbsolute,n.smooth!==!1,E)),S=n.xOrigin||0,w=n.yOrigin||0,E!==sl&&(D=E[0],L=E[1],F=E[2],I=E[3],h=z=E[4],d=H=E[5],E.length===6?(f=Math.sqrt(D*D+L*L),m=Math.sqrt(I*I+F*F),_=D||L?Ea(L,D)*Ss:0,b=F||I?Ea(F,I)*Ss+_:0,b&&(m*=Math.abs(Math.cos(b*Ca))),n.svg&&(h-=S-(S*D+w*F),d-=w-(S*L+w*I))):(qt=E[6],Tt=E[7],P=E[8],$=E[9],wt=E[10],Wt=E[11],h=E[12],d=E[13],u=E[14],x=Ea(qt,wt),p=x*Ss,x&&(T=Math.cos(-x),C=Math.sin(-x),k=z*T+P*C,Q=H*T+$*C,Y=qt*T+wt*C,P=z*-C+P*T,$=H*-C+$*T,wt=qt*-C+wt*T,Wt=Tt*-C+Wt*T,z=k,H=Q,qt=Y),x=Ea(-F,wt),g=x*Ss,x&&(T=Math.cos(-x),C=Math.sin(-x),k=D*T-P*C,Q=L*T-$*C,Y=F*T-wt*C,Wt=I*C+Wt*T,D=k,L=Q,F=Y),x=Ea(L,D),_=x*Ss,x&&(T=Math.cos(x),C=Math.sin(x),k=D*T+L*C,Q=z*T+H*C,L=L*T-D*C,H=H*T-z*C,D=k,z=Q),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,g=180-g),f=Ve(Math.sqrt(D*D+L*L+F*F)),m=Ve(Math.sqrt(H*H+qt*qt)),x=Ea(z,H),b=Math.abs(x)>2e-4?x*Ss:0,v=Wt?1/(Wt<0?-Wt:Wt):0),n.svg&&(k=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!p_(oi(t,Be)),k&&t.setAttribute("transform",k))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(f*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,b+=b<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Ve(f),n.scaleY=Ve(m),n.rotation=Ve(_)+o,n.rotationX=Ve(p)+o,n.rotationY=Ve(g)+o,n.skewX=b+o,n.skewY=A+o,n.transformPerspective=v+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Qn]=qh(c)),n.xOffset=n.yOffset=0,n.force3D=Kn.force3D,n.renderTransform=n.svg?VT:h_?m_:kT,n.uncache=0,n},qh=function(t){return(t=t.split(" "))[0]+" "+t[1]},Dd=function(t,e,n){var i=gn(e);return Ve(parseFloat(e)+parseFloat(Jr(t,"x",n+"px",i)))+i},kT=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,m_(t,e)},vs="0deg",rl="0px",ys=") ",m_=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,m=n.scaleX,_=n.scaleY,p=n.transformPerspective,g=n.force3D,b=n.target,A=n.zOrigin,v="",S=g==="auto"&&t&&t!==1||g===!0;if(A&&(d!==vs||h!==vs)){var w=parseFloat(h)*Ca,E=Math.sin(w),x=Math.cos(w),T;w=parseFloat(d)*Ca,T=Math.cos(w),a=Dd(b,a,E*T*-A),o=Dd(b,o,-Math.sin(w)*-A),l=Dd(b,l,x*T*-A+A)}p!==rl&&(v+="perspective("+p+ys),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(S||a!==rl||o!==rl||l!==rl)&&(v+=l!==rl||S?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ys),c!==vs&&(v+="rotate("+c+ys),h!==vs&&(v+="rotateY("+h+ys),d!==vs&&(v+="rotateX("+d+ys),(u!==vs||f!==vs)&&(v+="skew("+u+", "+f+ys),(m!==1||_!==1)&&(v+="scale("+m+", "+_+ys),b.style[Be]=v||"translate(0, 0)"},VT=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,m=n.xOrigin,_=n.yOrigin,p=n.xOffset,g=n.yOffset,b=n.forceCSS,A=parseFloat(a),v=parseFloat(o),S,w,E,x,T;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Ca,c*=Ca,S=Math.cos(l)*d,w=Math.sin(l)*d,E=Math.sin(l-c)*-u,x=Math.cos(l-c)*u,c&&(h*=Ca,T=Math.tan(c-h),T=Math.sqrt(1+T*T),E*=T,x*=T,h&&(T=Math.tan(h),T=Math.sqrt(1+T*T),S*=T,w*=T)),S=Ve(S),w=Ve(w),E=Ve(E),x=Ve(x)):(S=d,x=u,w=E=0),(A&&!~(a+"").indexOf("px")||v&&!~(o+"").indexOf("px"))&&(A=Jr(f,"x",a,"px"),v=Jr(f,"y",o,"px")),(m||_||p||g)&&(A=Ve(A+m-(m*S+_*E)+p),v=Ve(v+_-(m*w+_*x)+g)),(i||s)&&(T=f.getBBox(),A=Ve(A+i/100*T.width),v=Ve(v+s/100*T.height)),T="matrix("+S+","+w+","+E+","+x+","+A+","+v+")",f.setAttribute("transform",T),b&&(f.style[Be]=T)},GT=function(t,e,n,i,s){var a=360,o=nn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Ss:1),c=l-i,h=i+c+"deg",d,u;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*Qg)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*Qg)%a-~~(c/a)*a)),t._pt=u=new Bn(t._pt,e,n,i,c,TT),u.e=h,u.u="deg",t._props.push(n),u},s_=function(t,e){for(var n in e)t[n]=e[n];return t},HT=function(t,e,n){var i=s_({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,u,f,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Be]=e,o=al(n,1),Zr(n,Be),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Be],a[Be]=e,o=al(n,1),a[Be]=c);for(l in pr)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(f=gn(c),m=gn(h),d=f!==m?Jr(n,l,c,m):parseFloat(c),u=parseFloat(h),t._pt=new Bn(t._pt,o,l,d,u-d,Nd),t._pt.u=m||0,t._props.push(l));s_(o,i)};On("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});Xh[t>1?"border"+r:r]=function(o,l,c,h,d){var u,f;if(arguments.length<4)return u=a.map(function(m){return dr(o,m,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(m,_){return f[m]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,f,d)}});var Gd={name:"css",register:Fd,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,l=n.vars.startAt,c,h,d,u,f,m,_,p,g,b,A,v,S,w,E,x,T;Bd||Fd(),this.styles=this.styles||c_(t),x=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(Zn[_]&&Ad(_,e,n,i,t,s)))){if(f=typeof h,m=Xh[_],f==="function"&&(h=h.call(n,i,t,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=wa(h)),m)m(this,t,_,h,n)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",ur.lastIndex=0,ur.test(c)||(p=gn(c),g=gn(h),g?p!==g&&(c=Jr(t,_,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,_),a.push(_),x.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],nn(c)&&~c.indexOf("random(")&&(c=wa(c)),gn(c+"")||c==="auto"||(c+=Kn.units[_]||gn(dr(t,_))||""),(c+"").charAt(1)==="="&&(c=dr(t,_))):c=dr(t,_),u=parseFloat(c),b=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),b&&(h=h.substr(2)),d=parseFloat(h),_ in Qi&&(_==="autoAlpha"&&(u===1&&dr(t,"visibility")==="hidden"&&d&&(u=0),x.push("visibility",0,o.visibility),Yr(this,o,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=Qi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),A=_ in pr,A){if(this.styles.save(_),T=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=oi(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var C=t.style.perspective;t.style.perspective=h,h=oi(t,"perspective"),C?t.style.perspective=C:Zr(t,"perspective")}d=parseFloat(h)}if(v||(S=t._gsap,S.renderTransform&&!e.parseTransform||al(t,e.parseTransform),w=e.smoothOrigin!==!1&&S.smooth,v=this._pt=new Bn(this._pt,o,Be,0,1,S.renderTransform,S,0,-1),v.dep=1),_==="scale")this._pt=new Bn(this._pt,S,"scaleY",S.scaleY,(b?_s(S.scaleY,b+d):d)-S.scaleY||0,Nd),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){x.push(Qn,0,o[Qn]),h=BT(h),S.svg?Od(t,h,0,w,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==S.zOrigin&&Yr(this,S,"zOrigin",S.zOrigin,g),Yr(this,o,_,qh(c),qh(h)));continue}else if(_==="svgOrigin"){Od(t,h,1,w,0,this);continue}else if(_ in d_){GT(this,S,_,u,b?_s(u,b+h):h);continue}else if(_==="smoothOrigin"){Yr(this,S,"smooth",S.smooth,h);continue}else if(_==="force3D"){S[_]=h;continue}else if(_==="transform"){HT(this,h,t);continue}}else _ in o||(_=Ra(_)||_);if(A||(d||d===0)&&(u||u===0)&&!bT.test(h)&&_ in o)p=(c+"").substr((u+"").length),d||(d=0),g=gn(h)||(_ in Kn.units?Kn.units[_]:p),p!==g&&(u=Jr(t,_,c,g)),this._pt=new Bn(this._pt,A?S:o,_,u,(b?_s(u,b+d):d)-u,!A&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?AT:Nd),this._pt.u=g||0,A&&T!==h?(this._pt.b=c,this._pt.e=T,this._pt.r=ET):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=wT);else if(_ in o)OT.call(this,t,_,c,b?b+h:h);else if(_ in t)this.add(t,_,c||t[_],b?b+h:h,i,s);else if(_!=="parseTransform"){kh(_,h);continue}A||(_ in o?x.push(_,0,o[_]):typeof t[_]=="function"?x.push(_,2,t[_]()):x.push(_,1,c||t[_])),a.push(_)}}E&&Ld(this)},render:function(t,e){if(e.tween._time||!zd())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:dr,aliases:Qi,getSetter:function(t,e,n){var i=Qi[e];return i&&i.indexOf(",")<0&&(e=i),e in pr&&e!==Qn&&(t._gsap.x||dr(t,"x"))?n&&Kg===n?e==="scale"?IT:PT:(Kg=n||{})&&(e==="scale"?LT:DT):t.style&&!zh(t.style[e])?CT:~e.indexOf("-")?RT:Wh(t,e)},core:{_removeProperty:Zr,_getMatrix:Vd}};En.utils.checkPrefix=Ra;En.core.getStyleSaver=c_;(function(r,t,e,n){var i=On(r+","+t+","+e,function(s){pr[s]=1});On(t,function(s){Kn.units[s]="deg",d_[s]=1}),Qi[i[13]]=r+","+t,On(n,function(s){var a=s.split(":");Qi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");On("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Kn.units[r]="px"});En.registerPlugin(Gd);var Si=En.registerPlugin(Gd)||En,zA=Si.core.Tween;function g_(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function WT(r,t,e){return t&&g_(r.prototype,t),e&&g_(r,e),r}var _n,Jh,XT,li,$r,Kr,Ia,x_,bs,La,v_,mr,Di,y_,S_=function(){return _n||typeof window!="undefined"&&(_n=window.gsap)&&_n.registerPlugin&&_n},M_=1,Pa=[],se=[],Ni=[],ll=Date.now,Hd=function(t,e){return e},qT=function(){var t=La.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,se),i.push.apply(i,Ni),se=n,Ni=i,Hd=function(a,o){return e[a](o)}},_r=function(t,e){return~Ni.indexOf(t)&&Ni[Ni.indexOf(t)+1][e]},cl=function(t){return!!~v_.indexOf(t)},kn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},zn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Yh="scrollLeft",Zh="scrollTop",Wd=function(){return mr&&mr.isPressed||se.cache++},$h=function(t,e){var n=function i(s){if(s||s===0){M_&&(li.history.scrollRestoration="manual");var a=mr&&mr.isPressed;s=i.v=Math.round(s)||(mr&&mr.iOS?1:0),t(s),i.cacheID=se.cache,a&&Hd("ss",s)}else(e||se.cache!==i.cacheID||Hd("ref"))&&(i.cacheID=se.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},An={s:Yh,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:$h(function(r){return arguments.length?li.scrollTo(r,Ke.sc()):li.pageXOffset||$r[Yh]||Kr[Yh]||Ia[Yh]||0})},Ke={s:Zh,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:An,sc:$h(function(r){return arguments.length?li.scrollTo(An.sc(),r):li.pageYOffset||$r[Zh]||Kr[Zh]||Ia[Zh]||0})},Vn=function(t,e){return(e&&e._ctx&&e._ctx.selector||_n.utils.toArray)(t)[0]||(typeof t=="string"&&_n.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},YT=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},gr=function(t,e){var n=e.s,i=e.sc;cl(t)&&(t=$r.scrollingElement||Kr);var s=se.indexOf(t),a=i===Ke.sc?1:2;!~s&&(s=se.push(t)-1),se[s+a]||kn(t,"scroll",Wd);var o=se[s+a],l=o||(se[s+a]=$h(_r(t,n),!0)||(cl(t)?i:$h(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,o||(l.smooth=_n.getProperty(t,"scrollBehavior")==="smooth"),l},Kh=function(t,e,n){var i=t,s=t,a=ll(),o=a,l=e||50,c=Math.max(500,l*3),h=function(m,_){var p=ll();_||p-a>l?(s=i,i=m,o=a,a=p):n?i+=m:i=s+(m-s)/(p-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},u=function(m){var _=o,p=s,g=ll();return(m||m===0)&&m!==i&&h(m),a===o||g-o>c?0:(i+(n?p:-p))/((n?g:a)-_)*1e3};return{update:h,reset:d,getVelocity:u}},ol=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},__=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},b_=function(){La=_n.core.globals().ScrollTrigger,La&&La.core&&qT()},T_=function(t){return _n=t||S_(),!Jh&&_n&&typeof document!="undefined"&&document.body&&(li=window,$r=document,Kr=$r.documentElement,Ia=$r.body,v_=[li,$r,Kr,Ia],XT=_n.utils.clamp,y_=_n.core.context||function(){},bs="onpointerenter"in Ia?"pointer":"mouse",x_=Ge.isTouch=li.matchMedia&&li.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in li||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Di=Ge.eventTypes=("ontouchstart"in Kr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Kr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return M_=0},500),Jh=1),La||b_(),Jh};An.op=Ke;se.cache=0;var Ge=(function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Jh||T_(_n)||console.warn("Please gsap.registerPlugin(Observer)"),La||b_();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,u=n.onStopDelay,f=n.ignore,m=n.wheelSpeed,_=n.event,p=n.onDragStart,g=n.onDragEnd,b=n.onDrag,A=n.onPress,v=n.onRelease,S=n.onRight,w=n.onLeft,E=n.onUp,x=n.onDown,T=n.onChangeX,C=n.onChangeY,D=n.onChange,L=n.onToggleX,F=n.onToggleY,I=n.onHover,z=n.onHoverEnd,H=n.onMove,k=n.ignoreCheck,Q=n.isNormalizer,Y=n.onGestureStart,P=n.onGestureEnd,$=n.onWheel,wt=n.onEnable,Tt=n.onDisable,Wt=n.onClick,qt=n.scrollSpeed,$t=n.capture,J=n.allowClicks,et=n.lockAxis,pt=n.onLockAxis;this.target=o=Vn(o)||Kr,this.vars=n,f&&(f=_n.utils.toArray(f)),i=i||1e-9,s=s||0,m=m||1,qt=qt||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(li.getComputedStyle(Ia).lineHeight)||22);var Gt,_t,Lt,Nt,j,rt,ot,N=this,ft=0,zt=0,Ut=n.passive||!h&&n.passive!==!1,Ct=gr(o,An),Zt=gr(o,Ke),U=Ct(),oe=Zt(),Xt=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Di[0]==="pointerdown",R=cl(o),y=o.ownerDocument||$r,G=[0,0,0],W=[0,0,0],K=0,dt=function(){return K=ll()},ct=function(at,Ht){return(N.event=at)&&f&&YT(at.target,f)||Ht&&Xt&&at.pointerType!=="touch"||k&&k(at,Ht)},tt=function(){N._vx.reset(),N._vy.reset(),_t.pause(),d&&d(N)},it=function(){var at=N.deltaX=__(G),Ht=N.deltaY=__(W),lt=Math.abs(at)>=i,Yt=Math.abs(Ht)>=i;D&&(lt||Yt)&&D(N,at,Ht,G,W),lt&&(S&&N.deltaX>0&&S(N),w&&N.deltaX<0&&w(N),T&&T(N),L&&N.deltaX<0!=ft<0&&L(N),ft=N.deltaX,G[0]=G[1]=G[2]=0),Yt&&(x&&N.deltaY>0&&x(N),E&&N.deltaY<0&&E(N),C&&C(N),F&&N.deltaY<0!=zt<0&&F(N),zt=N.deltaY,W[0]=W[1]=W[2]=0),(Nt||Lt)&&(H&&H(N),Lt&&(p&&Lt===1&&p(N),b&&b(N),Lt=0),Nt=!1),rt&&!(rt=!1)&&pt&&pt(N),j&&($(N),j=!1),Gt=0},xt=function(at,Ht,lt){G[lt]+=at,W[lt]+=Ht,N._vx.update(at),N._vy.update(Ht),c?Gt||(Gt=requestAnimationFrame(it)):it()},Dt=function(at,Ht){et&&!ot&&(N.axis=ot=Math.abs(at)>Math.abs(Ht)?"x":"y",rt=!0),ot!=="y"&&(G[2]+=at,N._vx.update(at,!0)),ot!=="x"&&(W[2]+=Ht,N._vy.update(Ht,!0)),c?Gt||(Gt=requestAnimationFrame(it)):it()},vt=function(at){if(!ct(at,1)){at=ol(at,h);var Ht=at.clientX,lt=at.clientY,Yt=Ht-N.x,Ft=lt-N.y,jt=N.isDragging;N.x=Ht,N.y=lt,(jt||(Yt||Ft)&&(Math.abs(N.startX-Ht)>=s||Math.abs(N.startY-lt)>=s))&&(Lt||(Lt=jt?2:1),jt||(N.isDragging=!0),Dt(Yt,Ft))}},gt=N.onPress=function(ht){ct(ht,1)||ht&&ht.button||(N.axis=ot=null,_t.pause(),N.isPressed=!0,ht=ol(ht),ft=zt=0,N.startX=N.x=ht.clientX,N.startY=N.y=ht.clientY,N._vx.reset(),N._vy.reset(),kn(Q?o:y,Di[1],vt,Ut,!0),N.deltaX=N.deltaY=0,A&&A(N))},ut=N.onRelease=function(ht){if(!ct(ht,1)){zn(Q?o:y,Di[1],vt,!0);var at=!isNaN(N.y-N.startY),Ht=N.isDragging,lt=Ht&&(Math.abs(N.x-N.startX)>3||Math.abs(N.y-N.startY)>3),Yt=ol(ht);!lt&&at&&(N._vx.reset(),N._vy.reset(),h&&J&&_n.delayedCall(.08,function(){if(ll()-K>300&&!ht.defaultPrevented){if(ht.target.click)ht.target.click();else if(y.createEvent){var Ft=y.createEvent("MouseEvents");Ft.initMouseEvent("click",!0,!0,li,1,Yt.screenX,Yt.screenY,Yt.clientX,Yt.clientY,!1,!1,!1,!1,0,null),ht.target.dispatchEvent(Ft)}}})),N.isDragging=N.isGesturing=N.isPressed=!1,d&&Ht&&!Q&&_t.restart(!0),Lt&&it(),g&&Ht&&g(N),v&&v(N,lt)}},kt=function(at){return at.touches&&at.touches.length>1&&(N.isGesturing=!0)&&Y(at,N.isDragging)},Jt=function(){return(N.isGesturing=!1)||P(N)},O=function(at){if(!ct(at)){var Ht=Ct(),lt=Zt();xt((Ht-U)*qt,(lt-oe)*qt,1),U=Ht,oe=lt,d&&_t.restart(!0)}},mt=function(at){if(!ct(at)){at=ol(at,h),$&&(j=!0);var Ht=(at.deltaMode===1?l:at.deltaMode===2?li.innerHeight:1)*m;xt(at.deltaX*Ht,at.deltaY*Ht,0),d&&!Q&&_t.restart(!0)}},nt=function(at){if(!ct(at)){var Ht=at.clientX,lt=at.clientY,Yt=Ht-N.x,Ft=lt-N.y;N.x=Ht,N.y=lt,Nt=!0,d&&_t.restart(!0),(Yt||Ft)&&Dt(Yt,Ft)}},yt=function(at){N.event=at,I(N)},Mt=function(at){N.event=at,z(N)},st=function(at){return ct(at)||ol(at,h)&&Wt(N)};_t=N._dc=_n.delayedCall(u||.25,tt).pause(),N.deltaX=N.deltaY=0,N._vx=Kh(0,50,!0),N._vy=Kh(0,50,!0),N.scrollX=Ct,N.scrollY=Zt,N.isDragging=N.isGesturing=N.isPressed=!1,y_(this),N.enable=function(ht){return N.isEnabled||(kn(R?y:o,"scroll",Wd),a.indexOf("scroll")>=0&&kn(R?y:o,"scroll",O,Ut,$t),a.indexOf("wheel")>=0&&kn(o,"wheel",mt,Ut,$t),(a.indexOf("touch")>=0&&x_||a.indexOf("pointer")>=0)&&(kn(o,Di[0],gt,Ut,$t),kn(y,Di[2],ut),kn(y,Di[3],ut),J&&kn(o,"click",dt,!0,!0),Wt&&kn(o,"click",st),Y&&kn(y,"gesturestart",kt),P&&kn(y,"gestureend",Jt),I&&kn(o,bs+"enter",yt),z&&kn(o,bs+"leave",Mt),H&&kn(o,bs+"move",nt)),N.isEnabled=!0,N.isDragging=N.isGesturing=N.isPressed=Nt=Lt=!1,N._vx.reset(),N._vy.reset(),U=Ct(),oe=Zt(),ht&&ht.type&&gt(ht),wt&&wt(N)),N},N.disable=function(){N.isEnabled&&(Pa.filter(function(ht){return ht!==N&&cl(ht.target)}).length||zn(R?y:o,"scroll",Wd),N.isPressed&&(N._vx.reset(),N._vy.reset(),zn(Q?o:y,Di[1],vt,!0)),zn(R?y:o,"scroll",O,$t),zn(o,"wheel",mt,$t),zn(o,Di[0],gt,$t),zn(y,Di[2],ut),zn(y,Di[3],ut),zn(o,"click",dt,!0),zn(o,"click",st),zn(y,"gesturestart",kt),zn(y,"gestureend",Jt),zn(o,bs+"enter",yt),zn(o,bs+"leave",Mt),zn(o,bs+"move",nt),N.isEnabled=N.isPressed=N.isDragging=!1,Tt&&Tt(N))},N.kill=N.revert=function(){N.disable();var ht=Pa.indexOf(N);ht>=0&&Pa.splice(ht,1),mr===N&&(mr=0)},Pa.push(N),Q&&cl(o)&&(mr=N),N.enable(_)},WT(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Ge.version="3.15.0";Ge.create=function(r){return new Ge(r)};Ge.register=T_;Ge.getAll=function(){return Pa.slice()};Ge.getById=function(r){return Pa.filter(function(t){return t.vars.id===r})[0]};S_()&&_n.registerPlugin(Ge);var It,Fa,he,ve,ui,xe,rp,du,bl,gl,ul,Qh,Cn,gu,Kd,Hn,w_,E_,Oa,G_,Xd,H_,Gn,Qd,W_,X_,Qr,jd,sp,Ba,ap,_l,tp,qd,jh=1,Rn=Date.now,Yd=Rn(),Ti=0,fl=0,A_=function(t,e,n){var i=hi(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},C_=function(t,e){return e&&(!hi(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},ZT=function r(){return fl&&requestAnimationFrame(r)},R_=function(){return gu=1},P_=function(){return gu=0},ji=function(t){return t},dl=function(t){return Math.round(t*1e5)/1e5||0},q_=function(){return typeof window!="undefined"},Y_=function(){return It||q_()&&(It=window.gsap)&&It.registerPlugin&&It},Rs=function(t){return!!~rp.indexOf(t)},Z_=function(t){return(t==="Height"?ap:he["inner"+t])||ui["client"+t]||xe["client"+t]},J_=function(t){return _r(t,"getBoundingClientRect")||(Rs(t)?function(){return fu.width=he.innerWidth,fu.height=ap,fu}:function(){return xr(t)})},JT=function(t,e,n){var i=n.d,s=n.d2,a=n.a;return(a=_r(t,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(e?Z_(s):t["client"+s])||0}},$T=function(t,e){return!e||~Ni.indexOf(t)?J_(t):function(){return fu}},tr=function(t,e){var n=e.s,i=e.d2,s=e.d,a=e.a;return Math.max(0,(n="scroll"+i)&&(a=_r(t,n))?a()-J_(t)()[s]:Rs(t)?(ui[n]||xe[n])-Z_(i):t[n]-t["offset"+i])},tu=function(t,e){for(var n=0;n<Oa.length;n+=3)(!e||~e.indexOf(Oa[n+1]))&&t(Oa[n],Oa[n+1],Oa[n+2])},hi=function(t){return typeof t=="string"},Pn=function(t){return typeof t=="function"},pl=function(t){return typeof t=="number"},Ts=function(t){return typeof t=="object"},hl=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Da=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},Na=Math.abs,$_="left",K_="top",op="right",lp="bottom",Es="width",As="height",xl="Right",vl="Left",yl="Top",Sl="Bottom",Qe="padding",Mi="margin",ka="Width",cp="Height",rn="px",bi=function(t){return he.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},KT=function(t){var e=bi(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},I_=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},xr=function(t,e){var n=e&&bi(t)[Kd]!=="matrix(1, 0, 0, 1, 0, 0)"&&It.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},pu=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Q_=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},QT=function(t){return function(e){return It.utils.snap(Q_(t),e)}},hp=function(t){var e=It.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return e(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=e(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:e(s<0?i-t:i+t)}},jT=function(t){return function(e,n){return hp(Q_(t))(e,n.direction)}},eu=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},un=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},hn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},nu=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},L_={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},iu={toggleActions:"play",anticipatePin:0},mu={top:0,left:0,center:.5,bottom:1,right:1},lu=function(t,e){if(hi(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in mu?mu[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},ru=function(t,e,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,d=s.fontSize,u=s.indent,f=s.fontWeight,m=ve.createElement("div"),_=Rs(n)||_r(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,g=_?xe:n.tagName==="IFRAME"?n.contentDocument.body:n,b=t.indexOf("start")!==-1,A=b?c:h,v="border-color:"+A+";font-size:"+d+";color:"+A+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(v+=(i===Ke?op:lp)+":"+(a+parseFloat(u))+"px;"),o&&(v+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),m._isStart=b,m.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),m.style.cssText=v,m.innerText=e||e===0?t+"-"+e:t,g.children[0]?g.insertBefore(m,g.children[0]):g.appendChild(m),m._offset=m["offset"+i.op.d2],cu(m,0,i,b),m},cu=function(t,e,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+ka]=1,s["border"+o+ka]=0,s[n.p]=e+"px",It.set(t,s)},ae=[],ep={},Tl,D_=function(){return Rn()-Ti>34&&(Tl||(Tl=requestAnimationFrame(vr)))},Ua=function(){(!Gn||!Gn.isPressed||Gn.startX>xe.clientWidth)&&(se.cache++,Gn?Tl||(Tl=requestAnimationFrame(vr)):vr(),Ti||Is("scrollStart"),Ti=Rn())},Zd=function(){X_=he.innerWidth,W_=he.innerHeight},ml=function(t){se.cache++,(t===!0||!Cn&&!H_&&!ve.fullscreenElement&&!ve.webkitFullscreenElement&&(!Qd||X_!==he.innerWidth||Math.abs(he.innerHeight-W_)>he.innerHeight*.25))&&du.restart(!0)},Ps={},t1=[],j_=function r(){return hn(ee,"scrollEnd",r)||ws(!0)},Is=function(t){return Ps[t]&&Ps[t].map(function(e){return e()})||t1},ci=[],t0=function(t){for(var e=0;e<ci.length;e+=5)(!t||ci[e+4]&&ci[e+4].query===t)&&(ci[e].style.cssText=ci[e+1],ci[e].getBBox&&ci[e].setAttribute("transform",ci[e+2]||""),ci[e+3].uncache=1)},e0=function(){return se.forEach(function(t){return Pn(t)&&++t.cacheID&&(t.rec=t())})},up=function(t,e){var n;for(Hn=0;Hn<ae.length;Hn++)n=ae[Hn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));_l=!0,e&&t0(e),e||Is("revert")},n0=function(t,e){se.cache++,(e||!Wn)&&se.forEach(function(n){return Pn(n)&&n.cacheID++&&(n.rec=0)}),hi(t)&&(he.history.scrollRestoration=sp=t)},Wn,Cs=0,N_,e1=function(){if(N_!==Cs){var t=N_=Cs;requestAnimationFrame(function(){return t===Cs&&ws(!0)})}},i0=function(){xe.appendChild(Ba),ap=!Gn&&Ba.offsetHeight||he.innerHeight,xe.removeChild(Ba)},U_=function(t){return bl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},ws=function(t,e){if(ui=ve.documentElement,xe=ve.body,rp=[he,ve,ui,xe],Ti&&!t&&!_l){un(ee,"scrollEnd",j_);return}i0(),Wn=ee.isRefreshing=!0,_l||e0();var n=Is("refreshInit");G_&&ee.sort(),e||up(),se.forEach(function(i){Pn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ae.slice(0).forEach(function(i){return i.refresh()}),_l=!1,ae.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),tp=1,U_(!0),ae.forEach(function(i){var s=tr(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),U_(!1),tp=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),se.forEach(function(i){Pn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),n0(sp,1),du.pause(),Cs++,Wn=2,vr(2),ae.forEach(function(i){return Pn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Wn=ee.isRefreshing=!1,Is("refresh")},np=0,hu=1,Ml,vr=function(t){if(t===2||!Wn&&!_l){ee.isUpdating=!0,Ml&&Ml.update(0);var e=ae.length,n=Rn(),i=n-Yd>=50,s=e&&ae[0].scroll();if(hu=np>s?-1:1,Wn||(np=s),i&&(Ti&&!gu&&n-Ti>200&&(Ti=0,Is("scrollEnd")),ul=Yd,Yd=n),hu<0){for(Hn=e;Hn-- >0;)ae[Hn]&&ae[Hn].update(0,i);hu=1}else for(Hn=0;Hn<e;Hn++)ae[Hn]&&ae[Hn].update(0,i);ee.isUpdating=!1}Tl=0},ip=[$_,K_,lp,op,Mi+Sl,Mi+xl,Mi+yl,Mi+vl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],uu=ip.concat([Es,As,"boxSizing","max"+ka,"max"+cp,"position",Mi,Qe,Qe+yl,Qe+xl,Qe+Sl,Qe+vl]),n1=function(t,e,n){za(n);var i=t._gsap;if(i.spacerIsNative)za(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Jd=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=ip.length,a=e.style,o=t.style,l;s--;)l=ip[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[lp]=o[op]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Es]=pu(t,An)+rn,a[As]=pu(t,Ke)+rn,a[Qe]=o[Mi]=o[K_]=o[$_]="0",za(i),o[Es]=o["max"+ka]=n[Es],o[As]=o["max"+cp]=n[As],o[Qe]=n[Qe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},i1=/([A-Z])/g,za=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,a;for((t.t._gsap||It.core.getCache(t.t)).uncache=1;i<n;i+=2)a=t[i+1],s=t[i],a?e[s]=a:e[s]&&e.removeProperty(s.replace(i1,"-$1").toLowerCase())}},su=function(t){for(var e=uu.length,n=t.style,i=[],s=0;s<e;s++)i.push(uu[s],n[uu[s]]);return i.t=t,i},r1=function(t,e,n){for(var i=[],s=t.length,a=n?8:0,o;a<s;a+=2)o=t[a],i.push(o,o in e?e[o]:t[a+1]);return i.t=t.t,i},fu={left:0,top:0},F_=function(t,e,n,i,s,a,o,l,c,h,d,u,f,m){Pn(t)&&(t=t(l)),hi(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?lu("0"+t.substr(3),n):0));var _=f?f.time():0,p,g,b;if(f&&f.seek(0),isNaN(t)||(t=+t),pl(t))f&&(t=It.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,u,t)),o&&cu(o,n,i,!0);else{Pn(e)&&(e=e(l));var A=(t||"0").split(" "),v,S,w,E;b=Vn(e,l)||xe,v=xr(b)||{},(!v||!v.left&&!v.top)&&bi(b).display==="none"&&(E=b.style.display,b.style.display="block",v=xr(b),E?b.style.display=E:b.style.removeProperty("display")),S=lu(A[0],v[i.d]),w=lu(A[1]||"0",n),t=v[i.p]-c[i.p]-h+S+s-w,o&&cu(o,w,i,n-w<20||o._isStart&&w>20),n-=n-w}if(m&&(l[m]=t||-.001,t<0&&(t=0)),a){var x=t+n,T=a._isStart;p="scroll"+i.d2,cu(a,x,i,T&&x>20||!T&&(d?Math.max(xe[p],ui[p]):a.parentNode[p])<=x+1),d&&(c=xr(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+rn))}return f&&b&&(p=xr(b),f.seek(u),g=xr(b),f._caScrollDist=p[i.p]-g[i.p],t=t/f._caScrollDist*u),f&&f.seek(_),f?t:Math.round(t)},s1=/(webkit|moz|length|cssText|inset)/i,O_=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,a,o;if(e===xe){t._stOrig=s.cssText,o=bi(t);for(a in o)!+a&&!s1.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=t._stOrig;It.core.getCache(t).uncache=1,e.appendChild(t)}},r0=function(t,e,n){var i=e,s=i;return function(a){var o=Math.round(t());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},au=function(t,e,n){var i={};i[e.p]="+="+n,It.set(t,i)},B_=function(t,e){var n=gr(t,e),i="_scroll"+e.p2,s=function a(o,l,c,h,d){var u=a.tween,f=l.onComplete,m={};c=c||n();var _=r0(n,c,function(){u.kill(),a.tween=0});return d=h&&d||0,h=h||o-c,u&&u.kill(),l[i]=o,l.inherit=!1,l.modifiers=m,m[i]=function(){return _(c+h*u.ratio+d*u.ratio*u.ratio)},l.onUpdate=function(){se.cache++,a.tween&&vr()},l.onComplete=function(){a.tween=0,f&&f.call(u)},u=a.tween=It.to(t,l),u};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(t,"wheel",n.wheelHandler),ee.isTouch&&un(t,"touchmove",n.wheelHandler),s},ee=(function(){function r(e,n){Fa||r.register(It)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),jd(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!fl){this.update=this.refresh=this.kill=ji;return}n=I_(hi(n)||pl(n)||n.nodeType?{trigger:n}:n,iu);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,d=s.scrub,u=s.trigger,f=s.pin,m=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,g=s.onScrubComplete,b=s.onSnapComplete,A=s.once,v=s.snap,S=s.pinReparent,w=s.pinSpacer,E=s.containerAnimation,x=s.fastScrollEnd,T=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?An:Ke,D=!d&&d!==0,L=Vn(n.scroller||he),F=It.core.getCache(L),I=Rs(L),z=("pinType"in n?n.pinType:_r(L,"pinType")||I&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],k=D&&n.toggleActions.split(" "),Q="markers"in n?n.markers:iu.markers,Y=I?0:parseFloat(bi(L)["border"+C.p2+ka])||0,P=this,$=n.onRefreshInit&&function(){return n.onRefreshInit(P)},wt=JT(L,I,C),Tt=$T(L,I),Wt=0,qt=0,$t=0,J=gr(L,C),et,pt,Gt,_t,Lt,Nt,j,rt,ot,N,ft,zt,Ut,Ct,Zt,U,oe,Xt,R,y,G,W,K,dt,ct,tt,it,xt,Dt,vt,gt,ut,kt,Jt,O,mt,nt,yt,Mt;if(P._startClamp=P._endClamp=!1,P._dir=C,p*=45,P.scroller=L,P.scroll=E?E.time.bind(E):J,_t=J(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(G_=1,n.refreshPriority===-9999&&(Ml=P)),F.tweenScroll=F.tweenScroll||{top:B_(L,Ke),left:B_(L,An)},P.tweenTo=et=F.tweenScroll[C.p],P.scrubDuration=function(lt){kt=pl(lt)&&lt,kt?ut?ut.duration(lt):ut=It.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:kt,paused:!0,onComplete:function(){return g&&g(P)}}):(ut&&ut.progress(1).kill(),ut=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(d),vt=0,l||(l=i.vars.id)),v&&((!Ts(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in xe.style&&It.set(I?[xe,ui]:L,{scrollBehavior:"auto"}),se.forEach(function(lt){return Pn(lt)&&lt.target===(I?ve.scrollingElement||ui:L)&&(lt.smooth=!1)}),Gt=Pn(v.snapTo)?v.snapTo:v.snapTo==="labels"?QT(i):v.snapTo==="labelsDirectional"?jT(i):v.directional!==!1?function(lt,Yt){return hp(v.snapTo)(lt,Rn()-qt<500?0:Yt.direction)}:It.utils.snap(v.snapTo),Jt=v.duration||{min:.1,max:2},Jt=Ts(Jt)?gl(Jt.min,Jt.max):gl(Jt,Jt),O=It.delayedCall(v.delay||kt/2||.1,function(){var lt=J(),Yt=Rn()-qt<500,Ft=et.tween;if((Yt||Math.abs(P.getVelocity())<10)&&!Ft&&!gu&&Wt!==lt){var jt=(lt-Nt)/Ct,qe=i&&!D?i.totalProgress():jt,le=Yt?0:(qe-gt)/(Rn()-ul)*1e3||0,Re=It.utils.clamp(-jt,1-jt,Na(le/2)*le/.185),sn=jt+(v.inertia===!1?0:Re),Pe,Me,de=v,In=de.onStart,Ee=de.onInterrupt,xn=de.onComplete;if(Pe=Gt(sn,P),pl(Pe)||(Pe=sn),Me=Math.max(0,Math.round(Nt+Pe*Ct)),lt<=j&&lt>=Nt&&Me!==lt){if(Ft&&!Ft._initted&&Ft.data<=Na(Me-lt))return;v.inertia===!1&&(Re=Pe-jt),et(Me,{duration:Jt(Na(Math.max(Na(sn-qe),Na(Pe-qe))*.185/le/.05||0)),ease:v.ease||"power3",data:Na(Me-lt),onInterrupt:function(){return O.restart(!0)&&Ee&&Da(P,Ee)},onComplete:function(){P.update(),Wt=J(),i&&!D&&(ut?ut.resetTo("totalProgress",Pe,i._tTime/i._tDur):i.progress(Pe)),vt=gt=i&&!D?i.totalProgress():P.progress,b&&b(P),xn&&Da(P,xn)}},lt,Re*Ct,Me-lt-Re*Ct),In&&Da(P,In,et.tween)}}else P.isActive&&Wt!==lt&&O.restart(!0)}).pause()),l&&(ep[l]=P),u=P.trigger=Vn(u||f!==!0&&f),Mt=u&&u._gsap&&u._gsap.stRevert,Mt&&(Mt=Mt(P)),f=f===!0?u:Vn(f),hi(o)&&(o={targets:u,className:o}),f&&(m===!1||m===Mi||(m=!m&&f.parentNode&&f.parentNode.style&&bi(f.parentNode).display==="flex"?!1:Qe),P.pin=f,pt=It.core.getCache(f),pt.spacer?Zt=pt.pinState:(w&&(w=Vn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),pt.spacerIsNative=!!w,w&&(pt.spacerState=su(w))),pt.spacer=Xt=w||ve.createElement("div"),Xt.classList.add("pin-spacer"),l&&Xt.classList.add("pin-spacer-"+l),pt.pinState=Zt=su(f)),n.force3D!==!1&&It.set(f,{force3D:!0}),P.spacer=Xt=pt.spacer,Dt=bi(f),dt=Dt[m+C.os2],y=It.getProperty(f),G=It.quickSetter(f,C.a,rn),Jd(f,Xt,Dt),oe=su(f)),Q){zt=Ts(Q)?I_(Q,L_):L_,N=ru("scroller-start",l,L,C,zt,0),ft=ru("scroller-end",l,L,C,zt,0,N),R=N["offset"+C.op.d2];var st=Vn(_r(L,"content")||L);rt=this.markerStart=ru("start",l,st,C,zt,R,0,E),ot=this.markerEnd=ru("end",l,st,C,zt,R,0,E),E&&(yt=It.quickSetter([rt,ot],C.a,rn)),!z&&!(Ni.length&&_r(L,"fixedMarkers")===!0)&&(KT(I?xe:L),It.set([N,ft],{force3D:!0}),tt=It.quickSetter(N,C.a,rn),xt=It.quickSetter(ft,C.a,rn))}if(E){var ht=E.vars.onUpdate,at=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){P.update(0,0,1),ht&&ht.apply(E,at||[])})}if(P.previous=function(){return ae[ae.indexOf(P)-1]},P.next=function(){return ae[ae.indexOf(P)+1]},P.revert=function(lt,Yt){if(!Yt)return P.kill(!0);var Ft=lt!==!1||!P.enabled,jt=Cn;Ft!==P.isReverted&&(Ft&&(mt=Math.max(J(),P.scroll.rec||0),$t=P.progress,nt=i&&i.progress()),rt&&[rt,ot,N,ft].forEach(function(qe){return qe.style.display=Ft?"none":"block"}),Ft&&(Cn=P,P.update(Ft)),f&&(!S||!P.isActive)&&(Ft?n1(f,Xt,Zt):Jd(f,Xt,bi(f),ct)),Ft||P.update(Ft),Cn=jt,P.isReverted=Ft)},P.refresh=function(lt,Yt,Ft,jt){if(!((Cn||!P.enabled)&&!Yt)){if(f&&lt&&Ti){un(r,"scrollEnd",j_);return}!Wn&&$&&$(P),Cn=P,et.tween&&!Ft&&(et.tween.kill(),et.tween=0),ut&&ut.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(St){return St.vars.immediateRender&&St.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var qe=wt(),le=Tt(),Re=E?E.duration():tr(L,C),sn=Ct<=.01||!Ct,Pe=0,Me=jt||0,de=Ts(Ft)?Ft.end:n.end,In=n.endTrigger||u,Ee=Ts(Ft)?Ft.start:n.start||(n.start===0||!u?0:f?"0 0":"0 100%"),xn=P.pinnedContainer=n.pinnedContainer&&Vn(n.pinnedContainer,P),Ln=u&&Math.max(0,ae.indexOf(P))||0,Ye=Ln,ze,je,Ui,Ls,an,He,fi,Ds,M,B,Z,X,q;for(Q&&Ts(Ft)&&(X=It.getProperty(N,C.p),q=It.getProperty(ft,C.p));Ye-- >0;)He=ae[Ye],He.end||He.refresh(0,1)||(Cn=P),fi=He.pin,fi&&(fi===u||fi===f||fi===xn)&&!He.isReverted&&(B||(B=[]),B.unshift(He),He.revert(!0,!0)),He!==ae[Ye]&&(Ln--,Ye--);for(Pn(Ee)&&(Ee=Ee(P)),Ee=A_(Ee,"start",P),Nt=F_(Ee,u,qe,C,J(),rt,N,P,le,Y,z,Re,E,P._startClamp&&"_startClamp")||(f?-.001:0),Pn(de)&&(de=de(P)),hi(de)&&!de.indexOf("+=")&&(~de.indexOf(" ")?de=(hi(Ee)?Ee.split(" ")[0]:"")+de:(Pe=lu(de.substr(2),qe),de=hi(Ee)?Ee:(E?It.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Nt):Nt)+Pe,In=u)),de=A_(de,"end",P),j=Math.max(Nt,F_(de||(In?"100% 0":Re),In,qe,C,J()+Pe,ot,ft,P,le,Y,z,Re,E,P._endClamp&&"_endClamp"))||-.001,Pe=0,Ye=Ln;Ye--;)He=ae[Ye]||{},fi=He.pin,fi&&He.start-He._pinPush<=Nt&&!E&&He.end>0&&(ze=He.end-(P._startClamp?Math.max(0,He.start):He.start),(fi===u&&He.start-He._pinPush<Nt||fi===xn)&&isNaN(Ee)&&(Pe+=ze*(1-He.progress)),fi===f&&(Me+=ze));if(Nt+=Pe,j+=Pe,P._startClamp&&(P._startClamp+=Pe),P._endClamp&&!Wn&&(P._endClamp=j||-.001,j=Math.min(j,tr(L,C))),Ct=j-Nt||(Nt-=.01)&&.001,sn&&($t=It.utils.clamp(0,1,It.utils.normalize(Nt,j,mt))),P._pinPush=Me,rt&&Pe&&(ze={},ze[C.a]="+="+Pe,xn&&(ze[C.p]="-="+J()),It.set([rt,ot],ze)),f&&!(tp&&P.end>=tr(L,C)))ze=bi(f),Ls=C===Ke,Ui=J(),W=parseFloat(y(C.a))+Me,!Re&&j>1&&(Z=(I?ve.scrollingElement||ui:L).style,Z={style:Z,value:Z["overflow"+C.a.toUpperCase()]},I&&bi(xe)["overflow"+C.a.toUpperCase()]!=="scroll"&&(Z.style["overflow"+C.a.toUpperCase()]="scroll")),Jd(f,Xt,ze),oe=su(f),je=xr(f,!0),Ds=z&&gr(L,Ls?An:Ke)(),m?(ct=[m+C.os2,Ct+Me+rn],ct.t=Xt,Ye=m===Qe?pu(f,C)+Ct+Me:0,Ye&&(ct.push(C.d,Ye+rn),Xt.style.flexBasis!=="auto"&&(Xt.style.flexBasis=Ye+rn)),za(ct),xn&&ae.forEach(function(St){St.pin===xn&&St.vars.pinSpacing!==!1&&(St._subPinOffset=!0)}),z&&J(mt)):(Ye=pu(f,C),Ye&&Xt.style.flexBasis!=="auto"&&(Xt.style.flexBasis=Ye+rn)),z&&(an={top:je.top+(Ls?Ui-Nt:Ds)+rn,left:je.left+(Ls?Ds:Ui-Nt)+rn,boxSizing:"border-box",position:"fixed"},an[Es]=an["max"+ka]=Math.ceil(je.width)+rn,an[As]=an["max"+cp]=Math.ceil(je.height)+rn,an[Mi]=an[Mi+yl]=an[Mi+xl]=an[Mi+Sl]=an[Mi+vl]="0",an[Qe]=ze[Qe],an[Qe+yl]=ze[Qe+yl],an[Qe+xl]=ze[Qe+xl],an[Qe+Sl]=ze[Qe+Sl],an[Qe+vl]=ze[Qe+vl],U=r1(Zt,an,S),Wn&&J(0)),i?(M=i._initted,Xd(1),i.render(i.duration(),!0,!0),K=y(C.a)-W+Ct+Me,it=Math.abs(Ct-K)>1,z&&it&&U.splice(U.length-2,2),i.render(0,!0,!0),M||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Xd(0)):K=Ct,Z&&(Z.value?Z.style["overflow"+C.a.toUpperCase()]=Z.value:Z.style.removeProperty("overflow-"+C.a));else if(u&&J()&&!E)for(je=u.parentNode;je&&je!==xe;)je._pinOffset&&(Nt-=je._pinOffset,j-=je._pinOffset),je=je.parentNode;B&&B.forEach(function(St){return St.revert(!1,!0)}),P.start=Nt,P.end=j,_t=Lt=Wn?mt:J(),!E&&!Wn&&(_t<mt&&J(mt),P.scroll.rec=0),P.revert(!1,!0),qt=Rn(),O&&(Wt=-1,O.restart(!0)),Cn=0,i&&D&&(i._initted||nt)&&i.progress()!==nt&&i.progress(nt||0,!0).render(i.time(),!0,!0),(sn||$t!==P.progress||E||_||i&&!i._initted)&&(i&&!D&&(i._initted||$t||i.vars.immediateRender!==!1)&&i.totalProgress(E&&Nt<-.001&&!$t?It.utils.normalize(Nt,j,0):$t,!0),P.progress=sn||(_t-Nt)/Ct===$t?0:$t),f&&m&&(Xt._pinOffset=Math.round(P.progress*K)),ut&&ut.invalidate(),isNaN(X)||(X-=It.getProperty(N,C.p),q-=It.getProperty(ft,C.p),au(N,C,X),au(rt,C,X-(jt||0)),au(ft,C,q),au(ot,C,q-(jt||0))),sn&&!Wn&&P.update(),h&&!Wn&&!Ut&&(Ut=!0,h(P),Ut=!1)}},P.getVelocity=function(){return(J()-Lt)/(Rn()-ul)*1e3||0},P.endAnimation=function(){hl(P.callbackAnimation),i&&(ut?ut.progress(1):i.paused()?D||hl(i,P.direction<0,1):hl(i,i.reversed()))},P.labelToScroll=function(lt){return i&&i.labels&&(Nt||P.refresh()||Nt)+i.labels[lt]/i.duration()*Ct||0},P.getTrailing=function(lt){var Yt=ae.indexOf(P),Ft=P.direction>0?ae.slice(0,Yt).reverse():ae.slice(Yt+1);return(hi(lt)?Ft.filter(function(jt){return jt.vars.preventOverlaps===lt}):Ft).filter(function(jt){return P.direction>0?jt.end<=Nt:jt.start>=j})},P.update=function(lt,Yt,Ft){if(!(E&&!Ft&&!lt)){var jt=Wn===!0?mt:P.scroll(),qe=lt?0:(jt-Nt)/Ct,le=qe<0?0:qe>1?1:qe||0,Re=P.progress,sn,Pe,Me,de,In,Ee,xn,Ln;if(Yt&&(Lt=_t,_t=E?J():jt,v&&(gt=vt,vt=i&&!D?i.totalProgress():le)),p&&f&&!Cn&&!jh&&Ti&&(!le&&Nt<jt+(jt-Lt)/(Rn()-ul)*p?le=1e-4:le===1&&j>jt+(jt-Lt)/(Rn()-ul)*p&&(le=.9999)),le!==Re&&P.enabled){if(sn=P.isActive=!!le&&le<1,Pe=!!Re&&Re<1,Ee=sn!==Pe,In=Ee||!!le!=!!Re,P.direction=le>Re?1:-1,P.progress=le,In&&!Cn&&(Me=le&&!Re?0:le===1?1:Re===1?2:3,D&&(de=!Ee&&k[Me+1]!=="none"&&k[Me+1]||k[Me],Ln=i&&(de==="complete"||de==="reset"||de in i))),T&&(Ee||Ln)&&(Ln||d||!i)&&(Pn(T)?T(P):P.getTrailing(T).forEach(function(Ui){return Ui.endAnimation()})),D||(ut&&!Cn&&!jh?(ut._dp._time-ut._start!==ut._time&&ut.render(ut._dp._time-ut._start),ut.resetTo?ut.resetTo("totalProgress",le,i._tTime/i._tDur):(ut.vars.totalProgress=le,ut.invalidate().restart())):i&&i.totalProgress(le,!!(Cn&&(qt||lt)))),f){if(lt&&m&&(Xt.style[m+C.os2]=dt),!z)G(dl(W+K*le));else if(In){if(xn=!lt&&le>Re&&j+1>jt&&jt+1>=tr(L,C),S)if(!lt&&(sn||xn)){var Ye=xr(f,!0),ze=jt-Nt;O_(f,xe,Ye.top+(C===Ke?ze:0)+rn,Ye.left+(C===Ke?0:ze)+rn)}else O_(f,Xt);za(sn||xn?U:oe),it&&le<1&&sn||G(W+(le===1&&!xn?K:0))}}v&&!et.tween&&!Cn&&!jh&&O.restart(!0),o&&(Ee||A&&le&&(le<1||!qd))&&bl(o.targets).forEach(function(Ui){return Ui.classList[sn||A?"add":"remove"](o.className)}),a&&!D&&!lt&&a(P),In&&!Cn?(D&&(Ln&&(de==="complete"?i.pause().totalProgress(1):de==="reset"?i.restart(!0).pause():de==="restart"?i.restart(!0):i[de]()),a&&a(P)),(Ee||!qd)&&(c&&Ee&&Da(P,c),H[Me]&&Da(P,H[Me]),A&&(le===1?P.kill(!1,1):H[Me]=0),Ee||(Me=le===1?1:3,H[Me]&&Da(P,H[Me]))),x&&!sn&&Math.abs(P.getVelocity())>(pl(x)?x:2500)&&(hl(P.callbackAnimation),ut?ut.progress(1):hl(i,de==="reverse"?1:!le,1))):D&&a&&!Cn&&a(P)}if(xt){var je=E?jt/E.duration()*(E._caScrollDist||0):jt;tt(je+(N._isFlipped?1:0)),xt(je)}yt&&yt(-jt/E.duration()*(E._caScrollDist||0))}},P.enable=function(lt,Yt){P.enabled||(P.enabled=!0,un(L,"resize",ml),I||un(L,"scroll",Ua),$&&un(r,"refreshInit",$),lt!==!1&&(P.progress=$t=0,_t=Lt=Wt=J()),Yt!==!1&&P.refresh())},P.getTween=function(lt){return lt&&et?et.tween:ut},P.setPositions=function(lt,Yt,Ft,jt){if(E){var qe=E.scrollTrigger,le=E.duration(),Re=qe.end-qe.start;lt=qe.start+Re*lt/le,Yt=qe.start+Re*Yt/le}P.refresh(!1,!1,{start:C_(lt,Ft&&!!P._startClamp),end:C_(Yt,Ft&&!!P._endClamp)},jt),P.update()},P.adjustPinSpacing=function(lt){if(ct&&lt){var Yt=ct.indexOf(C.d)+1;ct[Yt]=parseFloat(ct[Yt])+lt+rn,ct[1]=parseFloat(ct[1])+lt+rn,za(ct)}},P.disable=function(lt,Yt){if(lt!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,Yt||ut&&ut.pause(),mt=0,pt&&(pt.uncache=1),$&&hn(r,"refreshInit",$),O&&(O.pause(),et.tween&&et.tween.kill()&&(et.tween=0)),!I)){for(var Ft=ae.length;Ft--;)if(ae[Ft].scroller===L&&ae[Ft]!==P)return;hn(L,"resize",ml),I||hn(L,"scroll",Ua)}},P.kill=function(lt,Yt){P.disable(lt,Yt),ut&&!Yt&&ut.kill(),l&&delete ep[l];var Ft=ae.indexOf(P);Ft>=0&&ae.splice(Ft,1),Ft===Hn&&hu>0&&Hn--,Ft=0,ae.forEach(function(jt){return jt.scroller===P.scroller&&(Ft=1)}),Ft||Wn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,lt&&i.revert({kill:!1}),Yt||i.kill()),rt&&[rt,ot,N,ft].forEach(function(jt){return jt.parentNode&&jt.parentNode.removeChild(jt)}),Ml===P&&(Ml=0),f&&(pt&&(pt.uncache=1),Ft=0,ae.forEach(function(jt){return jt.pin===f&&Ft++}),Ft||(pt.spacer=0)),n.onKill&&n.onKill(P)},ae.push(P),P.enable(!1,!1),Mt&&Mt(P),i&&i.add&&!Ct){var Ht=P.update;P.update=function(){P.update=Ht,se.cache++,Nt||j||P.refresh()},It.delayedCall(.01,P.update),Ct=.01,Nt=j=0}else P.refresh();f&&e1()},r.register=function(n){return Fa||(It=n||Y_(),q_()&&window.document&&r.enable(),Fa=fl),Fa},r.defaults=function(n){if(n)for(var i in n)iu[i]=n[i];return iu},r.disable=function(n,i){fl=0,ae.forEach(function(a){return a[i?"kill":"disable"](n)}),hn(he,"wheel",Ua),hn(ve,"scroll",Ua),clearInterval(Qh),hn(ve,"touchcancel",ji),hn(xe,"touchstart",ji),eu(hn,ve,"pointerdown,touchstart,mousedown",R_),eu(hn,ve,"pointerup,touchend,mouseup",P_),du.kill(),tu(hn);for(var s=0;s<se.length;s+=3)nu(hn,se[s],se[s+1]),nu(hn,se[s],se[s+2])},r.enable=function(){if(he=window,ve=document,ui=ve.documentElement,xe=ve.body,It){if(bl=It.utils.toArray,gl=It.utils.clamp,jd=It.core.context||ji,Xd=It.core.suppressOverwrites||ji,sp=he.history.scrollRestoration||"auto",np=he.pageYOffset||0,It.core.globals("ScrollTrigger",r),xe){fl=1,Ba=document.createElement("div"),Ba.style.height="100vh",Ba.style.position="absolute",i0(),ZT(),Ge.register(It),r.isTouch=Ge.isTouch,Qr=Ge.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Qd=Ge.isTouch===1,un(he,"wheel",Ua),rp=[he,ve,ui,xe],It.matchMedia?(r.matchMedia=function(h){var d=It.matchMedia(),u;for(u in h)d.add(u,h[u]);return d},It.addEventListener("matchMediaInit",function(){e0(),up()}),It.addEventListener("matchMediaRevert",function(){return t0()}),It.addEventListener("matchMedia",function(){ws(0,1),Is("matchMedia")}),It.matchMedia().add("(orientation: portrait)",function(){return Zd(),Zd})):console.warn("Requires GSAP 3.11.0 or later"),Zd(),un(ve,"scroll",Ua);var n=xe.hasAttribute("style"),i=xe.style,s=i.borderTopStyle,a=It.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=xr(xe),Ke.m=Math.round(o.top+Ke.sc())||0,An.m=Math.round(o.left+An.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(xe.setAttribute("style",""),xe.removeAttribute("style")),Qh=setInterval(D_,250),It.delayedCall(.5,function(){return jh=0}),un(ve,"touchcancel",ji),un(xe,"touchstart",ji),eu(un,ve,"pointerdown,touchstart,mousedown",R_),eu(un,ve,"pointerup,touchend,mouseup",P_),Kd=It.utils.checkPrefix("transform"),uu.push(Kd),Fa=Rn(),du=It.delayedCall(.2,ws).pause(),Oa=[ve,"visibilitychange",function(){var h=he.innerWidth,d=he.innerHeight;ve.hidden?(w_=h,E_=d):(w_!==h||E_!==d)&&ml()},ve,"DOMContentLoaded",ws,he,"load",ws,he,"resize",ml],tu(un),ae.forEach(function(h){return h.enable(0,1)}),l=0;l<se.length;l+=3)nu(hn,se[l],se[l+1]),nu(hn,se[l],se[l+2])}else if(ve){var c=function h(){r.enable(),ve.removeEventListener("DOMContentLoaded",h)};ve.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(qd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Qh)||(Qh=i)&&setInterval(D_,i),"ignoreMobileResize"in n&&(Qd=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(tu(hn)||tu(un,n.autoRefreshEvents||"none"),H_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Vn(n),a=se.indexOf(s),o=Rs(s);~a&&se.splice(a,o?6:2),i&&(o?Ni.unshift(he,i,xe,i,ui,i):Ni.unshift(s,i))},r.clearMatchMedia=function(n){ae.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(hi(n)?Vn(n):n).getBoundingClientRect(),o=a[s?Es:As]*i||0;return s?a.right-o>0&&a.left+o<he.innerWidth:a.bottom-o>0&&a.top+o<he.innerHeight},r.positionInViewport=function(n,i,s){hi(n)&&(n=Vn(n));var a=n.getBoundingClientRect(),o=a[s?Es:As],l=i==null?o/2:i in mu?mu[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/he.innerWidth:(a.top+l)/he.innerHeight},r.killAll=function(n){if(ae.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Ps.killAll||[];Ps={},i.forEach(function(s){return s()})}},r})();ee.version="3.15.0";ee.saveStyles=function(r){return r?bl(r).forEach(function(t){if(t&&t.style){var e=ci.indexOf(t);e>=0&&ci.splice(e,5),ci.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),It.core.getCache(t),jd())}}):ci};ee.revert=function(r,t){return up(!r,t)};ee.create=function(r,t){return new ee(r,t)};ee.refresh=function(r){return r?ml(!0):(Fa||ee.register())&&ws(!0)};ee.update=function(r){return++se.cache&&vr(r===!0?2:0)};ee.clearScrollMemory=n0;ee.maxScroll=function(r,t){return tr(r,t?An:Ke)};ee.getScrollFunc=function(r,t){return gr(Vn(r),t?An:Ke)};ee.getById=function(r){return ep[r]};ee.getAll=function(){return ae.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ee.isScrolling=function(){return!!Ti};ee.snapDirectional=hp;ee.addEventListener=function(r,t){var e=Ps[r]||(Ps[r]=[]);~e.indexOf(t)||e.push(t)};ee.removeEventListener=function(r,t){var e=Ps[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ee.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,a=function(c,h){var d=[],u=[],f=It.delayedCall(i,function(){h(d,u),d=[],u=[]}).pause();return function(m){d.length||f.restart(!0),d.push(m.trigger),u.push(m),s<=d.length&&f.progress(1)}},o;for(o in t)n[o]=o.substr(0,2)==="on"&&Pn(t[o])&&o!=="onRefreshInit"?a(o,t[o]):t[o];return Pn(s)&&(s=s(),un(ee,"refresh",function(){return s=t.batchMax()})),bl(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,e.push(ee.create(c))}),e};var z_=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},$d=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Ge.isTouch?" pinch-zoom":""):"none",t===ui&&r(xe,e)},ou={auto:1,scroll:1},a1=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,a=s._gsap||It.core.getCache(s),o=Rn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==xe&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ou[(l=bi(s)).overflowY]||ou[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Rs(s)&&(ou[(l=bi(s)).overflowY]||ou[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},s0=function(t,e,n,i){return Ge.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&a1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&un(ve,Ge.eventTypes[0],V_,!1,!0)},onDisable:function(){return hn(ve,Ge.eventTypes[0],V_,!0)}})},o1=/(input|label|select|textarea)/i,k_,V_=function(t){var e=o1.test(t.target.tagName);(e||k_)&&(t._gsapAllow=!0,k_=e)},l1=function(t){Ts(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,a=e.onRelease,o,l,c=Vn(t.target)||ui,h=It.core.globals().ScrollSmoother,d=h&&h.get(),u=Qr&&(t.content&&Vn(t.content)||d&&t.content!==!1&&!d.smooth()&&d.content()),f=gr(c,Ke),m=gr(c,An),_=1,p=(Ge.isTouch&&he.visualViewport?he.visualViewport.scale*he.visualViewport.width:he.outerWidth)/he.innerWidth,g=0,b=Pn(i)?function(){return i(o)}:function(){return i||2.8},A,v,S=s0(c,t.type,!0,s),w=function(){return v=!1},E=ji,x=ji,T=function(){l=tr(c,Ke),x=gl(Qr?1:0,l),n&&(E=gl(0,tr(c,An))),A=Cs},C=function(){u._gsap.y=dl(parseFloat(u._gsap.y)+f.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},D=function(){if(v){requestAnimationFrame(w);var Q=dl(o.deltaY/2),Y=x(f.v-Q);if(u&&Y!==f.v+f.offset){f.offset=Y-f.v;var P=dl((parseFloat(u&&u._gsap.y)||0)-f.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",u._gsap.y=P+"px",f.cacheID=se.cache,vr()}return!0}f.offset&&C(),v=!0},L,F,I,z,H=function(){T(),L.isActive()&&L.vars.scrollY>l&&(f()>l?L.progress(1)&&f(l):L.resetTo("scrollY",l))};return u&&It.set(u,{y:"+=0"}),t.ignoreCheck=function(k){return Qr&&k.type==="touchmove"&&D(k)||_>1.05&&k.type!=="touchstart"||o.isGesturing||k.touches&&k.touches.length>1},t.onPress=function(){v=!1;var k=_;_=dl((he.visualViewport&&he.visualViewport.scale||1)/p),L.pause(),k!==_&&$d(c,_>1.01?!0:n?!1:"x"),F=m(),I=f(),T(),A=Cs},t.onRelease=t.onGestureStart=function(k,Q){if(f.offset&&C(),!Q)z.restart(!0);else{se.cache++;var Y=b(),P,$;n&&(P=m(),$=P+Y*.05*-k.velocityX/.227,Y*=z_(m,P,$,tr(c,An)),L.vars.scrollX=E($)),P=f(),$=P+Y*.05*-k.velocityY/.227,Y*=z_(f,P,$,tr(c,Ke)),L.vars.scrollY=x($),L.invalidate().duration(Y).play(.01),(Qr&&L.vars.scrollY>=l||P>=l-1)&&It.to({},{onUpdate:H,duration:Y})}a&&a(k)},t.onWheel=function(){L._ts&&L.pause(),Rn()-g>1e3&&(A=0,g=Rn())},t.onChange=function(k,Q,Y,P,$){if(Cs!==A&&T(),Q&&n&&m(E(P[2]===Q?F+(k.startX-k.x):m()+Q-P[1])),Y){f.offset&&C();var wt=$[2]===Y,Tt=wt?I+k.startY-k.y:f()+Y-$[1],Wt=x(Tt);wt&&Tt!==Wt&&(I+=Wt-Tt),f(Wt)}(Y||Q)&&vr()},t.onEnable=function(){$d(c,n?!1:"x"),ee.addEventListener("refresh",H),un(he,"resize",H),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=m.smooth=!1),S.enable()},t.onDisable=function(){$d(c,!0),hn(he,"resize",H),ee.removeEventListener("refresh",H),S.kill()},t.lockAxis=t.lockAxis!==!1,o=new Ge(t),o.iOS=Qr,Qr&&!f()&&f(1),Qr&&It.ticker.add(ji),z=o._dc,L=It.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:r0(f,f(),function(){return L.pause()})},onUpdate:vr,onComplete:z.vars.onComplete}),o};ee.sort=function(r){if(Pn(r))return ae.sort(r);var t=he.pageYOffset||0;return ee.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+he.innerHeight}),ae.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ee.observe=function(r){return new Ge(r)};ee.normalizeScroll=function(r){if(typeof r=="undefined")return Gn;if(r===!0&&Gn)return Gn.enable();if(r===!1){Gn&&Gn.kill(),Gn=r;return}var t=r instanceof Ge?r:l1(r);return Gn&&Gn.target===t.target&&Gn.kill(),Rs(t.target)&&(Gn=t),t};ee.core={_getVelocityProp:Kh,_inputObserver:s0,_scrollers:se,_proxies:Ni,bridge:{ss:function(){Ti||Is("scrollStart"),Ti=Rn()},ref:function(){return Cn}}};Y_()&&It.registerPlugin(ee);Si.registerPlugin(ee);var Sr=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c1=r=>Math.min(1,Math.max(0,r)),_u=(r,t,e)=>{let n=c1((e-r)/(t-r));return n*n*(3-2*n)},yr=(r,t,e)=>r+(t-r)*e,a0={p:0},xu={x:0,y:0},Va={x:0,y:0},fp=null;function h1(){let t=document.createElement("canvas");t.width=t.height=1024;let e=t.getContext("2d"),n=e.createRadialGradient(1024*.35,1024*.3,40,1024/2,1024/2,1024/2);n.addColorStop(0,"#5a6c9a"),n.addColorStop(1,"#232b45"),e.fillStyle=n,e.fillRect(0,0,1024,1024);let i=30,s=3,a=1024/2-14;for(let l=0;l<1024;l+=i+s)for(let c=0;c<1024;c+=i+s){let h=c+i/2-512,d=l+i/2-1024/2;if(Math.hypot(h,d)>a-i*.7)continue;let u=215+Math.random()*40;e.fillStyle=`hsl(${u}, 32%, ${40+Math.random()*14}%)`,e.fillRect(c,l,i,i),e.fillStyle="rgba(255,255,255,0.10)",e.fillRect(c+4,l+4,i-8,2),e.fillRect(c+4,l+i-8,(i-8)*.6,2)}let o=new po(t);return o.colorSpace=Nn,o.anisotropy=8,o}function u1(){let i=new sa;for(let o=0;o<=360;o++){let l=o/360*Math.PI*2,c=1.2;for(let u of[Math.PI/2,-Math.PI/2+Math.PI*2]){let f=Math.abs(l-u);f<.035&&(c=1.2-.06*(1-f/.035))}let h=Math.cos(l)*c,d=Math.sin(l)*c;Math.abs(h)>1.12&&(h=Math.sign(h)*1.12),o===0?i.moveTo(h,d):i.lineTo(h,d)}let s=new as;s.absarc(0,0,1.02,0,Math.PI*2,!0),i.holes.push(s);let a=new wo(i,{depth:.03,bevelEnabled:!0,bevelThickness:.006,bevelSize:.006,bevelSegments:3,curveSegments:128});return a.translate(0,0,-.015),a}function f1(){let r=document.getElementById("gl"),t;try{t=new Eh({canvas:r,antialias:!0,alpha:!0})}catch{return r.remove(),null}t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.toneMapping=No,t.toneMappingExposure=1.05;let e=new ss,n=new _a(t);e.environment=n.fromScene(new Rh,.04).texture;let i=new fn(35,1,.1,100);i.position.set(0,0,5);let s=new la(5088255,3);s.position.set(-3,2,-2),e.add(s);let a=new la(16777215,1.2);a.position.set(3,3,4),e.add(a);let o=new zi,l=new zi;o.add(l),e.add(o);let c=new Ce(u1(),new ls({color:13225686,metalness:1,roughness:.26,clearcoat:.4})),h=new Ce(new go(1.1,128),new ls({color:8370431,transparent:!0,opacity:.22,roughness:.15,side:mi,depthWrite:!1})),d=new ls({map:h1(),metalness:.6,roughness:.3,iridescence:1,iridescenceIOR:1.8,iridescenceThicknessRange:[200,800],clearcoat:.5,clearcoatRoughness:.2}),u=new lr({color:10134450,metalness:1,roughness:.3}),f=new Ce(new _o(.9,.9,.014,128),[u,d,u]);f.rotation.x=Math.PI/2,l.add(c,h,f);let m=700,_=new Float32Array(m*3);for(let F=0;F<m;F++)_[F*3]=(Math.random()-.5)*12,_[F*3+1]=(Math.random()-.5)*8,_[F*3+2]=(Math.random()-.5)*6;let p=new Mn;p.setAttribute("position",new Un(_,3));let g=new uo(p,new ia({color:7319807,size:.014,transparent:!0,opacity:.55,depthWrite:!1}));e.add(g);let b={wafer:{obj:f,local:new V(.9,.007,0)},tape:{obj:h,local:new V(1.1,0,0)},ring:{obj:c,local:new V(1.12,0,.015)}},A=[...document.querySelectorAll(".callout")],v=document.querySelector(".hero-sticky"),S={x:1.15,y:0,s:1};function w(){let F=v.clientWidth,I=v.clientHeight;t.setSize(F,I,!1),i.aspect=F/I,i.updateProjectionMatrix(),S=F<900?{x:0,y:.5,s:.52,ex:0,ey:.05,es:1.05}:{x:1,y:.05,s:1,ex:.35,ey:-.1,es:.95}}w(),window.addEventListener("resize",w);let E={v:Sr?1:0},x=new V,T=!0,C=performance.now();function D(F){let I=Math.min(.05,(F-C)/1e3);C=F;let z=a0.p,H=_u(.12,.62,z);Sr||(l.rotation.z+=I*.12),l.position.z=0,f.position.z=yr(.012,.75,H),h.position.z=yr(-.02,.28,H),c.position.z=yr(0,-.2,H),Va.x+=(xu.x-Va.x)*Math.min(1,I*4),Va.y+=(xu.y-Va.y)*Math.min(1,I*4);let k=E.v;o.position.x=yr(S.x,S.ex,H),o.position.y=yr(S.y,S.ey,H)+(1-k)*-.4,o.scale.setScalar(S.s*yr(.85,1,k)*yr(1,S.es,H)),o.rotation.x=yr(-1.05,-1.22,H)+Va.y*.12+(1-k)*-.4,o.rotation.y=yr(-.25,-.1,H)+Va.x*.18,g.rotation.y+=I*.02,t.render(e,i);let Q=_u(.42,.6,z)*(1-_u(.9,1,z)),Y=v.clientWidth,P=v.clientHeight;A.forEach($=>{let wt=b[$.dataset.part];x.copy(wt.local).applyMatrix4(wt.obj.matrixWorld).project(i);let Tt=(x.x*.5+.5)*Y,Wt=(-x.y*.5+.5)*P;$.style.transform=`translate(${Tt}px, ${Wt}px)`,$.style.opacity=Q})}function L(F){T&&D(F),requestAnimationFrame(L)}return requestAnimationFrame(L),ee.create({trigger:".hero",start:"top bottom",end:"bottom top",onToggle:F=>{T=F.isActive}}),{intro:E}}function d1(){let r=document.querySelector(".loader"),t=()=>{let s=Si.timeline();fp&&s.to(fp.intro,{v:1,duration:1.8,ease:"expo.out"},0),s.to(".hero-title .line > span",{y:0,duration:1.1,ease:"expo.out",stagger:.08},.05).to(".hero-copy .eyebrow, .hero-sub, .hud, .scroll-cue",{opacity:1,duration:.8,ease:"power2.out",stagger:.08},.4)},e=!1;try{e=sessionStorage.getItem("ss-intro")==="1"}catch{}if(Sr||e){r.remove(),Sr||t();return}try{sessionStorage.setItem("ss-intro","1")}catch{}document.body.classList.add("is-loading");let n=document.getElementById("loaderNum"),i={v:0};Si.timeline().to(i,{v:100,duration:1.6,ease:"power2.inOut",onUpdate:()=>{n.textContent=Math.round(i.v)}}).to(".loader-bar i",{scaleX:1,duration:1.6,ease:"power2.inOut"},0).to(r,{yPercent:-100,duration:.9,ease:"expo.inOut",onComplete:()=>{r.remove(),document.body.classList.remove("is-loading")}},"+=0.15").add(t,"-=0.45")}function p1(){ee.create({trigger:".hero",start:"top top",end:"bottom bottom",scrub:!0,onUpdate:i=>{if(a0.p=i.progress,Sr)return;let s=1-_u(.04,.3,i.progress);Si.set(".hero-copy",{opacity:s,y:(1-s)*-60}),Si.set(".hud, .scroll-cue",{opacity:s})}});let r=document.querySelector(".nav");ee.create({start:0,end:"max",onUpdate:i=>{let s=i.scroll();r.classList.toggle("is-solid",s>40),r.classList.toggle("is-hidden",i.direction===1&&s>300)}});let t=document.getElementById("manifesto");t.innerHTML=t.textContent.trim().split(/\s+/).map(i=>`<span class="w">${i}</span>`).join(" "),Sr||Si.to("#manifesto .w",{opacity:1,ease:"none",stagger:.1,scrollTrigger:{trigger:t,start:"top 80%",end:"bottom 40%",scrub:!0}}),Si.matchMedia().add("(min-width: 900px) and (prefers-reduced-motion: no-preference)",()=>{let i=document.querySelector(".products-track"),s=()=>i.scrollWidth-window.innerWidth;Si.to(i,{x:()=>-s(),ease:"none",scrollTrigger:{trigger:".products",start:"top top",end:()=>`+=${s()}`,pin:!0,scrub:.8,invalidateOnRefresh:!0}})}),document.querySelectorAll("[data-count]").forEach(i=>{let s=parseFloat(i.dataset.count),a=parseInt(i.dataset.decimals||"0",10);if(Sr){i.textContent=s.toFixed(a);return}let o={v:0};ee.create({trigger:i,start:"top 85%",once:!0,onEnter:()=>Si.to(o,{v:s,duration:1.6,ease:"expo.out",onUpdate:()=>{i.textContent=o.v.toFixed(a)}})})});let n=document.querySelector(".steps");if(ee.create({trigger:n,start:"top 70%",end:"bottom 70%",scrub:!0,onUpdate:i=>n.style.setProperty("--progress",i.progress)}),Sr&&n.style.setProperty("--progress",1),!Sr){let i=document.querySelectorAll(".products-head > *, .num, .steps li, .process-head > *, .cta > *, .manifesto .eyebrow, .numbers .eyebrow");i.forEach(s=>s.classList.add("reveal")),ee.batch(i,{start:"top 88%",once:!0,onEnter:s=>Si.to(s,{opacity:1,y:0,duration:.9,ease:"expo.out",stagger:.07})})}}fp=f1();p1();d1();window.addEventListener("pointermove",r=>{xu.x=r.clientX/window.innerWidth*2-1,xu.y=r.clientY/window.innerHeight*2-1});window.addEventListener("load",()=>ee.refresh());})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.0
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
