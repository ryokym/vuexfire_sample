import * as admin from 'firebase-admin';

class AddUser {
  db = admin.firestore();

  run = async (data: any): Promise<any> => {
    const usersRef = this.db.collection('users');
    await usersRef
      .doc()
      .set(data)
      .then(() => console.log('success'))
      .catch(err => console.log(err));
  };
}

export const c = new AddUser();
