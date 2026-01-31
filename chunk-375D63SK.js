import{a as B}from"./chunk-GC6T2CV5.js";import"./chunk-6L23CKLQ.js";import"./chunk-3U6IX45G.js";import{b as h,c as N}from"./chunk-2WW22MLQ.js";import"./chunk-VZSSPM6Z.js";import{a as M,b as F,c as b,f as P,g as k}from"./chunk-4TPATSYR.js";import"./chunk-6K3Y7BDI.js";import{j as _}from"./chunk-EYALUUED.js";import{Hb as f,Oa as s,Ub as u,Wb as a,Xb as m,Yb as g,bb as c,gb as C,ma as v,tb as x,ub as y,vb as p,wb as r,xb as n,yb as l}from"./chunk-WWHZWTZN.js";import"./chunk-2NFLSA4Y.js";var d=class o{performanceTitle="\u{1F680} Performance: *ngFor vs @for";oldWayCode={title:"*ngFor - Requires Runtime Directive",code:`import { NgFor } from '@angular/common';

@Component({
  imports: [NgFor],  // Runtime dependency
  template: \`
    <div *ngFor="let item of items; 
                 trackBy: trackByFn">
      {{ item }}
    </div>
  \`
})
export class MyComponent {
  trackByFn(index: number, item: any) {
    return item.id;
  }
}`};newWayCode={title:"@for - Built-in (No Import Needed)",code:`@Component({
  imports: [],  // No directive needed!
  template: \`
    @for (item of items; track item.id) {
      <div>{{ item }}</div>
    } @empty {
      <p>No items</p>
    }
  \`
})
export class MyComponent {
  // No trackBy method needed!
}`};performanceMetrics=[{label:"Bundle Impact:",value:"*ngFor adds ~1.5KB | @for adds 0KB"},{label:"Runtime Cost:",value:"*ngFor creates directive instance | @for is compile-time only"},{label:"Developer Experience:",value:"*ngFor requires trackBy method | @for uses inline track expression"},{label:"Empty State:",value:"*ngFor needs separate *ngIf | @for has built-in @empty block"}];static \u0275fac=function(e){return new(e||o)};static \u0275cmp=c({type:o,selectors:[["app-for-performance-comparison"]],decls:1,vars:4,consts:[[3,"title","oldWay","newWay","metrics"]],template:function(e,i){e&1&&l(0,"app-performance-comparison",0),e&2&&p("title",i.performanceTitle)("oldWay",i.oldWayCode)("newWay",i.newWayCode)("metrics",i.performanceMetrics)},dependencies:[B],encapsulation:2,changeDetection:0})};var S=(o,t)=>t.id;function A(o,t){if(o&1&&(r(0,"div",5)(1,"span",7),a(2),n(),r(3,"span",8),a(4),n(),r(5,"span",9),a(6),n()()),o&2){let e=t.$implicit,i=t.index;s(2),m(i+1),s(2),m(e.name),s(),u("active",e.isActive),s(),g(" ",e.isActive?"Active":"Inactive"," ")}}function D(o,t){if(o&1&&(r(0,"div",5)(1,"span",7),a(2),n(),r(3,"span",8),a(4),n(),r(5,"span",9),a(6),n()()),o&2){let e=t.$implicit,i=t.$index;s(2),m(i+1),s(2),m(e.name),s(),u("active",e.isActive),s(),g(" ",e.isActive?"Active":"Inactive"," ")}}function T(o,t){o&1&&(r(0,"p",6),a(1,"No users available"),n())}var E=class o{users=v([{id:1,name:"Alice",isActive:!0},{id:2,name:"Bob",isActive:!1},{id:3,name:"Charlie",isActive:!0}]);addUser(){let t={id:this.users().length+1,name:`User ${this.users().length+1}`,isActive:Math.random()>.5};this.users.update(e=>[...e,t])}removeUser(){this.users.update(t=>t.slice(0,-1))}trackById(t,e){return e.id}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=c({type:o,selectors:[["app-ngfor-vs-for"]],decls:21,vars:3,consts:[[1,"button-group"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","warn",3,"click"],[1,"example-section"],["class","user-item",4,"ngFor","ngForOf","ngForTrackBy"],[1,"user-item"],[1,"empty-message"],[1,"index"],[1,"name"],[1,"status"]],template:function(e,i){e&1&&(r(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),a(3,"@for vs *ngFor"),n()(),r(4,"mat-card-content")(5,"div",0)(6,"button",1),f("click",function(){return i.addUser()}),a(7,"Add User"),n(),r(8,"button",2),f("click",function(){return i.removeUser()}),a(9,"Remove User"),n()(),r(10,"div",3)(11,"h3"),a(12,"*ngFor (old syntax)"),n(),C(13,A,7,5,"div",4),n(),r(14,"div",3)(15,"h3"),a(16,"@for with @empty (new syntax)"),n(),x(17,D,7,5,"div",5,S,!1,T,2,0,"p",6),n(),l(20,"app-for-performance-comparison"),n()()),e&2&&(s(13),p("ngForOf",i.users())("ngForTrackBy",i.trackById),s(4),y(i.users()))},dependencies:[k,M,b,P,F,N,h,_,d],styles:[".example-section[_ngcontent-%COMP%]   .user-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:8px 12px;margin:4px 0;background-color:#fff;border-radius:4px;border-left:3px solid #2196f3}.example-section[_ngcontent-%COMP%]   .user-item[_ngcontent-%COMP%]   .index[_ngcontent-%COMP%]{font-weight:600;color:#666;min-width:24px}.example-section[_ngcontent-%COMP%]   .user-item[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{flex:1;font-weight:500}.example-section[_ngcontent-%COMP%]   .user-item[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]{font-size:12px;padding:2px 8px;border-radius:12px;background-color:#f44336;color:#fff}.example-section[_ngcontent-%COMP%]   .user-item[_ngcontent-%COMP%]   .status.active[_ngcontent-%COMP%]{background-color:#4caf50}.example-section[_ngcontent-%COMP%]   .empty-message[_ngcontent-%COMP%]{padding:16px;text-align:center;color:#666;font-style:italic}"],changeDetection:0})};export{E as NgforVsForComponent};
