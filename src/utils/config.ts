type ChangeListener<T extends browser.storage.StorageValue> = (newValue: T) => void;

class Config {
  private readonly defaultValues: any = {
    accessToken: null,
  };

  private onChangeListeners: { [key: string]: Array<ChangeListener<any>> } = {};

  constructor() {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local') {
        Object.keys(changes).forEach(async key => {
          if (this.onChangeListeners[key]) {
            const newValue = await this.get(key);
            this.onChangeListeners[key].forEach(listener => listener(newValue));
          }
        });
      }
    });
  }

  public getAccessToken(): Promise<string> {
    return this.get('accessToken');
  }

  public setAccessToken(accessToken: string): Promise<void> {
    return this.set('accessToken', accessToken);
  }

  public onAccessTokenChanged(listener: ChangeListener<string>): void {
    this.addChangeListener('accessToken', listener);
  }

  private get<T extends browser.storage.StorageValue>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      browser.storage.local
        .get(key)
        .then(data => resolve((data[key] || this.defaultValues[key]) as any))
        .catch(reject);
    });
  }

  private set(key: string, value: browser.storage.StorageValue): Promise<void> {
    return browser.storage.local.set({ [key]: value });
  }

  private addChangeListener<T extends browser.storage.StorageValue>(key: string, listener: ChangeListener<T>): void {
    if (!this.onChangeListeners[key]) {
      this.onChangeListeners[key] = [];
    }

    this.onChangeListeners[key].push(listener);
  }
}

export const config = new Config();
