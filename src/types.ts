export interface ICircle {
  id: number | string;
  name: string;
  imageFile?: IImageFile;
  members?: IUser[];
}

export interface IImageFile {
  url: string;
}

export interface IUser {
  id: number;
  username: string;
}
