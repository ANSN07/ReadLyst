import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SearchComponent } from './components/search/search.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'search', component: SearchComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: AddBookComponent },
  { path: 'my-books/:category', component: MyBooksComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
