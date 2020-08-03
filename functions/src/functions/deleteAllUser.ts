import * as admin from 'firebase-admin';

class DeleteAllUser {
  db = admin.firestore();

  async getUsers() {
    return await this.db.collection('users').get();
  }
  async onDelete(doc: string) {
    return await this.db.collection('users').doc(doc).delete();
  }
  run = async (): Promise<any> => {
    const users = await this.getUsers();
    users.forEach(doc => {
      this.onDelete(doc.id)
        .then(() => console.log(`deleted userID: ${doc.id}`))
        .catch(err => console.log(err));
      return '';
    });
  };
}

export const c = new DeleteAllUser();
