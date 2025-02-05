'use client';

import Link from 'next/link';
import { usePopupContext } from '@/context/PopupContext';
import ProjectSelect from '../UI/select/ProjectSelect/ProjectSelect';
import { Popups } from '@/models/enum';
import AddWebsiteBtn from '../UI/btn/AddWebsiteBtn/AddWebsiteBtn';
import './Navigation.css';
import MoreActionsBtn from '../UI/btn/MoreActionsBtn/MoreActionsBtn';
import { ActionsOptions } from '@/models/resources/options';

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
          <MoreActionsBtn options={ActionsOptions} />
        </div>
      </div>
    </nav>
  );
}
