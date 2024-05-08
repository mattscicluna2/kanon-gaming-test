import fs from 'fs';

export class JsonManager {
  static async readFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
}
