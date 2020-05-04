import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.scss']
})
export class OrganisationsListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'Organisation', 'status', 'role', 'Action'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel(true, []);
  listing: boolean = true;
  recordCount: any;
  constructor() { }

  ngOnInit() {
  }

  // For adding new organisation
  addNewOrganisation() {

  }

  // To download organisations
  downloadOrganisations() {

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.length + 1}`;
  }

}
