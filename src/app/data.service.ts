import { Inject, Injectable, InjectionToken } from '@angular/core'

export const LOCAL_DATA = new InjectionToken<Storage>('Local Data', {
  providedIn: 'root',
  factory: () => localStorage
})

export interface Favourite {
  house : string,
  characters : Array<string>,
  spells : Array<string>,
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  favourite : Favourite

  constructor(@Inject(LOCAL_DATA) public data : Storage) {
    let exists = this.data.getItem('Harry Potter API')
    if (!exists) {
      this.favourite = {
        "house": "",
        "characters": [],
        "spells": []
      }
    }
    else this.favourite = JSON.parse(exists)
  }

  getFavourite() : Favourite {
    return this.favourite
  }

  getHouse() : string {
    return this.favourite.house
  }
  
  getSpells() : Array<string> {
    return this.favourite.spells
  }

  getCharacters() : Array<string> {
    return this.favourite.characters
  }

  addFavourite(category : string, id : string) : Favourite {
    switch (category) {
      case "house":
        this.favourite.house = id
        break
      default:
        this.favourite[category].push(id)
        break
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
    return this.favourite
  }

  removeFavourite(category : string, id : string) : Favourite {
    switch (category) {
      case "house": 
        this.favourite.house = ""
        break
      default:
        for (var i = 0; i < this.favourite[category].length; i++) {
          if (this.favourite[category][i] == id) this.favourite[category].splice(i, 1)
        }
        break
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
    return this.favourite
  }
}