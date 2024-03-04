import RequireAuth from '@/components/organisms/RequireAuth';
import MainChatUi from '@/components/templates/MainChatUi';
import Layout from '@/layout/index';
import { AddWorkSpace } from '@/pages/AddWorkSpace';
import AgentProfile from '@/pages/AgentProfile';
import Configurations from '@/pages/Configurations';
import Contacts from '@/pages/Contacts';
import EmailVerifyPage from '@/pages/EmailVerifyPage';
import { ForgotPassword } from '@/pages/ForgotPassword';
import General from '@/pages/General';
import Home from '@/pages/Home';
import Inbox from '@/pages/Inbox';
import Integration from '@/pages/Integration';
import JoinTeam from '@/pages/JoinTeam';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/LoginPage';
import { NewPassword } from '@/pages/NewPassword';
import NoteFoundPage from '@/pages/NotFound';
import Offers from '@/pages/Offers';
import UserProfile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import BlockedPeople from '@/pages/Settings/Sections/BlockedPeople';
import CustomFields from '@/pages/Settings/Sections/CustomFields';
import GeneralSettings from '@/pages/Settings/Sections/General';
import InvitePeople from '@/pages/Settings/Sections/Invites';
import OfficeHours from '@/pages/Settings/Sections/OfficeHours';
import Permissions from '@/pages/Settings/Sections/Permissions';
import Teammates from '@/pages/Settings/Sections/Teammates';
import TeamsAndRoles from '@/pages/Settings/Sections/TeamsandRoles';
import Setup from '@/pages/Setup';
import SignUp from '@/pages/SignUp';
import SparkGPTPage from '@/pages/SparkGPTPage';
import Styling from '@/pages/Styling';
import TeammateSignUp from '@/pages/TeammateSignUp';
import routeNames from '@/routes/routeNames';
import { observer } from 'mobx-react-lite';
import { Outlet, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routeNames.landing} element={<LandingPage />} />
      <Route path={routeNames.authentication.login} element={<Login />} />
      <Route path={routeNames.authentication.signUp} element={<SignUp />} />
      <Route
        path={routeNames.authentication.forgotPassword}
        element={<ForgotPassword />}
      />
      <Route
        path={routeNames.authentication.resetPassword}
        element={<NewPassword />}
      />
      <Route
        path={routeNames.dashboard.home}
        element={
          <RequireAuth checkEmailVerification>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path={routeNames.dashboard.inbox} element={<Inbox />}>
          <Route
            index
            element={<MainChatUi title='Chat' showLeftPanel={true} />}
          />
          <Route path='email' element={<MainChatUi title='Email' />} />
          <Route path='sms' element={<MainChatUi title='SMS' />} />
          <Route path='messenger' element={<MainChatUi title='Messenger' />} />
          <Route path='whatsapp' element={<MainChatUi title='Whatsapp' />} />
        </Route>
        <Route path={routeNames.dashboard.contacts} element={<Outlet />}>
          <Route index element={<Contacts type='all' />} />
          <Route path='my-contacts' element={<Contacts type='my' />} />
          <Route
            path='recently-viewed'
            element={<Contacts type='recently-viewed' />}
          />
          <Route path='list/:listId' element={<Contacts type='list' />} />
          <Route path={'contact-profile/:id'} element={<UserProfile />} />
        </Route>
        <Route
          path={routeNames.dashboard.configurations}
          element={<Configurations />}
        >
          <Route path='styling' index element={<Styling />} />
          <Route path='general' element={<General />} />
          <Route path='offers' element={<Offers />} />
          <Route path='setup' element={<Setup />} />
          <Route path='sparkgpt' element={<SparkGPTPage />} />
        </Route>
        <Route
          path={routeNames.dashboard.integration}
          element={<Integration />}
        />
        <Route path={routeNames.dashboard.settings} element={<Settings />}>
          <Route index element={<GeneralSettings />} />
          <Route path='teammates' element={<Teammates />} />
          <Route path={`teams&roles`} element={<TeamsAndRoles />} />
          <Route path='office-hours' element={<OfficeHours />} />
          <Route path='blocked-people' element={<BlockedPeople />} />
          <Route
            path={routeNames.dashboard.invites}
            element={<InvitePeople />}
          />
          <Route path='custom-fields' element={<CustomFields />} />
          <Route
            path={routeNames.dashboard.permissions}
            element={<Permissions />}
          />
        </Route>

        <Route
          path={routeNames.dashboard.agentProfile + '/:id'}
          element={<AgentProfile />}
        />
      </Route>

      <Route
        path={routeNames.workspaces.add}
        element={
          <RequireAuth>
            <AddWorkSpace />
          </RequireAuth>
        }
      />
      <Route path={routeNames.teams.sign_up} element={<TeammateSignUp />} />
      <Route
        path={routeNames.emailVerification.verificationPage}
        element={
          <RequireAuth>
            <EmailVerifyPage />
          </RequireAuth>
        }
      />

      <Route
        path={routeNames.emailVerification.verifyEmail}
        element={
          <RequireAuth>
            <EmailVerifyPage />
          </RequireAuth>
        }
      />
      <Route
        path={`${routeNames.teams.join}/:invite_id`}
        element={
          <RequireAuth>
            <JoinTeam />
          </RequireAuth>
        }
      />

      <Route path='*' element={<NoteFoundPage />} />
    </Routes>
  );
};

export default observer(AppRoutes);
