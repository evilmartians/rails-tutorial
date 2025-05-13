import sqlite from 'sqlite-sync';

export const setupSQLiteDatabase = async (path) => {
  const db = sqlite.connect(path);
  return db;
};

export const registerSQLite3WasmInterface = (db) => {
  global.sqlite4rails = {
    exec: function (sql) {
      let cols = [];
      let rows = [];

      let results = db.run(sql);

      console.log('[SQL] query', sql)
      console.log('[SQL] results', results)

      if (results.length) {
        rows = results.map((row) => Object.values(row));
        cols = Object.keys(results[0]);
      } else {
        db._rowsModified = results | 0;
      }

      return { cols, rows };
    },

    changes: function () {
      return db._rowsModified;
    },
  };
}
