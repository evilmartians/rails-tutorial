import { PGlite } from '@electric-sql/pglite'

export const setupDatabase = async (path, opts = {}) => {
  const db = await PGlite.create({ dataDir: path })

  const name = opts.name || "pglite4rails";

  global[name] = {
    async query(sql, params) {
      return db.query(sql, params);
    }
  };

  return db;
};
