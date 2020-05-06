import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent, of, Observable } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { OrganisationService } from '../../admin-core';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.scss']
})
export class OrganisationsListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  selection = new SelectionModel(true, []);
  listing: boolean = false;
  recordCount: any;
  columns: any;
  organisationListData: any;
  fieldsForOrganisation: any;
  formdata: any;
  queryParams = {
    page: 1,
    size: 10,
  };
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private organisationService: OrganisationService, private router: Router,
    private dialog: MatDialog, private commonServiceService: CommonServiceService) { }

  ngOnInit() {

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2 || res.length == 0)
      // Time in milliseconds between key events
      // , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.getOrganisationList();
    });
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getOrganisationList();
    });
    this.getOrganisationList();
  }

  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
    }
    return '';
  }

  allOrganisation() {

  }

  /**
* To get OrganisationList
*/
  getOrganisationList() {
    this.organisationService.organisationList(this.queryParams, this.searchInput.nativeElement.value).subscribe(data => {
      this.organisationListData = data['result'];
      this.refreshDatasource(data['result']['data']);
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result']['data']);
      this.columns = data['result']['columns'];
      if (this.organisationListData) {
        this.columns.forEach(element => {
          if (element.visible) {
            this.displayedColumns.push(element.key)
          }
        });
      }
      // this.displayedColumns = this.columns.concat([{key:'myExtraColumn'}]);
      this.recordCount = data['result'].count;
      this.listing = true;
    }, error => {
      this.listing = true;

    });
  }

  // Organisation Form
  createOrganisationForm() {
    this.organisationService.getOrganisationForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsForOrganisation = this.formdata.form;
    }, error => {

    });
  }

  editOrganisation(data) {
    console.log('editOrganisation', data);
    this.router.navigate(['/organisations/edit', data._id])
    this.commingSoon();
  }

  refreshDatasource(data) {
    this.dataSource = data;
  }

  // For adding new organisation
  addNewOrganisation() {
    this.openDialog(this.fieldsForOrganisation);

  }

  // Adding Organisation popup
  openDialog(fieldsForOrganisation): void {
    const dialogRef = this.dialog.open(CreateOrganisationComponent
      , {
        disableClose: true,
        width: '50%',
        data: { fieldsForOrganisation }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOrganisationList();
    });
  }

  // To download organisations
  downloadOrganisations() {
    this.commingSoon();
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

  commingSoon() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', 1000);
  }
}





