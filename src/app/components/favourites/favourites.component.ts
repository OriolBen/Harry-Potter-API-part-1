import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { Favourite, DataService } from '../../data.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  house : object = {}
  houseCharacters : object = {}
  characters : Array<any> = []
  charactersHouses : object = {}
  spells : Array<any> = []
  local : Favourite
  empty : boolean
  emptyHouse : boolean
  emptyCharacters : boolean
  emptySpells : boolean

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getFavourite()
    this.emptyHouse = this.local.house == "" ? true : false
    if (!this.emptyHouse) {
      this.getHouse()
      this.getCharactersNames()
    }
    this.emptyCharacters = this.local.characters.length == 0 ? true : false
    if (!this.emptyCharacters) {
      this.getHousesId()
      this.getCharacters()
    }
    this.emptySpells = this.local.spells.length == 0 ? true : false
    if (!this.emptySpells) this.getSpells()
    this.empty = this.emptyHouse && this.emptyCharacters && this.emptySpells ? true : false
  }

  getHouse() : void {
    this.api.getHouse(this.local.house).subscribe((data : object) => {
      this.house = data[0]
    })
  }

  getCharactersNames() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      data.forEach((character) => {
        if (character.house == this.house["name"]) this.houseCharacters[character._id] = character.name
      })
    })
  }

  removeHouse(id : string) : void {
    this.local.house = this.storage.removeFavourite("house", id).house
    this.house = {}
    this.houseCharacters = {}
    this.emptyHouse = this.local.house == "" ? true : false
    this.empty = this.emptyHouse && this.emptyCharacters && this.emptySpells ? true : false
  }

  checkHouseCharacters(id : string) : boolean {
    return id in this.houseCharacters
  }

  getHousesId() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      data.forEach((house) => {
        this.charactersHouses[house.name] = house._id
      })
    })
  }

  getCharacters() : void {
    this.local.characters.forEach((id) => {
      this.api.getCharacter(id).subscribe((data : object) => {
        this.characters.push(data)
      })
    })
  }

  checkCharacterInfo(value : string) : boolean {
    return typeof value !== 'undefined'
  }

  characterHouse(house : string) : string {
    return this.charactersHouses[house]
  }

  removeCharacter(id : string) : void {
    this.local.characters = this.storage.removeFavourite("characters", id).characters
    this.emptyCharacters = this.local.characters.length == 0 ? true : false
    this.empty = this.emptyHouse && this.emptyCharacters && this.emptySpells ? true : false
    for (let i = 0, stop = false; i < this.characters.length && !stop; ++i) {
      if (this.characters[i]._id == id) {
        this.characters.splice(i, 1)
        stop = true
      }
    }
  }

  getSpells() : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      data.forEach((spell) => {
        if (this.local.spells.includes(spell._id)) this.spells.push(spell)
      })
    })
  }

  removeSpell(id : string) : void {
    this.local.spells = this.storage.removeFavourite("spells", id).spells
    this.emptySpells = this.local.spells.length == 0 ? true : false
    this.empty = this.emptyHouse && this.emptyCharacters && this.emptySpells ? true : false
    for (let i = 0, stop = false; i < this.spells.length && !stop; ++i) {
      if (this.spells[i]._id == id) {
        this.spells.splice(i, 1)
        stop = true
      }
    }
  }
}