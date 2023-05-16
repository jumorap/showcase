# Mach Bands

{{< hint info >}}
**Exercises**

1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.

{{< /hint >}}

## Solution

The solution implemented additional coloring brightness tools including HSV value V, HSL lightness L, and Component average. It also added texture tinting by mixing color and texel interpolated data.

{{< details title="texturing.js" open=false >}}
{{< highlight JavaScript >}}

var Tree=function(t){const e={LIBRARY:"p5.treegl",VERSION:"0.6.2",HOMEPAGE:"https://github.com/VisualComputing/p5.treegl"};Object.freeze(e);return t??={},t.INFO=e,t.NONE=0,t.X=1,t.Y=2,t.Z=4,t._X=8,t._Y=16,t._Z=32,t.LABELS=64,t.SOLID=0,t.DOTS=1,t.SQUARE=0,t.CIRCLE=1,t.PROJECTION=2,t.NEAR=1,t.FAR=2,t.LEFT=4,t.RIGHT=8,t.BOTTOM=16,t.TOP=32,t.BODY=64,t.INVISIBLE=0,t.VISIBLE=1,t.SEMIVISIBLE=2,t.WORLD="WORLD",t.EYE="EYE",t.NDC="NDC",t.SCREEN="SCREEN",t.MODEL="MODEL",t.ORIGIN=[0,0,0],t.i=[1,0,0],t.j=[0,1,0],t.k=[0,0,1],t._i=[-1,0,0],t._j=[0,-1,0],t._k=[0,0,-1],t.lowp=0,t.mediump=1,t.highp=2,t.pmvMatrix=1,t.pMatrix=2,t.mvMatrix=4,t.nMatrix=8,t.color4=1,t.texcoords2=2,t.normal3=4,t.position2=8,t.position3=16,t.position4=32,t}(Tree);console.log(Tree.INFO),p5.Matrix.prototype.mult3=function(t){if(void 0!==this.mat3)return new p5.Vector(this.mat3[0]*t.x+this.mat3[3]*t.y+this.mat3[6]*t.z,this.mat3[1]*t.x+this.mat3[4]*t.y+this.mat3[7]*t.z,this.mat3[2]*t.x+this.mat3[5]*t.y+this.mat3[8]*t.z);console.error("mult3 only works with mat3")},p5.Matrix.prototype.mult4=function(t){return new p5.Vector(...this._mult4([t.x,t.y,t.z,1]))},p5.Matrix.prototype._mult4=function(t){if(void 0!==this.mat4)return[this.mat4[0]*t[0]+this.mat4[4]*t[1]+this.mat4[8]*t[2]+this.mat4[12]*t[3],this.mat4[1]*t[0]+this.mat4[5]*t[1]+this.mat4[9]*t[2]+this.mat4[13]*t[3],this.mat4[2]*t[0]+this.mat4[6]*t[1]+this.mat4[10]*t[2]+this.mat4[14]*t[3],this.mat4[3]*t[0]+this.mat4[7]*t[1]+this.mat4[11]*t[2]+this.mat4[15]*t[3]];console.error("_mult4 only works with mat4")},p5.prototype.tMatrix=function(t){return t.copy().transpose(t)},p5.prototype.invMatrix=function(t){return t.copy().invert(t)},p5.prototype.axbMatrix=function(t,e){return t.copy().apply(e)},p5.prototype.iMatrix=function(){return new p5.Matrix},p5.prototype.lMatrix=function(){return this._renderer.lMatrix(...arguments)},p5.RendererGL.prototype.lMatrix=function({from:t=new p5.Matrix,to:e=this.eMatrix()}={}){return e.copy().invert(e).apply(t)},p5.prototype.dMatrix=function(){return this._renderer.dMatrix(...arguments)},p5.RendererGL.prototype.dMatrix=function({from:t=new p5.Matrix,to:e=this.eMatrix(),matrix:r=t.copy().invert(t).apply(e)}={}){return new p5.Matrix("mat3",[r.mat4[0],r.mat4[4],r.mat4[8],r.mat4[1],r.mat4[5],r.mat4[9],r.mat4[2],r.mat4[6],r.mat4[10]])},p5.prototype.pMatrix=function(){return this._renderer.pMatrix(...arguments)},p5.RendererGL.prototype.pMatrix=function(){return this.uPMatrix.copy()},p5.prototype.mvMatrix=function(){return this._renderer.mvMatrix(...arguments)},p5.RendererGL.prototype.mvMatrix=function({vMatrix:t,mMatrix:e}={}){return e?(t??this.vMatrix()).copy().apply(e):this.uMVMatrix.copy()},p5.prototype.mMatrix=function(){return this._renderer.mMatrix(...arguments)},p5.RendererGL.prototype.mMatrix=function({eMatrix:t=this.eMatrix(),mvMatrix:e=this.mvMatrix()}={}){return t.copy().apply(e)},p5.prototype.nMatrix=function(){return this._renderer.nMatrix(...arguments)},p5.RendererGL.prototype.nMatrix=function({vMatrix:t,mMatrix:e,mvMatrix:r=this.mvMatrix({mMatrix:e,vMatrix:t})}={}){return new p5.Matrix("mat3").inverseTranspose(r)},p5.prototype.vMatrix=function(){return this._renderer.vMatrix(...arguments)},p5.RendererGL.prototype.vMatrix=function(){return this._curCamera.vMatrix()},p5.Camera.prototype.vMatrix=function(){return this.cameraMatrix.copy()},p5.prototype.eMatrix=function(){return this._renderer.eMatrix(...arguments)},p5.RendererGL.prototype.eMatrix=function(){return this._curCamera.eMatrix()},p5.Camera.prototype.eMatrix=function(){return this.cameraMatrix.copy().invert(this.cameraMatrix)},p5.prototype.pmvMatrix=function(){return this._renderer.pmvMatrix(...arguments)},p5.RendererGL.prototype.pmvMatrix=function({pMatrix:t=this.uPMatrix,vMatrix:e,mMatrix:r,mvMatrix:i=this.mvMatrix({mMatrix:r,vMatrix:e})}={}){return t.copy().apply(i)},p5.prototype.pvMatrix=function(){return this._renderer.pvMatrix(...arguments)},p5.RendererGL.prototype.pvMatrix=function({pMatrix:t=this.uPMatrix,vMatrix:e=this._curCamera.cameraMatrix}={}){return t.copy().apply(e)},p5.prototype.pvInvMatrix=function(){return this._renderer.pvInvMatrix(...arguments)},p5.RendererGL.prototype.pvInvMatrix=function({pMatrix:t,vMatrix:e,pvMatrix:r}={}){let i=r?r.copy():this.pvMatrix({pMatrix:t,vMatrix:e});return i.invert(i)},p5.prototype.isOrtho=function(){return this._renderer.isOrtho(...arguments)},p5.RendererGL.prototype.isOrtho=function(){return this.uPMatrix.isOrtho()},p5.Matrix.prototype.isOrtho=function(){return 0!=this.mat4[15]},p5.prototype.nPlane=function(){return this._renderer.nPlane(...arguments)},p5.RendererGL.prototype.nPlane=function(){return this.uPMatrix.nPlane()},p5.Matrix.prototype.nPlane=function(){return 0==this.mat4[15]?this.mat4[14]/(this.mat4[10]-1):(1+this.mat4[14])/this.mat4[10]},p5.prototype.fPlane=function(){return this._renderer.fPlane(...arguments)},p5.RendererGL.prototype.fPlane=function(){return this.uPMatrix.fPlane()},p5.Matrix.prototype.fPlane=function(){return 0==this.mat4[15]?this.mat4[14]/(1+this.mat4[10]):(this.mat4[14]-1)/this.mat4[10]},p5.prototype.lPlane=function(){return this._renderer.lPlane(...arguments)},p5.RendererGL.prototype.lPlane=function(){return this.uPMatrix.lPlane()},p5.Matrix.prototype.lPlane=function(){return 1==this.mat4[15]?-(1+this.mat4[12])/this.mat4[0]:this.nPlane()*(this.mat4[8]-1)/this.mat4[0]},p5.prototype.rPlane=function(){return this._renderer.rPlane(...arguments)},p5.RendererGL.prototype.rPlane=function(){return this.uPMatrix.rPlane()},p5.Matrix.prototype.rPlane=function(){return 1==this.mat4[15]?(1-this.mat4[12])/this.mat4[0]:this.nPlane()*(1+this.mat4[8])/this.mat4[0]},p5.prototype.tPlane=function(){return this._renderer.tPlane(...arguments)},p5.RendererGL.prototype.tPlane=function(){return this.uPMatrix.tPlane()},p5.Matrix.prototype.tPlane=function(){return 1==this.mat4[15]?(this.mat4[13]-1)/this.mat4[5]:this.nPlane()*(this.mat4[9]-1)/this.mat4[5]},p5.prototype.bPlane=function(){return this._renderer.bPlane(...arguments)},p5.RendererGL.prototype.bPlane=function(){return this.uPMatrix.bPlane()},p5.Matrix.prototype.bPlane=function(){return 1==this.mat4[15]?(1+this.mat4[13])/this.mat4[5]:this.nPlane()*(1+this.mat4[9])/this.mat4[5]},p5.prototype.fov=function(){return this._renderer.fov(...arguments)},p5.RendererGL.prototype.fov=function(){return this.uPMatrix.fov()},p5.Matrix.prototype.fov=function(){if(0==this.mat4[15])return Math.abs(2*Math.atan(1/this.mat4[5]));console.error("fov only works for a perspective projection")},p5.prototype.hfov=function(){return this._renderer.hfov(...arguments)},p5.RendererGL.prototype.hfov=function(){return this.uPMatrix.hfov()},p5.Matrix.prototype.hfov=function(){if(0==this.mat4[15])return Math.abs(2*Math.atan(1/this.mat4[0]));console.error("hfov only works for a perspective projection")},p5.prototype.beginHUD=function(){this._renderer instanceof p5.RendererGL&&this._renderer.beginHUD(...arguments)},p5.RendererGL.prototype.beginHUD=function(){this.mv=this.mvMatrix(),this.p=this.pMatrix(),this._rendererState=this.push();let t=this.drawingContext;t.flush(),t.disable(t.DEPTH_TEST),this.uMVMatrix=new p5.Matrix;let e=Number.MAX_VALUE;this._curCamera.ortho(0,this.width,-this.height,0,-e,e)},p5.prototype.endHUD=function(){this._renderer instanceof p5.RendererGL&&this._renderer.endHUD(...arguments)},p5.RendererGL.prototype.endHUD=function(){let t=this.drawingContext;t.flush(),t.enable(t.DEPTH_TEST),this.pop(this._rendererState),this.uPMatrix.set(this.p),this.uMVMatrix.set(this.mv)},p5.prototype._map=function(){return this._renderer._map(...arguments)},p5.RendererGL.prototype._map=function(t,e,r,i,n){return(t-e)/(r-e)*(n-i)+i},p5.prototype.treeLocation=function(){return this._renderer.treeLocation(...arguments)},p5.RendererGL.prototype.treeLocation=function(){return!(1===arguments.length&&arguments[0]instanceof Object)||arguments[0]instanceof p5.Vector||Array.isArray(arguments[0])?this._treeLocation(...arguments):this._treeLocation(Tree.ORIGIN,arguments[0])},p5.prototype._treeLocation=function(){return this._renderer._treeLocation(...arguments)},p5.RendererGL.prototype._treeLocation=function(t=Tree.ORIGIN,{from:e=Tree.EYE,to:r=Tree.WORLD,pMatrix:i,vMatrix:n,eMatrix:o,pvMatrix:a,pvInvMatrix:s}={}){return Array.isArray(t)&&(t=new p5.Vector(t[0]??0,t[1]??0,t[2]??0)),e==Tree.MODEL&&(e=this.mMatrix({eMatrix:o})),r==Tree.MODEL&&(r=this.mMatrix({eMatrix:o})),e==Tree.WORLD&&r==Tree.SCREEN?this._screenLocation({vector:t,pMatrix:i,vMatrix:n,pvMatrix:a}):e==Tree.SCREEN&&r==Tree.WORLD?this._location({vector:t,pMatrix:i,vMatrix:n,pvMatrix:a,pvInvMatrix:s}):e==Tree.SCREEN&&r==Tree.NDC?this._screenToNDCLocation(t):e==Tree.NDC&&r==Tree.SCREEN?this._ndcToScreenLocation(t):e==Tree.WORLD&&r==Tree.NDC?this._screenToNDCLocation(this._screenLocation({vector:t,pMatrix:i,vMatrix:n,pvMatrix:a})):e==Tree.NDC&&r==Tree.WORLD?this._location({vector:this._ndcToScreenLocation(t),pMatrix:i,vMatrix:n,pvMatrix:a,pvInvMatrix:s}):e==Tree.NDC&&(r instanceof p5.Matrix||r==Tree.EYE)?(r==Tree.EYE?n??this.vMatrix():r.copy().invert(r)).mult4(this._location({vector:this._ndcToScreenLocation(t),pMatrix:i,vMatrix:n,pvMatrix:a,pvInvMatrix:s})):(e instanceof p5.Matrix||e==Tree.EYE)&&r==Tree.NDC?this._screenToNDCLocation(this._screenLocation({vector:(e==Tree.EYE?o??this.eMatrix():e).mult4(t),pMatrix:i,vMatrix:n,pvMatrix:a})):e==Tree.WORLD&&(r instanceof p5.Matrix||r==Tree.EYE)?(r==Tree.EYE?n??this.vMatrix():r.copy().invert(r)).mult4(t):(e instanceof p5.Matrix||e==Tree.EYE)&&r==Tree.WORLD?(e==Tree.EYE?o??this.eMatrix():e).mult4(t):e instanceof p5.Matrix&&r instanceof p5.Matrix?this.lMatrix({from:e,to:r}).mult4(t):e==Tree.SCREEN&&(r instanceof p5.Matrix||r==Tree.EYE)?(r==Tree.EYE?n??this.vMatrix():r.copy().invert(r)).mult4(this._location({vector:t,pMatrix:i,vMatrix:n,pvMatrix:a,pvInvMatrix:s})):(e instanceof p5.Matrix||e==Tree.EYE)&&r==Tree.SCREEN?this._screenLocation({vector:(e==Tree.EYE?o??this.eMatrix():e).mult4(t),pMatrix:i,vMatrix:n,pvMatrix:a}):(console.error("couldn't parse your treeLocation query!"),t)},p5.RendererGL.prototype._ndcToScreenLocation=function(t){return new p5.Vector(this._map(t.x,-1,1,0,this.width),this._map(t.y,-1,1,0,this.height),this._map(t.z,-1,1,0,1))},p5.RendererGL.prototype._screenToNDCLocation=function(t){return new p5.Vector(this._map(t.x,0,this.width,-1,1),this._map(t.y,0,this.height,-1,1),this._map(t.z,0,1,-1,1))},p5.RendererGL.prototype._screenLocation=function({vector:t=new p5.Vector(0,0,.5),pMatrix:e,vMatrix:r,pvMatrix:i=this.pvMatrix({pMatrix:e,vMatrix:r})}={}){let n=i._mult4([t.x,t.y,t.z,1]);if(0==n[3])return void console.error("screenLocation broken. Check your pvMatrix!");let o=[0,this.height,this.width,-this.height];return n[0]/=n[3],n[1]/=n[3],n[2]/=n[3],n[0]=.5*n[0]+.5,n[1]=.5*n[1]+.5,n[2]=.5*n[2]+.5,n[0]=n[0]*o[2]+o[0],n[1]=n[1]*o[3]+o[1],new p5.Vector(n[0],n[1],n[2])},p5.RendererGL.prototype._location=function({vector:t=new p5.Vector(this.width/2,this.height/2,.5),pMatrix:e,vMatrix:r,pvMatrix:i,pvInvMatrix:n=this.pvInvMatrix({pMatrix:e,vMatrix:r,pvMatrix:i})}={}){let o=[0,this.height,this.width,-this.height],a=[t.x,t.y,t.z,1];a[0]=(a[0]-o[0])/o[2],a[1]=(a[1]-o[1])/o[3],a[0]=2*a[0]-1,a[1]=2*a[1]-1,a[2]=2*a[2]-1;let s=n._mult4(a);if(0!=s[3])return s[0]/=s[3],s[1]/=s[3],s[2]/=s[3],new p5.Vector(s[0],s[1],s[2]);console.error("location broken. Check your pvInvMatrix!")},p5.prototype.treeDisplacement=function(){return this._renderer.treeDisplacement(...arguments)},p5.RendererGL.prototype.treeDisplacement=function(){return!(1===arguments.length&&arguments[0]instanceof Object)||arguments[0]instanceof p5.Vector||Array.isArray(arguments[0])?this._treeDisplacement(...arguments):this._treeDisplacement(Tree._k,arguments[0])},p5.prototype._treeDisplacement=function(){return this._renderer._treeDisplacement(...arguments)},p5.RendererGL.prototype._treeDisplacement=function(t=Tree._k,{from:e=Tree.EYE,to:r=Tree.WORLD,vMatrix:i,eMatrix:n,pMatrix:o}={}){return Array.isArray(t)&&(t=new p5.Vector(t[0]??0,t[1]??0,t[2]??0)),e==Tree.MODEL&&(e=this.mMatrix({eMatrix:n})),r==Tree.MODEL&&(r=this.mMatrix({eMatrix:n})),e==Tree.WORLD&&r==Tree.SCREEN?this._worldToScreenDisplacement(t,o):e==Tree.SCREEN&&r==Tree.WORLD?this._screenToWorldDisplacement(t,o):e==Tree.SCREEN&&r==Tree.NDC?this._screenToNDCDisplacement(t):e==Tree.NDC&&r==Tree.SCREEN?this._ndcToScreenDisplacement(t):e==Tree.WORLD&&r==Tree.NDC?this._screenToNDCDisplacement(this._worldToScreenDisplacement(t,o)):e==Tree.NDC&&r==Tree.WORLD?this._screenToWorldDisplacement(this._ndcToScreenDisplacement(t),o):e==Tree.NDC&&r==Tree.EYE?this.dMatrix({matrix:n??this.eMatrix()}).mult3(this._screenToWorldDisplacement(this._ndcToScreenDisplacement(t),o)):e==Tree.EYE&&r==Tree.NDC?this._screenToNDCDisplacement(this._worldToScreenDisplacement(this.dMatrix({matrix:i??this.vMatrix()}).mult3(t),o)):e==Tree.SCREEN&&r instanceof p5.Matrix?this.dMatrix({matrix:r}).mult3(this._screenToWorldDisplacement(t,o)):e instanceof p5.Matrix&&r==Tree.SCREEN?this._worldToScreenDisplacement(this.dMatrix({matrix:e.copy().invert(e)}).mult3(t),o):e instanceof p5.Matrix&&r instanceof p5.Matrix?this.dMatrix({from:e,to:r}).mult3(t):e==Tree.EYE&&r==Tree.WORLD?this.dMatrix({matrix:i??this.vMatrix()}).mult3(t):e==Tree.WORLD&&r==Tree.EYE?this.dMatrix({matrix:n??this.eMatrix()}).mult3(t):e==Tree.EYE&&r==Tree.SCREEN?this._worldToScreenDisplacement(this.dMatrix({matrix:i??this.vMatrix()}).mult3(t),o):e==Tree.SCREEN&&r==Tree.EYE?this.dMatrix({matrix:n??this.eMatrix()}).mult3(this._screenToWorldDisplacement(t,o)):e==Tree.EYE&&r instanceof p5.Matrix?this.dMatrix({matrix:(i??this.vMatrix()).apply(r)}).mult3(t):e instanceof p5.Matrix&&r==Tree.EYE?this.dMatrix({matrix:e.copy().invert(e).apply(n??this.eMatrix())}).mult3(t):e==Tree.WORLD&&r instanceof p5.Matrix?this.dMatrix({matrix:r}).mult3(t):e instanceof p5.Matrix&&r==Tree.WORLD?this.dMatrix({matrix:e.copy().invert(e)}).mult3(t):(console.error("couldn't parse your treeDisplacement query!"),t)},p5.RendererGL.prototype._worldToScreenDisplacement=function(t,e=this.uPMatrix){let r=this._treeDisplacement(t,{from:Tree.WORLD,to:Tree.EYE}),i=r.x,n=r.y,o=0==e.mat4[15];if(o){let t=new p5.Vector,r=Math.abs(this._treeLocation(t,{from:Tree.WORLD,to:Tree.EYE}).z*Math.tan(this.fov(e)/2));i/=2*r/this.height,n/=2*r/this.height}let a=r.z;return a/=(e.nPlane()-e.fPlane())/(o?Math.tan(this.fov(e)/2):Math.abs(e.rPlane()-e.lPlane())/this.width),new p5.Vector(i,n,a)},p5.RendererGL.prototype._screenToWorldDisplacement=function(t,e=this.uPMatrix){let r=t.x,i=t.y,n=0==e.mat4[15];if(n){let t=new p5.Vector,n=Math.abs(this._treeLocation(t,{from:Tree.WORLD,to:Tree.EYE}).z*Math.tan(this.fov(e)/2));r*=2*n/this.height,i*=2*n/this.height}let o=t.z;o*=(e.nPlane()-e.fPlane())/(n?Math.tan(this.fov(e)/2):Math.abs(e.rPlane()-e.lPlane())/this.width);let a=new p5.Vector(r,i,o);return this._treeDisplacement(a,{from:Tree.EYE,to:Tree.WORLD})},p5.RendererGL.prototype._ndcToScreenDisplacement=function(t){return new p5.Vector(this.width*t.x/2,this.height*t.y/2,t.z/2)},p5.RendererGL.prototype._screenToNDCDisplacement=function(t){return new p5.Vector(2*t.x/this.width,2*t.y/this.height,2*t.z)},p5.prototype.readShader=function(t,{precision:e,matrices:r,varyings:i}={}){let n=new p5.Shader;return this._coupledWith=t.substring(t.lastIndexOf("/")+1),n._vertSrc=this.parseVertexShader({precision:e,matrices:r,varyings:i,_specs:!1}),this._coupledWith=void 0,this.loadStrings(t,(t=>{n._fragSrc=t.join("\n")})),n},p5.prototype.makeShader=function(t,{precision:e,matrices:r,varyings:i}={}){let n=new p5.Shader;return this._coupledWith="the fragment shader provided as param in makeShader()",n._vertSrc=this.parseVertexShader({precision:e,matrices:r,varyings:i,_specs:!1}),this._coupledWith=void 0,n._fragSrc=t,n},p5.prototype.parseVertexShader=function({precision:t=Tree.mediump,matrices:e=Tree.NONE,varyings:r=Tree.NONE,_specs:i=!0}={}){let n=`precision ${t===Tree.highp?"highp":t===Tree.mediump?"mediump":"lowp"} float;`,o=0==~(r|~Tree.color4),a=0==~(r|~Tree.texcoords2),s=0==~(r|~Tree.normal3),p=0==~(r|~Tree.position2),h=0==~(r|~Tree.position3),c=0==~(r|~Tree.position4),x=0==~(e|~Tree.pmvMatrix),u=0==~(e|~Tree.pMatrix),l=0==~(e|~Tree.mvMatrix)||c,M=`\n${n}\nattribute vec3 aPosition;\n${o?"attribute vec4 aVertexColor;":""}\n${a?"attribute vec2 aTexCoord;":""}\n${s?"attribute vec3 aNormal;":""}\n${x?"uniform mat4 uModelViewProjectionMatrix;":""}\n${u?"uniform mat4 uProjectionMatrix;":""}\n${l?"uniform mat4 uModelViewMatrix;":""}\n${0==~(e|~Tree.nMatrix)||s?"uniform mat3 uNormalMatrix;":""}\n${o?"varying vec4 color4;":""}\n${a?"varying vec2 texcoords2;":""}\n${s?"varying vec3 normal3;":""}\n${p?"varying vec2 position2;":""}\n${h?"varying vec3 position3;":""}\n${c?"varying vec4 position4;":""}\nvoid main() {\n  ${o?"color4 = aVertexColor;":""}\n  ${a?"texcoords2 = aTexCoord;":""}\n  ${s?"normal3 = normalize(uNormalMatrix * aNormal);":""}\n  ${p?"position2 = vec4(aPosition, 1.0).xy;":""}\n  ${h?"position3 = vec4(aPosition, 1.0).xyz;":""}\n  ${c?"position4 = uModelViewMatrix * vec4(aPosition, 1.0);":""}\n  gl_Position =${x?" uModelViewProjectionMatrix * ":(u&&l?" uProjectionMatrix * uModelViewMatrix *":"")+" "}vec4(aPosition, 1.0);\n}\n`,m=`\n/*\n${this._coupledWith?"Vertex shader code to be coupled with "+this._coupledWith:""} \nGenerated with treegl version ${Tree.INFO.VERSION}\n${i?"\nFeel free to copy, paste, edit and save it.\nRefer to createShader (https://p5js.org/reference/#/p5/createShader),\nloadShader (https://p5js.org/reference/#/p5/loadShader), readShader\nand makeShader (https://github.com/VisualComputing/p5.treegl#handling),\nfor details.":""}\n*/\n`+M;return m=m.split(/\r?\n/).filter((t=>""!==t.trim())).join("\n"),console.log(m),m},p5.prototype.emitMousePosition=function(t,e="u_mouse"){t.setUniform(e,[this.mouseX*pixelDensity(),(this.height-this.mouseY)*pixelDensity()])},p5.prototype.emitPointerPosition=function(){this._renderer.emitPointerPosition(...arguments)},p5.RendererGL.prototype.emitPointerPosition=function(t,e,r,i="u_pointer"){t.setUniform(i,[e*pixelDensity(),(this.height-r)*pixelDensity()])},p5.prototype.emitResolution=function(){this._renderer.emitResolution(...arguments)},p5.RendererGL.prototype.emitResolution=function(t,e="u_resolution"){t.setUniform(e,[this.width*pixelDensity(),this.height*pixelDensity()])},p5.prototype.emitTexOffset=function(t,e,r="u_texoffset"){t.setUniform(r,[1/e.width,1/e.height])},p5.prototype.pixelRatio=function(){return this._renderer.pixelRatio(...arguments)},p5.RendererGL.prototype.pixelRatio=function(t){return this.isOrtho()?Math.abs(this.tPlane()-this.bPlane())/this.height:2*Math.abs(this._treeLocation(t,{from:Tree.WORLD,to:Tree.EYE,vMatrix:this._curCamera.cameraMatrix}).z)*Math.tan(this.fov()/2)/this.height},p5.prototype.visibility=function(){return this._renderer.visibility(...arguments)},p5.RendererGL.prototype.visibility=function({corner1:t,corner2:e,center:r,radius:i,bounds:n=this.bounds()}={}){return r?i?this._ballVisibility(r,i,n):this._pointVisibility(r,n):t&&e?this._boxVisibility(t,e,n):console.error("couldn't parse your visibility query!")},p5.RendererGL.prototype._pointVisibility=function(t,e=this.bounds()){for(const r in e){let i=this.distanceToBound(t,r,e);if(i>0)return Tree.INVISIBLE;if(0===i)return Tree.SEMIVISIBLE}return Tree.VISIBLE},p5.RendererGL.prototype._ballVisibility=function(t,e,r=this.bounds()){let i=!0;for(const n in r){let o=this.distanceToBound(t,n,r);if(o>e)return Tree.INVISIBLE;(o>0||-o<e)&&(i=!1)}return i?Tree.VISIBLE:Tree.SEMIVISIBLE},p5.RendererGL.prototype._boxVisibility=function(t,e,r=this.bounds()){Array.isArray(t)&&(t=new p5.Vector(t[0]??0,t[1]??0,t[2]??0)),Array.isArray(e)&&(e=new p5.Vector(e[0]??0,e[1]??0,e[2]??0));let i=!0;for(const n in r){let o=!0;for(let a=0;a<8;++a){let s=new p5.Vector(0!=(4&a)?t.x:e.x,0!=(2&a)?t.y:e.y,0!=(1&a)?t.z:e.z);this.distanceToBound(s,n,r)>0?i=!1:o=!1}if(o)return Tree.INVISIBLE}return i?Tree.VISIBLE:Tree.SEMIVISIBLE},p5.prototype.bounds=function(){return this._renderer.bounds(...arguments)},p5.RendererGL.prototype.bounds=function({vMatrix:t,eMatrix:e}={}){const r=this.nPlane(),i=this.fPlane(),n=this.lPlane(),o=this.rPlane(),a=this.bPlane(),s=this.tPlane();let p=Array(6),h=Array(6);const c=this._treeLocation([0,0,0],{from:Tree.EYE,to:Tree.WORLD,eMatrix:e}),x=this._treeDisplacement([0,0,-1],{from:Tree.EYE,to:Tree.WORLD,vMatrix:t}),u=this._treeDisplacement([0,1,0],{from:Tree.EYE,to:Tree.WORLD,vMatrix:t}),l=this._treeDisplacement([1,0,0],{from:Tree.EYE,to:Tree.WORLD,vMatrix:t}),M=p5.Vector.dot(c,x);if(this.isOrtho())p[0]=p5.Vector.mult(l,-1),p[1]=l,p[4]=u,p[5]=p5.Vector.mult(u,-1),h[0]=p5.Vector.dot(p5.Vector.sub(c,p5.Vector.mult(l,-n)),p[0]),h[1]=p5.Vector.dot(p5.Vector.add(c,p5.Vector.mult(l,o)),p[1]),h[4]=p5.Vector.dot(p5.Vector.add(c,p5.Vector.mult(u,-a)),p[4]),h[5]=p5.Vector.dot(p5.Vector.sub(c,p5.Vector.mult(u,s)),p[5]);else{const t=Math.atan2(o,r),e=Math.sin(t),i=Math.cos(t),m=Math.atan2(n,r),d=Math.sin(m),f=Math.cos(m);p[0]=p5.Vector.add(p5.Vector.mult(x,d),p5.Vector.mult(l,-f)),p[1]=p5.Vector.add(p5.Vector.mult(x,-e),p5.Vector.mult(l,i));const y=Math.atan2(s,r),v=Math.sin(y),T=Math.cos(y),_=Math.atan2(a,r),E=Math.sin(_),L=Math.cos(_);p[4]=p5.Vector.add(p5.Vector.mult(x,-v),p5.Vector.mult(u,T)),p[5]=p5.Vector.add(p5.Vector.mult(x,E),p5.Vector.mult(u,-L)),h[0]=d*M-f*p5.Vector.dot(c,l),h[1]=-e*M+i*p5.Vector.dot(c,l),h[4]=-v*M+T*p5.Vector.dot(c,u),h[5]=E*M-L*p5.Vector.dot(c,u)}p[2]=p5.Vector.mult(x,-1),p[3]=x,h[2]=-M-r,h[3]=M+i;let m={};return m[Tree.LEFT]={a:p[0].x,b:p[0].y,c:p[0].z,d:h[0]},m[Tree.RIGHT]={a:p[1].x,b:p[1].y,c:p[1].z,d:h[1]},m[Tree.NEAR]={a:p[2].x,b:p[2].y,c:p[2].z,d:h[2]},m[Tree.FAR]={a:p[3].x,b:p[3].y,c:p[3].z,d:h[3]},m[Tree.TOP]={a:p[4].x,b:p[4].y,c:p[4].z,d:h[4]},m[Tree.BOTTOM]={a:p[5].x,b:p[5].y,c:p[5].z,d:h[5]},m},p5.prototype.distanceToBound=function(){return this._renderer.distanceToBound(...arguments)},p5.RendererGL.prototype.distanceToBound=function(t,e,r=this.bounds()){return Array.isArray(t)&&(t=new p5.Vector(t[0]??0,t[1]??0,t[2]??0)),p5.Vector.dot(t,new p5.Vector(r[e].a,r[e].b,r[e].c))-r[e].d},p5.prototype.mousePicking=function({mMatrix:t=this.mMatrix(),x:e,y:r,size:i=50,shape:n=Tree.CIRCLE,eMatrix:o,pMatrix:a,vMatrix:s,pvMatrix:p}={}){return this.pointerPicking(this.mouseX,this.mouseY,{mMatrix:t,x:e,y:r,size:i,shape:n,eMatrix:o,pMatrix:a,vMatrix:s,pvMatrix:p})},p5.prototype.pointerPicking=function(){return this._renderer.pointerPicking(...arguments)},p5.RendererGL.prototype.pointerPicking=function(t,e,{mMatrix:r=this.mMatrix(),x:i,y:n,size:o=50,shape:a=Tree.CIRCLE,eMatrix:s,pMatrix:p,vMatrix:h,pvMatrix:c}={}){if(!i||!n){let t=this.treeLocation({from:r,to:Tree.SCREEN,pMatrix:p,vMatrix:h,pvMatrix:c});i=t.x,n=t.y,o/=this.pixelRatio(this.treeLocation({from:r,to:Tree.WORLD,eMatrix:s}))}let x=o/2;return a===Tree.CIRCLE?Math.sqrt(Math.pow(i-t,2)+Math.pow(n-e,2))<x:Math.abs(t-i)<x&&Math.abs(e-n)<x},p5.prototype.axes=function(){this._renderer.axes(...arguments)},p5.RendererGL.prototype.axes=function({size:t=100,bits:e=Tree.LABELS|Tree.X|Tree.Y|Tree.Z}={}){if(this._rendererState=this.push(),0==~(e|~Tree.LABELS)){const e=t/40,r=t/30,i=1.04*t;this.stroke(200,0,0),this.line(i,e,-r,i,-e,r),this.line(i,-e,-r,i,e,r),this.stroke(0,200,0),this.line(e,i,r,0,i,0),this.line(0,i,0,-e,i,r),this.line(-e,i,r,0,i,0),this.line(0,i,0,0,i,-r),this.stroke(0,100,200),this.line(-e,-r,i,e,-r,i),this.line(e,-r,i,-e,r,i),this.line(-e,r,i,e,r,i)}this.stroke(200,0,0),0==~(e|~Tree.X)&&this.line(0,0,0,t,0,0),0==~(e|~Tree._X)&&this.line(0,0,0,-t,0,0),this.stroke(0,200,0),0==~(e|~Tree.Y)&&this.line(0,0,0,0,t,0),0==~(e|~Tree._Y)&&this.line(0,0,0,0,-t,0),this.stroke(0,100,200),0==~(e|~Tree.Z)&&this.line(0,0,0,0,0,t),0==~(e|~Tree._Z)&&this.line(0,0,0,0,0,-t),this.pop(this._rendererState)},p5.prototype.grid=function(){this._renderer.grid(...arguments)},p5.RendererGL.prototype.grid=function({size:t=100,subdivisions:e=10,style:r=Tree.DOTS}={}){if(this._rendererState=this.push(),r===Tree.DOTS){let r=this.curStrokeWeight,i=0,n=0;this.strokeWeight(2*r),this.beginShape(0);for(let r=0;r<=e;++r){i=t*(2*r/e-1);for(let r=0;r<=e;++r)n=t*(2*r/e-1),this.vertex(i,n,0)}this.endShape();const o=5,a=e*o;this.strokeWeight(r),this.beginShape(0);for(let e=0;e<=a;++e){i=t*(2*e/a-1);for(let r=0;r<=a;++r)n=t*(2*r/a-1),e%o==0&&r%o==0||this.vertex(i,n,0)}this.endShape()}else for(let r=0;r<=e;++r){const i=t*(2*r/e-1);this.line(i,-t,0,i,+t,0),this.line(-t,i,0,t,i,0)}this.pop(this._rendererState)},p5.prototype.cross=function(){this._renderer.cross(...arguments)},p5.RendererGL.prototype.cross=function({mMatrix:t=this.mMatrix(),x:e,y:r,size:i=50,eMatrix:n,pMatrix:o,vMatrix:a,pvMatrix:s}={}){if(!e||!r){let p=this.treeLocation({from:t,to:Tree.SCREEN,pMatrix:o,vMatrix:a,pvMatrix:s});e=p.x,r=p.y,i/=this.pixelRatio(this.treeLocation({from:t,to:Tree.WORLD,eMatrix:n}))}const p=i/2;this._rendererState=this.push(),this.beginHUD(),this.line(e-p,r,e+p,r),this.line(e,r-p,e,r+p),this.endHUD(),this.pop(this._rendererState)},p5.prototype.bullsEye=function(){this._renderer.bullsEye(...arguments)},p5.RendererGL.prototype.bullsEye=function({mMatrix:t=this.mMatrix(),x:e,y:r,size:i=50,shape:n=Tree.CIRCLE,eMatrix:o,pMatrix:a,vMatrix:s,pvMatrix:p}={}){if(!e||!r){let n=this.treeLocation({from:t,to:Tree.SCREEN,pMatrix:a,vMatrix:s,pvMatrix:p});e=n.x,r=n.y,i/=this.pixelRatio(this.treeLocation({from:t,to:Tree.WORLD,eMatrix:o}))}if(this._rendererState=this.push(),n===Tree.CIRCLE)this.beginHUD(),this._circle({x:e,y:r,radius:i/2}),this.endHUD();else{const t=i/2;this.beginHUD(),this.line(e-t,r-t+.6*t,e-t,r-t),this.line(e-t,r-t,e-t+.6*t,r-t),this.line(e+t-.6*t,r-t,e+t,r-t),this.line(e+t,r-t,e+t,r-t+.6*t),this.line(e+t,r+t-.6*t,e+t,r+t),this.line(e+t,r+t,e+t-.6*t,r+t),this.line(e-t+.6*t,r+t,e-t,r+t),this.line(e-t,r+t,e-t,r+t-.6*t),this.endHUD()}this.cross({x:e,y:r,size:.6*i}),this.pop(this._rendererState)},p5.prototype._circle=function(){this._renderer._circle(...arguments)},p5.RendererGL.prototype._circle=function({filled:t=!1,x:e=this.width/2,y:r=this.height/2,radius:i=100,detail:n=50}={}){if(this._rendererState=this.push(),t){this.beginShape(5);for(let t=0;t<=n;t++){const e=Math.cos(t*(2*Math.PI)/n),r=Math.sin(t*(2*Math.PI)/n);this.vertex(0,0,0,.5,.5),this.vertex(i*e,i*r,0,.5*e+.5,.5*r+.5)}this.endShape()}else{this.translate(e,r);const t=2*Math.PI/n;let o={x:i,y:0};for(let e=1;e<=n;e++){let r={x:Math.cos(e*t)*i,y:Math.sin(e*t)*i};this.line(o.x,o.y,r.x,r.y),o=r}}this.pop(this._rendererState)},p5.prototype.viewFrustum=function(){this._renderer.viewFrustum(...arguments)},p5.RendererGL.prototype.viewFrustum=function({vMatrix:t,eMatrix:e,fbo:r=_renderer,bits:i=Tree.NEAR|Tree.FAR,viewer:n=(()=>this.axes({size:50,bits:Tree.X|Tree._X|Tree.Y|Tree._Y|Tree.Z|Tree._Z}))}={}){if(this===r)return void console.error("displaying viewFrustum requires an fbo different than this");this._rendererState=this.push(),this.uMVMatrix=new p5.Matrix,this.applyMatrix(...(t??this.vMatrix()).mat4),this.applyMatrix(...(e??r.eMatrix()).mat4),n!==Tree.NONE&&n();const o=r.isOrtho(),a=-r.nPlane(),s=-r.fPlane(),p=r.lPlane(),h=r.rPlane(),c=r.isOrtho()?-r.tPlane():r.tPlane(),x=r.isOrtho()?-r.bPlane():r.bPlane(),u=o?1:s/a,l=u*p,M=u*h,m=u*x,d=u*c;0==~(i|~Tree.FAR)?(this.beginShape(),this.vertex(l,d,s),this.vertex(M,d,s),this.vertex(M,m,s),this.vertex(l,m,s),this.endShape()):(this.line(l,d,s,M,d,s),this.line(M,d,s,M,m,s),this.line(M,m,s,l,m,s),this.line(l,m,s,l,d,s)),0==~(i|~Tree.BODY)?(this.beginShape(),this.vertex(l,d,s),this.vertex(p,c,a),this.vertex(h,c,a),this.vertex(M,d,s),this.endShape(),this.beginShape(),this.vertex(M,d,s),this.vertex(h,c,a),this.vertex(h,x,a),this.vertex(M,m,s),this.endShape(),this.beginShape(),this.vertex(M,m,s),this.vertex(h,x,a),this.vertex(p,x,a),this.vertex(l,m,s),this.endShape(),this.beginShape(),this.vertex(p,c,a),this.vertex(l,d,s),this.vertex(l,m,s),this.vertex(p,x,a),this.endShape(),o||(this.line(0,0,0,h,c,a),this.line(0,0,0,p,c,a),this.line(0,0,0,p,x,a),this.line(0,0,0,h,x,a))):(this.line(o?h:0,o?c:0,o?a:0,M,d,s),this.line(o?p:0,o?c:0,o?a:0,l,d,s),this.line(o?p:0,o?x:0,o?a:0,l,m,s),this.line(o?h:0,o?x:0,o?a:0,M,m,s)),0==~(i|~Tree.NEAR)?(this.beginShape(),this.vertex(p,c,a),this.vertex(h,c,a),this.vertex(h,x,a),this.vertex(p,x,a),this.endShape()):(this.line(p,c,a,h,c,a),this.line(h,c,a,h,x,a),this.line(h,x,a,p,x,a),this.line(p,x,a,p,c,a)),this.pop(this._rendererState)};

