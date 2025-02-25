import Link from 'next/link';
import ProjectSelect from '../UI/select/ProjectSelect/ProjectSelect';
import AddWebsiteBtn from '../UI/btn/AddWebsiteBtn/AddWebsiteBtn';
import MoreActionsBtn from '../UI/btn/MoreActionsBtn/MoreActionsBtn';
import { ActionsOptions } from '@/models/resources/options';
import Search from '../Search/Search';
import UserProfile from '../UserProfile/UserProfile';
import DisplayToggle from '../UI/toggle/DisplayToggle/DisplayToggle';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-links">
          <Link href="/" className="navigation-logo">
            FlowResources
          </Link>
          <ProjectSelect />
          <AddWebsiteBtn />
        </div>
        <div className="navigation-actions">
          <DisplayToggle />
          <Search />
          <MoreActionsBtn options={ActionsOptions} />
          <UserProfile/>
        </div>
      </div>
    </nav>
  );
}
