import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { DataService } from '../../data.service'

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})

export class HousesComponent implements OnInit {
  houses : Array<any> = []
  local : string
  characters : object = {}

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getHouse()
    this.getCharactersNames()
    this.getAllHouses()
  }

  getAllHouses() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      this.houses = data
    }) 
  }

  getCharactersNames() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      data.forEach((character) => {
        this.characters[character._id] = character.name
      })
    })
  }

  addHouse(id : string) : void {
    this.local = this.storage.addFavourite("house", id).house
  }

  removeHouse(id : string) : void {
    this.local = this.storage.removeFavourite("house", id).house
  }

  checkHouse(id : string) : boolean {
    return this.local == id
  }

  check(id : string) : boolean {
    return id in this.characters
  }
}