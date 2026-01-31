import{a as O}from"./chunk-GC6T2CV5.js";import"./chunk-6L23CKLQ.js";import"./chunk-3U6IX45G.js";import{b as P,c as E}from"./chunk-2WW22MLQ.js";import"./chunk-VZSSPM6Z.js";import{a as x,b as _,c as y,f as b,g as M}from"./chunk-4TPATSYR.js";import"./chunk-6K3Y7BDI.js";import{l as C,m as w,n as v}from"./chunk-EYALUUED.js";import{Hb as m,Oa as d,Wb as n,bb as p,gb as g,ma as f,pb as S,qb as h,vb as r,wb as t,xb as e,yb as l}from"./chunk-WWHZWTZN.js";import"./chunk-2NFLSA4Y.js";var u=class i{performanceTitle="\u{1F680} Performance: *ngSwitch vs @switch";oldWayCode={title:"*ngSwitch - Requires Runtime Directives",code:`import { NgSwitch, NgSwitchCase, NgSwitchDefault } 
  from '@angular/common';

@Component({
  imports: [
    NgSwitch,       // Runtime dependency
    NgSwitchCase,   // Runtime dependency
    NgSwitchDefault // Runtime dependency
  ],
  template: \`
    <div [ngSwitch]="status">
      <div *ngSwitchCase="'pending'">...</div>
      <div *ngSwitchCase="'approved'">...</div>
      <div *ngSwitchDefault>...</div>
    </div>
  \`
})`};newWayCode={title:"@switch - Built-in (No Imports Needed)",code:`@Component({
  imports: [],  // No directives needed!
  template: \`
    @switch (status) {
      @case ('pending') {
        <div>...</div>
      }
      @case ('approved') {
        <div>...</div>
      }
      @default {
        <div>...</div>
      }
    }
  \`
})`};performanceMetrics=[{label:"Bundle Impact:",value:"*ngSwitch adds ~2KB (3 directives) | @switch adds 0KB"},{label:"Runtime Cost:",value:"*ngSwitch creates 3+ directive instances | @switch is compile-time only"},{label:"Readability:",value:"*ngSwitch requires [ngSwitch] attribute + structural directives | @switch is native syntax"}];static \u0275fac=function(c){return new(c||i)};static \u0275cmp=p({type:i,selectors:[["app-switch-performance-comparison"]],decls:1,vars:4,consts:[[3,"title","oldWay","newWay","metrics"]],template:function(c,o){c&1&&l(0,"app-performance-comparison",0),c&2&&r("title",o.performanceTitle)("oldWay",o.oldWayCode)("newWay",o.newWayCode)("metrics",o.performanceMetrics)},dependencies:[O],encapsulation:2,changeDetection:0})};function T(i,a){i&1&&(t(0,"div",10)(1,"h4"),n(2,"\u23F3 Pending"),e(),t(3,"p"),n(4,"Your request is being reviewed"),e()())}function j(i,a){i&1&&(t(0,"div",11)(1,"h4"),n(2,"\u2713 Approved"),e(),t(3,"p"),n(4,"Your request has been approved"),e()())}function R(i,a){i&1&&(t(0,"div",12)(1,"h4"),n(2,"\u2717 Rejected"),e(),t(3,"p"),n(4,"Your request has been rejected"),e()())}function B(i,a){i&1&&(t(0,"div",13)(1,"h4"),n(2,"Unknown Status"),e(),t(3,"p"),n(4,"Status not recognized"),e()())}function q(i,a){i&1&&(t(0,"div",10)(1,"h4"),n(2,"\u23F3 Pending"),e(),t(3,"p"),n(4,"Your request is being reviewed"),e()())}function W(i,a){i&1&&(t(0,"div",11)(1,"h4"),n(2,"\u2713 Approved"),e(),t(3,"p"),n(4,"Your request has been approved"),e()())}function Y(i,a){i&1&&(t(0,"div",12)(1,"h4"),n(2,"\u2717 Rejected"),e(),t(3,"p"),n(4,"Your request has been rejected"),e()())}function z(i,a){i&1&&(t(0,"div",13)(1,"h4"),n(2,"Unknown Status"),e(),t(3,"p"),n(4,"Status not recognized"),e()())}var k=class i{status=f("pending");setStatus(a){this.status.set(a)}static \u0275fac=function(c){return new(c||i)};static \u0275cmp=p({type:i,selectors:[["app-switch-syntax"]],decls:28,vars:5,consts:[[1,"button-group"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","accent",3,"click"],["mat-raised-button","","color","warn",3,"click"],[1,"example-section"],[3,"ngSwitch"],["class","status-card pending",4,"ngSwitchCase"],["class","status-card approved",4,"ngSwitchCase"],["class","status-card rejected",4,"ngSwitchCase"],["class","status-card default",4,"ngSwitchDefault"],[1,"status-card","pending"],[1,"status-card","approved"],[1,"status-card","rejected"],[1,"status-card","default"]],template:function(c,o){if(c&1&&(t(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),n(3,"@switch vs *ngSwitch"),e()(),t(4,"mat-card-content")(5,"div",0)(6,"button",1),m("click",function(){return o.setStatus("pending")}),n(7,"Pending"),e(),t(8,"button",2),m("click",function(){return o.setStatus("approved")}),n(9,"Approved"),e(),t(10,"button",3),m("click",function(){return o.setStatus("rejected")}),n(11,"Rejected"),e()(),t(12,"div",4)(13,"h3"),n(14,"*ngSwitch (old syntax)"),e(),t(15,"div",5),g(16,T,5,0,"div",6)(17,j,5,0,"div",7)(18,R,5,0,"div",8)(19,B,5,0,"div",9),e()(),t(20,"div",4)(21,"h3"),n(22,"@switch / @case / @default (new syntax)"),e(),S(23,q,5,0,"div",10)(24,W,5,0,"div",11)(25,Y,5,0,"div",12)(26,z,5,0,"div",13),e(),l(27,"app-switch-performance-comparison"),e()()),c&2){let s;d(15),r("ngSwitch",o.status()),d(),r("ngSwitchCase","pending"),d(),r("ngSwitchCase","approved"),d(),r("ngSwitchCase","rejected"),d(5),h((s=o.status())==="pending"?23:s==="approved"?24:s==="rejected"?25:26)}},dependencies:[M,x,y,b,_,E,P,C,w,v,u],styles:[".button-group[_ngcontent-%COMP%]{display:flex;gap:12px;margin-bottom:16px}.example-section[_ngcontent-%COMP%]{margin:16px 0;padding:12px;background-color:#f9f9f9;border-radius:4px}.example-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 12px;font-size:14px;font-weight:600}.example-section[_ngcontent-%COMP%]   .status-card[_ngcontent-%COMP%]{padding:16px;border-radius:6px;border-left:4px solid #9e9e9e}.example-section[_ngcontent-%COMP%]   .status-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 8px;font-size:16px;font-weight:600}.example-section[_ngcontent-%COMP%]   .status-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:14px;opacity:.9}.example-section[_ngcontent-%COMP%]   .status-card.pending[_ngcontent-%COMP%]{background-color:#fff3e0;border-left-color:#ff9800;color:#e65100}.example-section[_ngcontent-%COMP%]   .status-card.approved[_ngcontent-%COMP%]{background-color:#e8f5e9;border-left-color:#4caf50;color:#2e7d32}.example-section[_ngcontent-%COMP%]   .status-card.rejected[_ngcontent-%COMP%]{background-color:#ffebee;border-left-color:#f44336;color:#c62828}.example-section[_ngcontent-%COMP%]   .status-card.default[_ngcontent-%COMP%]{background-color:#f5f5f5;border-left-color:#9e9e9e;color:#616161}"],changeDetection:0})};export{k as SwitchSyntaxComponent};
