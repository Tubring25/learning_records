const db = require("../config/db");

class BaseModel {
  constructor(tableName, schema, config) {
    this.model = db.define(tableName, schema, config);
  }
  getModel() {
    return this.model;
  }
  findAll(config) {
    return this.model.findAll(config);
  }
  create(data) {
    return this.model.create(data);
  }
  update(data, where) {
    return this.model.update(data, where);
  }
  findAndCount(config) {
    return this.model.findAndCountAll(config);
  }
  deleteItem(config) {
    return this.model.destroy(config);
  }
}

module.exports = BaseModel;
