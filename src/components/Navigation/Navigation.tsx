'use client';

import Link from 'next/link';
import { usePopupContext } from '@/context/PopupContext';
import ProjectSelect from '../ProjectSelect/ProjectSelect';
import { Popups } from '@/models/enum';
import AddWebsiteBtn from '../UI/AddWebsiteBtn/AddWebsiteBtn';
import './Navigation.css';

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
        </div>
      </div>
    </nav>
  );
}

//TODO: geer option with the options to reorder the sites and to remove categories or projects
