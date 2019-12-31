import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css']
})
export class TableOfContentsComponent implements OnInit {
  @Input('table')
  table: Tree<Snippet>;

  @Input('indentation')
  indentation = 0;

  indentationString: string;
  branches: Branch<Snippet>[];
  leaves: Leaf<Snippet>[];
  expand = true;
  head: boolean;

  constructor(private snippetService: SnippetService, private router: Router) {}

  ngOnInit() {
    this.indentationString = this.indentation + 'px';
    if (this.table && (<Branch<Snippet>>this.table).leaves) {
      this.branches = Object.values(this.table.branches);
      this.leaves = (<Branch<Snippet>>this.table).leaves || [];
      this.head = false;
    } else {
      this.head = true;
      const snippets = this.snippetService.getAllSnippets().filter(snippet => snippet.index);
      this.table = new Tree<Snippet>();
      snippets.forEach(snippet => this.table.addValue(snippet.index, snippet));
      this.branches = Object.values(this.table.branches);
      this.leaves = [];
    }
  }

  revealMore() {
    this.expand = !this.expand;
  }

  selectSnippet(id: string) {
    this.snippetService.onSnippetSelected(id);
    this.router.navigate(['']);
  }
}

class Tree<T> {
  name: string;
  branches: Object;

  constructor() {
    this.branches = {};
  }

  addValue(index: string, value: T): void {
    //for each index, locate the branch
    const nameAndIndices = this.determineNameAndIndices(index);
    const branch = this.findBranch(nameAndIndices[1], this);
    branch.addLeaf(value);

    branch.name = nameAndIndices[0];
  }

  private determineNameAndIndices(index: string): [string, string[]] {
    index = index || '';
    const nameMaker = index.split(':');
    let name = nameMaker.length === 2 ? nameMaker[1] : index.trim();
    const indices = nameMaker.length === 2 ? nameMaker[0].split('.') : index.split('.');
    let lastIndex = indices.length ? indices[indices.length - 1] : '';
    name = nameMaker.length == 2 ? lastIndex + ': ' + name : lastIndex;
    return [name, indices];
  }

  private hasBranch(index: string): boolean {
    return this.branches[index];
  }

  private getBranch(index: string): Branch<T> {
    return this.branches[index];
  }

  getOrMake(index: string): Branch<T> {
    if (this.hasBranch(index)) {
      return this.getBranch(index);
    }
    const newBranch = new Branch<T>();
    newBranch.name = index;
    this.branches[index] = newBranch;
    return newBranch;
  }

  findBranch(indices: string[], head: Tree<T>): Branch<T> {
    if (!indices.length) {
      return <Branch<T>>head;
    } else {
      const index = indices.shift();
      const branch = head.getOrMake(index);

      return this.findBranch(indices, branch);
    }
  }
}

class Branch<T> extends Tree<T> {
  leaves: Leaf<T>[];
  constructor() {
    super();
    this.leaves = [];
  }

  addLeaf(value: T): void {
    this.leaves.push(new Leaf(value));
  }
}

class Leaf<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}
