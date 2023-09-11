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

export interface IInvitation {
  circleId: number;
  invitationId: number;
  createdAt: string;
  message?: string;
  receiverId: number;
  isAccepted?: boolean;
  receiverUsername?: string;
  invitationCircleName: string;
  invitationCircleOwnerId?: number;
  invitationCircleOwnerUsername?: string;
}