let lumaShader, src, img_src, video_src, video_on, lightness, uv, hsv, hsl, cAvrg, textureTintingText, texturingT;

function preload() {
lumaShader = readShader('/showcase/sketches/shaders/texturing2.frag',
{ varyings: Tree.texcoords2 });
// video source: https://t.ly/LWUs2
video_src = createVideo(['/showcase/sketches/sketches/wagon.webm']);
video_src.hide(); // by default video shows up in separate dom
// image source: https://t.ly/Dz8W
img_src = loadImage('/showcase/sketches/sketches/fire_breathing.jpg');
src = img_src;
}

function setup() {
createCanvas(600, 428, WEBGL);
noStroke();
textureMode(NORMAL);
video_on = createCheckbox('video', false);
video_on.style('color', 'white');
video_on.changed(() => {
src = video_on.checked() ? video_src : img_src;
video_on.checked() ? video_src.loop() : video_src.pause();
});
video_on.position(10, 10);
lightness = createCheckbox('luma', false);
lightness.position(10, 30);
lightness.style('color', 'white');
lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));

    uv = createCheckbox('uv visualization', false);
    uv.style('color', 'white');
    uv.changed(() => lumaShader.setUniform('uv', uv.checked()));
    uv.position(10, 50);

    hsv = createCheckbox('hsv value v', false);
    hsv.position(10, 70);
    hsv.style('color', 'white');
    hsv.changed(() => lumaShader.setUniform('hsv', hsv.checked()));

    hsl = createCheckbox('hsl lightness l', false);
    hsl.position(10, 90);
    hsl.style('color', 'white');
    hsl.changed(() => lumaShader.setUniform('hsl', hsl.checked()));

    cAvrg = createCheckbox('component average', false);
    cAvrg.position(10, 110);
    cAvrg.style('color', 'white');
    cAvrg.changed(() => lumaShader.setUniform('cAvrg', cAvrg.checked()));

    texturingT = createSlider(0.0, 1.0, 0.5, 0.05);
    texturingT.position(20, 160);
    texturingT.style('width', '80px');

    textureTintingText = createP(`texture tinting value: ${texturingT.value()}`);
    textureTintingText.position(20, 125);
    textureTintingText.style('color', 'white');

    shader(lumaShader);
}

