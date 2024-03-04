import { COMPANY_SIZE } from '../constants';
import { Integration } from './integration.types';
import { User } from './user.types';

export type ActiveWorkspace = {
  workspace: Workspace;
  permission: string;
};

export type Workspace = {
  _id: string;
  created_by: Partial<User>;
  company_size: COMPANY_SIZE;
  company_name: string;
  timezone: string;
  spark_gpt_agent: User;
  integrations: Integration[];
  active_workspace: ActiveWorkspace;
};

export type UserWorkspaceInfo = {
  active_workspace: ActiveWorkspace;
  workspaces: Workspace[];
};
