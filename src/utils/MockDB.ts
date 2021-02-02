export default class MockDB {
  constructor() {}

  getItem(collectionName: string) {
    const storageData = localStorage.getItem('db');

    if (!storageData) return;

    const parsedData = JSON.parse(storageData);

    const targetData =
      collectionName && parsedData[collectionName]
        ? parsedData[collectionName]
        : parsedData;

    return targetData || null;
  }
  setItem(collectionName: string, data: any) {
    let storageData = localStorage.getItem('db');

    if (!storageData) {
      localStorage.setItem('db', JSON.stringify({}));
      storageData = localStorage.getItem('db');
    }

    const parsedData = JSON.parse(storageData!);

    parsedData[collectionName] = data;

    localStorage.setItem('db', JSON.stringify(parsedData));

    console.log(parsedData[collectionName]);

    return parsedData[collectionName];
  }
  findById(id: string) {
    let storageData = localStorage.getItem('db');

    if (!storageData) {
      localStorage.setItem('db', JSON.stringify({}));
      storageData = localStorage.getItem('db');
    }

    const parsedData = JSON.parse(storageData!);
  }
}
