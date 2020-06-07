function testConnection(client) {
  return new Promise((resolve, reject) => {
    client.connect((err, client, release) => {
      if (err) {
        reject(new Error(`Error acquiring client, error: ${err.stack}`));
      }
      client.query('SELECT NOW()', (err) => {
        release();
        if (err) {
          reject(new Error(`Error acquiring client, error: ${err.stack}`));
        }
        console.log('Successfully connected to DB\n')
        resolve(true);
      })
    })
  });
}

module.exports = { testConnection };
