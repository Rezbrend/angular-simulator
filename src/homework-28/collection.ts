export class Collection<T> {
  
  private items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  getAllItemsCollection(): T[] {
    return this.items;
  }

  getSpecificItemCollection(index: number): T {
    return this.items[index];
  }

  clearCollection(): void {
    this.items = [];
  }

  deleteSpecificItemCollection(index: number): void {
    this.items.splice(index);
  }

  replaceSpecificItemCollection(index: number, newItem: T): void {
    this.items[index] = newItem;
  }
  
}

const fruitsCollection: Collection<string> = new Collection<string>(['яблоко', 'банан', 'апельсин', 'груша']);
const gradesCollection: Collection<number> = new Collection<number>([4, 5, 3, 5, 4, 2]);
