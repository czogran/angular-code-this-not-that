import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentRefService {
  private leakyRefs: unknown[] = [];
  private cleanRefs: unknown[] = [];

  storeLeaky(ref: { name: string }) {
    this.leakyRefs.push(ref);
    console.log(`❌ Leaky:`);
    this.leakyRefs.forEach((r) => console.log(`  - ${(r as any).name}`));
  }

  storeClean(ref: { name: string }) {
    this.cleanRefs.push(ref);
    console.log(`✓ Clean:`);
    this.cleanRefs.forEach((r) => console.log(`  - ${(r as any).name}`));
  }

  clearClean() {
    console.log(`✓ Cleared:`);
    this.cleanRefs.forEach((r) => console.log(`  - ${(r as any).name}`));
    this.cleanRefs = [];
  }

  getLeakyCount() {
    return this.leakyRefs.length;
  }

  getCleanCount() {
    return this.cleanRefs.length;
  }
}
