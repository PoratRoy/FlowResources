'use client';

import Link from 'next/link';
import { usePopupContext } from '@/context/PopupContext';
import ProjectSelect from '../UI/select/ProjectSelect/ProjectSelect';
import { Popups } from '@/models/enum';
import AddWebsiteBtn from '../UI/btn/AddWebsiteBtn/AddWebsiteBtn';
import './Navigation.css';
import MoreActionsBtn from '../UI/btn/MoreActionsBtn/MoreActionsBtn';

export function Navigation() {
  const { openPopup } = usePopupContext();

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-links">
          <Link href="/" className="navigation-logo">
            FlowResources
          </Link>
          <ProjectSelect />
        </div>
        <div className="navigation-actions">
          <AddWebsiteBtn onClick={() => openPopup(Popups.addWebsite)} />
          <MoreActionsBtn options={[
            { label: 'Reorder sites', onClick: () => console.log('Reorder sites') },
            { label: 'Remove category', onClick: () => console.log('Remove category') },
            { label: 'Remove project', onClick: () => console.log('Remove project') },
          ]}/>
        </div>
      </div>
    </nav>
  );
}
