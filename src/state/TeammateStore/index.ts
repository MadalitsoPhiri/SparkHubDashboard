import { Invitation, TeamMate } from '@/types/teammate.types';
import { makeAutoObservable } from 'mobx';

class TeamMateStore {
  invites: Invitation[] = [];
  teamMates: TeamMate[] = [];
  selectedTeamMate: TeamMate | null = null;
  emailsToInvite: string[] = [];
  sendingInvite = false;
  fetchingInvites = false;
  fetchingTeamMates = false;

  constructor() {
    makeAutoObservable(this);
  }

  addEmail(email: string) {
    if (email) {
      this.emailsToInvite.push(email);
    }
  }

  removeEmail(index: number) {
    if (index || index === 0) {
      this.emailsToInvite.splice(index, 1);
    }
  }

  clearEmails() {
    this.emailsToInvite = [];
  }

  setSelectedTeamMate(teamMate: TeamMate | null) {
    this.selectedTeamMate = teamMate;
  }

  setSendingInvite(sending: boolean) {
    this.sendingInvite = sending;
  }

  setFetchingInvites(fetching: boolean) {
    this.fetchingInvites = fetching;
  }

  setFetchingTeamMates(fetching: boolean) {
    this.fetchingTeamMates = fetching;
  }

  setTeamMates(teamMates: TeamMate[]) {
    this.teamMates = teamMates;
  }

  addTeamMate(teamMate: any) {
    this.teamMates.push(teamMate);
  }

  addInvite(invite: Invitation[]) {
    this.invites.push(...invite);
  }

  setInvites(invites: any[]) {
    this.invites = invites;
  }
}

export const teamMateStore = new TeamMateStore();
