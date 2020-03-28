import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterComponent } from './components/character/character.component';
import { HousesComponent } from './components/houses/houses.component';
import { HouseComponent } from './components/house/house.component';
import { SpellsComponent } from './components/spells/spells.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'characters/:id',
    component: CharacterComponent
  },
  {
    path: 'houses',
    component: HousesComponent
  },
  {
    path: 'houses/:id',
    component: HouseComponent
  },
  {
    path: 'spells',
    component: SpellsComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