function draw() {
lumaShader.setUniform('texturingT', texturingT.value());
textureTintingText.html(`texture tinting value: ${texturingT.value()}`);
lumaShader.setUniform('texture', src);
beginShape();
// format is: vertex(x, y, z, u, v)
vertex(-1, -1, 0, 0, 1);
vertex(1, -1, 0, 1, 1);
vertex(1, 1, 0, 1, 0);
vertex(-1, 1, 0, 0, 0);
endShape();
}

{{< /highlight >}}
{{< /details >}}




{{< details title="texturing.frag" open=false >}}
{{< highlight glsl >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform vec3 tintColor; // new uniform for tint color
uniform float texturingT;
uniform bool lightness; // lightness visualization
uniform bool uv; // uv visualization
uniform bool hsv; // hsv visualization
uniform bool hsl; // hsl visualization
uniform bool cAvrg; // component average visualization
uniform bool textureTinting; // texture tinting visualization

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec4 texel) {
// alpha channel (texel.a) is just discarded
return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

vec3 RGB2HSV(vec4 texel) {
// Is used max(R, G, B) to determine the value (V) of the HSV color
float maxVal = max(max(texel.r, texel.g), texel.b);
vec3 hsv;

    hsv.x = maxVal;
    hsv.y = maxVal;
    hsv.z = maxVal;

    return hsv;
}

vec3 RGB2HSL(vec4 texel) {
// Is used mid(R, G, B) = (1 / 2) (max(R, G, B) + min(R, G, B)) to determine the lightness (L) of the HSL color
float maxVal = max(max(texel.r, texel.g), texel.b);
float minVal = min(min(texel.r, texel.g), texel.b);
float midVal = 0.5 * (maxVal + minVal);
vec3 hsl;

    hsl.x = midVal;
    hsl.y = midVal;
    hsl.z = midVal;

    return hsl;
}

vec3 componentAverage(vec4 texel) {
// Is used (R + G + B) / 3 to determine the average of the RGB components
float avg = (texel.r + texel.g + texel.b) / 3.0;
vec3 avgVec;

    avgVec.x = avg;
    avgVec.y = avg;
    avgVec.z = avg;

    return avgVec;
}

void main() {
// texture2D(texture, texcoords2) samples texture at texcoords2
// and returns the normalized texel color
vec4 texel = texture2D(texture, texcoords2);

    // tint the texel color with the tint color
    vec3 tintedColor = texel.rgb * tintColor;

    // mix the tinted color and the original texel color
    vec3 mixedColor = mix(texel.rgb, tintedColor, texturingT);

    gl_FragColor =
    uv ? vec4(texcoords2.xy, 0.0, 1.0) :
    lightness ? vec4(vec3(luma(texel)), 1.0) :
    hsv ? vec4(vec3(RGB2HSV(texel)), 1.0) :
    hsl ? vec4(vec3(RGB2HSL(texel)), 1.0) :
    cAvrg ? vec4(vec3(componentAverage(texel)), 1.0) :
    vec4(mixedColor, texel.a); // set output color to mixed color
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/texturing.js" width="724" height="524" >}}

## Description
The solution implemented in this exercise involves the use of texturing with GLSL shaders to create visual effects in 2D and 3D graphics. Texturing is a technique used to apply a pattern or image onto a surface, creating a realistic or artistic effect.

The code implements various coloring brightness tools such as HSV value V, HSL lightness L, and Component average to adjust the brightness of textures and create more complex visual effects. The implementation of texture tinting by mixing color and texel interpolated data creates a dynamic and interactive texture mapping.

GLSL shaders are used in this code to manipulate the colors and brightness of the textures, creating a wide range of visual effects. The texturing.js and texturing.frag files provide the necessary functions and code to implement the texturing techniques.

### Previous work
Texturing has been a popular technique in computer graphics for many years. It has been used in various fields such as game development, virtual reality, and architectural visualization. GLSL shaders have been used extensively in these fields to create complex visual effects.

### Future work
Future work on texturing could involve the development of more advanced techniques for creating and manipulating textures. This could include the use of machine learning algorithms to create more realistic and detailed textures.

Additionally, the application of texturing could be expanded to fields such as medical imaging and scientific visualization. For example, texturing could be used to create 3D models of medical scans, which could be used to simulate the effects of diseases on the body.

## Usages
The code provided can be used in various applications, including video games, simulation software, and educational tools. Here are some potential use cases:

- Video games: The texturing techniques implemented in this code could be used as a part of a video game environment. By integrating this code into a game engine, developers can create realistic and immersive environments for their games.
- Simulation software: Texturing could be used to create realistic simulations of real-world environments, such as landscapes and terrains. For example, this could be used to simulate the effects of weather on a landscape.
- Educational tools: This code could be used as a tool for learning about texturing, programming concepts, and 3D graphics. It could be integrated into educational software or used as a standalone application to teach students about computer graphics and simulation.
- Architectural visualization: This code could be used to create 3D models of buildings and environments for architectural visualization. This could be useful for architects and designers to create realistic representations of their designs in a virtual environment.