class DatabaseConnection {
  connect() {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }
}

const db = new DatabaseConnection();
export default db;
