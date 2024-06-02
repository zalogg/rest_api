class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  update(name) {
    this.name = name;
  }
}

module.exports = Item;
