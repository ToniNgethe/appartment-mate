class AppStorage {
  // keys
  readonly tokenKey: string = "token";

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export const appStorage = new AppStorage();
