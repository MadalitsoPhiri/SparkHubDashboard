import { Status } from './status.types';
import { User } from './user.types';
import { Workspace } from './workspace.type';

export type Invitation = {
  _id: string;
  workspace: string;
  status: Status;
  email: string;
  inviter: string | User;
  expiry_date: string;
  teams: string[];
  revoked: boolean;
};

export type TeamMate = {
  _id: string;
  workspace: Workspace;
  user: User;
  permission: string;
};
