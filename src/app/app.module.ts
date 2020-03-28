import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ApiService } from './api.service'
import { HomeComponent } from './components/home/home.component'
import { CharactersComponent } from './components/characters/characters.component'
import { CharacterComponent } from './components/character/character.component'
import { HousesComponent } from './components/houses/houses.component'
import { HouseComponent } from './components/house/house.component'
import { SpellsComponent } from './components/spells/spells.component'
import { FooterComponent } from './components/footer/footer.component'
import { FavouritesComponent } from './components/favourites/favourites.component'
import { DataService } from './data.service'

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, HomeComponent, CharactersComponent, HousesComponent, SpellsComponent, CharacterComponent, HouseComponent, FooterComponent, FavouritesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ApiService, DataService]
})

export class AppModule { }
