import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule,
  MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressBarModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatCardModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatDialogModule, MatStepperModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatStepperModule
  ],
  exports: [MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
  MatToolbarModule,
    MatStepperModule]
})
export class MaterialModule {
}
