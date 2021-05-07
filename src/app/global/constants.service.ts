
export class ConstantsService {

  private static readonly unsplashSourceApi: string = 'https://source.unsplash.com/1280x900/?restaurants,food,alcohol';

  constructor() { }

  public static getUnsplashSourceApi(): string {
    return ConstantsService.unsplashSourceApi;
  }
}
