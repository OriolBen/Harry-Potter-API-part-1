import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { DataService } from '../../data.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []
  local : Array<string> = []
  temporaryName : string = ""
  name : string = ""
  option : string = ""
  filter : string = "none"
  filtered : Array<any> = []

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getSpells()
    this.getAllSpells()
  }

  getAllSpells() : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = data
      this.filtered = data
    })
  }

  updateFilter(category : string) : void {
    this.filter = category
    if (this.filter == "name") this.name = this.temporaryName
  }

  applyFilter() : Array<any> {
    switch (this.filter) {
      case "none": 
        this.filtered = this.spells
        break
      case "type":
        this.filtered = this.spells.filter((spell) => spell.type == this.option)
        break
      case "name":
        this.filtered = this.spells.filter((spell) => spell.spell.toLowerCase().includes(this.name.toLowerCase()))
        break
    }
    return this.filtered
  }

  addSpell(id : string) : void {
    this.local = this.storage.addFavourite("spells", id).spells
  }

  removeSpell(id : string) : void {
    this.local = this.storage.removeFavourite("spells", id).spells
  }

  checkSpell(id : string) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == id) return true
    }
    return false
  }
}