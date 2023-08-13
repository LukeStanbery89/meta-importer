"use strict";var e=require("fs"),r=require("path");module.exports=function(){let t=r.basename(this.resourcePath,r.extname(this.resourcePath)),n=function(t){try{let n=e.readdirSync(t);return n.map(e=>r.parse(e).name)}catch(e){return console.error("meta-importer error:",e),[]}}(r.dirname(this.resourcePath)),o="",a="";for(let e of n)["index",t].includes(e)||(o+=`import ${e} from "./${e}";
`,a+=`    ${e},
`);return o+"\nexport default {\n"+a+"};\n"};
//# sourceMappingURL=index.js.map
