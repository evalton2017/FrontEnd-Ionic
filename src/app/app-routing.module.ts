import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',loadChildren: './home/home.module#HomePageModule' },
  { path: 'categorias',loadChildren: './categorias/categorias.module#CategoriasPageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
