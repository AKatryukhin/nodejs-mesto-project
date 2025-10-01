// eslint-disable-next-line
'use strict';

module.exports = {
  async up(db, client) {
    const collection = db.collection('users');

    try {
      // Современный способ получения индексов
      const indexes = await collection.listIndexes().toArray();
      console.log('Existing indexes:', indexes.map((idx) => idx.name));

      const emailIndexExists = indexes.some(
        (index) => index.key && index.key.email === 1,
      );

      if (emailIndexExists) {
        console.log('Email index already exists, skipping creation');
        return;
      }

      await collection.createIndex(
        { email: 1 },
        {
          unique: true,
          background: true,
          name: 'email_unique',
        },
      );
      console.log('✅ Unique index on email created successfully');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️ Index already exists with different name, skipping...');
        return;
      }
      console.error('❌ Error creating index:', error);
      throw error;
    }
  },

  async down(db, client) {
    const collection = db.collection('users');

    try {
      await collection.dropIndex('email_unique');
      console.log('✅ Index email_unique dropped');
    } catch (error) {
      if (error.codeName === 'IndexNotFound') {
        console.log('ℹ️ Index email_unique not found, nothing to drop');
        return;
      }
      console.error('❌ Error dropping index:', error);
      throw error;
    }
  },
};

// eslint-disable-next-line no-unused-vars
// const mongoose = require('mongoose');
//
// module.exports = {
//   // eslint-disable-next-line
//   up: async function(db, client) {
//     // db - это подключение к MongoDB (нативный драйвер)
//     const collection = db.collection('users');
//
//     await collection.createIndex(
//       { email: 1 },
//       {
//         unique: true,
//         background: true,
//         name: 'email_unique',
//       },
//     );
//     console.log('Unique index on email created successfully');
//   },
//
//   // eslint-disable-next-line
//   down: async function(db, client) {
//     const collection = db.collection('users');
//
//     await collection.dropIndex('email_unique');
//     console.log('Unique index on email dropped successfully');
//   },
// };
