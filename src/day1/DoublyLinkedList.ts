type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public head?: Node<T>;
    public tail?: Node<T>;
    public length: number;

    constructor() {
        this.length = 0;
        this.tail = undefined;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Oh nope");
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;
        let curr = this.getAt(idx)!;

        const node = { value: item } as Node<T>;
        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        node.prev!.next = node;
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; i < this.length; ++i) {
            if (item === curr!.value) {
                break;
            }
            curr = curr!.next;
        }
        if (!curr) {
            return;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        const curr = this.getAt(idx);
        if (!curr) {
            return;
        }
        return this.removeNode(curr)!;
    }

    private removeNode(node: Node<T>): T {
        this.length--;

        if (this.length == 0) {
            const out = this.head;
            this.tail = this.head = undefined;
            return out!.value;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node == this.tail) {
            this.tail = node.prev;
        }
        if (node == this.head) {
            this.head = node.next;
        }
        node.next = node.prev = undefined;
        return  node.value;

    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head!;
        for (let i = 0; i < idx; ++i) {
            curr = curr.next!;
        }
        return curr;
    }
}
