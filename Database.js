class Database {
  constructor(name = "default") {
    if(localStorage.getItem(name) === null) {
      localStorage.setItem(name, '{}');
      this.name = name;
    } else this.name = name;
  }
  
  prepare() {
    if(localStorage.getItem(this.name) === null) localStorage.setItem(this.name, '{}');
  }
  
  getDatabase() {
    this.prepare();
    return JSON.parse(localStorage.getItem(this.name));
  }
  
  fetchDatabase() { return this.getDatabase() }
  
  setDatabase(data) {
    this.prepare();
    localStorage.setItem(this.name, JSON.stringify(data));
    return data;
  }
  
  updateDatabase(data) {
    this.prepare();
    let database = this.getDatabase();
    for(let key in data) database[key] = data[key];
    localStorage.setItem(this.name, JSON.stringify(database));
    return database, data;
  }
  
  clearDatabase() { return this.setDatabase({}) }
  
  destroyDatabase() { localStorage.removeItem(this.name) }
  
  deleteDatabase() { return this.destroyDatabase() }
  
  get(key) {
    this.prepare();
    let database = this.getDatabase();
    let result = database;
    key.split('.').forEach(key => result = result[key]);
    return result;
  }
  
  set(key, value) {
    this.prepare();
    let database = this.getDatabase();
    database[key] = value;
    this.setDatabase(database);
    return true;
  }
  
  add(key, amount = 1) {
    this.prepare();
    let database = this.getDatabase();
    if(database[key] && typeof database[key] === "number") {
      database[key] += amount;
      this.setDatabase(database);
      return database[key];
    } else {
      database[key] = 0 + amount;
      this.setDatabase(database);
      return database[key];
    }
  }
  
  subtract(key, amount = 1) {
    this.prepare();
    let database = this.getDatabase();
    if(database[key] && typeof database[key] === "number") {
      database[key] -= amount;
      this.setDatabase(database);
      return database[key];
    } else {
      database[key] = 0 - amount;
      this.setDatabase(database);
      return database[key];
    }
  }
  
  all(key = null) {
    this.prepare();
    let database = this.getDatabase();
    let result = [];
    if(key === null) {
      for(let key in database) {
        result.push(database[key]);
      }
      return result;
    } else {
      let path = database;
      let keys = key.split('.').forEach(key => path = path[key]);
      for(let key in path) {
        result.push(path[key]);
      }
      return result;
    }
  }
  
  push(key, item) {
    this.prepare();
    let database = this.getDatabase();
    if(database[key] && Array.isArray(database[key])) {
      database[key].push(item);
      this.setDatabase(database);
      return database[key];
    } else return false;
  }
  
  has(key) {
    this.prepare();
    let database = this.getDatabase();
    if(database[key]) return true;
    return false;
  }
  
  remove(key) {
    this.prepare();
    let database = this.getDatabase();
    let value = database[key];
    delete database[key];
    this.setDatabase(database);
    return database, key, value;
  }
  
  clear() { return this.clearDatabase() }
  
  destroy() { return this.destroyDatabase() }
}

export default Database;

export { Database };
