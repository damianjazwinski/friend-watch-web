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
  userAvatarUrl?: string;
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

export interface IWatch {
  watchId: number;
  circleId: number;
  message: string;
  externalLink?: string;
  expirationDate?: string;
  creatorId: number;
  creatorName: string;
  creatorAvatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
  circleName: string;
  comments: IComment[];
}

export interface IComment {
  commentId: number;
  commenterId: number;
  commenterName: string;
  commenterAvatarUrl?: string;
  watchId: number;
  content: string;
  createdAt: string;
}
